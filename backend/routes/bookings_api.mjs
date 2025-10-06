// ~/cleanpro-site/backend/routes/bookings_api.mjs
import { Router } from "express";
import { getFirestore } from "firebase-admin/firestore";

const router = Router();
const db = getFirestore();

/**
 * GET /api/bookings
 * Returns the 50 most recent bookings
 */
router.get("/", async (req, res) => {
  try {
    const snapshot = await db
      .collection("bookings")
      .orderBy("createdAt", "desc")
      .limit(50)
      .get();

    const bookings = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json({ ok: true, bookings });
  } catch (err) {
    console.error("Booking GET error:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

/**
 * POST /api/bookings
 * Creates a new booking
 */
router.post("/", async (req, res) => {
  try {
    const { name, phone, email, service, size, address, frequency, date, time } = req.body;

    if (!name || !phone || !email || !service || !address || !date || !time) {
      return res.status(400).json({ ok: false, error: "Missing required fields" });
    }

    // nearest HQ should be kept by maps/hqs logic, not here
    const newBooking = {
      name,
      phone,
      email,
      service,
      size: size || null,
      address,
      frequency: frequency || "once",
      date,
      time,
      createdAt: new Date(),
      status: "pending",
    };

    const docRef = await db.collection("bookings").add(newBooking);

    res.json({ ok: true, id: docRef.id, booking: newBooking });
  } catch (err) {
    console.error("Booking POST error:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

export default router;
