import admin from "firebase-admin";
import { readFileSync } from "fs";
import express from "express";
import cors from "cors";

const app = express();

// ✅ Allow frontend domain only (CORS fix)
app.use(
  cors({
    origin: ["https://cleanpro-frontend-5539254765.europe-west1.run.app"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());
const HOST = "0.0.0.0";

// ✅ Firebase init
try {
  if (!admin.apps.length) {
    // ✅ Corrected path for Cloud Run
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
const PORT = process.env.PORT || 8080;
app.listen(PORT, HOST, () => console.log(`✅ Server running on port ${PORT}`));
