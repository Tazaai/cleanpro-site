import admin from "firebase-admin";
import { readFileSync } from "fs";

const serviceAccount = JSON.parse(
  readFileSync("/workspaces/cleanpro-site/serviceAccountKey.json", "utf8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Usage: node scripts/update_service.js <id> <field> <value>
async function updateService() {
  const [id, field, value] = process.argv.slice(2);
  if (!id || !field || !value) {
    console.error("❌ Usage: node scripts/update_service.js <id> <field> <value>");
    process.exit(1);
  }

  await db.collection("services").doc(id).update({ [field]: value });
  console.log(`✅ Updated '${field}' of service '${id}' → ${value}`);
  process.exit();
}

updateService();
