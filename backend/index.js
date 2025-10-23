// =============================================================
// 🧩 CleanPro Backend – Cloud Run Safe Version (Final Fixed)
// =============================================================

import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import { readFileSync, writeFileSync, existsSync } from "fs";

const app = express();

// ✅ CORS (local + Cloud Run + Codespaces)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://cleanpro-frontend-5539254765.europe-west1.run.app",
      /\.github\.dev$/,
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// ✅ Global fallback headers
app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

// 🌍 Host + Port
const HOST = "0.0.0.0";
const PORT = process.env.PORT || 8080;

// 🔐 Firebase initialization (safe for base64 key)
try {
  const rawKey = process.env.FIREBASE_KEY || "{}";
  const decoded = rawKey.trim().startsWith("{")
    ? rawKey
    : Buffer.from(rawKey, "base64").toString("utf8");
  const creds = JSON.parse(decoded);
  if (!admin.apps.length) {
    admin.initializeApp({ credential: admin.credential.cert(creds) });
    console.log("✅ Firebase initialized successfully");
  }
} catch (err) {
  console.error("❌ Firebase init failed:", err.message);
}

// 🚏 Routes (✅ corrected paths)
import calendarApi from "./routes/calendar_api.mjs";
import coordinationPointsApi from "./routes/coordination_points_api.mjs";
import servicesApi from "./routes/services_api.mjs";
import bookingsApi from "./routes/bookings_api.mjs";
import quotesApi from "./routes/quotes_api.mjs";
import pricingApi from "./routes/pricing_api.mjs";
import mapsApi from "./routes/maps_api.mjs";
import configApi from "./routes/config_api.mjs";
import gcalendarApi from "./routes/gcalendar_api.mjs";

app.use("/api/calendar", calendarApi);
app.use("/api/coordination_points", coordinationPointsApi);
app.use("/api/services", servicesApi);
app.use("/api/bookings", bookingsApi);
app.use("/api/quotes", quotesApi);
app.use("/api/pricing", pricingApi);
app.use("/api/maps", mapsApi);
app.use("/api/config", configApi);
app.use("/api/gcalendar", gcalendarApi);

// 🧭 Check Maps Key
app.get("/api/check_maps_key", (_, res) =>
  res.json({
    ok: !!process.env.GOOGLE_MAPS_API_KEY,
    keyPreview: process.env.GOOGLE_MAPS_API_KEY
      ? process.env.GOOGLE_MAPS_API_KEY.slice(0, 10) + "..."
      : null,
  })
);

// 🩺 Health check
app.get("/", (_, res) =>
  res.send("✅ CleanPro Backend is running on Cloud Run + Local OK")
);

// 🚀 Start server
app.listen(PORT, HOST, () =>
  console.log(`✅ Server listening at http://${HOST}:${PORT}`)
);
