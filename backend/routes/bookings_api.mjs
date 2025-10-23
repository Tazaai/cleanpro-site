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

// Added: create booking
router.post("/", async (req, res) => {
  try {
    const {
      name, phone, email, service, sqMeters, area, frequency,
      date, timeSlot, address, nearestHQ
    } = req.body;

    if (!name || !phone || !email || !service || (!sqMeters && !area) || !date || !timeSlot || !address) {
      return res.status(400).json({ ok: false, message: "Missing required booking fields" });
    }

    const db = getDb();
    const docRef = await db.collection("bookings").add({
      name,
      phone,
      email,
      service,
      sqMeters: sqMeters || Number(area),
      frequency: frequency || "one_time",
      date,
      timeSlot,
      address,
      nearestHQ: nearestHQ || "",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      status: "pending",
    });

    res.json({ ok: true, id: docRef.id });
  } catch (err) {
    console.error("create booking error:", err);
    res.status(500).json({ ok: false, message: err.message || "Failed to create booking" });
  }
});

export default router;
