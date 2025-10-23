import admin from "firebase-admin";
import express from "express";
import { getFirestore } from "firebase-admin/firestore";

const router = express.Router();

// Ensure Firebase initialized
if (!admin.apps.length) {
  admin.initializeApp();
}

const db = getFirestore();

router.get("/", async (req, res) => {
  try {
    const snapshot = await db.collection("coordination_points").get();
    const hqs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const { origin, destination } = req.query;

    if (apiKey && origin && destination) {
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
    }

    res.json({ ok: true, hqs });
  } catch (err) {
    console.error("coordination_points error:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

export default router;
