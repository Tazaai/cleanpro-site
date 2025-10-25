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

// Test route first
import testApi from "./routes/test_api.mjs";
app.use("/api/test", testApi);

// Load critical routes after server start
setTimeout(async () => {
  try {
    console.log("🔄 Loading calendar route...");
    const { default: calendarApi } = await import("./routes/calendar_api.mjs");
    app.use("/api/calendar", calendarApi);
    console.log("✅ Calendar route mounted");
  } catch (err) {
    console.error("❌ Failed to load calendar route:", err.message);
  }

  try {
    console.log("🔄 Loading coordination points route...");
    const { default: coordinationPointsApi } = await import("./routes/coordination_points_api.mjs");
    app.use("/api/coordination_points", coordinationPointsApi);
    console.log("✅ Coordination points route mounted");
  } catch (err) {
    console.error("❌ Failed to load coordination points route:", err.message);
  }
}, 1000);

console.log("✅ Initial routes mounted, additional routes loading...");

// 404 handler - add after routes
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
