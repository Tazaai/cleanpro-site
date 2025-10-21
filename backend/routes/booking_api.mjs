import express from "express";
import { getFirestore } from "firebase-admin/firestore";

const router = express.Router();
const db = getFirestore();

// ✅ Create new booking
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    if (!data.name || !data.service || !data.address)
      return res.status(400).json({ ok: false, message: "Missing required fields" });

    const ref = await db.collection("bookings").add({
      ...data,
      createdAt: new Date().toISOString(),
    });

    res.json({ ok: true, id: ref.id });
  } catch (err) {
    console.error("Booking save error:", err);
    res.status(500).json({ ok: false, message: err.message });
  }
});

// ✅ Price preview
router.post("/preview", async (req, res) => {
  try {
    const { sqMeters = 0, distance = 0, frequency } = req.body;
    const base = sqMeters * 2.5;
    const distFee = Math.max(0, distance - 40) * 2;
    const discount = frequency === "weekly" ? 0.1 : frequency === "monthly" ? 0.08 : 0;
    const final = (base + distFee) * (1 - discount);

    res.json({
      ok: true,
      breakdown: {
        basePrice: base.toFixed(2),
        distanceFee: distFee.toFixed(2),
        discount: (base * discount).toFixed(2),
        finalPrice: final.toFixed(2),
      },
    });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
});

export default router;
