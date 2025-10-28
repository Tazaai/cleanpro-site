import express from 'express';
import emailService from '../services/email_service.js';
import { getDb } from '../firebase.js';

const router = express.Router();

// Test email functionality
router.post('/test', async (req, res) => {
  try {
    const { to, subject, message } = req.body;
    
    if (!to) {
      return res.status(400).json({
        success: false,
        error: 'Recipient email (to) is required'
      });
    }

    const testSubject = subject || 'Clean Departure Email Test';
    const testMessage = message || 'This is a test email from the Clean Departure notification system.';
    
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Email Test</h2>
        <p>${testMessage}</p>
        <p style="color: #64748b; font-size: 14px; margin-top: 30px;">
          Sent at: ${new Date().toLocaleString()}<br>
          From: Clean Departure Email System
        </p>
      </div>
    `;

    const result = await emailService.sendEmail(to, testSubject, htmlContent);
    
    res.json({
      success: result.success,
      message: result.success ? 'Test email sent successfully' : 'Failed to send test email',
      email_enabled: emailService.isEnabled,
      result: result
    });
  } catch (error) {
    console.error('Email test failed:', error);
    res.status(500).json({
      success: false,
      error: 'Email test failed',
      details: error.message
    });
  }
});

// Send CP registration notification to admin
router.post('/notify/cp-registration', async (req, res) => {
  try {
    const cpData = req.body;
    
    if (!cpData.business_name || !cpData.email) {
      return res.status(400).json({
        success: false,
        error: 'CP data with business_name and email is required'
      });
    }

    // Send admin notification
    const adminResult = await emailService.notifyAdminCPRegistration(cpData);
    
    // Send confirmation to CP
    const cpResult = await emailService.notifyCPRegistrationReceived(cpData);

    res.json({
      success: true,
      message: 'CP registration notifications sent',
      admin_notification: adminResult,
      cp_confirmation: cpResult,
      email_enabled: emailService.isEnabled
    });
  } catch (error) {
    console.error('CP registration notification failed:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send CP registration notifications',
      details: error.message
    });
  }
});

// Send CP approval notification
router.post('/notify/cp-approved', async (req, res) => {
  try {
    const { cpData, shareLink } = req.body;
    
    if (!cpData || !shareLink) {
      return res.status(400).json({
        success: false,
        error: 'CP data and share link are required'
      });
    }

    const result = await emailService.notifyCPApproved(cpData, shareLink);
    
    res.json({
      success: result.success,
      message: result.success ? 'CP approval notification sent' : 'Failed to send approval notification',
      result: result,
      email_enabled: emailService.isEnabled
    });
  } catch (error) {
    console.error('CP approval notification failed:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send CP approval notification',
      details: error.message
    });
  }
});

// Send critical AI alert to admin
router.post('/notify/ai-alert', async (req, res) => {
  try {
    const alertData = req.body;
    
    if (!alertData.analysis || !alertData.context) {
      return res.status(400).json({
        success: false,
        error: 'Alert data with analysis and context is required'
      });
    }

    const result = await emailService.notifyAdminCriticalAIAlert(alertData);
    
    res.json({
      success: result.success,
      message: result.success ? 'AI alert notification sent' : 'Failed to send AI alert',
      result: result,
      email_enabled: emailService.isEnabled
    });
  } catch (error) {
    console.error('AI alert notification failed:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send AI alert notification',
      details: error.message
    });
  }
});

// Send booking confirmation
router.post('/notify/booking-confirmation', async (req, res) => {
  try {
    const { bookingData, customerEmail } = req.body;
    
    if (!bookingData || !customerEmail) {
      return res.status(400).json({
        success: false,
        error: 'Booking data and customer email are required'
      });
    }

    const result = await emailService.notifyBookingConfirmation(bookingData, customerEmail);
    
    res.json({
      success: result.success,
      message: result.success ? 'Booking confirmation sent' : 'Failed to send booking confirmation',
      result: result,
      email_enabled: emailService.isEnabled
    });
  } catch (error) {
    console.error('Booking confirmation failed:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send booking confirmation',
      details: error.message
    });
  }
});

// Send admin system notification
router.post('/notify/system-event', async (req, res) => {
  try {
    const { event, details } = req.body;
    
    if (!event) {
      return res.status(400).json({
        success: false,
        error: 'Event description is required'
      });
    }

    const result = await emailService.notifyAdminSystemEvent(event, details || {});
    
    res.json({
      success: result.success,
      message: result.success ? 'System event notification sent' : 'Failed to send system notification',
      result: result,
      email_enabled: emailService.isEnabled
    });
  } catch (error) {
    console.error('System event notification failed:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send system event notification',
      details: error.message
    });
  }
});

// Get email statistics
router.get('/stats', async (req, res) => {
  try {
    const timeframe = req.query.timeframe || '7d';
    const stats = await emailService.getEmailStats(timeframe);
    
    if (!stats) {
      return res.status(500).json({
        success: false,
        error: 'Failed to retrieve email statistics'
      });
    }

    res.json({
      success: true,
      statistics: stats,
      email_enabled: emailService.isEnabled
    });
  } catch (error) {
    console.error('Failed to get email stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve email statistics',
      details: error.message
    });
  }
});

// Get email logs (admin only)
router.get('/logs', async (req, res) => {
  try {
    const db = getDb();
    const limit = parseInt(req.query.limit) || 50;
    const status = req.query.status; // optional filter
    
    let query = db.collection('email_logs').orderBy('timestamp', 'desc').limit(limit);
    
    if (status) {
      query = db.collection('email_logs')
        .where('status', '==', status)
        .orderBy('timestamp', 'desc')
        .limit(limit);
    }
    
    const snapshot = await query.get();
    const logs = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json({
      success: true,
      logs: logs,
      count: logs.length,
      filter: { status: status || 'all', limit },
      email_enabled: emailService.isEnabled
    });
  } catch (error) {
    console.error('Failed to get email logs:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve email logs',
      details: error.message
    });
  }
});

// Get email service configuration
router.get('/config', async (req, res) => {
  try {
    res.json({
      success: true,
      configuration: {
        email_enabled: emailService.isEnabled,
        service_type: emailService.getServiceType(),
        from_email: emailService.emailConfig.from,
        from_name: emailService.emailConfig.fromName,
        admin_email: emailService.emailConfig.adminEmail,
        available_notifications: [
          'cp_registration',
          'cp_approval',
          'ai_critical_alert',
          'booking_confirmation',
          'system_event'
        ],
        configuration_methods: [
          'Gmail (GMAIL_USER, GMAIL_APP_PASSWORD)',
          'SMTP (SMTP_HOST, SMTP_USER, SMTP_PASS)',
          'SendGrid (SENDGRID_API_KEY)'
        ]
      }
    });
  } catch (error) {
    console.error('Failed to get email config:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve email configuration',
      details: error.message
    });
  }
});

export default router;