import express from "express";
import fetch from "node-fetch";

const router = express.Router();

// Test Google Maps API key
router.get("/test", async (req, res) => {
  const key = process.env.GOOGLE_MAPS_API_KEY;
  
  if (!key) {
    return res.json({
      ok: false,
      error: "Google Maps API key not configured",
      hasKey: false
    });
  }
  
  try {
    // Test with a simple geocoding request
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=San+Francisco,CA&key=${key}`;
    const response = await fetch(url);
    const data = await response.json();
    
    res.json({
      ok: true,
      hasKey: true,
      keyLength: key.length,
      keyPrefix: key.substring(0, 10) + "...",
      testResult: {
        status: data.status,
        resultsCount: data.results ? data.results.length : 0
      }
    });
  } catch (err) {
    console.error("Google Maps API test error:", err);
    res.json({
      ok: false,
      error: "Failed to test Google Maps API",
      details: err.message
    });
  }
});

// GET /api/maps/distance?origin=...&destination=...
router.get("/distance", async (req, res) => {
  const { origin, destination } = req.query;
  const key = process.env.GOOGLE_MAPS_API_KEY;

  if (!origin || !destination)
    return res.status(400).json({ error: "Missing origin or destination" });

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
