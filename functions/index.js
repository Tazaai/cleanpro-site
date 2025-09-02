const { onRequest } = require("firebase-functions/v2/https");
const { onSchedule } = require("firebase-functions/v2/scheduler");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { google } = require("googleapis");

// 🔑 Load service account from Firebase config
const serviceAccountBase64 = functions.config().serviceaccount.key;
const serviceAccount = JSON.parse(
  Buffer.from(serviceAccountBase64, "base64").toString("utf8")
);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

// ✅ Hello World (for quick test)
exports.helloWorld = onRequest((req, res) => {
  res.status(200).json({ ok: true, message: "Hello from Firebase Gen2!" });
});

// ✅ Google Sheets helper
const SHEET_ID = "YOUR_GOOGLE_SHEET_ID"; // replace with real ID
async function updateSheet(range, values) {
  const auth = new google.auth.GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const client = await auth.getClient();
  const sheets = google.sheets({ version: "v4", auth: client });
  await sheets.spreadsheets.values.update({
    spreadsheetId: SHEET_ID,
    range,
    valueInputOption: "RAW",
    requestBody: { values },
  });
}

// ✅ Firestore → Sheets Sync (every 5 min)
exports.syncFirestoreToSheets = onSchedule("every 5 minutes", async () => {
  // --- BOOKINGS ---
  const bookingsSnap = await db.collection("bookings").get();
  const bookings = [["ID", "Name", "Service", "SqM", "Distance", "Price", "Status"]];
  bookingsSnap.forEach((doc) => {
    const d = doc.data();
    bookings.push([
      doc.id,
      d.name || "",
      d.service || "",
      d.sqMeters || "",
      d.distance || "",
      d.price || "",
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
      d.name || "",
      d.email || "",
      d.details || "",
      d.status || "pending",
    ]);
  });
  await updateSheet("Quotations!A1", quotations);

  console.log("✅ Firestore synced to Google Sheets");
});
