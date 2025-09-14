// ~/backend/seedCapacity.mjs
import admin from "firebase-admin";
import { readFileSync } from "fs";

if (!admin.apps.length) {
  const serviceAccount = JSON.parse(
    readFileSync(new URL("./serviceAccountKey.json", import.meta.url))
  );

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

async function seedCapacity() {
  try {
    await db.collection("config").doc("capacity").set({
      AM: 3,
      PM: 3,
    });
    console.log("✅ Capacity seeded: AM=3, PM=3");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding capacity:", err);
    process.exit(1);
  }
}

seedCapacity();
