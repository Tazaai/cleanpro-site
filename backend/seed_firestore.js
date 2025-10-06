import { db } from "./firebase.js";

const run = async () => {
  await db.collection("config").doc("pricing").set({
    freeMiles: 40,
    maxDistance: 120,
    loyaltyDiscount: 0.025
  });

  await db.collection("bookings").add({
    clientName: "Demo User",
    address: "Los Angeles, CA",
    service: "residential_cleaning",
    area: 120,
    date: "2025-09-22",
    price: 250,
    distance: 10
  });

  console.log("✅ Seeded config/pricing and a booking");
  process.exit(0);
};

run();
