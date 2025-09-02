// /workspaces/cleanpro-site/seed_services.js
import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "./serviceAccountKey.json" assert { type: "json" };

initializeApp({
  credential: applicationDefault(),
});

const db = getFirestore();

async function seedServices() {
  const services = [
    {
      id: "standard_cleaning",
      name: "Standard Cleaning",
      basePrice: 10,
      distanceFee: 2,
    },
    {
      id: "deep_cleaning",
      name: "Deep Cleaning",
      basePrice: 15,
      distanceFee: 3,
    },
    {
      id: "office_cleaning",
      name: "Office Cleaning",
      basePrice: 12,
      distanceFee: 2.5,
    },
  ];

  for (const svc of services) {
    await db.collection("services").doc(svc.id).set(svc, { merge: true });
    console.log(`✅ Seeded: ${svc.name}`);
  }

  console.log("🎯 All services seeded.");
}

seedServices().catch(console.error);
