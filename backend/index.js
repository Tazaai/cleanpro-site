// =============================================================
// 🧩 CleanPro Backend – Cloud Run Safe Version (Final Fixed)
// =============================================================

import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import { readFileSync, writeFileSync, existsSync } from "fs";

// ensure app exists and listens on Cloud Run PORT
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = Number(process.env.PORT || 8080);
const HOST = process.env.HOST || "0.0.0.0";

// ensure FIREBASE_KEY is materialized to a file so Google libs don't treat JSON as a path
const SA_PATH = process.env.FIREBASE_SA_PATH || "/tmp/firebase_service_account.json";
if (process.env.FIREBASE_KEY) {
  const raw = process.env.FIREBASE_KEY.trim().startsWith("{")
    ? process.env.FIREBASE_KEY
    : Buffer.from(process.env.FIREBASE_KEY, "base64").toString("utf8");
  // write file if missing or contents differ
  try {
    if (!existsSync(SA_PATH) || readFileSync(SA_PATH, "utf8") !== raw) {
      writeFileSync(SA_PATH, raw, { mode: 0o600 });
    }
    process.env.GOOGLE_APPLICATION_CREDENTIALS = SA_PATH;
  } catch (e) {
    console.error("❌ Failed to write service account file:", e.message);
  }
}

// Replace inline FIREBASE_KEY materialization + duplicate initializeApp calls
import { initFirebase } from "./firebase.js";

// initialize before importing routes (writes SA file & sets GOOGLE_APPLICATION_CREDENTIALS)
await initFirebase().catch((err) => {
  console.error("❌ Firebase init failed:", err.message || err);
  // continue — routes use lazy DB getters that will error if init truly failed
});

// Dynamically import routes AFTER Firebase init and start server
(async () => {
  try {
    const [
      calendarApiModule,
      coordinationPointsApiModule,
      servicesApiModule,
      bookingsApiModule,
      quotesApiModule,
      pricingApiModule,
      mapsApiModule,
      configApiModule,
      gcalendarApiModule,
      paymentApiModule,
      authApiModule,
      adminApiModule,
      legalApiModule,
      notificationsApiModule,
      appsheetApiModule
    ] = await Promise.all([
      import("./routes/calendar_api.mjs"),
      import("./routes/coordination_points_api.mjs"),
      import("./routes/services_api.mjs"),
      import("./routes/bookings_api.mjs"),
      import("./routes/quotes_api.mjs"),
      import("./routes/pricing_api.mjs"),
      import("./routes/maps_api.mjs"),
      import("./routes/config_api.mjs"),
      import("./routes/gcalendar_api.mjs"),
      import("./routes/payment_api.mjs"),
      import("./routes/auth_api.mjs"),
      import("./routes/admin_api.mjs"),
      import("./routes/legal_api.mjs"),
      import("./routes/notifications_api.mjs"),
      import("./routes/appsheet_api.mjs")
    ]);

    // Health check endpoint
    app.get("/", (req, res) => {
      res.json({ 
        ok: true, 
        message: "✅ CleanPro Backend is running", 
        timestamp: new Date().toISOString(),
        version: "1.0.0"
      });
    });

    app.get("/health", (req, res) => {
      res.json({ 
        ok: true, 
        status: "healthy", 
        timestamp: new Date().toISOString()
      });
    });

    // API routes
    app.use("/api/auth", authApiModule.default);
    app.use("/api/admin", adminApiModule.default);
    app.use("/api/legal", legalApiModule.default);
    app.use("/api/notifications", notificationsApiModule.default);
    app.use("/api/appsheet", appsheetApiModule.default);
    app.use("/api/calendar", calendarApiModule.default);
    app.use("/api/coordination_points", coordinationPointsApiModule.default);
    app.use("/api/services", servicesApiModule.default);
    app.use("/api/bookings", bookingsApiModule.default);
    app.use("/api/quotes", quotesApiModule.default);
    app.use("/api/pricing", pricingApiModule.default);
    app.use("/api/maps", mapsApiModule.default);
    app.use("/api/config", configApiModule.default);
    app.use("/api/gcalendar", gcalendarApiModule.default);
    app.use("/api/payment", paymentApiModule.default);

    // 404 handler
    app.use("*", (req, res) => {
      res.status(404).json({ 
        ok: false, 
        error: "Endpoint not found", 
        path: req.originalUrl 
      });
    });

    app.listen(PORT, HOST, () =>
      console.log(`✅ Server listening at http://${HOST}:${PORT}`)
    );
  } catch (err) {
    console.error("❌ Failed to load routes or start server:", err);
    process.exit(1);
  }
})();
