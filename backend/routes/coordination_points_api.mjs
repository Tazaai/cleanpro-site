import admin from "firebase-admin";
import express from "express";
import { getFirestore } from "firebase-admin/firestore";
import { initFirebase } from "../firebase.js";

const router = express.Router();

// Enhanced Firebase getter with automatic initialization
const getDb = async () => {
  // Check if Firebase is already initialized
  if (admin.apps.length > 0) {
    return getFirestore();
  }
  
  // If not initialized, try to initialize it
  console.log("🔄 Firebase not found, attempting to initialize...");
  try {
    await initFirebase();
    if (admin.apps.length > 0) {
      console.log("✅ Firebase initialization successful");
      return getFirestore();
    } else {
      console.warn("⚠️ Firebase initialization completed but no apps found - this is expected in some environments");
      // Don't throw error, just return null to trigger fallback
      return null;
    }
  } catch (error) {
    console.error("❌ Firebase initialization failed:", error.message);
    // Don't throw error, just return null to trigger fallback
    return null;
  }
};

router.get("/", async (req, res) => {
  try {
    // Check for seeding trigger
    if (req.query.seed === 'true' && req.query.admin === 'true') {
      console.log("🌱 Seeding request detected - populating Firestore...");
      try {
        const db = await getDb();
        if (db) {
          // Default coordination points for seeding
          const seedData = [
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
              coordinates: { lat: 37.7749, lng: -122.4194 },
              serviceRadius: 50,
              capacity: { daily: 20, weekly: 120 }
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
              coordinates: { lat: 37.8044, lng: -122.2711 },
              serviceRadius: 40,
              capacity: { daily: 15, weekly: 90 }
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
              coordinates: { lat: 37.3382, lng: -121.8863 },
              serviceRadius: 45,
              capacity: { daily: 18, weekly: 108 }
            }
          ];

          // Seed to both possible collection names for compatibility
          const batch = db.batch();
          
          seedData.forEach(point => {
            const ref1 = db.collection('coordination_points').doc(point.id);
            const ref2 = db.collection('coordinationPoints').doc(point.id);
            batch.set(ref1, point);
            batch.set(ref2, point);
          });
          
          await batch.commit();
          console.log("✅ Firestore seeded successfully");
          
          return res.json({
            ok: true,
            message: "Firestore seeded successfully",
            seeded: seedData.length,
            collections: ['coordination_points', 'coordinationPoints']
          });
        }
      } catch (seedError) {
        console.error("❌ Seeding failed:", seedError);
        return res.json({
          ok: false,
          error: "Seeding failed",
          details: seedError.message
        });
      }
    }

    // Try Firebase first
    let coordinationPoints = [];
    let fromFirebase = false;
    
    try {
      const db = await getDb();
      if (db) {
        const snapshot = await db.collection("coordination_points").get();
        coordinationPoints = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        fromFirebase = true;
        console.log(`✅ Loaded ${coordinationPoints.length} coordination points from Firebase`);
      } else {
        console.warn("⚠️ Firebase database not available, using fallback data");
        fromFirebase = false;
      }
    } catch (firebaseError) {
      console.warn("⚠️ Firebase unavailable, using fallback data:", firebaseError.message);
      fromFirebase = false;
    }
    
    // Use fallback data only if Firebase is unavailable or returned no data
    if (!fromFirebase || coordinationPoints.length === 0) {
      console.log("🔄 Loading fallback coordination points data...");
      // Fallback to hardcoded coordination points for system reliability
      coordinationPoints = [
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
      fromFirebase = false;
    }

    // Handle empty collection gracefully
    if (coordinationPoints.length === 0) {
      console.warn("⚠️ No coordination points found - using default fallback");
      // Use same fallback data as above for consistency
      coordinationPoints = [
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
          coordinates: { lat: 37.7749, lng: -122.4194 },
          serviceRadius: 50,
          capacity: { daily: 20, weekly: 120 }
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
          coordinates: { lat: 37.8044, lng: -122.2711 },
          serviceRadius: 40,
          capacity: { daily: 15, weekly: 90 }
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
          coordinates: { lat: 37.3382, lng: -121.8863 },
          serviceRadius: 45,
          capacity: { daily: 18, weekly: 108 }
        }
      ];
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const { origin, destination } = req.query;

    if (apiKey && origin && destination) {
      try {
        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
          origin
        )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
        const r = await fetch(url);
        const data = await r.json();
        return res.json({
          ok: true,
          coordinationPoints,
          hqs: coordinationPoints, // Keep for backward compatibility
          distance: data.rows?.[0]?.elements?.[0]?.distance || null,
        });
      } catch (distanceError) {
        console.warn("Distance calculation failed:", distanceError.message);
        // Return coordination points without distance calculation
      }
    }

    res.json({ 
      ok: true, 
      coordinationPoints,
      hqs: coordinationPoints, // Keep for backward compatibility
      source: fromFirebase ? "firebase" : "fallback",
      message: fromFirebase ? "Data loaded from Firebase" : "Using fallback data - Firebase unavailable",
      count: coordinationPoints.length
    });
  } catch (err) {
    console.error("coordination_points error:", err);
    
    // Even if everything fails, provide fallback data to keep system functional
    const fallbackPoints = [
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
        coordinates: { lat: 37.7749, lng: -122.4194 },
        serviceRadius: 50,
        capacity: { daily: 20, weekly: 120 }
      }
    ];
    
    res.json({
      ok: true,
      coordinationPoints: fallbackPoints,
      hqs: fallbackPoints,
      source: "emergency-fallback", 
      message: "Using emergency fallback data",
      error: err.message,
      count: fallbackPoints.length
    });
  }
});

export default router;
