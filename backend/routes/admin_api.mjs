// =============================================================
// 🏢 CleanPro Admin Dashboard API
// =============================================================

import express from "express";
import { getFirestore } from "firebase-admin/firestore";
import { authenticateToken, requireAdmin } from "./auth_api.mjs";
import admin from "firebase-admin";

const router = express.Router();

const getDb = () => {
  if (!admin.apps.length) throw new Error("Firebase not initialized");
  return getFirestore();
};

// =============================================================
// 📊 Dashboard Analytics
// =============================================================

// Get dashboard overview stats
router.get("/stats", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const db = getDb();
    
    // Get counts for different collections
    const [bookingsSnap, usersSnap, servicesSnap] = await Promise.all([
      db.collection("bookings").get(),
      db.collection("users").get(),
      db.collection("services").get()
    ]);

    const bookings = bookingsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    // Calculate stats
    const stats = {
      totalBookings: bookings.length,
      totalUsers: usersSnap.size,
      totalServices: servicesSnap.size,
      pendingBookings: bookings.filter(b => b.status === "pending").length,
      confirmedBookings: bookings.filter(b => b.status === "confirmed").length,
      completedBookings: bookings.filter(b => b.status === "completed").length,
      cancelledBookings: bookings.filter(b => b.status === "cancelled").length,
      totalRevenue: bookings
        .filter(b => b.status === "completed")
        .reduce((sum, b) => sum + (b.totalPrice || 0), 0),
      pendingRevenue: bookings
        .filter(b => b.status === "confirmed" || b.status === "in_progress")
        .reduce((sum, b) => sum + (b.totalPrice || 0), 0)
    };

    // Recent bookings (last 10)
    const recentBookings = bookings
      .sort((a, b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0))
      .slice(0, 10);

    res.json({
      ok: true,
      stats,
      recentBookings
    });

  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({ 
      ok: false, 
      error: "Failed to fetch dashboard stats" 
    });
  }
});

// =============================================================
// 👥 User Management
// =============================================================

// Get all users
router.get("/users", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const db = getDb();
    const usersSnap = await db.collection("users")
      .orderBy("createdAt", "desc")
      .get();
    
    const users = usersSnap.docs.map(doc => {
      const userData = doc.data();
      // Don't return password hash
      delete userData.password;
      return { id: doc.id, ...userData };
    });

    res.json({
      ok: true,
      users
    });

  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ 
      ok: false, 
      error: "Failed to fetch users" 
    });
  }
});

// Update user status (activate/deactivate)
router.patch("/users/:id/status", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { isActive } = req.body;
    const db = getDb();

    const userDoc = await db.collection("users").doc(req.params.id).get();
    if (!userDoc.exists) {
      return res.status(404).json({ ok: false, error: "User not found" });
    }

    await userDoc.ref.update({
      isActive: Boolean(isActive),
      updatedAt: new Date().toISOString()
    });

    res.json({
      ok: true,
      message: `User ${isActive ? 'activated' : 'deactivated'} successfully`
    });

  } catch (error) {
    console.error("Update user status error:", error);
    res.status(500).json({ 
      ok: false, 
      error: "Failed to update user status" 
    });
  }
});

// =============================================================
// 📅 Booking Management
// =============================================================

// Get all bookings with filters
router.get("/bookings", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { status, startDate, endDate, limit = 50 } = req.query;
    const db = getDb();

    let query = db.collection("bookings");

    // Apply filters
    if (status && status !== "all") {
      query = query.where("status", "==", status);
    }

    // Order by creation date
    query = query.orderBy("createdAt", "desc");

    // Apply limit
    query = query.limit(parseInt(limit));

    const bookingsSnap = await query.get();
    const bookings = bookingsSnap.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    }));

    // Filter by date range if provided (client-side for now)
    let filteredBookings = bookings;
    if (startDate || endDate) {
      filteredBookings = bookings.filter(booking => {
        const bookingDate = new Date(booking.date);
        if (startDate && bookingDate < new Date(startDate)) return false;
        if (endDate && bookingDate > new Date(endDate)) return false;
        return true;
      });
    }

    res.json({
      ok: true,
      bookings: filteredBookings,
      total: filteredBookings.length
    });

  } catch (error) {
    console.error("Get admin bookings error:", error);
    res.status(500).json({ 
      ok: false, 
      error: "Failed to fetch bookings" 
    });
  }
});

// =============================================================
// 💰 Financial Reports
// =============================================================

// Get revenue report
router.get("/revenue", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { period = "month" } = req.query; // month, week, year
    const db = getDb();

    const bookingsSnap = await db.collection("bookings")
      .where("status", "==", "completed")
      .get();

    const bookings = bookingsSnap.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    }));

    // Group by period
    const revenueData = {};
    const now = new Date();

    bookings.forEach(booking => {
      if (!booking.totalPrice || !booking.createdAt) return;

      const bookingDate = booking.createdAt.toDate();
      let key;

      switch (period) {
        case "week":
          const weekStart = new Date(bookingDate);
          weekStart.setDate(bookingDate.getDate() - bookingDate.getDay());
          key = weekStart.toISOString().split('T')[0];
          break;
        case "year":
          key = bookingDate.getFullYear().toString();
          break;
        case "month":
        default:
          key = `${bookingDate.getFullYear()}-${String(bookingDate.getMonth() + 1).padStart(2, '0')}`;
          break;
      }

      if (!revenueData[key]) {
        revenueData[key] = {
          period: key,
          revenue: 0,
          bookingCount: 0
        };
      }

      revenueData[key].revenue += booking.totalPrice;
      revenueData[key].bookingCount += 1;
    });

    // Convert to array and sort
    const revenueArray = Object.values(revenueData)
      .sort((a, b) => a.period.localeCompare(b.period));

    res.json({
      ok: true,
      revenue: revenueArray,
      totalRevenue: revenueArray.reduce((sum, item) => sum + item.revenue, 0),
      totalBookings: revenueArray.reduce((sum, item) => sum + item.bookingCount, 0)
    });

  } catch (error) {
    console.error("Revenue report error:", error);
    res.status(500).json({ 
      ok: false, 
      error: "Failed to generate revenue report" 
    });
  }
});

// =============================================================
// 🔧 System Settings
// =============================================================

// Get system settings
router.get("/settings", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const db = getDb();
    const settingsDoc = await db.collection("settings").doc("system").get();
    
    const defaultSettings = {
      businessName: "CleanPro Services",
      businessEmail: "admin@cleanpro.com",
      businessPhone: "+1-555-0123",
      defaultServiceRadius: 100,
      baseRatePerSqFt: 0.50,
      extraMileRate: 2.00,
      freeMileRadius: 40,
      discountRates: {
        weekly: 15,
        monthly: 10
      },
      timeSlots: [
        "08:00-10:00",
        "10:00-12:00", 
        "12:00-14:00",
        "14:00-16:00",
        "16:00-18:00"
      ]
    };

    const settings = settingsDoc.exists 
      ? { ...defaultSettings, ...settingsDoc.data() }
      : defaultSettings;

    res.json({
      ok: true,
      settings
    });

  } catch (error) {
    console.error("Get settings error:", error);
    res.status(500).json({ 
      ok: false, 
      error: "Failed to fetch settings" 
    });
  }
});

// Update system settings
router.put("/settings", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const db = getDb();
    const settings = req.body;

    await db.collection("settings").doc("system").set({
      ...settings,
      updatedAt: new Date().toISOString(),
      updatedBy: req.user.id
    }, { merge: true });

    res.json({
      ok: true,
      message: "Settings updated successfully"
    });

  } catch (error) {
    console.error("Update settings error:", error);
    res.status(500).json({ 
      ok: false, 
      error: "Failed to update settings" 
    });
  }
});

export default router;