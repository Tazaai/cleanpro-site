import admin from "firebase-admin";
import { readFileSync } from "fs";

// Load service account key
const serviceAccount = JSON.parse(
  readFileSync("/workspaces/cleanpro-site/serviceAccountKey.json", "utf8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function listServices() {
  const snapshot = await db.collection("services").get();
  if (snapshot.empty) {
    console.log("⚠️ No services found in Firestore.");
    process.exit();
  }

  console.log("✅ Services in Firestore:");
  snapshot.forEach((doc) => {
    console.log(doc.id, "=>", doc.data());
  });

  process.exit();
}

listServices();
