// ~/cleanpro-site/backend/index.js
import express from "express";
import cors from "cors";

import calendarApi from "./routes/calendar_api.mjs";
import configApi from "./routes/config_api.mjs";
import mapsApi from "./routes/maps.js";
import servicesApi from "./routes/services_api.mjs";
import bookingApi from "./routes/booking_api.mjs";
import quotesApi from "./routes/quotes_api.mjs";
import pricingApi from "./routes/pricing_api.mjs";

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/calendar", calendarApi);
app.use("/api/config", configApi);
app.use("/api/maps", mapsApi);
app.use("/api/services", servicesApi);
app.use("/api/booking", bookingApi);
app.use("/api/quotes", quotesApi);
app.use("/api/pricing", pricingApi);

// Health check
app.get("/", (req, res) => {
  res.send("✅ CleanPro Backend is running");
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
