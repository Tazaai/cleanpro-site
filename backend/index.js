// =============================================================
// 🧩 CleanPro Backend – Minimal Working Version
// =============================================================

import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = Number(process.env.PORT || 8080);
const HOST = process.env.HOST || "0.0.0.0";

console.log("🚀 Starting CleanPro Backend (Minimal Working Version)...");
console.log("🌍 Environment:", process.env.NODE_ENV || "development");
console.log("🔧 Port:", PORT);
console.log("🏠 Host:", HOST);

// Health check endpoints
app.get("/", (req, res) => {
  res.json({ 
    ok: true, 
    message: "✅ CleanPro Backend is running (minimal)", 
    timestamp: new Date().toISOString(),
    version: "minimal-working"
  });
});

app.get("/health", (req, res) => {
  res.json({ 
    ok: true, 
    status: "healthy", 
    timestamp: new Date().toISOString()
  });
});

// Basic API test endpoint
app.get("/api/test", (req, res) => {
  res.json({
    ok: true,
    message: "API is working",
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ 
    ok: false, 
    error: "Endpoint not found (minimal version)", 
    path: req.originalUrl 
  });
});

// Start server
try {
  app.listen(PORT, HOST, () => {
    console.log(`✅ Minimal server listening at http://${HOST}:${PORT}`);
    console.log("🎯 Test endpoints:");
    console.log(`   - GET / (health check)`);
    console.log(`   - GET /health (health status)`);
    console.log(`   - GET /api/test (API test)`);
    console.log("🚀 Server is ready for Cloud Run!");
  });
} catch (err) {
  console.error("❌ Failed to start server:", err);
  process.exit(1);
}