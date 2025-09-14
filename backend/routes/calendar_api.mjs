// ~/cleanpro-site/backend/routes/calendar_api.mjs
import express from "express";
import admin from "firebase-admin";

const router = express.Router();
const db = admin.firestore();

/**
 * GET /api/calendar
 * Query params:
 *   days = number of days (default 30, max 60)
 * Response:
 * {
 *   ok: true,
 *   availability: [
 *     { date: "2025-09-12", AM: { booked, capacity, available }, PM: { ... }, closed: false }
 *   ]
 * }
 */
router.get("/", async (req, res) => {
  try {
    // 🔑 Load capacity + rules from Firestore config (controlled via AppSheet)
    let config = {
      defaultCapacity: 3,
      slots: { AM: 3, PM: 3 },
      closedDays: [],
      disableSunday: false,
    };

    try {
      const capDoc = await db.collection("config").doc("capacity").get();
      if (capDoc.exists) {
        const data = capDoc.data();
        config.defaultCapacity = data.defaultCapacity || config.defaultCapacity;
        config.slots = data.slots || config.slots;
        config.closedDays = data.closedDays || [];
        config.disableSunday = data.disableSunday || false;
      }
    } catch (err) {
      console.warn("⚠️ Could not load capacity config, using defaults:", err);
    }

    // 🔍 Collect bookings
    const snapshot = await db.collection("bookings").get();
    const counts = {};
    snapshot.forEach((doc) => {
      const { date, timeSlot } = doc.data();
      if (!date || !timeSlot) return;
      if (!counts[date]) counts[date] = { AM: 0, PM: 0 };
      if (timeSlot.includes("08:00") || timeSlot === "AM") counts[date].AM++;
      if (timeSlot.includes("12:00") || timeSlot === "PM") counts[date].PM++;
    });

    // 📅 Generate availability
    const days = Math.min(parseInt(req.query.days) || 30, 60);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const availability = [];
    for (let i = 0; i < days; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const isoDate = d.toISOString().split("T")[0];

      const weekday = d.getDay(); // 0 = Sunday
      const isClosed =
        (config.disableSunday && weekday === 0) ||
        config.closedDays.includes(isoDate);

      const amCapacity = config.slots.AM ?? config.defaultCapacity;
      const pmCapacity = config.slots.PM ?? config.defaultCapacity;

      const amBooked = counts[isoDate]?.AM || 0;
      const pmBooked = counts[isoDate]?.PM || 0;

      availability.push({
        date: isoDate,
        closed: isClosed,
        AM: {
          booked: amBooked,
          capacity: isClosed ? 0 : amCapacity,
          available: isClosed ? 0 : Math.max(amCapacity - amBooked, 0),
        },
        PM: {
          booked: pmBooked,
          capacity: isClosed ? 0 : pmCapacity,
          available: isClosed ? 0 : Math.max(pmCapacity - pmBooked, 0),
        },
      });
    }

    res.json({ ok: true, availability });
  } catch (err) {
    console.error("Calendar fetch error:", err);
    res.status(500).json({ ok: false, error: "Calendar fetch failed" });
  }
});

export default router;
