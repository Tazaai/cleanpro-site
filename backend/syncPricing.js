// ~/cleanpro-site/backend/syncPricing.js
import admin from "firebase-admin";
import { google } from "googleapis";
import { readFileSync } from "fs";

const serviceAccount = JSON.parse(
);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
const db = admin.firestore();

const SPREADSHEET_ID = "19N8xTamJPvXVWVmataLi6Xr54ZmljK3pDR562vMYmxg"; // your sheet
const RANGE = "PricingConfig!A2:F";

// 🔑 Google Sheets auth
function getSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    keyFile: "./serviceAccountKey.json",
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return google.sheets({ version: "v4", auth });
}

// ⬆️ Firestore → Sheets
async function pushToSheets() {
  const doc = await db.collection("config").doc("pricing").get();
  if (!doc.exists) throw new Error("❌ No pricing config found");

  const data = doc.data();

  const rows = Object.entries(data.services).map(([service, cfg]) => [
    service,
    cfg.pricePerM2,
    data.pricePerMile,
    data.freeMiles,
    data.weeklyDiscount,
    data.monthlyDiscount,
  ]);

  const sheets = getSheetsClient();
  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range: RANGE,
    valueInputOption: "RAW",
    requestBody: { values: rows },
  });

  console.log("✅ Firestore → Sheets sync complete");
}

// ⬇️ Sheets → Firestore
async function pullFromSheets() {
  const sheets = getSheetsClient();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: RANGE,
  });

  const rows = res.data.values || [];
  if (!rows.length) throw new Error("❌ No data found in sheet");

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

    services[service] = { pricePerM2: Number((pricePerM2 || "0").toString().replace(",", ".")) };

    global = {
      pricePerMile: Number((pricePerMile || "0").toString().replace(",", ".")),
      freeMiles: Number((freeMiles || "0").toString().replace(",", ".")),
      weeklyDiscount: Number((weeklyDiscount || "0").toString().replace(",", ".")),
      monthlyDiscount: Number((monthlyDiscount || "0").toString().replace(",", ".")),
    };
  });

  await db.collection("config").doc("pricing").set(
    {
      services,
      ...global,
    },
    { merge: true }
  );

  console.log("✅ Sheets → Firestore sync complete");
}

// Run both (first pull from Sheets, then push back for alignment)
async function syncBoth() {
  await pullFromSheets();
  await pushToSheets();
}

syncBoth().catch((err) => console.error("❌ Sync error:", err));
