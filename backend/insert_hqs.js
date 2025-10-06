import { db } from "./firebase.js";

async function seedHQs() {
  const docs = [
    {
      id: "hq1",
      name: "Main HQ",
      address: "123 Main Street",
      phone: "+1 555 1234"
    },
    {
      id: "hq2",
      name: "West HQ",
      address: "456 West Road",
      phone: "+1 555 5678"
    }
  ];

  for (const hq of docs) {
    await db.collection("coordination_points").doc(hq.id).set(hq);
    console.log(`✅ Inserted HQ: ${hq.id}`);
  }

  process.exit(0);
}

seedHQs().catch(err => {
  console.error("❌ Failed:", err);
  process.exit(1);
});
