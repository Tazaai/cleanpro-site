// =============================================================
// 🗓️ CleanPro Backend – gcalendar_api.mjs (Final Fixed Route)
// =============================================================

import { Router } from "express";
import { google } from "googleapis";

const router = Router();

// ✅ Auth (auto-discovery for Cloud Run service account)
const auth = new google.auth.GoogleAuth({
  scopes: ["https://www.googleapis.com/auth/calendar"],
});
const calendar = google.calendar({ version: "v3", auth });

/**
 * GET /api/gcalendar?days=7
 */
router.get("/", async (req, res) => {
  try {
    const days = parseInt(req.query.days || "7", 10);
    const timeMin = new Date().toISOString();
    const timeMax = new Date(Date.now() + days * 86400000).toISOString();

    const result = await calendar.events.list({
      calendarId: process.env.CALENDAR_ID || "primary",
      timeMin,
      timeMax,
      singleEvents: true,
      orderBy: "startTime",
    });

    res.json({ ok: true, events: result.data.items || [] });
  } catch (err) {
    console.error("❌ GCalendar fetch error:", err.message);
    res.status(500).json({ ok: false, error: err.message });
  }
});

/**
 * POST /api/gcalendar
 */
router.post("/", async (req, res) => {
  try {
    const { summary, description, start, end } = req.body;
    if (!summary || !start || !end) {
      return res
        .status(400)
        .json({ ok: false, error: "Missing required fields" });
    }

    const event = {
      summary,
      description: description || "",
      start: { dateTime: start, timeZone: "UTC" },
      end: { dateTime: end, timeZone: "UTC" },
    };

    const result = await calendar.events.insert({
      calendarId: process.env.CALENDAR_ID || "primary",
      resource: event,
    });

    res.json({ ok: true, event: result.data });
  } catch (err) {
    console.error("❌ GCalendar insert error:", err.message);
    res.status(500).json({ ok: false, error: err.message });
  }
});

// 🧭 Simple ping for health checks
router.get("/ping", (_, res) => res.send("✅ gCalendar API live"));

export default router;
