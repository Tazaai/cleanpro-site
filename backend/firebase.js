import admin from "firebase-admin";
import { readFileSync, writeFileSync, existsSync } from "fs";

const SA_PATH = process.env.FIREBASE_SA_PATH || "/tmp/firebase_service_account.json";
let initialized = false;

export async function initFirebase() {
  if (initialized) return;
  
  console.log("🔧 Initializing Firebase...");
  
  // Check for Firebase key in different formats
  let firebaseKey = process.env.FIREBASE_KEY || process.env.FIREBASE_KEY_B64;
  
  if (firebaseKey) {
    console.log("📄 Firebase credentials found, processing...");
    
    let raw;
    try {
      // Check if it's already JSON or base64 encoded
      if (firebaseKey.trim().startsWith("{")) {
        console.log("📋 Firebase key appears to be JSON format");
        raw = firebaseKey.trim();
      } else {
        console.log("🔓 Firebase key appears to be base64 encoded, decoding...");
        raw = Buffer.from(firebaseKey, "base64").toString("utf8");
        console.log("✅ Base64 decode successful");
      }
    } catch (e) {
      console.error("❌ Failed to process Firebase key:", e.message || e);
      throw e;
    }

    // Validate JSON structure before writing file
    let creds;
    try {
      // Clean the raw string first
      const cleanRaw = raw.trim().replace(/[\r\n\t]/g, '');
      console.log("🔍 Attempting to parse Firebase JSON...");
      console.log("📊 JSON length:", cleanRaw.length);
      console.log("🔎 JSON starts with:", cleanRaw.substring(0, 50));
      console.log("🔚 JSON ends with:", cleanRaw.substring(cleanRaw.length - 50));
      
      creds = JSON.parse(cleanRaw);
      console.log("✅ Firebase credentials JSON validated");
      
      // Check for required fields
      if (!creds.type || !creds.project_id || !creds.private_key_id) {
        throw new Error("Invalid Firebase service account - missing required fields");
      }
    } catch (e) {
      console.error("❌ Firebase key JSON parse failed:", e.message || e);
      console.error("🔍 Raw key sample (first 200 chars):", raw.substring(0, 200));
      console.error("🔍 Raw key sample (last 200 chars):", raw.substring(Math.max(0, raw.length - 200)));
      
      // Try to fix common JSON issues
      console.log("🔧 Attempting to fix common JSON issues...");
      try {
        let fixedRaw = raw.trim()
          .replace(/[\r\n\t]/g, '')
          .replace(/\s+/g, ' ')
          .replace(/,\s*}/g, '}')
          .replace(/,\s*]/g, ']');
        
        creds = JSON.parse(fixedRaw);
        console.log("✅ Fixed JSON parse successful!");
        raw = fixedRaw; // Use the fixed version
      } catch (fixError) {
        console.error("❌ JSON fix attempt failed:", fixError.message);
        console.error("🚫 INVALID FIREBASE CREDENTIALS - DEPLOYMENT BLOCKED");
        console.error("📋 Fix the JSON format in GitHub repository settings");
        throw new Error("Firebase credentials validation failed - invalid JSON format");
      }
    }

    // Initialize Firebase Admin with credentials object directly
    try {
      if (!admin.apps.length) {
        // Use credential object directly instead of relying on environment file
        admin.initializeApp({ 
          credential: admin.credential.cert(creds),
          projectId: creds.project_id 
        });
        console.log("🚀 Firebase Admin initialized with credentials object");
      }
    } catch (e) {
      console.error("❌ Failed to initialize Firebase Admin:", e.message || e);
      throw e;
    }
    
    // Don't set GOOGLE_APPLICATION_CREDENTIALS to avoid conflicts
    // The admin.credential.cert(creds) approach is more reliable
    console.log("✅ Skipping GOOGLE_APPLICATION_CREDENTIALS file path to prevent conflicts");
  } else if (!admin.apps.length) {
    console.log("🔄 No Firebase credentials found, using Application Default Credentials");
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
  if (!admin.apps.length) {
    console.warn("⚠️ Firebase not initialized, attempting initialization...");
    try {
      // Try to initialize if not already done
      if (!initialized) {
        throw new Error("Firebase initialization required");
      }
      throw new Error("Firebase not initialized");
    } catch (e) {
      throw new Error("Firebase not initialized");
    }
  }
  return admin;
}

export function getDb() {
  return getAdmin().firestore();
}
