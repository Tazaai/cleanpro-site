import admin from "firebase-admin";
import { readFileSync } from "fs";
try{if(!admin.apps.length){const s=JSON.parse(readFileSync("./backend/serviceAccountKey.json"));admin.initializeApp({credential:admin.credential.cert(s)});console.log("✅ Firebase Admin init");}}catch(e){console.error("⚠️ Firebase init failed:",e.message);}
// ~/cleanpro-site/backend/index.js
import express from "express";
import booking_api from "./routes/booking_api.mjs";
import cors from "cors";

import calendarApi from "./routes/calendar_api.mjs";
import coordinationPointsRouter from "./routes/coordination_points_api.mjs";
import configApi from "./routes/config_api.mjs";
import mapsApi from "./routes/maps.js";
import servicesApi from "./routes/services_api.mjs";
import bookingApi from "./routes/booking_api.mjs";
import quotesApi from "./routes/quotes_api.mjs";
import pricingApi from "./routes/pricing_api.mjs";

const app = express();
app.use(cors());
app.use("/api/bookings", booking_api);
app.use(express.json());
app.use("/api/bookings", booking_api);

// ✅ Routes
app.use("/api/calendar", calendarApi);
app.use("/api/bookings", booking_api);
app.use("/api/coordination_points", coordinationPointsRouter);
app.use("/api/bookings", booking_api);
app.use("/api/config", configApi);
app.use("/api/bookings", booking_api);
app.use("/api/maps", mapsApi);
app.use("/api/bookings", booking_api);
app.use("/api/services", servicesApi);
app.use("/api/bookings", booking_api);
app.use("/api/booking", bookingApi);
app.use("/api/bookings", booking_api);
app.use("/api/quotes", quotesApi);
app.use("/api/bookings", booking_api);
app.use("/api/pricing", pricingApi);
app.use("/api/bookings", booking_api);

// ✅ Health check
app.get("/", (req, res) => {
  res.send("✅ CleanPro Backend is running");
});

// ✅ Start server
const PORT = process.env.PORT || 8080; app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
