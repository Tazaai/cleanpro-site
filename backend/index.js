// =============================================================
// 🧩 CleanPro Backend – Cloud Run Safe Version (Final Fixed)
// =============================================================

import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import { readFileSync, writeFileSync, existsSync } from "fs";

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
      { default: calendarApi },
      { default: coordinationPointsApi },
      { default: servicesApi },
      { default: bookingsApi },
      { default: quotesApi },
      { default: pricingApi },
      { default: mapsApi },
      { default: configApi },
      { default: gcalendarApi },
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
    ]);

    app.use("/api/calendar", calendarApi);
    app.use("/api/coordination_points", coordinationPointsApi);
    app.use("/api/services", servicesApi);
    app.use("/api/bookings", bookingsApi);
    app.use("/api/quotes", quotesApi);
    app.use("/api/pricing", pricingApi);
    app.use("/api/maps", mapsApi);
    app.use("/api/config", configApi);
    app.use("/api/gcalendar", gcalendarApi);

    app.listen(PORT, HOST, () =>
      console.log(`✅ Server listening at http://${HOST}:${PORT}`)
    );
  } catch (err) {
    console.error("❌ Failed to load routes or start server:", err);
    process.exit(1);
  }
})();
