// ~/cleanpro-site/backend/index.js
import express from "express";
import cors from "cors";

import calendarRouter from "./routes/calendar_api.mjs";
import coordinationPointsRouter from "./routes/coordination_points_api.mjs";
import configRouter from "./routes/config_api.mjs";
import mapsRouter from "./routes/maps.js";
import servicesRouter from "./routes/services_api.mjs";
import bookingsRouter from "./routes/bookings_api.mjs";
import quotesRouter from "./routes/quotes_api.mjs";
import pricingRouter from "./routes/pricing_api.mjs";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/api/calendar", calendarRouter);
app.use("/api/coordination_points", coordinationPointsRouter);
app.use("/api/config", configRouter);
app.use("/api/maps", mapsRouter);
app.use("/api/services", servicesRouter);
app.use("/api/bookings", bookingsRouter);
app.use("/api/quotes", quotesRouter);
app.use("/api/pricing", pricingRouter);

// ✅ Health check
app.get("/", (req, res) => {
  res.send("✅ CleanPro Backend is running");
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(500).json({ ok: false, error: "Internal Server Error" });
});

// ✅ Start server (Cloud Run compatible)
const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ CleanPro backend running on port ${PORT}`);
});
