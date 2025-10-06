// ~/cleanpro-site/backend/routes/pricing_api.mjs
import express from "express";
const router = express.Router();

// Example pricing per m²
const pricing = {
  residential_cleaning: { pricePerM2: 1.8, weeklyDiscount: 0.1, monthlyDiscount: 0.05 },
  deep_cleaning: { pricePerM2: 2.5, weeklyDiscount: 0.15, monthlyDiscount: 0.08 },
  office_cleaning: { pricePerM2: 2.0, weeklyDiscount: 0.12, monthlyDiscount: 0.07 },
  move_inout_cleaning: { pricePerM2: 3.0, weeklyDiscount: 0.18, monthlyDiscount: 0.1 },
};

// GET /api/pricing
router.get("/", (req, res) => {
  res.json({ ok: true, pricing });
});

export default router;
