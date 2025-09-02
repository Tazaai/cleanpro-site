// /workspaces/cleanpro-site/functions/insert_settings.js
/**
 * Seeds Firestore with default pricing settings
 */

const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function seedSettings() {
  const db = admin.firestore();
  const settingsRef = db.collection("config").doc("settings");

  await settingsRef.set({
    baseRates: {
      standard: 2, // $ per sq.m
      deep: 3, // $ per sq.m
      office: 1.2, // $ per sq.m
    },
    transportFee: {
      threshold: 40, // miles free
      rate: 2, // $ per mile over threshold
    },
    lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
  });

  console.log("✅ Settings inserted/updated successfully");
  process.exit(0);
}

seedSettings().catch((err) => {
  console.error("❌ Error seeding settings:", err);
  process.exit(1);
});
