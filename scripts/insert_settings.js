// ~/cleanpro-site/scripts/insert_services.js
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { firebaseConfig } from "../frontend/src/firebase.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function insertServices() {
  const services = {
    standard_cleaning: { name: "Standard Cleaning", pricePerSqm: 1.0 },
    deep_cleaning: { name: "Deep Cleaning", pricePerSqm: 2.5 },
    move_in_out_cleaning: { name: "Move In/Out Cleaning", pricePerSqm: 3.0 },
    office_cleaning: { name: "Office Cleaning", pricePerSqm: 1.5 },
    residential_cleaning: { name: "Residential Cleaning", pricePerSqm: 2.0 },
  };

  for (const [id, data] of Object.entries(services)) {
    await setDoc(doc(db, "services", id), data);
  }

  console.log("✅ Services inserted");
}

insertServices();
