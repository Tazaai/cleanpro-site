// ~/cleanpro-site/backend/routes/maps.js
import express from "express";
import fetch from "node-fetch";

const router = express.Router();

// GET /api/maps/distance?origin=...&destination=...
router.get("/distance", async (req, res) => {
  const { origin, destination } = req.query;
  const key = "/app/firebase_config.json"

  if (!origin || !destination) {
    return res.status(400).json({ error: "Missing origin or destination" });
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
      origin
    )}&destinations=${encodeURIComponent(destination)}&units=imperial&key=${key}`;

    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (err) {
    console.error("Distance API error:", err);
    res.status(500).json({ error: "Failed to fetch distance" });
  }
});

export default router;
