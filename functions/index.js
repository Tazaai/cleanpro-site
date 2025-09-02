const { onRequest } = require("firebase-functions/v2/https");
const { onSchedule } = require("firebase-functions/v2/scheduler");
const admin = require("firebase-admin");
const { google } = require("googleapis");

admin.initializeApp();

// ✅ Google Sheets API
const SHEET_ID = "YOUR_GOOGLE_SHEET_ID"; // replace with your sheet ID
const auth = new google.auth.GoogleAuth({
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});
async function updateSheet(range, values) {
  const client = await auth.getClient();
  const sheets = google.sheets({ version: "v4", auth: client });
  await sheets.spreadsheets.values.update({
    spreadsheetId: SHEET_ID,
    range,
    valueInputOption: "RAW",
    requestBody: { values },
  });
}

// ✅ Hello World (Gen2, works on Cloud Run)
exports.helloWorld = onRequest((req, res) => {
  res.json({ ok: true, message: "Hello from Firebase Gen2!" });
});

// ✅ Scheduled Firestore → Sheets Sync
exports.syncFirestoreToSheets = onSchedule("every 5 minutes", async (event) => {
  const db = admin.firestore();

  // --- SERVICES ---
  const servicesSnap = await db.collection("services").get();
  const services = [["ID", "Base Price", "Distance Fee", "Image URL"]];
  servicesSnap.forEach((doc) => {
    const d = doc.data();
    services.push([doc.id, d.basePrice, d.distanceFee, d.imageUrl || ""]);
  });
  await updateSheet("Services!A1", services);

  // --- BOOKINGS ---
  const bookingsSnap = await db.collection("bookings").get();
  const bookings = [["ID", "Name", "Service", "SqM", "Distance", "Price", "Status"]];
  bookingsSnap.forEach((doc) => {
    const d = doc.data();
    bookings.push([
      doc.id,
      d.name,
      d.service,
      d.sqMeters,
      d.distance,
      d.price,
      d.status || "pending",
    ]);
  });
  await updateSheet("Bookings!A1", bookings);

  // --- QUOTATIONS ---
  const quotationsSnap = await db.collection("quotations").get();
  const quotations = [["ID", "Name", "Email", "Details", "Status"]];
  quotationsSnap.forEach((doc) => {
    const d = doc.data();
    quotations.push([
      doc.id,
      d.name,
      d.email,
      d.details,
      d.status || "pending",
    ]);
  });
  await updateSheet("Quotations!A1", quotations);

  console.log("✅ Firestore synced to Google Sheets");
});
