// ~/cleanpro-site/backend/checkPricing.js
import admin from "firebase-admin";
import { readFileSync } from "fs";

const serviceAccount = JSON.parse(
);

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

checkPricing().then(() => process.exit(0));
