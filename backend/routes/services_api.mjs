// ~/cleanpro-site/backend/routes/services_api.mjs
import express from "express";
const router = express.Router();

// Example service list
const services = [
  {
    id: "residential_cleaning",
    name: "Residential Cleaning",
    description: "Keep your home spotless and fresh.",
  },
  {
    id: "deep_cleaning",
    name: "Deep Cleaning",
    description: "Thorough cleaning for every corner.",
  },
  {
    id: "office_cleaning",
    name: "Office Cleaning",
    description: "Reliable cleaning for your workplace.",
  },
  {
    id: "move_inout_cleaning",
    name: "Move In/Out Cleaning",
    description: "Stress-free cleaning when moving.",
  },
];

// GET /api/services
router.get("/", (req, res) => {
  res.json({ ok: true, services });
});

export default router;
