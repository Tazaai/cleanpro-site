// ~/backend/seedCapacity.js
import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
  });
}
const db = admin.firestore();

async function seedCapacity() {
  try {
    await db.collection("config").doc("capacity").set({
      AM: 3, // allow up to 3 morning bookings
      PM: 3, // allow up to 3 afternoon bookings
    });
    console.log("✅ Capacity seeded: AM=3, PM=3");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding capacity:", err);
    process.exit(1);
  }
}

seedCapacity();
