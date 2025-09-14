// ~/cleanpro-site/backend/insert_pricing.js
import admin from "firebase-admin";
import { readFileSync } from "fs";

const serviceAccount = JSON.parse(
  readFileSync(new URL("./serviceAccountKey.json", import.meta.url))
);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
const db = admin.firestore();

async function insertPricing() {
  await db.collection("config").doc("pricing").set(
    {
      services: {
        standard_cleaning: { pricePerM2: 1.5 },
        deep_cleaning: { pricePerM2: 2.5 },
        office_cleaning: { pricePerM2: 2.0 },
      },
      pricePerMile: 2,
      freeMiles: 40,
      weeklyDiscount: 0.1,
      monthlyDiscount: 0.08,
    },
    { merge: true }
  );
  console.log("✅ Pricing config inserted/updated successfully");
}

insertPricing().then(() => process.exit(0));
