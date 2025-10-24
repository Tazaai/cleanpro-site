// =============================================================
// 📅 CleanPro Bookings API - Enhanced with Authentication
// =============================================================

import express from "express";
import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import { body, validationResult } from "express-validator";
import { authenticateToken, requireAdmin } from "./auth_api.mjs";
import fetch from "node-fetch";

const router = express.Router();

const getDb = () => {
  if (!admin.apps.length) throw new Error("Firebase not initialized");
  return getFirestore();
};

// Price preview endpoint (public access for quotes)
router.post("/preview", async (req, res) => {
  try {
    const { service, sqMeters, distance = 0, frequency = "one_time", isFirstTime = true } = req.body;

    // Validate required fields
    if (!service || !sqMeters || sqMeters <= 0) {
      return res.status(400).json({ 
        ok: false, 
        error: "Service and valid square meters are required" 
      });
    }

    // Base rates per service type (per sq ft)
    const baseRates = {
      standard_cleaning: 0.15,
      deep_cleaning: 0.25,
      office_cleaning: 0.18,
      move_cleaning: 0.30
    };

    const baseRatePerSqFt = baseRates[service] || 0.15;
    const basePrice = Number((sqMeters * baseRatePerSqFt).toFixed(2));

    // Distance fee (free up to 40 miles, then $1.50/mile)
    const freeDistanceLimit = 40;
    const pricePerMile = 1.50;
    const distanceFee = distance > freeDistanceLimit 
      ? Number(((distance - freeDistanceLimit) * pricePerMile).toFixed(2))
      : 0;

    // Subtotal before discounts
    const subtotal = basePrice + distanceFee;

    // Frequency discounts (only for returning customers, never for first-time)
    let discount = 0;
    let discountPercent = 0;
    let futureDiscountPercent = 0;

    // CRITICAL: No discounts for first-time customers, regardless of frequency
    if (!isFirstTime && frequency !== "one_time") {
      if (frequency === "weekly") {
        discountPercent = 15; // 15% for weekly
      } else if (frequency === "monthly") {
        discountPercent = 8; // 8% for monthly
      }
      discount = Number((subtotal * (discountPercent / 100)).toFixed(2));
    }
    
    // Calculate future discount promise for first-time customers
    if (isFirstTime && frequency !== "one_time") {
      if (frequency === "weekly") {
        futureDiscountPercent = 15; // Promise 15% for future weekly bookings
      } else if (frequency === "monthly") {
        futureDiscountPercent = 8; // Promise 8% for future monthly bookings
      }
    }

    const finalPrice = Number((subtotal - discount).toFixed(2));

    const breakdown = {
      baseRatePerSqFt,
      basePrice,
      distanceFee,
      pricePerMile,
      subtotal,
      discount,
      discountPercent,
      futureDiscountPercent,
      finalPrice,
      currency: "USD",
      isFirstTime
    };

    res.json({ 
      ok: true, 
      breakdown,
      message: "Price calculated successfully"
    });

  } catch (err) {
    console.error("price preview error:", err);
    res.status(500).json({ ok: false, error: err.message || "Failed to calculate price" });
  }
});

// Get all bookings (admin only)
router.get("/", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const db = getDb();
    const snap = await db.collection("bookings").orderBy("createdAt", "desc").get();
    
    res.json({ 
      ok: true, 
      bookings: snap.docs.map(d => ({ id: d.id, ...d.data() })) 
    });
  } catch (err) {
    console.error("bookings error:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Get user's own bookings
router.get("/my-bookings", authenticateToken, async (req, res) => {
  try {
    const db = getDb();
    const snap = await db.collection("bookings")
      .where("userId", "==", req.user.id)
      .orderBy("createdAt", "desc")
      .get();
    
    res.json({ 
      ok: true, 
      bookings: snap.docs.map(d => ({ id: d.id, ...d.data() })) 
    });
  } catch (err) {
    console.error("my bookings error:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Get specific booking
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const db = getDb();
    const doc = await db.collection("bookings").doc(req.params.id).get();
    
    if (!doc.exists) {
      return res.status(404).json({ ok: false, error: "Booking not found" });
    }

    const booking = doc.data();
    
    // Users can only see their own bookings (unless admin)
    if (req.user.role !== "admin" && booking.userId !== req.user.id) {
      return res.status(403).json({ ok: false, error: "Access denied" });
    }
    
    res.json({ 
      ok: true, 
      booking: { id: doc.id, ...booking } 
    });
  } catch (err) {
    console.error("get booking error:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Create booking (authenticated users)
router.post("/", authenticateToken, [
  body("service").notEmpty().withMessage("Service is required"),
  body("sqMeters").isNumeric().withMessage("Square meters must be a number"),
  body("frequency").isIn(["one_time", "weekly", "monthly"]).withMessage("Invalid frequency"),
  body("date").isISO8601().withMessage("Valid date is required"),
  body("timeSlot").notEmpty().withMessage("Time slot is required"),
  body("address").notEmpty().withMessage("Address is required"),
  body("phone").optional().isMobilePhone(),
], async (req, res) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        ok: false, 
        error: "Validation failed", 
        details: errors.array() 
      });
    }

    const {
      service, sqMeters, frequency, date, timeSlot, address, 
      nearestHQ, specialInstructions, totalPrice
    } = req.body;

    const db = getDb();

    // Get user details for booking
    const userDoc = await db.collection("users").doc(req.user.id).get();
    if (!userDoc.exists) {
      return res.status(404).json({ ok: false, error: "User not found" });
    }

    const userData = userDoc.data();

    // Create booking document
    const bookingData = {
      userId: req.user.id,
      userEmail: userData.email,
      userName: `${userData.firstName} ${userData.lastName}`,
      userPhone: userData.phone || req.body.phone || "",
      service,
      sqMeters: Number(sqMeters),
      frequency,
      date,
      timeSlot,
      address,
      nearestHQ: nearestHQ || "",
      specialInstructions: specialInstructions || "",
      totalPrice: totalPrice || 0,
      status: "pending_approval", // Changed to pending_approval for review workflow
      paymentStatus: "pending",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };

    const docRef = await db.collection("bookings").add(bookingData);
    
    // Add booking ID to data for notifications
    const completeBookingData = { ...bookingData, id: docRef.id };

    // Send notifications asynchronously (don't wait for them)
    sendBookingNotifications(completeBookingData).catch(err => 
      console.error("Notification error:", err)
    );

    res.status(201).json({ 
      ok: true, 
      message: "Booking request submitted successfully! We'll contact you soon for approval.",
      bookingId: docRef.id,
      status: "pending_approval"
    });

  } catch (err) {
    console.error("create booking error:", err);
    res.status(500).json({ ok: false, error: err.message || "Failed to create booking" });
  }
});

// Update booking status (admin only)
router.patch("/:id/status", authenticateToken, requireAdmin, [
  body("status").isIn(["pending", "confirmed", "in_progress", "completed", "cancelled"]).withMessage("Invalid status")
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        ok: false, 
        error: "Validation failed", 
        details: errors.array() 
      });
    }

    const { status } = req.body;
    const db = getDb();

    const doc = await db.collection("bookings").doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ ok: false, error: "Booking not found" });
    }

    const bookingData = doc.data();
    
    await doc.ref.update({
      status,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    // Send approval email if booking is confirmed
    if (status === "confirmed" && bookingData.status === "pending_approval") {
      const completeBookingData = { ...bookingData, id: doc.id };
      sendApprovalNotification(completeBookingData).catch(err => 
        console.error("Approval notification error:", err)
      );
    }

    res.json({ 
      ok: true, 
      message: "Booking status updated successfully" 
    });

  } catch (err) {
    console.error("update booking status error:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Cancel booking (user can cancel their own, admin can cancel any)
router.patch("/:id/cancel", authenticateToken, async (req, res) => {
  try {
    const db = getDb();
    const doc = await db.collection("bookings").doc(req.params.id).get();
    
    if (!doc.exists) {
      return res.status(404).json({ ok: false, error: "Booking not found" });
    }

    const booking = doc.data();
    
    // Users can only cancel their own bookings (unless admin)
    if (req.user.role !== "admin" && booking.userId !== req.user.id) {
      return res.status(403).json({ ok: false, error: "Access denied" });
    }

    // Check if booking can be cancelled
    if (booking.status === "completed" || booking.status === "cancelled") {
      return res.status(400).json({ 
        ok: false, 
        error: "Booking cannot be cancelled in current status" 
      });
    }

    await doc.ref.update({
      status: "cancelled",
      cancelledAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    res.json({ 
      ok: true, 
      message: "Booking cancelled successfully" 
    });

  } catch (err) {
    console.error("cancel booking error:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Helper function to send booking notifications
async function sendBookingNotifications(bookingData) {
  try {
    const baseUrl = process.env.API_BASE_URL || "http://localhost:8080";
    
    // Send customer confirmation email
    await fetch(`${baseUrl}/api/notifications/send-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: bookingData.userEmail,
        type: "bookingSubmitted",
        bookingData
      })
    });
    
    // Send admin notification email
    const adminEmail = process.env.ADMIN_EMAIL || "admin@cleandeparture.com";
    await fetch(`${baseUrl}/api/notifications/send-email`, {
      method: "POST", 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: adminEmail,
        type: "adminNotification",
        bookingData
      })
    });
    
    console.log("📧 Booking notifications sent successfully");
  } catch (error) {
    console.error("Failed to send booking notifications:", error);
  }
}

// Helper function to send approval notification
async function sendApprovalNotification(bookingData) {
  try {
    const baseUrl = process.env.API_BASE_URL || "http://localhost:8080";
    
    await fetch(`${baseUrl}/api/notifications/send-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: bookingData.userEmail,
        type: "bookingApproved",
        bookingData
      })
    });
    
    console.log("📧 Approval notification sent successfully");
  } catch (error) {
    console.error("Failed to send approval notification:", error);
  }
}

export default router;
