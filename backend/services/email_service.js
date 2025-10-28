import nodemailer from 'nodemailer';
import { getDb } from '../firebase.js';

class EmailNotificationService {
  constructor() {
    this.transporter = null;
    this.isEnabled = false;
    this.emailConfig = {
      from: process.env.SMTP_FROM_EMAIL || 'noreply@cleandeparture.com',
      fromName: process.env.SMTP_FROM_NAME || 'Clean Departure',
      adminEmail: process.env.ADMIN_EMAIL || 'admin@cleandeparture.com'
    };
    this.initialize();
  }

  initialize() {
    try {
      // Support multiple email providers
      if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
        // Custom SMTP configuration
        this.transporter = nodemailer.createTransporter({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT) || 587,
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
          }
        });
        console.log('📧 Email service initialized with custom SMTP');
      } else if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
        // Gmail configuration
        this.transporter = nodemailer.createTransporter({
          service: 'gmail',
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD
          }
        });
        console.log('📧 Email service initialized with Gmail');
      } else if (process.env.SENDGRID_API_KEY) {
        // SendGrid configuration
        this.transporter = nodemailer.createTransporter({
          service: 'SendGrid',
          auth: {
            user: 'apikey',
            pass: process.env.SENDGRID_API_KEY
          }
        });
        console.log('📧 Email service initialized with SendGrid');
      } else {
        console.log('⚠️ No email configuration found - email notifications disabled');
        this.isEnabled = false;
        return;
      }

      this.isEnabled = true;
      this.verifyConnection();
    } catch (error) {
      console.error('❌ Failed to initialize email service:', error);
      this.isEnabled = false;
    }
  }

  async verifyConnection() {
    try {
      await this.transporter.verify();
      console.log('✅ Email server connection verified');
    } catch (error) {
      console.error('❌ Email server connection failed:', error);
      this.isEnabled = false;
    }
  }

  // Core email sending function
  async sendEmail(to, subject, htmlContent, textContent = null, attachments = null) {
    if (!this.isEnabled) {
      console.log('📧 Email disabled - would send:', { to, subject });
      return { success: false, reason: 'email_disabled' };
    }

    try {
      const mailOptions = {
        from: `${this.emailConfig.fromName} <${this.emailConfig.from}>`,
        to: to,
        subject: subject,
        html: htmlContent,
        text: textContent || this.stripHtml(htmlContent)
      };

      if (attachments) {
        mailOptions.attachments = attachments;
      }

      const info = await this.transporter.sendMail(mailOptions);
      
      // Log email send to database
      await this.logEmailSend(to, subject, 'sent', info.messageId);
      
      console.log('✅ Email sent successfully:', info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('❌ Failed to send email:', error);
      
      // Log failed email attempt
      await this.logEmailSend(to, subject, 'failed', null, error.message);
      
      return { success: false, error: error.message };
    }
  }

  // CP Registration Notifications
  async notifyAdminCPRegistration(cpData) {
    const subject = `🏢 New CP Registration: ${cpData.business_name}`;
    
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">New Coordination Point Registration</h2>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #1e293b;">Business Information</h3>
          <p><strong>Business Name:</strong> ${cpData.business_name}</p>
          <p><strong>Contact Person:</strong> ${cpData.contact_person}</p>
          <p><strong>Email:</strong> ${cpData.email}</p>
          <p><strong>Phone:</strong> ${cpData.phone}</p>
          <p><strong>Address:</strong> ${cpData.address}</p>
          <p><strong>Service Radius:</strong> ${cpData.service_radius || 25}km</p>
          <p><strong>Business Type:</strong> ${cpData.business_type || 'Individual'}</p>
        </div>

        ${cpData.ai_monitoring ? `
        <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #92400e;">AI Analysis Results</h3>
          <p><strong>Tone Score:</strong> ${cpData.ai_monitoring.initial_assessment.toneScore}/10</p>
          <p><strong>Risk Level:</strong> ${cpData.ai_monitoring.initial_assessment.riskLevel}</p>
          ${cpData.ai_monitoring.initial_assessment.redFlags.length > 0 ? 
            `<p><strong>Red Flags:</strong> ${cpData.ai_monitoring.initial_assessment.redFlags.join(', ')}</p>` : 
            '<p><strong>Red Flags:</strong> None detected</p>'
          }
        </div>
        ` : ''}

        <div style="background: #e0f2fe; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #0277bd;">Next Steps</h3>
          <ul>
            <li>Review CP registration in AdminSheet</li>
            <li>Verify business information and credentials</li>
            <li>Approve or request additional documentation</li>
            <li>Set identity verification requirements if needed</li>
          </ul>
        </div>

        <p style="color: #64748b; font-size: 14px; margin-top: 30px;">
          Registration ID: ${cpData.registration_id}<br>
          Application Date: ${new Date(cpData.application_date).toLocaleString()}
        </p>
      </div>
    `;

    return await this.sendEmail(this.emailConfig.adminEmail, subject, htmlContent);
  }

  // CP Registration Confirmation
  async notifyCPRegistrationReceived(cpData) {
    const subject = `✅ Registration Received - ${cpData.business_name}`;
    
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #059669;">Registration Received!</h2>
        
        <p>Dear ${cpData.contact_person},</p>
        
        <p>Thank you for registering <strong>${cpData.business_name}</strong> as a Coordination Point with Clean Departure!</p>
        
        <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #059669;">
          <h3 style="margin-top: 0; color: #065f46;">What happens next?</h3>
          <ol>
            <li><strong>Review Process:</strong> Our team will review your application within 24-48 hours</li>
            <li><strong>Verification:</strong> We may contact you for additional information or documentation</li>
            <li><strong>Approval:</strong> Once approved, you'll receive onboarding materials and your unique CP link</li>
            <li><strong>Training:</strong> Complete our brief training program to start accepting bookings</li>
          </ol>
        </div>

        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #1e293b;">Your Registration Details</h3>
          <p><strong>Registration ID:</strong> ${cpData.registration_id}</p>
          <p><strong>Service Area:</strong> ${cpData.service_radius || 25}km radius from ${cpData.address}</p>
          <p><strong>Submitted:</strong> ${new Date(cpData.application_date).toLocaleString()}</p>
        </div>

        <p>If you have any questions, please don't hesitate to contact us at ${this.emailConfig.adminEmail}.</p>
        
        <p>Welcome to the Clean Departure network!</p>
        
        <p style="color: #64748b; font-size: 14px; margin-top: 30px;">
          Best regards,<br>
          The Clean Departure Team
        </p>
      </div>
    `;

    return await this.sendEmail(cpData.email, subject, htmlContent);
  }

  // CP Approval Notification
  async notifyCPApproved(cpData, shareLink) {
    const subject = `🎉 Approved! Welcome to Clean Departure - ${cpData.business_name}`;
    
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #059669;">Congratulations! You're Approved! 🎉</h2>
        
        <p>Dear ${cpData.contact_person},</p>
        
        <p>We're excited to welcome <strong>${cpData.business_name}</strong> to the Clean Departure network!</p>
        
        <div style="background: #059669; color: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
          <h3 style="margin-top: 0;">Your Unique CP Link</h3>
          <a href="${shareLink}" style="color: #fbbf24; font-weight: bold; font-size: 18px; text-decoration: none;">
            ${shareLink}
          </a>
          <p style="margin-bottom: 0; opacity: 0.9;">Share this link with customers to book directly with you!</p>
        </div>

        <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #065f46;">Getting Started</h3>
          <ol>
            <li><strong>Share Your Link:</strong> Use your unique CP link to attract customers</li>
            <li><strong>Set Your Availability:</strong> Update your schedule in the CP portal</li>
            <li><strong>Receive Bookings:</strong> Customers can book directly through your link</li>
            <li><strong>Get Paid:</strong> Secure payments processed automatically</li>
          </ol>
        </div>

        <div style="background: #e0f2fe; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #0277bd;">Quick Resources</h3>
          <ul>
            <li>📱 <strong>CP Portal:</strong> Manage your bookings and schedule</li>
            <li>💰 <strong>Payment Setup:</strong> Connect your bank account for payouts</li>
            <li>📋 <strong>Best Practices:</strong> Tips for maximizing bookings</li>
            <li>🎓 <strong>Training Materials:</strong> Service quality guidelines</li>
          </ul>
        </div>

        <p>Questions? Contact us anytime at ${this.emailConfig.adminEmail}.</p>
        
        <p>Welcome to Clean Departure - let's build something amazing together!</p>
        
        <p style="color: #64748b; font-size: 14px; margin-top: 30px;">
          Best regards,<br>
          The Clean Departure Team
        </p>
      </div>
    `;

    return await this.sendEmail(cpData.email, subject, htmlContent);
  }

  // AI Critical Alert Notification
  async notifyAdminCriticalAIAlert(alertData) {
    const subject = `🚨 CRITICAL AI Alert - Immediate Review Required`;
    
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc2626;">🚨 Critical AI Alert</h2>
        
        <div style="background: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626;">
          <h3 style="margin-top: 0; color: #991b1b;">Alert Details</h3>
          <p><strong>Risk Level:</strong> ${alertData.analysis.riskLevel.toUpperCase()}</p>
          <p><strong>Tone Score:</strong> ${alertData.analysis.toneScore}/10</p>
          <p><strong>Context:</strong> ${alertData.context.type}</p>
          <p><strong>Timestamp:</strong> ${new Date(alertData.timestamp).toLocaleString()}</p>
        </div>

        <div style="background: #fff7ed; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #c2410c;">Red Flags Detected</h3>
          ${alertData.analysis.redFlags.length > 0 ? 
            `<ul>${alertData.analysis.redFlags.map(flag => `<li>${flag}</li>`).join('')}</ul>` :
            '<p>No specific red flags detected - flagged due to low tone score.</p>'
          }
        </div>

        <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #0369a1;">Immediate Actions Required</h3>
          <ol>
            <li>Review the flagged communication immediately</li>
            <li>Investigate the context and participants</li>
            <li>Take appropriate moderation action if needed</li>
            <li>Update alert status in the admin panel</li>
          </ol>
        </div>

        <p style="color: #991b1b; font-weight: bold;">
          This alert requires immediate attention due to the critical risk level detected by our AI monitoring system.
        </p>
        
        <p style="color: #64748b; font-size: 14px; margin-top: 30px;">
          Alert ID: ${alertData.id || 'N/A'}<br>
          Generated by: AI Monitoring System
        </p>
      </div>
    `;

    return await this.sendEmail(this.emailConfig.adminEmail, subject, htmlContent);
  }

  // Booking Confirmation for Customers
  async notifyBookingConfirmation(bookingData, customerEmail) {
    const subject = `✅ Booking Confirmed - Clean Departure Service`;
    
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #059669;">Booking Confirmed! ✅</h2>
        
        <p>Your cleaning service has been successfully booked with Clean Departure!</p>
        
        <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #065f46;">Booking Details</h3>
          <p><strong>Booking ID:</strong> ${bookingData.id}</p>
          <p><strong>Service Date:</strong> ${new Date(bookingData.service_date).toLocaleDateString()}</p>
          <p><strong>Service Time:</strong> ${bookingData.service_time}</p>
          <p><strong>Address:</strong> ${bookingData.service_address}</p>
          <p><strong>Total Amount:</strong> $${bookingData.total_amount}</p>
        </div>

        <div style="background: #e0f2fe; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #0277bd;">What's Next?</h3>
          <ul>
            <li>Your coordination point will contact you 24 hours before service</li>
            <li>Ensure someone is available to provide access to the property</li>
            <li>Payment will be processed automatically after service completion</li>
            <li>You'll receive a service completion confirmation</li>
          </ul>
        </div>

        <p>Questions about your booking? Contact us at ${this.emailConfig.adminEmail}.</p>
        
        <p style="color: #64748b; font-size: 14px; margin-top: 30px;">
          Thank you for choosing Clean Departure!<br>
          The Clean Departure Team
        </p>
      </div>
    `;

    return await this.sendEmail(customerEmail, subject, htmlContent);
  }

  // Admin System Notification
  async notifyAdminSystemEvent(event, details) {
    const subject = `🔧 System Event: ${event}`;
    
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #6366f1;">System Event Notification</h2>
        
        <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #1e293b;">Event Details</h3>
          <p><strong>Event:</strong> ${event}</p>
          <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>Details:</strong> ${JSON.stringify(details, null, 2)}</p>
        </div>

        <p style="color: #64748b; font-size: 14px; margin-top: 30px;">
          Generated by: Clean Departure System Monitor
        </p>
      </div>
    `;

    return await this.sendEmail(this.emailConfig.adminEmail, subject, htmlContent);
  }

  // Utility function to strip HTML for text content
  stripHtml(html) {
    return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  }

  // Log email sends to database
  async logEmailSend(to, subject, status, messageId = null, error = null) {
    try {
      const db = getDb();
      const logData = {
        to: to,
        subject: subject,
        status: status, // sent, failed, queued
        message_id: messageId,
        error: error,
        timestamp: new Date().toISOString(),
        email_service: this.getServiceType()
      };

      await db.collection('email_logs').add(logData);
    } catch (logError) {
      console.error('❌ Failed to log email send:', logError);
    }
  }

  getServiceType() {
    if (process.env.SENDGRID_API_KEY) return 'sendgrid';
    if (process.env.GMAIL_USER) return 'gmail';
    if (process.env.SMTP_HOST) return 'smtp';
    return 'disabled';
  }

  // Get email statistics
  async getEmailStats(timeframe = '7d') {
    try {
      const db = getDb();
      const startDate = new Date();
      
      switch (timeframe) {
        case '24h':
          startDate.setDate(startDate.getDate() - 1);
          break;
        case '7d':
          startDate.setDate(startDate.getDate() - 7);
          break;
        case '30d':
          startDate.setDate(startDate.getDate() - 30);
          break;
      }

      const snapshot = await db.collection('email_logs')
        .where('timestamp', '>=', startDate.toISOString())
        .get();

      const logs = snapshot.docs.map(doc => doc.data());
      
      return {
        total_emails: logs.length,
        sent_successfully: logs.filter(log => log.status === 'sent').length,
        failed_emails: logs.filter(log => log.status === 'failed').length,
        success_rate: logs.length > 0 ? (logs.filter(log => log.status === 'sent').length / logs.length * 100).toFixed(2) : 0,
        service_type: this.getServiceType(),
        timeframe: timeframe,
        generated_at: new Date().toISOString()
      };
    } catch (error) {
      console.error('❌ Failed to get email stats:', error);
      return null;
    }
  }
}

// Export singleton instance
export const emailService = new EmailNotificationService();
export default emailService;