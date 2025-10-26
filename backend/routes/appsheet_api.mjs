// =============================================================
// 📊 Clean Departure AppSheet Integration API
// =============================================================

import express from "express";
import { getDb } from "../firebase.js";
import { body, validationResult } from "express-validator";
import { authenticateToken, requireAdmin } from "./auth_api.mjs";

const router = express.Router();

// AppSheet configuration
const APPSHEET_API_KEY = process.env.APPSHEET_API_KEY;
const APP_ID = process.env.APPSHEET_APP_ID;
const APPSHEET_BASE_URL = "https://api.appsheet.com/api/v2/apps";

// Validate AppSheet configuration
const validateAppSheetConfig = () => {
  if (!APPSHEET_API_KEY || !APP_ID) {
    throw new Error("AppSheet API key and App ID must be configured");
  }
};

// Generic AppSheet API call function
const callAppSheetAPI = async (tableName, action, data = null) => {
  validateAppSheetConfig();
  
  const url = `${APPSHEET_BASE_URL}/${APP_ID}/tables/${tableName}/Action`;
  const headers = {
    'ApplicationAccessKey': APPSHEET_API_KEY,
    'Content-Type': 'application/json'
  };

  const payload = {
    Action: action,
    ...(data && { Rows: Array.isArray(data) ? data : [data] })
  };

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`AppSheet API error: ${response.status} ${response.statusText}`);
  }

  return await response.json();
};

// Sync coordination points from AppSheet to Firestore
router.post("/sync/coordination-points", authenticateToken, requireAdmin, async (req, res) => {
  try {
    console.log("🔄 Syncing coordination points from AppSheet...");
    
    // Fetch coordination points from AppSheet
    const appsheetData = await callAppSheetAPI("CoordinationPoints", "Find");
    
    if (!appsheetData || !appsheetData.length) {
      return res.json({
        ok: true,
        message: "No coordination points found in AppSheet",
        synced: 0
      });
    }

    const db = getDb();
    const batch = db.batch();
    let syncedCount = 0;

    for (const point of appsheetData) {
      const docRef = db.collection("coordination_points").doc(point.id || point.ID);
      const firestoreData = {
        name: point.name || point.Name,
        address: point.address || point.Address,
        contact: point.contact || point.Contact,
        phone: point.phone || point.Phone,
        email: point.email || point.Email,
        active: point.active !== false && point.Active !== false,
        latitude: point.latitude || point.Latitude || null,
        longitude: point.longitude || point.Longitude || null,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        syncedFromAppSheet: true
      };
      
      batch.set(docRef, firestoreData, { merge: true });
      syncedCount++;
    }

    await batch.commit();

    res.json({
      ok: true,
      message: "Coordination points synced successfully",
      synced: syncedCount
    });

  } catch (err) {
    console.error("Coordination points sync error:", err);
    res.status(500).json({ 
      ok: false, 
      error: err.message || "Failed to sync coordination points" 
    });
  }
});

// Sync pricing from AppSheet to Firestore
router.post("/sync/pricing", authenticateToken, requireAdmin, async (req, res) => {
  try {
    console.log("🔄 Syncing pricing from AppSheet...");
    
    // Fetch pricing data from AppSheet
    const appsheetData = await callAppSheetAPI("Pricing", "Find");
    
    if (!appsheetData || !appsheetData.length) {
      return res.json({
        ok: true,
        message: "No pricing data found in AppSheet",
        synced: 0
      });
    }

    const db = getDb();
    const batch = db.batch();
    let syncedCount = 0;

    for (const price of appsheetData) {
      const serviceId = price.service_id || price.ServiceID || price.service;
      if (!serviceId) continue;

      const docRef = db.collection("pricing").doc(serviceId);
      const firestoreData = {
        pricePerSqFt: Number(price.price_per_sqft || price.PricePerSqFt || price.baseRate) || 0,
        weeklyDiscount: Number(price.weekly_discount || price.WeeklyDiscount || price.weeklyDiscountPercent) || 0,
        monthlyDiscount: Number(price.monthly_discount || price.MonthlyDiscount || price.monthlyDiscountPercent) || 0,
        distanceFeePerMile: Number(price.distance_fee || price.DistanceFee || 1.50) || 1.50,
        freeDistanceLimit: Number(price.free_distance || price.FreeDistance || 40) || 40,
        // Campaign discount support
        campaignDiscount: Number(price.campaign_discount || price.CampaignDiscount || 0) || 0,
        campaignDiscountActive: Boolean(price.campaign_active || price.CampaignActive || false),
        campaignDescription: price.campaign_description || price.CampaignDescription || "",
        campaignStartDate: price.campaign_start || price.CampaignStart || null,
        campaignEndDate: price.campaign_end || price.CampaignEnd || null,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        syncedFromAppSheet: true
      };
      
      batch.set(docRef, firestoreData, { merge: true });
      syncedCount++;
    }

    await batch.commit();

    res.json({
      ok: true,
      message: "Pricing synced successfully",
      synced: syncedCount
    });

  } catch (err) {
    console.error("Pricing sync error:", err);
    res.status(500).json({ 
      ok: false, 
      error: err.message || "Failed to sync pricing" 
    });
  }
});

// Push booking data to AppSheet
router.post("/push/booking/:id", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get booking from Firestore
    const db = getDb();
    const bookingDoc = await db.collection("bookings").doc(id).get();
    
    if (!bookingDoc.exists) {
      return res.status(404).json({ ok: false, error: "Booking not found" });
    }

    const booking = bookingDoc.data();
    
    // Format data for AppSheet
    const appsheetData = {
      BookingID: id,
      CustomerName: booking.userName || booking.name,
      CustomerEmail: booking.userEmail || booking.email,
      CustomerPhone: booking.userPhone || booking.phone,
      Service: booking.service,
      SquareMeters: booking.sqMeters,
      Frequency: booking.frequency,
      Date: booking.date,
      TimeSlot: booking.timeSlot,
      Address: booking.address,
      NearestHQ: booking.nearestHQ,
      TotalPrice: booking.totalPrice,
      Status: booking.status,
      CreatedAt: booking.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      SpecialInstructions: booking.specialInstructions || ""
    };

    // Push to AppSheet
    await callAppSheetAPI("Bookings", "Add", appsheetData);

    res.json({
      ok: true,
      message: "Booking pushed to AppSheet successfully"
    });

  } catch (err) {
    console.error("Push booking error:", err);
    res.status(500).json({ 
      ok: false, 
      error: err.message || "Failed to push booking to AppSheet" 
    });
  }
});

// Sync all data (coordination points and pricing)
router.post("/sync/all", authenticateToken, requireAdmin, async (req, res) => {
  try {
    console.log("🔄 Starting full AppSheet sync...");
    
    const results = {
      coordinationPoints: { synced: 0, error: null },
      pricing: { synced: 0, error: null }
    };

    // Sync coordination points
    try {
      const pointsData = await callAppSheetAPI("CoordinationPoints", "Find");
      if (pointsData && pointsData.length) {
        const db = getDb();
        const batch = db.batch();
        
        for (const point of pointsData) {
          const docRef = db.collection("coordination_points").doc(point.id || point.ID);
          const firestoreData = {
            name: point.name || point.Name,
            address: point.address || point.Address,
            contact: point.contact || point.Contact,
            phone: point.phone || point.Phone,
            email: point.email || point.Email,
            active: point.active !== false && point.Active !== false,
            latitude: point.latitude || point.Latitude || null,
            longitude: point.longitude || point.Longitude || null,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            syncedFromAppSheet: true
          };
          batch.set(docRef, firestoreData, { merge: true });
          results.coordinationPoints.synced++;
        }
        
        await batch.commit();
      }
    } catch (err) {
      results.coordinationPoints.error = err.message;
    }

    // Sync pricing
    try {
      const pricingData = await callAppSheetAPI("Pricing", "Find");
      if (pricingData && pricingData.length) {
        const db = getDb();
        const batch = db.batch();
        
        for (const price of pricingData) {
          const serviceId = price.service_id || price.ServiceID || price.service;
          if (!serviceId) continue;

          const docRef = db.collection("pricing").doc(serviceId);
          const firestoreData = {
            pricePerSqFt: Number(price.price_per_sqft || price.PricePerSqFt || price.baseRate) || 0,
            weeklyDiscount: Number(price.weekly_discount || price.WeeklyDiscount || price.weeklyDiscountPercent) || 0,
            monthlyDiscount: Number(price.monthly_discount || price.MonthlyDiscount || price.monthlyDiscountPercent) || 0,
            distanceFeePerMile: Number(price.distance_fee || price.DistanceFee || 1.50) || 1.50,
            freeDistanceLimit: Number(price.free_distance || price.FreeDistance || 40) || 40,
            // Campaign discount support
            campaignDiscount: Number(price.campaign_discount || price.CampaignDiscount || 0) || 0,
            campaignDiscountActive: Boolean(price.campaign_active || price.CampaignActive || false),
            campaignDescription: price.campaign_description || price.CampaignDescription || "",
            campaignStartDate: price.campaign_start || price.CampaignStart || null,
            campaignEndDate: price.campaign_end || price.CampaignEnd || null,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            syncedFromAppSheet: true
          };
          batch.set(docRef, firestoreData, { merge: true });
          results.pricing.synced++;
        }
        
        await batch.commit();
      }
    } catch (err) {
      results.pricing.error = err.message;
    }

    res.json({
      ok: true,
      message: "AppSheet sync completed",
      results
    });

  } catch (err) {
    console.error("Full sync error:", err);
    res.status(500).json({ 
      ok: false, 
      error: err.message || "Failed to complete AppSheet sync" 
    });
  }
});

// Get AppSheet configuration status
router.get("/config", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const config = {
      configured: !!(APPSHEET_API_KEY && APP_ID),
      apiKeyPresent: !!APPSHEET_API_KEY,
      appIdPresent: !!APP_ID,
      baseUrl: APPSHEET_BASE_URL
    };

    res.json({
      ok: true,
      config
    });

  } catch (err) {
    console.error("Config check error:", err);
    res.status(500).json({ 
      ok: false, 
      error: err.message || "Failed to check configuration" 
    });
  }
});

// Test AppSheet connection
router.post("/test", authenticateToken, requireAdmin, async (req, res) => {
  try {
    validateAppSheetConfig();
    
    // Test with a simple Find operation
    const testResponse = await callAppSheetAPI("CoordinationPoints", "Find");
    
    res.json({
      ok: true,
      message: "AppSheet connection successful",
      recordCount: testResponse ? testResponse.length : 0
    });

  } catch (err) {
    console.error("AppSheet test error:", err);
    res.status(500).json({ 
      ok: false, 
      error: err.message || "AppSheet connection failed" 
    });
  }
});

export default router;