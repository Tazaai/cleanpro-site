// ~/cleanpro-site/backend/checkPricing.js
import admin from "firebase-admin";
import { readFileSync } from "fs";

let serviceAccount;
try {
  const raw = process.env.FIREBASE_KEY || "{}";
  const decoded = raw.trim().startsWith("{")
    ? raw
    : Buffer.from(raw, "base64").toString("utf8");
  serviceAccount = JSON.parse(decoded);
} catch (err) {
  console.error("❌ Failed to parse FIREBASE_KEY:", err.message);
  process.exit(1);
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
const db = admin.firestore();

async function checkPricing() {
  const doc = await db.collection("config").doc("pricing").get();
  if (!doc.exists) {
    console.log("❌ No pricing config found");
  } else {
    console.log("✅ Current pricing config:", JSON.stringify(doc.data(), null, 2));
  }
}

checkPricing().then(() => process.exit(0)).catch((e) => {
  console.error("❌ checkPricing failed:", e);
  process.exit(1);
});
