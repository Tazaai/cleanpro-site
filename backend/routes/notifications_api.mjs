// =============================================================
// 📧 Clean Departure Notifications API - Email & SMS System
// =============================================================

import express from "express";
import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import { body, validationResult } from "express-validator";
import { authenticateToken, requireAdmin } from "./auth/index.mjs";

const router = express.Router();

const getDb = () => {
  if (!admin.apps.length) throw new Error("Firebase not initialized");
  return getFirestore();
};

// Email templates
const emailTemplates = {
  bookingSubmitted: (booking) => ({
    subject: "Clean Departure - Booking Request Received",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Thank you for choosing Clean Departure!</h2>
        
        <p>Hi ${booking.userName},</p>
        
        <p>We've received your booking request and our team is reviewing it. We'll contact you within 24 hours via phone, SMS, or email to confirm your appointment.</p>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Booking Details:</h3>
          <p><strong>Service:</strong> ${booking.service.replace(/_/g, ' ').toUpperCase()}</p>
          <p><strong>Date:</strong> ${new Date(booking.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p><strong>Time:</strong> ${booking.timeSlot === 'AM' ? 'Morning' : 'Afternoon'}</p>
          <p><strong>Address:</strong> ${booking.address}</p>
          <p><strong>Area:</strong> ${booking.sqMeters} sq ft</p>
          <p><strong>Total:</strong> $${booking.totalPrice}</p>
        </div>
        
        <p><strong>What happens next?</strong></p>
        <ul>
          <li>Our team reviews your request (usually within 2-4 hours)</li>
          <li>We'll contact you to confirm availability and any special requirements</li>
          <li>Once approved, you'll receive a confirmation email with final details</li>
          <li>Payment will be processed upon service completion</li>
        </ul>
        
        <p>Questions? Reply to this email or call us at <strong>(555) 123-4567</strong></p>
        
        <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
          Clean Departure - Professional Cleaning Services<br>
          We make your space sparkle ✨
        </p>
      </div>
    `
  }),

  bookingApproved: (booking) => ({
    subject: "✅ Clean Departure - Booking Confirmed!",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #059669;">Your booking is confirmed! 🎉</h2>
        
        <p>Hi ${booking.userName},</p>
        
        <p>Great news! Your cleaning appointment has been approved and confirmed.</p>
        
        <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #059669;">
          <h3 style="color: #065f46; margin-top: 0;">Confirmed Booking Details:</h3>
          <p><strong>Service:</strong> ${booking.service.replace(/_/g, ' ').toUpperCase()}</p>
          <p><strong>Date:</strong> ${new Date(booking.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p><strong>Time:</strong> ${booking.timeSlot === 'AM' ? 'Morning (8AM-12PM)' : 'Afternoon (1PM-5PM)'}</p>
          <p><strong>Address:</strong> ${booking.address}</p>
          <p><strong>Total:</strong> $${booking.totalPrice}</p>
        </div>
        
        <p><strong>Before your appointment:</strong></p>
        <ul>
          <li>We'll send you a reminder 24 hours before</li>
          <li>Our team will call 30 minutes before arrival</li>
          <li>Please ensure someone is available to provide access</li>
          <li>Remove any valuable or fragile items from cleaning areas</li>
        </ul>
        
        <p><strong>Payment:</strong> We'll process payment after your cleaning is complete. You can pay via card or cash.</p>
        
        <p>Need to reschedule? Reply to this email or call us at <strong>(555) 123-4567</strong></p>
        
        <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
          Clean Departure - Professional Cleaning Services<br>
          Looking forward to making your space sparkle! ✨
        </p>
      </div>
    `
  }),

  adminNotification: (booking) => ({
    subject: `🔔 New Booking Request - ${booking.userName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc2626;">New Booking Request Pending Review</h2>
        
        <div style="background: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626;">
          <h3 style="color: #991b1b; margin-top: 0;">Customer Details:</h3>
          <p><strong>Name:</strong> ${booking.userName}</p>
          <p><strong>Phone:</strong> ${booking.userPhone}</p>
          <p><strong>Email:</strong> ${booking.userEmail}</p>
        </div>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Service Details:</h3>
          <p><strong>Service:</strong> ${booking.service.replace(/_/g, ' ').toUpperCase()}</p>
          <p><strong>Date:</strong> ${new Date(booking.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p><strong>Time:</strong> ${booking.timeSlot === 'AM' ? 'Morning' : 'Afternoon'}</p>
          <p><strong>Address:</strong> ${booking.address}</p>
          <p><strong>Area:</strong> ${booking.sqMeters} sq ft</p>
          <p><strong>Frequency:</strong> ${booking.frequency.replace(/_/g, ' ')}</p>
          <p><strong>Total:</strong> $${booking.totalPrice}</p>
          <p><strong>Nearest HQ:</strong> ${booking.nearestHQ}</p>
        </div>
        
        ${booking.specialInstructions ? `
          <div style="background: #fffbeb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h4 style="color: #92400e; margin-top: 0;">Special Instructions:</h4>
            <p>${booking.specialInstructions}</p>
          </div>
        ` : ''}
        
        <p><strong>Action Required:</strong></p>
        <p>Please review this booking and approve/reject via the admin dashboard:</p>
        <p><a href="https://cleanpro-frontend-5539254765.europe-west1.run.app/admin" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Review Booking</a></p>
        
        <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
          Clean Departure Admin System
        </p>
      </div>
    `
  })
};

// Send email notification
router.post("/send-email", [
  body("to").isEmail().withMessage("Valid email is required"),
  body("type").isIn(["bookingSubmitted", "bookingApproved", "adminNotification"]).withMessage("Invalid email type"),
  body("bookingData").isObject().withMessage("Booking data is required")
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

    const { to, type, bookingData } = req.body;
    
    // Get email template
    const template = emailTemplates[type](bookingData);
    
    // For now, log the email (in production, integrate with SendGrid/Mailgun)
    console.log("📧 EMAIL NOTIFICATION:");
    console.log("To:", to);
    console.log("Subject:", template.subject);
    console.log("Content:", template.html.substring(0, 200) + "...");
    
    // Store notification in database
    const db = getDb();
    await db.collection("notifications").add({
      type: "email",
      to,
      subject: template.subject,
      content: template.html,
      emailType: type,
      bookingId: bookingData.id || null,
      status: "sent",
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    res.json({ 
      ok: true, 
      message: "Email notification sent successfully",
      preview: {
        to,
        subject: template.subject,
        preview: template.html.substring(0, 200) + "..."
      }
    });

  } catch (err) {
    console.error("send email error:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Get notification history (admin only)
router.get("/", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const db = getDb();
    const snap = await db.collection("notifications")
      .orderBy("createdAt", "desc")
      .limit(50)
      .get();
    
    const notifications = snap.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate()?.toISOString()
    }));
    
    res.json({ 
      ok: true, 
      notifications 
    });
  } catch (err) {
    console.error("get notifications error:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Send SMS notification (placeholder for future integration)
router.post("/send-sms", [
  body("to").isMobilePhone().withMessage("Valid phone number is required"),
  body("message").notEmpty().withMessage("Message is required")
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

    const { to, message } = req.body;
    
    // For now, log the SMS (in production, integrate with Twilio)
    console.log("📱 SMS NOTIFICATION:");
    console.log("To:", to);
    console.log("Message:", message);
    
    // Store notification in database
    const db = getDb();
    await db.collection("notifications").add({
      type: "sms",
      to,
      message,
      status: "sent",
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    res.json({ 
      ok: true, 
      message: "SMS notification sent successfully" 
    });

  } catch (err) {
    console.error("send sms error:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

export default router;