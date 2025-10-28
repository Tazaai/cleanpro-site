#!/usr/bin/env node

// Manual Firestore seeding script
// Run locally to populate Firestore collections

const admin = require('firebase-admin');
const fs = require('fs');

// Initialize Firebase Admin
const serviceAccount = JSON.parse(fs.readFileSync('./backend/serviceAccountKey.json', 'utf8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'cleanpro-site'
});

const db = admin.firestore();

// Coordination points data
const coordinationPoints = [
  {
    id: "hq_main",
    name: "Main Headquarters",
    address: "1234 Main Street, San Francisco, CA 94102, USA",
    city: "San Francisco",
    state: "CA",
    zipCode: "94102",
    phone: "+1 (555) 123-4567",
    email: "main@cleandeparture.com",
    active: true,
    coordinates: {
      lat: 37.7749,
      lng: -122.4194
    },
    serviceRadius: 50,
    capacity: {
      daily: 20,
      weekly: 120
    }
  },
  {
    id: "hq_east",
    name: "East Bay Operations",
    address: "5678 Oakland Avenue, Oakland, CA 94607, USA",
    city: "Oakland",
    state: "CA",
    zipCode: "94607",
    phone: "+1 (555) 234-5678",
    email: "eastbay@cleandeparture.com",
    active: true,
    coordinates: {
      lat: 37.8044,
      lng: -122.2711
    },
    serviceRadius: 40,
    capacity: {
      daily: 15,
      weekly: 90
    }
  },
  {
    id: "hq_south",
    name: "South Bay Center",
    address: "9999 Silicon Valley Boulevard, San Jose, CA 95110, USA",
    city: "San Jose",
    state: "CA",
    zipCode: "95110",
    phone: "+1 (555) 345-6789",
    email: "southbay@cleandeparture.com",
    active: true,
    coordinates: {
      lat: 37.3382,
      lng: -121.8863
    },
    serviceRadius: 45,
    capacity: {
      daily: 18,
      weekly: 108
    }
  }
];

// Configuration data
const config = {
  appName: "Clean Departure",
  version: "1.0.0",
  environment: "production",
  features: {
    booking: true,
    payments: true,
    notifications: true,
    scheduling: true
  },
  defaultServiceRadius: 25,
  maxBookingsPerDay: 50,
  operatingHours: {
    start: "08:00",
    end: "18:00",
    timezone: "America/Los_Angeles"
  }
};

async function seedFirestore() {
  try {
    console.log('🌱 Starting Firestore seeding...');
    
    // Seed coordination points
    console.log('📍 Seeding coordination points...');
    const batch = db.batch();
    
    coordinationPoints.forEach(point => {
      const ref = db.collection('coordinationPoints').doc(point.id);
      batch.set(ref, point);
    });
    
    await batch.commit();
    console.log('✅ Coordination points seeded successfully');
    
    // Seed configuration
    console.log('⚙️ Seeding configuration...');
    await db.collection('config').doc('app').set(config);
    console.log('✅ Configuration seeded successfully');
    
    // Verify seeding
    console.log('🔍 Verifying seeded data...');
    const pointsSnapshot = await db.collection('coordinationPoints').get();
    console.log(`📊 Coordination points in Firestore: ${pointsSnapshot.size}`);
    
    const configSnapshot = await db.collection('config').doc('app').get();
    console.log(`⚙️ Configuration exists: ${configSnapshot.exists}`);
    
    console.log('🎉 Firestore seeding completed successfully!');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error seeding Firestore:', error);
    process.exit(1);
  }
}

seedFirestore();