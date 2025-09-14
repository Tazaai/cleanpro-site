// ~/cleanpro-site/backend/syncSheetsToPricing.js
import admin from "firebase-admin";
import { google } from "googleapis";
import { readFileSync } from "fs";

const serviceAccount = JSON.parse(
  readFileSync(new URL("./serviceAccountKey.json", import.meta.url))
);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
const db = admin.firestore();

async function syncSheets() {
  // 🔑 Google Sheets setup
  const auth = new google.auth.GoogleAuth({
    keyFile: "./serviceAccountKey.json",
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
  const sheets = google.sheets({ version: "v4", auth });

  const SPREADSHEET_ID = "19N8xTamJPvXVWVmataLi6Xr54ZmljK3pDR562vMYmxg"; // your sheet ID
  const range = "PricingConfig!A2:F"; // ✅ use correct tab name

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range,
  });

  const rows = res.data.values || [];
  if (rows.length === 0) {
    console.log("❌ No data found in sheet");
    return;
  }

  const services = {};
  let global = {};

  rows.forEach((row) => {
    const [
      service,
      pricePerM2,
      pricePerMile,
      freeMiles,
      weeklyDiscount,
      monthlyDiscount,
    ] = row;

    if (!service) return;

    services[service] = { pricePerM2: Number(pricePerM2) };

    global = {
      pricePerMile: Number(pricePerMile),
      freeMiles: Number(freeMiles),
      weeklyDiscount: Number(weeklyDiscount),
      monthlyDiscount: Number(monthlyDiscount),
    };
  });

  await db.collection("config").doc("pricing").set(
    {
      services,
      ...global,
    },
    { merge: true }
  );

  console.log("✅ Firestore updated from Google Sheets");
}

syncSheets().catch((err) => console.error("❌ Sync error:", err));
