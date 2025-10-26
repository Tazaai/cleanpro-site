import { initFirebase, getDb } from "./firebase.js";

async function seedCoordinationPoints() {
  console.log("🏢 Seeding coordination points...");
  
  try {
    // Initialize Firebase
    await initFirebase();
    const db = getDb();
    
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
        serviceRadius: 50, // miles
        capacity: {
          daily: 20,
          weekly: 120
        },
        created: new Date().toISOString(),
        updated: new Date().toISOString()
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
        },
        created: new Date().toISOString(),
        updated: new Date().toISOString()
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
        },
        created: new Date().toISOString(),
        updated: new Date().toISOString()
      }
    ];

    // Insert coordination points
    for (const point of coordinationPoints) {
      await db.collection("coordination_points").doc(point.id).set(point);
      console.log(`✅ Inserted coordination point: ${point.name} (${point.city})`);
    }

    console.log(`🎉 Successfully seeded ${coordinationPoints.length} coordination points`);
    
    // Verify insertion
    const snapshot = await db.collection("coordination_points").get();
    console.log(`📊 Total coordination points in database: ${snapshot.size}`);
    
    process.exit(0);
    
  } catch (error) {
    console.error("❌ Failed to seed coordination points:", error.message);
    process.exit(1);
  }
}

seedCoordinationPoints();