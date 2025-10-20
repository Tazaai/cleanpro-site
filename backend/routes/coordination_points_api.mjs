import express from "express";
import { getFirestore } from "firebase-admin/firestore";

const router = express.Router();
const db = getFirestore();

// ✅ GET all coordination points
router.get("/", async (req, res) => {
  try {
    const snapshot = await db.collection("coordination_points").get();
    const hqs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json({ ok: true, hqs });
  } catch (err) {
    console.error("Error fetching HQs:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

export default router;
