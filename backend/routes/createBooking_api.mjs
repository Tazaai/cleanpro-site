import express from "express";
import admin from "firebase-admin";
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

/**
 * POST /api/createBooking
 * Body: { name, phone, email, address, service, sqMeters, frequency, date, timeSlot, lastCleaningDate }
 */
router.post("/", async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      address,
      service,
      sqMeters,
      frequency,
      date,
      timeSlot,
      lastCleaningDate,
    } = req.body;

    if (!name || !phone || !email || !address || !date || !timeSlot) {
      return res
        .status(400)
        .json({ ok: false, error: "Missing required fields" });
    }

    const sq = Number(sqMeters) || 0;

    // Save booking
    const booking = {
      name,
      phone,
      email,
      address,
      service: service || "standard_cleaning",
      sqMeters: sq,
      frequency: frequency || "one_time",
      date,
      timeSlot,
      lastCleaningDate: lastCleaningDate || null,
      status: "pending",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      hqAddress: "14410 Sylvan St, Van Nuys, CA 91401", // HQ / Focal Point
    };

    const db = getDb();
    const ref = await db.collection("bookings").add(booking);

    // ✅ Update counters for availability
    await db
      .collection("bookings_count")
      .doc(date)
      .set(
        { [timeSlot]: admin.firestore.FieldValue.increment(1) },
        { merge: true }
      );

    res.json({
      ok: true,
      id: ref.id,
      booking,
      message: "✅ Booking created successfully",
    });
  } catch (err) {
    console.error("CreateBooking error:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

export default router;
