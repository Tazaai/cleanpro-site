// =============================================================
// 🧩 CleanPro Backend – Cloud Run Safe Version (Final Fixed)
// =============================================================

import express from "express";
import cors from "cors";

// ensure app exists and listens on Cloud Run PORT
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = Number(process.env.PORT || 8080);
const HOST = process.env.HOST || "0.0.0.0";

// Initialize Firebase before importing routes
import { initFirebase } from "./firebase.js";

console.log("🚀 Starting CleanPro Backend...");
console.log("🌍 Environment:", process.env.NODE_ENV || "development");
console.log("🔧 Port:", PORT);
console.log("🏠 Host:", HOST);

// Initialize Firebase in background - don't block server startup
let firebaseReady = false;
initFirebase()
  .then(() => {
    console.log("✅ Firebase initialized successfully");
    firebaseReady = true;
  })
  .catch((err) => {
    console.error("❌ Firebase init failed:", err.message || err);
    console.warn("⚠️ Server will continue without Firebase - some features may not work");
    firebaseReady = false;
  });

// Start server immediately - don't wait for routes
app.listen(PORT, HOST, () => {
  console.log(`✅ Server listening at http://${HOST}:${PORT}`);
  console.log("🚀 CleanPro Backend is ready!");
});

// Load routes in background after server starts
(async () => {
  try {
    console.log("🔄 Loading API routes...");
    
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
        version: "1.0.0",
        firebase: firebaseReady,
        routes: "loaded"
      });
    });

    app.get("/health", (req, res) => {
      res.json({ 
        ok: true, 
        status: "healthy", 
        timestamp: new Date().toISOString(),
        firebase: firebaseReady,
        routes: "loaded"
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

    console.log("✅ All API routes loaded successfully");

    // 404 handler - add after routes are loaded
    app.use("*", (req, res) => {
      res.status(404).json({ 
        ok: false, 
        error: "Endpoint not found", 
        path: req.originalUrl 
      });
    });

  } catch (err) {
    console.error("❌ Failed to load routes:", err.message || err);
    console.error("🔍 Stack trace:", err.stack);
    // Don't exit - server can still serve basic endpoints
  }
})();
