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
      throw new Error("Firebase initialization completed but no apps found");
    }
  } catch (error) {
    console.error("❌ Firebase initialization failed:", error.message);
    throw new Error(`Firebase initialization failed: ${error.message}`);
  }
};

router.get("/", async (req, res) => {
  try {
    const db = await getDb();
    const snapshot = await db.collection("coordination_points").get();
    const coordinationPoints = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    // Handle empty collection gracefully
    if (coordinationPoints.length === 0) {
      console.warn("⚠️ No coordination points found in database");
      return res.json({
        ok: true,
        coordinationPoints: [],
        hqs: [], // Keep for backward compatibility
        message: "No coordination points configured yet",
        needsSeeding: true
      });
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
      hqs: coordinationPoints // Keep for backward compatibility
    });
  } catch (err) {
    console.error("coordination_points error:", err);
    
    // Provide more specific error information
    if (err.message.includes("Firebase not initialized")) {
      res.status(500).json({ 
        ok: false, 
        error: "Database connection not available",
        details: "Firebase initialization required"
      });
    } else {
      res.status(500).json({ 
        ok: false, 
        error: err.message,
        endpoint: "coordination_points"
      });
    }
  }
});

export default router;
