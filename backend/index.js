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
    console.log("🔗 Starting route imports...");
    
    // Import routes in smaller batches to reduce memory pressure
    const batch1 = await Promise.all([
      import("./routes/auth_api.mjs"),
      import("./routes/admin_api.mjs"),
      import("./routes/legal_api.mjs"),
      import("./routes/payment_api.mjs"),
      import("./routes/bookings_api.mjs")
    ]);
    console.log("✅ Batch 1 routes loaded (auth, admin, legal, payment, bookings)");

    const batch2 = await Promise.all([
      import("./routes/pricing_api.mjs"),
      import("./routes/maps_api.mjs"),
      import("./routes/config_api.mjs"),
      import("./routes/services_api.mjs"),
      import("./routes/quotes_api.mjs")
    ]);
    console.log("✅ Batch 2 routes loaded (pricing, maps, config, services, quotes)");

    const batch3 = await Promise.all([
      import("./routes/calendar_api.mjs"),
      import("./routes/coordination_points_api.mjs"),
      import("./routes/gcalendar_api.mjs"),
      import("./routes/notifications_api.mjs"),
      import("./routes/appsheet_api.mjs")
    ]);
    console.log("✅ Batch 3 routes loaded (calendar, coordination, gcalendar, notifications, appsheet)");

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

    console.log("🔗 Mounting routes...");
    
    // API routes (use batch1 array)
    app.use("/api/auth", batch1[0].default);
    app.use("/api/admin", batch1[1].default);
    app.use("/api/legal", batch1[2].default);
    app.use("/api/payment", batch1[3].default);
    app.use("/api/bookings", batch1[4].default);
    
    // Batch 2 routes
    app.use("/api/pricing", batch2[0].default);
    app.use("/api/maps", batch2[1].default);
    app.use("/api/config", batch2[2].default);
    app.use("/api/services", batch2[3].default);
    app.use("/api/quotes", batch2[4].default);
    
    // Batch 3 routes
    app.use("/api/calendar", batch3[0].default);
    app.use("/api/coordination_points", batch3[1].default);
    app.use("/api/gcalendar", batch3[2].default);
    app.use("/api/notifications", batch3[3].default);
    app.use("/api/appsheet", batch3[4].default);

    console.log("✅ All routes mounted successfully");

    // 404 handler
    app.use("*", (req, res) => {
      res.status(404).json({ 
        ok: false, 
        error: "Endpoint not found", 
        path: req.originalUrl 
      });
    });

    console.log("🚀 Starting HTTP server...");
    app.listen(PORT, HOST, () => {
      console.log(`✅ Server listening at http://${HOST}:${PORT}`);
      console.log("🎯 All systems ready - CleanPro MVP is live!");
    });
  } catch (err) {
    console.error("❌ Failed to load routes or start server:", err);
    console.error("🔍 Error details:", err.message);
    console.error("📋 Stack trace:", err.stack);
    process.exit(1);
  }
})();
