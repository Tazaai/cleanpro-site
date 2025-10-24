// =============================================================
// 📅 CleanPro Bookings API - Enhanced with Authentication
// =============================================================

import express from "express";
import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import { body, validationResult } from "express-validator";
import { authenticateToken, requireAdmin } from "./auth_api.mjs";

const router = express.Router();

const getDb = () => {
  if (!admin.apps.length) throw new Error("Firebase not initialized");
  return getFirestore();
};

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
      status: "pending",
      paymentStatus: "pending",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };

    const docRef = await db.collection("bookings").add(bookingData);

    res.status(201).json({ 
      ok: true, 
      message: "Booking created successfully",
      bookingId: docRef.id 
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

    await doc.ref.update({
      status,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

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

export default router;
