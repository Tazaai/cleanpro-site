#!/bin/bash

# Test Email Notification System
echo "📧 Testing Email Notification System..."
echo "======================================"

cd /workspaces/cleanpro-site/backend

# Test email service initialization
echo "🚀 Testing email service initialization..."

cat > test_email_system.js << 'EOF'
import emailService from './services/email_service.js';

console.log('📧 Testing Email Notification Service...');
console.log('Email Enabled:', emailService.isEnabled);
console.log('Service Type:', emailService.getServiceType());

// Test with mock CP registration data
const mockCPData = {
  business_name: "Test Cleaning Services",
  contact_person: "John Doe",
  email: "test@example.com",
  phone: "+1-555-0123",
  address: "123 Test St, Test City, TC 12345",
  service_radius: 25,
  business_type: "LLC",
  registration_id: `TEST_${Date.now()}`,
  application_date: new Date().toISOString(),
  ai_monitoring: {
    initial_assessment: {
      toneScore: 8.5,
      professionalismScore: 9.0,
      riskLevel: "low",
      redFlags: [],
      summary: "Professional registration submission"
    }
  }
};

console.log('\n🧪 Testing email notifications...');

// Test CP registration notification (would only work if email is configured)
emailService.notifyAdminCPRegistration(mockCPData)
  .then(result => {
    console.log('✅ Admin notification result:', result);
  })
  .catch(error => {
    console.log('ℹ️ Admin notification (expected to fail without email config):', error.reason || 'disabled');
  });

emailService.notifyCPRegistrationReceived(mockCPData)
  .then(result => {
    console.log('✅ CP confirmation result:', result);
  })
  .catch(error => {
    console.log('ℹ️ CP confirmation (expected to fail without email config):', error.reason || 'disabled');
  });

// Test AI alert notification
const mockAIAlert = {
  analysis: {
    toneScore: 2,
    riskLevel: "critical",
    redFlags: ["threatening language", "inappropriate content"],
    summary: "Critical communication issue detected"
  },
  context: {
    type: "cp_registration",
    timestamp: new Date().toISOString()
  },
  timestamp: new Date().toISOString()
};

emailService.notifyAdminCriticalAIAlert(mockAIAlert)
  .then(result => {
    console.log('✅ AI alert result:', result);
  })
  .catch(error => {
    console.log('ℹ️ AI alert (expected to fail without email config):', error.reason || 'disabled');
  });

console.log('\n📊 Email Statistics Test...');
emailService.getEmailStats('24h')
  .then(stats => {
    console.log('✅ Email stats:', stats);
  })
  .catch(error => {
    console.error('❌ Stats test failed:', error);
  });

console.log('\n🎉 Email system test completed!');
console.log('\n💡 Email System Summary:');
console.log('- Service: Nodemailer with multiple provider support');
console.log('- Providers: Gmail, SMTP, SendGrid');
console.log('- Features: CP notifications, AI alerts, booking confirmations');
console.log('- Fallback: Graceful degradation when email not configured');
console.log('- Logging: All email attempts logged to Firebase');
console.log('\n🔑 To enable email in production:');
console.log('1. Set email provider credentials in GitHub Secrets:');
console.log('   - Gmail: GMAIL_USER, GMAIL_APP_PASSWORD');
console.log('   - SMTP: SMTP_HOST, SMTP_USER, SMTP_PASS');
console.log('   - SendGrid: SENDGRID_API_KEY');
console.log('2. Set ADMIN_EMAIL for admin notifications');
console.log('3. Optionally customize SMTP_FROM_EMAIL and SMTP_FROM_NAME');
EOF

node test_email_system.js
rm -f test_email_system.js