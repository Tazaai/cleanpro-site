import http from "http"; const PORT = process.env.PORT || 8080;
const PORT = process.env.PORT || 8080;
// /workspaces/cleanpro-site/backend/index.js
import admin from "firebase-admin";
import { readFileSync } from "fs";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Define PORT first — fixes ReferenceError
const PORT = process.env.PORT || 8080;
const HOST = "0.0.0.0";

// ✅ Firebase init
try {
  if (!admin.apps.length) {
    // Correct path for Cloud Run build root (/app/backend)
    const serviceAccount = JSON.parse(readFileSync("./serviceAccountKey.json"));
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log("✅ Firebase Admin initialized");
  }
} catch (err) {
  console.error("⚠️ Firebase init failed:", err.message);
}

// ✅ Routers
import calendarApi from "./routes/calendar_api.mjs";
import coordinationPointsRouter from "./routes/coordination_points_api.mjs";
import configApi from "./routes/config_api.mjs";
import mapsApi from "./routes/maps.js";
import servicesApi from "./routes/services_api.mjs";
import bookingApi from "./routes/booking_api.mjs";
import quotesApi from "./routes/quotes_api.mjs";
import pricingApi from "./routes/pricing_api.mjs";

// ✅ Routes
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
app.listen(PORT, HOST, () => {
  console.log(`✅ Server running on http://${HOST}:${PORT}`);
});
