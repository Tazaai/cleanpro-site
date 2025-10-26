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

// Import API routes
import bookingsApi from "./routes/bookings_api.mjs";
import authApi from "./routes/auth_api.mjs";
import adminApi from "./routes/admin_api.mjs";
import pricingApi from "./routes/pricing_api.mjs";

console.log("🚀 Starting CleanPro Backend...");
console.log("🌍 Environment:", process.env.NODE_ENV || "development");
console.log("🔧 Port:", PORT);
console.log("🏠 Host:", HOST);
console.log("📅 Deployment:", new Date().toISOString());

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

// Health check endpoints - available immediately
app.get("/", (req, res) => {
  res.json({ 
    ok: true, 
    message: "✅ CleanPro Backend is running", 
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    firebase: firebaseReady
  });
});

app.get("/health", (req, res) => {
  res.json({ 
    ok: true, 
    status: "healthy", 
    timestamp: new Date().toISOString(),
    firebase: firebaseReady
  });
});


// Basic API routes - direct inline to avoid import issues
// Mount API routes
app.use("/api/bookings", bookingsApi);
app.use("/api/auth", authApi);
app.use("/api/admin", adminApi);
app.use("/api/pricing", pricingApi);

// Keep the inline routes for backward compatibility
app.get("/api/calendar", (req, res) => {
  res.json({
    ok: true,
    message: "🗓️ Calendar API is working",
    timestamp: new Date().toISOString(),
    query: req.query
  });
});

app.get("/api/coordination_points", (req, res) => {
  res.json({
    ok: true,
    message: "📍 Coordination Points API is working", 
    timestamp: new Date().toISOString()
  });
});

console.log("✅ API routes mounted successfully");

// 404 handler - MUST be last, before app.listen()
app.use("*", (req, res) => {
  res.status(404).json({ 
    ok: false, 
    error: "Endpoint not found", 
    path: req.originalUrl 
  });
});

// Start server immediately - don't wait for routes
app.listen(PORT, HOST, () => {
  console.log(`✅ Server listening at http://${HOST}:${PORT}`);
  console.log("🚀 CleanPro Backend is ready!");
});
