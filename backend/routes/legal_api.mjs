// =============================================================
// ⚖️ CleanPro Legal API - Terms & Privacy Policy
// =============================================================

import express from "express";

const router = express.Router();

// =============================================================
// 📄 Terms of Service
// =============================================================

router.get("/terms", (req, res) => {
  const terms = {
    lastUpdated: "2025-10-24",
    version: "1.0",
    content: {
      title: "CleanPro Services - Terms of Service",
      sections: [
        {
          title: "1. Acceptance of Terms",
          content: "By using CleanPro services, you agree to these terms and conditions. If you do not agree, please do not use our services."
        },
        {
          title: "2. Service Description",
          content: "CleanPro provides professional cleaning services for residential and commercial properties. Services are scheduled through our online platform."
        },
        {
          title: "3. Booking and Payment",
          content: "All bookings must be made through our platform. Payment is due at the time of booking. Cancellations must be made at least 24 hours in advance for a full refund."
        },
        {
          title: "4. Service Area",
          content: "We provide services within a 100-mile radius of our coordination points. Additional charges may apply for locations beyond 40 miles."
        },
        {
          title: "5. Liability",
          content: "CleanPro is insured and bonded. We are responsible for damages caused by our negligence during service provision."
        },
        {
          title: "6. Privacy",
          content: "We respect your privacy. Personal information is collected and used in accordance with our Privacy Policy."
        },
        {
          title: "7. Modification of Terms",
          content: "We reserve the right to modify these terms at any time. Changes will be posted on our website and take effect immediately."
        },
        {
          title: "8. Contact Information",
          content: "For questions about these terms, contact us at legal@cleanpro.com or +1-555-0123."
        }
      ]
    }
  };

  res.json({
    ok: true,
    terms
  });
});

// =============================================================
// 🔒 Privacy Policy
// =============================================================

router.get("/privacy", (req, res) => {
  const privacy = {
    lastUpdated: "2025-10-24",
    version: "1.0",
    content: {
      title: "CleanPro Services - Privacy Policy",
      sections: [
        {
          title: "1. Information We Collect",
          content: "We collect personal information including name, email, phone number, address, and payment information when you book our services."
        },
        {
          title: "2. How We Use Your Information",
          content: "We use your information to provide cleaning services, process payments, communicate about bookings, and improve our services."
        },
        {
          title: "3. Information Sharing",
          content: "We do not sell or rent your personal information. We may share information with service providers who help us operate our business."
        },
        {
          title: "4. Data Security",
          content: "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction."
        },
        {
          title: "5. Cookies and Tracking",
          content: "We use cookies to improve your experience on our website. You can disable cookies in your browser settings."
        },
        {
          title: "6. Your Rights",
          content: "You have the right to access, update, or delete your personal information. Contact us to exercise these rights."
        },
        {
          title: "7. Children's Privacy",
          content: "Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13."
        },
        {
          title: "8. Changes to Privacy Policy",
          content: "We may update this privacy policy. Changes will be posted on our website with the updated date."
        },
        {
          title: "9. Contact Us",
          content: "For privacy-related questions, contact us at privacy@cleanpro.com or +1-555-0123."
        }
      ]
    }
  };

  res.json({
    ok: true,
    privacy
  });
});

// =============================================================
// 📧 Contact Information
// =============================================================

router.get("/contact", (req, res) => {
  const contact = {
    businessName: "CleanPro Services",
    email: "contact@cleanpro.com",
    phone: "+1-555-0123",
    address: {
      street: "123 Business St",
      city: "Your City",
      state: "Your State",
      zipCode: "12345",
      country: "United States"
    },
    businessHours: {
      monday: "8:00 AM - 6:00 PM",
      tuesday: "8:00 AM - 6:00 PM",
      wednesday: "8:00 AM - 6:00 PM",
      thursday: "8:00 AM - 6:00 PM",
      friday: "8:00 AM - 6:00 PM",
      saturday: "9:00 AM - 4:00 PM",
      sunday: "Closed"
    },
    emergencyContact: "+1-555-0199",
    legalContacts: {
      legal: "legal@cleanpro.com",
      privacy: "privacy@cleanpro.com",
      support: "support@cleanpro.com"
    }
  };

  res.json({
    ok: true,
    contact
  });
});

export default router;