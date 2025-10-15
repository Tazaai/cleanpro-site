import express from "express";
const app = express();
app.get("/", (_req, res) => res.send("✅ CleanPro Backend is running"));
app.listen(process.env.PORT || 8080, "0.0.0.0", () =>
  console.log(`✅ Server on port ${process.env.PORT || 8080}`)
);
