import express from "express";
import { getFirestore } from "firebase-admin/firestore";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const db = getFirestore();
    const snapshot = await db.collection("coordination_points").get();

    if (snapshot.empty) {
      return res.json({ ok: true, coordination_points: [] });
    }

    const points = [];
    snapshot.forEach(doc => points.push({ id: doc.id, ...doc.data() }));
    res.json({ ok: true, coordination_points: points });
  } catch (err) {
    console.error("coordination_points error:", err.message);
    res.status(500).json({ ok: false, error: "Failed to fetch coordination_points" });
  }
});

export default router;
