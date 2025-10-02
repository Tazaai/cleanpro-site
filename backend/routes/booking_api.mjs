import express from "express";
import db from "../firebase.js";

const router = express.Router();

// GET bookings
router.get("/bookings", async (req, res) => {
  try {
    const snap = await db.collection("bookings").get();
    const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json({ ok: true, bookings: data });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// POST booking
router.post("/bookings", async (req, res) => {
  try {
    const booking = req.body;
    const ref = await db.collection("bookings").add(booking);
    res.json({ ok: true, id: ref.id });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

export default router;
