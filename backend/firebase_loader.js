import fs from "fs";
import path from "path";
import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

export const getFirebaseConfig = () => {
  const configPath = path.resolve("/app/firebase_config.json");
  if (fs.existsSync(configPath)) {
    return JSON.parse(fs.readFileSync(configPath, "utf8"));
  } else if (process.env.FIREBASE_KEY) {
    return JSON.parse(process.env.FIREBASE_KEY);
  } else {
    console.error("⚠️ No Firebase config found.");
    return null;
  }
};

// Centralized Firestore access function
export const getDb = () => {
  if (!admin.apps.length) {
    throw new Error("Firebase not initialized - please ensure Firebase is initialized before calling getDb()");
  }
  return getFirestore();
};
