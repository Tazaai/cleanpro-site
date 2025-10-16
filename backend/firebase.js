import { writeFileSync, existsSync } from "fs";
if (!existsSync("./backend/firebase_config.json")) writeFileSync("./backend/firebase_config.json", process.env.FIREBASE_KEY || "{}");

// =============================================================
// 🧩 CleanPro Backend – Firebase Init (Cloud Run Safe Version)
// =============================================================

import admin from "firebase-admin";
import fs from "fs";

let serviceAccount;

try {
  // ✅ Use relative backend path so Cloud Run finds the file
  serviceAccount = JSON.parse(
    fs.readFileSync("./backend/firebase_config.json", "utf8")
  );
  console.log("🔥 Firebase config loaded successfully");
} catch (err) {
  console.error("❌ Failed to load Firebase service account:", err);
  process.exit(1);
}

try {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log("✅ Firebase Admin initialized");
  }
} catch (e) {
  console.error("⚠️ Firebase init error:", e.message);
}

export const db = admin.firestore();
