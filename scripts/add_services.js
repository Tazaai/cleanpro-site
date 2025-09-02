import admin from "firebase-admin";
import { readFileSync } from "fs";

const serviceAccount = JSON.parse(
  readFileSync("/workspaces/cleanpro-site/serviceAccountKey.json", "utf8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function addServices() {
  const services = [
    {
      id: "residential",
      title: "Residential Cleaning",
      description: "Professional home cleaning service.",
      imageUrl: "https://firebasestorage.googleapis.com/.../residential.jpg",
    },
    {
      id: "office",
      title: "Office Cleaning",
      description: "Reliable office cleaning service.",
      imageUrl: "https://firebasestorage.googleapis.com/.../office.jpg",
    },
    {
      id: "deep",
      title: "Deep Cleaning",
      description: "Thorough deep cleaning for every corner.",
      imageUrl: "https://firebasestorage.googleapis.com/.../deep.jpg",
    },
    {
      id: "move",
      title: "Move In/Out Cleaning",
      description: "Cleaning for moving in or out.",
      imageUrl: "https://firebasestorage.googleapis.com/.../move.jpg",
    },
  ];

  for (const s of services) {
    await db.collection("services").doc(s.id).set(s);
    console.log(`✅ Added ${s.title}`);
  }

  process.exit();
}

addServices();
