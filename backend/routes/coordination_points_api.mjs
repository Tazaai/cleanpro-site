import admin from "firebase-admin";
import express from "express";
import { getFirestore } from "firebase-admin/firestore";

const router = express.Router();

// DO NOT initialize Firebase here — index.js must initialize it.
// Lazily get Firestore and fail fast if not initialized.
const getDb = () => {
  if (!admin.apps.length) {
    throw new Error("Firebase not initialized");
  }
  return getFirestore();
};

router.get("/", async (req, res) => {
  try {
    const db = getDb();
    const snapshot = await db.collection("coordination_points").get();
    const hqs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    // Handle empty collection gracefully
    if (hqs.length === 0) {
      console.warn("⚠️ No coordination points found in database");
      return res.json({
        ok: true,
        hqs: [],
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
          hqs,
          distance: data.rows?.[0]?.elements?.[0]?.distance || null,
        });
      } catch (distanceError) {
        console.warn("Distance calculation failed:", distanceError.message);
        // Return HQs without distance calculation
      }
    }

    res.json({ ok: true, hqs });
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
