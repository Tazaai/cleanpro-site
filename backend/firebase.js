import { writeFileSync, existsSync, readFileSync } from "fs";
import admin from "firebase-admin";

// ✅ Ensure config file exists (for Cloud Run)
const CONFIG_PATH = "./firebase_config.json";
if (!existsSync(CONFIG_PATH))
  writeFileSync(CONFIG_PATH, process.env.FIREBASE_KEY || "{}");

// =============================================================
// 🧩 CleanPro Backend – Firebase Init (Cloud Run Safe Version)
// =============================================================
try {
  const serviceAccount = JSON.parse(readFileSync(CONFIG_PATH, "utf8"));
  if (!admin.apps.length) {
    admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
    console.log("✅ Firebase Admin initialized");
  }
} catch (err) {
  console.error("❌ Firebase init error:", err.message);
}

export const db = admin.firestore();
