// =============================================================
// 🧩 CleanPro Backend – Cloud Run Safe Version (Final)
// =============================================================

import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import { readFileSync, writeFileSync, existsSync } from "fs";

process.env.FIREBASE_KEY ||= "{}"; // ✅ Prevent crash if secret missing

const app = express();
app.use(cors({ origin: ["https://cleanpro-frontend-5539254765.europe-west1.run.app"], methods: ["GET", "POST", "OPTIONS"], credentials: true }));
app.use(express.json());

const HOST = "0.0.0.0";
const PORT = process.env.PORT || 8080;

const SERVICE_ACCOUNT_PATH = "/app/backend/serviceAccountKey.json";
const FIREBASE_CONFIG_PATH = "/app/firebase_config.json";
const TEMPLATE_PATH = "/app/backend/firebase_template.json";

try {
  if (!existsSync(SERVICE_ACCOUNT_PATH)) writeFileSync(SERVICE_ACCOUNT_PATH, process.env.FIREBASE_KEY);
  if (!existsSync(FIREBASE_CONFIG_PATH)) writeFileSync(FIREBASE_CONFIG_PATH, process.env.FIREBASE_KEY || "{}");
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

// Routes
import calendarApi from "./routes/calendar_api.mjs";
import coordinationPointsRouter from "./routes/coordination_points_api.mjs";
import configApi from "./routes/config_api.mjs";
import mapsApi from "./routes/maps_api.mjs";
import servicesApi from "./routes/services_api.mjs";
import bookingApi from "./routes/booking_api.mjs";
import quotesApi from "./routes/quotes_api.mjs";
import pricingApi from "./routes/pricing_api.mjs";
import gcalendarApi from "./routes/gcalendar_api.mjs";

app.use("/api/calendar", calendarApi);
app.use("/api/coordination_points", coordinationPointsRouter);
app.use("/api/config", configApi);
app.use("/api/maps", mapsApi);
app.use("/api/services", servicesApi);
app.use("/api/bookings", bookingApi);
app.use("/api/quotes", quotesApi);
app.use("/api/pricing", pricingApi);
app.use("/api/gcalendar", gcalendarApi);

app.get("/", (_, res) => res.send("✅ CleanPro Backend running on Cloud Run"));
app.listen(PORT, HOST, () => console.log(`✅ Server on ${HOST}:${PORT}`));
