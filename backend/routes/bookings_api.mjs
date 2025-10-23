// ~/cleanpro-site/backend/routes/bookings_api.mjs
import express from "express";
import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

const router = express.Router();

const getDb = () => {
  if (!admin.apps.length) throw new Error("Firebase not initialized");
  return getFirestore();
};

router.get("/", async (req, res) => {
  try {
    const db = getDb();
    const snap = await db.collection("bookings").get();
    res.json({ ok: true, bookings: snap.docs.map(d => ({ id: d.id, ...d.data() })) });
  } catch (err) {
    console.error("bookings error:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

export default router;
