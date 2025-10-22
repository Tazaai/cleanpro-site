// =============================================================
// 🗓️ CleanPro Backend – calendar_api.mjs (Final Fixed Route)
// =============================================================

import express from "express";
const router = express.Router();

// 🩺 Health check route
router.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "🗓️ Calendar API is working correctly on Cloud Run",
  });
});

// 🗓️ Example endpoint: add calendar event
router.post("/add", async (req, res) => {
  try {
    const { date, event } = req.body;
    if (!date || !event) {
      return res.status(400).json({ error: "Missing date or event" });
    }

    // Example simulated save
    const savedEvent = {
      id: Date.now(),
      date,
      event,
      status: "saved",
    };

    res.json({ ok: true, savedEvent });
  } catch (err) {
    console.error("❌ Calendar API error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 🧭 Test route for debugging
router.get("/ping", (_, res) => res.send("pong 🏓"));

export default router;
