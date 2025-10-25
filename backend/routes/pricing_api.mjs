// ~/cleanpro-site/backend/routes/pricing_api.mjs
import express from "express";
import { db } from "../firebase.js";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

const router = express.Router();

// Example pricing per sq ft (updated from m² to sq ft)
const defaultPricing = {
  residential_cleaning: { 
    pricePerSqFt: 0.17, // ~1.8 per m² converted to sq ft
    weeklyDiscount: 10, 
    monthlyDiscount: 5,
    campaignDiscount: 0,
    campaignDiscountActive: false,
    campaignDescription: ""
  },
  deep_cleaning: { 
    pricePerSqFt: 0.23, // ~2.5 per m² converted to sq ft
    weeklyDiscount: 15, 
    monthlyDiscount: 8,
    campaignDiscount: 0,
    campaignDiscountActive: false,
    campaignDescription: ""
  },
  office_cleaning: { 
    pricePerSqFt: 0.19, // ~2.0 per m² converted to sq ft
    weeklyDiscount: 12, 
    monthlyDiscount: 7,
    campaignDiscount: 0,
    campaignDiscountActive: false,
    campaignDescription: ""
  },
  move_inout_cleaning: { 
    pricePerSqFt: 0.28, // ~3.0 per m² converted to sq ft
    weeklyDiscount: 18, 
    monthlyDiscount: 10,
    campaignDiscount: 0,
    campaignDiscountActive: false,
    campaignDescription: ""
  },
};

// GET /api/pricing - Get all pricing
router.get("/", async (req, res) => {
  try {
    const pricingRef = collection(db, "pricing");
    const snapshot = await getDocs(pricingRef);
    
    const pricing = {};
    
    if (snapshot.empty) {
      // Return default pricing if no Firestore data
      res.json({ ok: true, pricing: defaultPricing });
      return;
    }
    
    snapshot.forEach((doc) => {
      const data = doc.data();
      pricing[doc.id] = {
        pricePerSqFt: data.pricePerSqFt || 0,
        weeklyDiscount: data.weeklyDiscount || 0,
        monthlyDiscount: data.monthlyDiscount || 0,
        distanceFeePerMile: data.distanceFeePerMile || 1.50,
        freeDistanceLimit: data.freeDistanceLimit || 40,
        // Campaign discount fields
        campaignDiscount: data.campaignDiscount || 0,
        campaignDiscountActive: data.campaignDiscountActive || false,
        campaignDescription: data.campaignDescription || "",
        campaignStartDate: data.campaignStartDate || null,
        campaignEndDate: data.campaignEndDate || null,
        updatedAt: data.updatedAt
      };
    });

    res.json({ ok: true, pricing });
  } catch (error) {
    console.error("Error fetching pricing:", error);
    // Fallback to default pricing on error
    res.json({ ok: true, pricing: defaultPricing });
  }
});

// GET /api/pricing/calculate/:serviceId - Calculate pricing with campaign discounts
router.get("/calculate/:serviceId", async (req, res) => {
  try {
    const { serviceId } = req.params;
    const { size, frequency, distance } = req.query;

    if (!size || !frequency) {
      return res.status(400).json({
        error: "Size and frequency are required"
      });
    }

    // Get service pricing from Firestore or default
    let servicePricing = defaultPricing[serviceId];
    
    try {
      const serviceRef = doc(db, "pricing", serviceId);
      const serviceSnap = await getDoc(serviceRef);
      
      if (serviceSnap.exists()) {
        servicePricing = serviceSnap.data();
      }
    } catch (dbError) {
      console.log("Using default pricing due to DB error:", dbError.message);
    }

    if (!servicePricing) {
      return res.status(404).json({
        error: "Service pricing not found"
      });
    }

    const pricePerSqFt = servicePricing.pricePerSqFt || 0;
    const weeklyDiscount = servicePricing.weeklyDiscount || 0;
    const monthlyDiscount = servicePricing.monthlyDiscount || 0;
    const distanceFeePerMile = servicePricing.distanceFeePerMile || 1.50;
    const freeDistanceLimit = servicePricing.freeDistanceLimit || 40;
    
    // Campaign discount support
    const campaignDiscount = servicePricing.campaignDiscount || 0;
    const campaignActive = servicePricing.campaignDiscountActive || false;
    const campaignDescription = servicePricing.campaignDescription || "";

    // Calculate base price (size in square feet)
    let basePrice = parseFloat(size) * pricePerSqFt;

    // Apply frequency discount
    let frequencyDiscount = 0;
    if (frequency === "weekly") {
      frequencyDiscount = weeklyDiscount;
    } else if (frequency === "monthly") {
      frequencyDiscount = monthlyDiscount;
    }

    if (frequencyDiscount > 0) {
      basePrice = basePrice * (1 - frequencyDiscount / 100);
    }

    // Apply campaign discount if active
    let campaignDiscountAmount = 0;
    if (campaignActive && campaignDiscount > 0) {
      campaignDiscountAmount = basePrice * (campaignDiscount / 100);
      basePrice = basePrice - campaignDiscountAmount;
    }

    // Calculate distance fee
    let distanceFee = 0;
    if (distance && parseFloat(distance) > freeDistanceLimit) {
      distanceFee = (parseFloat(distance) - freeDistanceLimit) * distanceFeePerMile;
    }

    const totalPrice = basePrice + distanceFee;

    res.json({
      ok: true,
      basePrice: Math.round(basePrice * 100) / 100,
      distanceFee: Math.round(distanceFee * 100) / 100,
      totalPrice: Math.round(totalPrice * 100) / 100,
      pricePerSqFt,
      frequencyDiscount,
      campaignDiscount: campaignActive ? campaignDiscount : 0,
      campaignDescription: campaignActive ? campaignDescription : "",
      campaignDiscountAmount: Math.round(campaignDiscountAmount * 100) / 100,
      breakdown: {
        size: parseFloat(size),
        unit: "sq ft",
        pricePerSqFt,
        frequency,
        frequencyDiscountPercent: frequencyDiscount,
        campaignDiscountPercent: campaignActive ? campaignDiscount : 0,
        distance: parseFloat(distance) || 0,
        freeDistanceLimit,
        distanceFeePerMile
      }
    });

  } catch (error) {
    console.error("Pricing calculation error:", error);
    res.status(500).json({
      error: "Failed to calculate pricing"
    });
  }
});

export default router;
