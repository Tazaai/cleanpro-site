// ~/cleanpro-site/backend/firebase.js
import admin from "firebase-admin";
import fs from "fs";

let serviceAccount;
try {
  serviceAccount = JSON.parse(
    fs.readFileSync("/app/firebase_config.json")
  );
} catch (err) {
  console.error("❌ Failed to load Firebase service account:", err);
  process.exit(1);
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

export const db = admin.firestore();
