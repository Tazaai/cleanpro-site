import admin from "firebase-admin";
import { readFileSync, writeFileSync, existsSync } from "fs";
import express from "express";
import cors from "cors";
import path from "path";

const app = express();

// ✅ Strict CORS – allow only the deployed frontend
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

// ✅ Ensure both Firebase key files exist (for backward compatibility)
const SERVICE_ACCOUNT_PATH = "/app/backend/serviceAccountKey.json";
const FIREBASE_CONFIG_PATH = "/app/firebase_config.json";

try {
  if (!existsSync(SERVICE_ACCOUNT_PATH)) {
    if (!process.env.FIREBASE_KEY) throw new Error("Missing FIREBASE_KEY secret");
    writeFileSync(SERVICE_ACCOUNT_PATH, process.env.FIREBASE_KEY);
    console.log("🗝️ Created serviceAccountKey.json from FIREBASE_KEY");
  }

  if (!existsSync(FIREBASE_CONFIG_PATH)) {
    if (process.env.FIREBASE_KEY) {
      writeFileSync(FIREBASE_CONFIG_PATH, process.env.FIREBASE_KEY);
      console.log("🗝️ Created firebase_config.json from FIREBASE_KEY");
    }
  }
} catch (err) {
  console.error("⚠️ Could not create Firebase config files:", err.message);
}

// ✅ Initialize Firebase Admin
try {
  if (!admin.apps.length) {
    const serviceAccount = JSON.parse(readFileSync(SERVICE_ACCOUNT_PATH, "utf8"));
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log("✅ Firebase Admin initialized");
  }
} catch (err) {
  console.error("⚠️ Firebase init failed:", err.message);
}

// ✅ Import all routers
import calendarApi from "./routes/calendar_api.mjs";
import coordinationPointsRouter from "./routes/coordination_points_api.mjs";
import configApi from "./routes/config_api.mjs";
import mapsApi from "./routes/maps.js";
import servicesApi from "./routes/services_api.mjs";
import bookingApi from "./routes/booking_api.mjs";
import quotesApi from "./routes/quotes_api.mjs";
import pricingApi from "./routes/pricing_api.mjs";

// ✅ Mount routes
app.use("/api/calendar", calendarApi);
app.use("/api/coordination_points", coordinationPointsRouter);
app.use("/api/config", configApi);
app.use("/api/maps", mapsApi);
app.use("/api/services", servicesApi);
app.use("/api/bookings", bookingApi);
app.use("/api/quotes", quotesApi);
app.use("/api/pricing", pricingApi);

// ✅ Health check
app.get("/", (req, res) => {
  res.send("✅ CleanPro Backend is running");
});

// ✅ Start server
app.listen(PORT, HOST, () =>
  console.log(`✅ Server running on port ${PORT}`)
);
