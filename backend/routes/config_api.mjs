// ~/backend/routes/config_api.mjs
import express from "express";
import { getDb } from "../firebase.js";

const router = express.Router();

/**
 * GET /api/config/capacity
 * Returns current AM/PM capacity
 */
router.get("/capacity", async (req, res) => {
  try {
    // Lazy initialization - get database connection when needed
    const db = getDb();
    if (!db) {
      // Fallback data when Firebase is unavailable
      return res.json({ 
        ok: true, 
        capacity: { AM: 1, PM: 1 },
        source: "fallback",
        message: "Using fallback data - Firebase unavailable"
      });
    }
    
    const doc = await db.collection("config").doc("capacity").get();
    if (!doc.exists) {
      return res.json({ ok: true, capacity: { AM: 1, PM: 1 } });
    }
    res.json({ ok: true, capacity: doc.data() });
  } catch (err) {
    console.error("Capacity fetch error:", err);
    // Fallback on error
    res.json({ 
      ok: true, 
      capacity: { AM: 1, PM: 1 },
      source: "fallback",
      message: "Using fallback data - Database error"
    });
  }
});

/**
 * POST /api/config/capacity
 * Body: { AM: number, PM: number }
 */
router.post("/capacity", async (req, res) => {
  try {
    const { AM, PM } = req.body;
    if (!AM || !PM) {
      return res.status(400).json({ ok: false, error: "AM and PM required" });
    }

    // Lazy initialization - get database connection when needed
    const db = getDb();
    if (!db) {
      return res.status(503).json({ 
        ok: false, 
        error: "Database unavailable - cannot update capacity" 
      });
    }

    await db.collection("config").doc("capacity").set({ AM, PM });
    res.json({ ok: true, message: "Capacity updated", capacity: { AM, PM } });
  } catch (err) {
    console.error("Capacity update error:", err);
    res.status(500).json({ ok: false, error: "Failed to update capacity" });
  }
});

export default router;
