import admin from "firebase-admin";
import { readFileSync, writeFileSync, existsSync } from "fs";

const SA_PATH = process.env.FIREBASE_SA_PATH || "/tmp/firebase_service_account.json";
let initialized = false;

export async function initFirebase() {
  if (initialized) return;
  
  console.log("🔧 Initializing Firebase...");
  
  if (process.env.FIREBASE_KEY) {
    console.log("📄 FIREBASE_KEY found, processing...");
    
    let raw;
    try {
      // Check if it's already JSON or base64 encoded
      if (process.env.FIREBASE_KEY.trim().startsWith("{")) {
        console.log("📋 FIREBASE_KEY appears to be JSON format");
        raw = process.env.FIREBASE_KEY.trim();
      } else {
        console.log("🔓 FIREBASE_KEY appears to be base64 encoded, decoding...");
        raw = Buffer.from(process.env.FIREBASE_KEY, "base64").toString("utf8");
        console.log("✅ Base64 decode successful");
      }
    } catch (e) {
      console.error("❌ Failed to process FIREBASE_KEY:", e.message || e);
      throw e;
    }

    // Validate JSON structure before writing file
    let creds;
    try {
      creds = JSON.parse(raw);
      console.log("✅ Firebase credentials JSON validated");
      
      // Check for required fields
      if (!creds.type || !creds.project_id || !creds.private_key_id) {
        throw new Error("Invalid Firebase service account - missing required fields");
      }
    } catch (e) {
      console.error("❌ FIREBASE_KEY JSON parse failed:", e.message || e);
      console.error("🔍 Raw key preview:", raw.substring(0, 100) + "...");
      throw e;
    }

    // Write service account file
    try {
      if (!existsSync(SA_PATH) || readFileSync(SA_PATH, "utf8") !== raw) {
        writeFileSync(SA_PATH, raw, { mode: 0o600 });
        console.log("📝 Firebase service account file written to:", SA_PATH);
      }
      process.env.GOOGLE_APPLICATION_CREDENTIALS = SA_PATH;
    } catch (e) {
      console.error("❌ Failed to write service account file:", e.message || e);
      throw e;
    }

    // Initialize Firebase Admin
    try {
      if (!admin.apps.length) {
        admin.initializeApp({ credential: admin.credential.cert(creds) });
        console.log("🚀 Firebase Admin initialized successfully");
      }
    } catch (e) {
      console.error("❌ Failed to initialize Firebase Admin:", e.message || e);
      throw e;
    }
  } else if (!admin.apps.length) {
    console.log("🔄 No FIREBASE_KEY found, using Application Default Credentials");
    try {
      admin.initializeApp();
      console.log("🚀 Firebase Admin initialized with ADC");
    } catch (e) {
      console.error("❌ Failed to initialize Firebase with ADC:", e.message || e);
      throw e;
    }
  }
  
  initialized = true;
  console.log("✅ Firebase initialization complete");
}

export function getAdmin() {
  if (!admin.apps.length) throw new Error("Firebase not initialized");
  return admin;
}

export function getDb() {
  return getAdmin().firestore();
}
