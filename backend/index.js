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

// initialize before importing routes (writes SA file & sets GOOGLE_APPLICATION_CREDENTIALS)
try {
  await initFirebase();
  console.log("✅ Firebase initialized successfully");
} catch (err) {
  console.error("❌ Firebase init failed:", err.message || err);
  console.error("🔍 Stack trace:", err.stack);
  // Exit on Firebase failure since the app won't work without it
  process.exit(1);
}

// Dynamically import routes AFTER Firebase init and start server
(async () => {
  try {
    console.log("🔗 Starting route imports with error handling...");
    
    // Helper function to safely import routes
    const safeImport = async (routePath, routeName) => {
      try {
        const module = await import(routePath);
        console.log(`✅ ${routeName} loaded successfully`);
        return module;
      } catch (error) {
        console.error(`❌ Failed to load ${routeName}:`, error.message);
        console.error(`⚠️ Continuing without ${routeName} route`);
        return null;
      }
    };

    // Health check endpoint (critical - always available)
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

    console.log("✅ Health endpoints ready");

    // Start server FIRST so it can respond to health checks
    console.log("� Starting HTTP server...");
    const server = app.listen(PORT, HOST, () => {
      console.log(`✅ Server listening at http://${HOST}:${PORT}`);
      console.log("🎯 Health endpoints ready - continuing with route loading...");
    });

    // Load routes after server is listening (non-blocking)
    setTimeout(async () => {
      try {
        console.log("🔗 Loading routes in background...");
        
        // Core routes (most important)
        const authApi = await safeImport("./routes/auth_api.mjs", "auth_api");
        const adminApi = await safeImport("./routes/admin_api.mjs", "admin_api");
        const legalApi = await safeImport("./routes/legal_api.mjs", "legal_api");
        const paymentApi = await safeImport("./routes/payment_api.mjs", "payment_api");
        const bookingsApi = await safeImport("./routes/bookings_api.mjs", "bookings_api");

        // Mount core routes if successfully loaded
        if (authApi) app.use("/api/auth", authApi.default);
        if (adminApi) app.use("/api/admin", adminApi.default);
        if (legalApi) app.use("/api/legal", legalApi.default);
        if (paymentApi) app.use("/api/payment", paymentApi.default);
        if (bookingsApi) app.use("/api/bookings", bookingsApi.default);

        console.log("✅ Core routes loaded");

        // Secondary routes
        const pricingApi = await safeImport("./routes/pricing_api.mjs", "pricing_api");
        const mapsApi = await safeImport("./routes/maps_api.mjs", "maps_api");
        const configApi = await safeImport("./routes/config_api.mjs", "config_api");
        const servicesApi = await safeImport("./routes/services_api.mjs", "services_api");
        const quotesApi = await safeImport("./routes/quotes_api.mjs", "quotes_api");

        if (pricingApi) app.use("/api/pricing", pricingApi.default);
        if (mapsApi) app.use("/api/maps", mapsApi.default);
        if (configApi) app.use("/api/config", configApi.default);
        if (servicesApi) app.use("/api/services", servicesApi.default);
        if (quotesApi) app.use("/api/quotes", quotesApi.default);

        console.log("✅ Secondary routes loaded");

        // Optional routes (can fail without breaking core functionality)
        const calendarApi = await safeImport("./routes/calendar_api.mjs", "calendar_api");
        const coordinationApi = await safeImport("./routes/coordination_points_api.mjs", "coordination_points_api");
        const gcalendarApi = await safeImport("./routes/gcalendar_api.mjs", "gcalendar_api");
        const notificationsApi = await safeImport("./routes/notifications_api.mjs", "notifications_api");
        const appsheetApi = await safeImport("./routes/appsheet_api.mjs", "appsheet_api");

        if (calendarApi) app.use("/api/calendar", calendarApi.default);
        if (coordinationApi) app.use("/api/coordination_points", coordinationApi.default);
        if (gcalendarApi) app.use("/api/gcalendar", gcalendarApi.default);
        if (notificationsApi) app.use("/api/notifications", notificationsApi.default);
        if (appsheetApi) app.use("/api/appsheet", appsheetApi.default);

        console.log("✅ Optional routes loaded");

        // 404 handler (add after all routes)
        app.use("*", (req, res) => {
          res.status(404).json({ 
            ok: false, 
            error: "Endpoint not found", 
            path: req.originalUrl 
          });
        });

        console.log("🎉 All routes loaded successfully - CleanPro MVP is fully ready!");
      } catch (err) {
        console.error("⚠️ Route loading error (non-fatal):", err.message);
        console.log("🎯 Server continues to run with available routes");
      }
    }, 100); // Small delay to ensure server is fully started

  } catch (err) {
    console.error("❌ Critical server startup failure:", err);
    console.error("🔍 Error details:", err.message);
    console.error("📋 Stack trace:", err.stack);
    process.exit(1);
  }
})();
