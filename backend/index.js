// ============================================================= 
// 🧩 CleanPro Backend – Cloud Run Safe Version (Final)
// =============================================================

import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import { readFileSync, writeFileSync, existsSync } from "fs";

process.env.FIREBASE_KEY ||= "{}";

const app = express();
app.use(
  cors({
    origin: [
      "https://cleanpro-frontend-5539254765.europe-west1.run.app",
      "https://cleanpro-frontend-2a5pka5baa-ew.a.run.app",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

const HOST = "0.0.0.0";
const PORT = process.env.PORT || 8080;

// 🔐 Firebase init
const SERVICE_ACCOUNT_PATH = "./backend/serviceAccountKey.json";
const FIREBASE_CONFIG_PATH = "./backend/firebase_config.json";

try {
  if (!existsSync(SERVICE_ACCOUNT_PATH))
    writeFileSync(SERVICE_ACCOUNT_PATH, process.env.FIREBASE_KEY);
  if (!existsSync(FIREBASE_CONFIG_PATH))
    writeFileSync(FIREBASE_CONFIG_PATH, process.env.FIREBASE_KEY || "{}");
  console.log("🔥 Firebase config ensured");
} catch (e) {
  console.error("⚠️ Firebase config error:", e.message);
}

try {
  if (!admin.apps.length) {
    const data = JSON.parse(readFileSync(SERVICE_ACCOUNT_PATH, "utf8"));
    admin.initializeApp({ credential: admin.credential.cert(data) });
    console.log("✅ Firebase Admin initialized");
  }
} catch {
  console.warn("⚠️ Firebase init skipped (empty config).");
}

// 🚏 Routes
import calendarApi from "./routes/calendar_api.mjs";
import coordinationPointsRouter from "./routes/coordination_points_api.mjs";
import configApi from "./routes/config_api.mjs";
import mapsApi from "./routes/maps_api.mjs";
import servicesApi from "./routes/services_api.mjs";
import bookingsApi from "./routes/bookings_api.mjs"; // ✅ fixed
import quotesApi from "./routes/quotes_api.mjs";
import pricingApi from "./routes/pricing_api.mjs";
import gcalendarApi from "./routes/gcalendar_api.mjs";

app.use("/api/calendar", calendarApi);
app.use("/api/coordination_points", coordinationPointsRouter);
app.use("/api/config", configApi);
app.use("/api/maps", mapsApi);
app.use("/api/services", servicesApi);
app.use("/api/bookings", bookingsApi); // ✅ correct route
app.use("/api/quotes", quotesApi);
app.use("/api/pricing", pricingApi);
app.use("/api/gcalendar", gcalendarApi);

// 🩺 Health
app.get("/", (_, res) => res.send("✅ CleanPro Backend running on Cloud Run"));

// 🚀 Start
app.listen(PORT, HOST, () =>
  console.log(`✅ Server listening on ${HOST}:${PORT}`)
);
