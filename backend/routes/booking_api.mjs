// =============================================================
// 🧩 CleanPro Backend – booking_api.mjs (Safe Cloud Run Version)
// =============================================================

import express from "express";
const router = express.Router();

// ✅ Health-style route for bookings
router.get("/", (req, res) => {
  res.json({
    status: "ok",
    route: "booking_api",
    message: "✅ Booking API responding from Cloud Run",
  });
});

export default router;
