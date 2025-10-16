// =============================================================
// 🧩 CleanPro Backend – Final Cloud Run Safe Version
// =============================================================

import express from "express";
import cors from "cors";
import path from "path";
import admin from "firebase-admin";
import { readFileSync, writeFileSync, existsSync } from "fs";

// -------------------------------------------------------------
// ⚙️ Basic server setup
// -------------------------------------------------------------
const app = express();

app.use(
  cors({
    origin: ["https://cleanpro-frontend-5539254765.europe-west1.run.app"],
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());

const HOST = "0.0.0.0";
const PORT = process.env.PORT || 8080;

// =============================================================
// 🔐 Firebase Configuration Handling
// =============================================================
const SERVICE_ACCOUNT_PATH = "/app/backend/serviceAccountKey.json";
const FIREBASE_CONFIG_PATH = "/app/firebase_config.json";
const TEMPLATE_PATH = "/app/backend/firebase_template.json";

try {
  if (!existsSync(SERVICE_ACCOUNT_PATH)) {
    if (process.env.FIREBASE_KEY) {
      writeFileSync(SERVICE_ACCOUNT_PATH, process.env.FIREBASE_KEY);
      console.log("🗝️ Created serviceAccountKey.json from FIREBASE_KEY");
    } else {
      console.warn("⚠️ No FIREBASE_KEY provided — using template fallback.");
    }
  }

  if (!existsSync(FIREBASE_CONFIG_PATH)) {
    if (process.env.FIREBASE_KEY) {
      writeFileSync(FIREBASE_CONFIG_PATH, process.env.FIREBASE_KEY);
      console.log("🗝️ Created firebase_config.json from FIREBASE_KEY");
    } else if (existsSync(TEMPLATE_PATH)) {
      writeFileSync(FIREBASE_CONFIG_PATH, readFileSync(TEMPLATE_PATH, "utf8"));
      console.log("📄 Created firebase_config.json from template fallback");
    } else {
      console.warn("⚠️ No Firebase config found — creating empty object.");
      writeFileSync(FIREBASE_CONFIG_PATH, "{}");
    }
  }
} catch (err) {
  console.error("⚠️ Firebase config generation error:", err.message);
}

// =============================================================
// 🔥 Initialize Firebase Admin SDK
// =============================================================
try {
  if (!admin.apps.length) {
    let serviceAccountData = {};

    if (existsSync(SERVICE_ACCOUNT_PATH)) {
      serviceAccountData = JSON.parse(readFileSync(SERVICE_ACCOUNT_PATH, "utf8"));
    } else if (existsSync(FIREBASE_CONFIG_PATH)) {
      serviceAccountData = JSON.parse(readFileSync(FIREBASE_CONFIG_PATH, "utf8"));
    } else if (existsSync(TEMPLATE_PATH)) {
      serviceAccountData = JSON.parse(readFileSync(TEMPLATE_PATH, "utf8"));
    }

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccountData),
    });
    console.log("✅ Firebase Admin initialized");
  }
} catch (err) {
  console.error("❌ Firebase initialization failed:", err.message);
}

// =============================================================
// 🧩 Import all route modules
// =============================================================
import calendarApi from "./routes/calendar_api.mjs";
import coordinationPointsRouter from "./routes/coordination_points_api.mjs";
import configApi from "./routes/config_api.mjs";
import mapsApi from "./routes/maps_api.mjs";
import servicesApi from "./routes/services_api.mjs";
import bookingApi from "./routes/booking_api.mjs";
import quotesApi from "./routes/quotes_api.mjs";
import pricingApi from "./routes/pricing_api.mjs";
import gcalendarApi from "./routes/gcalendar_api.mjs";

// =============================================================
// 🚏 Mount API routes
// =============================================================
app.use("/api/calendar", calendarApi);
app.use("/api/coordination_points", coordinationPointsRouter);
app.use("/api/config", configApi);
app.use("/api/maps", mapsApi);
app.use("/api/services", servicesApi);
app.use("/api/bookings", bookingApi);
app.use("/api/quotes", quotesApi);
app.use("/api/pricing", pricingApi);
app.use("/api/gcalendar", gcalendarApi);

// =============================================================
// 🩺 Health check endpoint
// =============================================================
app.get("/", (_req, res) => {
  res.send("✅ CleanPro Backend is running on Cloud Run");
});

// =============================================================
// 🚀 Start Express Server
// =============================================================
app.listen(PORT, HOST, () => {
  console.log(`✅ Server listening on http://${HOST}:${PORT}`);
});
