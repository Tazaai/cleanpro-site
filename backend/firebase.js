import admin from "firebase-admin";
import { readFileSync, writeFileSync, existsSync } from "fs";

const SA_PATH = process.env.FIREBASE_SA_PATH || "/tmp/firebase_service_account.json";
let initialized = false;

export async function initFirebase() {
  if (initialized) return;
  if (process.env.FIREBASE_KEY) {
    const raw = process.env.FIREBASE_KEY.trim().startsWith("{")
      ? process.env.FIREBASE_KEY
      : Buffer.from(process.env.FIREBASE_KEY, "base64").toString("utf8");
    try {
      if (!existsSync(SA_PATH) || readFileSync(SA_PATH, "utf8") !== raw) {
        writeFileSync(SA_PATH, raw, { mode: 0o600 });
      }
      process.env.GOOGLE_APPLICATION_CREDENTIALS = SA_PATH;
    } catch (e) {
      console.error("❌ Failed to write service account file:", e.message || e);
      throw e;
    }

    let creds;
    try {
      creds = JSON.parse(raw);
    } catch (e) {
      console.error("❌ FIREBASE_KEY JSON parse failed:", e.message || e);
      throw e;
    }

    if (!admin.apps.length) {
      admin.initializeApp({ credential: admin.credential.cert(creds) });
    }
  } else if (!admin.apps.length) {
    // fallback to ADC (metadata or GOOGLE_APPLICATION_CREDENTIALS path)
    admin.initializeApp();
  }
  initialized = true;
}

export function getAdmin() {
  if (!admin.apps.length) throw new Error("Firebase not initialized");
  return admin;
}

export function getDb() {
  return getAdmin().firestore();
}
