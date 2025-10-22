import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import { readFileSync, writeFileSync, existsSync } from "fs";

const app = express();

// ✅ CORS setup
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://cleanpro-frontend-5539254765.europe-west1.run.app",
      /\.github\.dev$/,
    ],
  })
);
app.use(express.json());

// ✅ Headers
app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

// 🔐 Firebase init (base64 safe)
try {
  const key = process.env.FIREBASE_KEY || "{}";
  const creds = JSON.parse(
    key.trim().startsWith("{")
      ? key
      : Buffer.from(key, "base64").toString("utf8")
  );
  if (!admin.apps.length)
    admin.initializeApp({ credential: admin.credential.cert(creds) });
  console.log("✅ Firebase initialized");
} catch (e) {
  console.warn("⚠️ Firebase init skipped:", e.message);
}

// 🚏 Routes
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
app.use("/api/hqs", coordinationPointsApi); // ✅ alias
app.use("/api/services", servicesApi);
app.use("/api/bookings", bookingsApi);
app.use("/api/quotes", quotesApi);
app.use("/api/pricing", pricingApi);
app.use("/api/maps", mapsApi);
app.use("/api/config", configApi);
app.use("/api/gcalendar", gcalendarApi);

// 🩺 Healthcheck
app.get("/", (_, res) =>
  res.send("✅ CleanPro Backend is running on Cloud Run + Local OK")
);

const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`✅ Backend live on port ${PORT}`)
);
