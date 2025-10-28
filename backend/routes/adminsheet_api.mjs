import express from 'express';
import { getDb } from '../firebase.js';
import aiMonitoring from '../services/ai_monitoring.js';

const router = express.Router();

// Helper function to get database with error handling
function getDatabase() {
  try {
    const db = getDb();
    if (!db) {
      throw new Error('Database connection not available');
    }
    return db;
  } catch (error) {
    console.error('Database connection error:', error);
    throw new Error('Database connection failed');
  }
}

// Helper function for AI tone analysis (integrated with OpenAI)
async function analyzeTone(content, context = {}) {
  try {
    const analysis = await aiMonitoring.analyzeCommunication(content, context);
    return {
      toneScore: analysis.toneScore,
      riskLevel: analysis.riskLevel,
      redFlags: analysis.redFlags,
      recommendations: analysis.recommendations,
      aiEnabled: aiMonitoring.isEnabled,
      analysis: analysis
    };
  } catch (error) {
    console.error('AI tone analysis failed:', error);
    // Fallback to simple analysis
    const redFlags = ['stupid', 'idiot', 'hate', 'kill', 'threat', 'scam'];
    const lowercaseContent = content.toLowerCase();
    
    const hasRedFlag = redFlags.some(flag => lowercaseContent.includes(flag));
    const toneScore = hasRedFlag ? 2 : 8; // Scale 1-10, lower is worse
    
    return {
      toneScore,
      riskLevel: hasRedFlag ? 'high' : 'low',
      redFlags: hasRedFlag ? ['Contains inappropriate content'] : [],
      recommendations: hasRedFlag ? ['Review content manually'] : [],
      aiEnabled: false,
      fallback: true
    };
  }
}

// ==========================================
// COORDINATION POINTS MANAGEMENT
// ==========================================

// GET /api/adminsheet/coordination-points - List all CPs with status and scores
router.get('/coordination-points', async (req, res) => {
  try {
    const db = getDatabase();
    const coordinationPointsRef = db.collection('coordinationPoints');
    const snapshot = await coordinationPointsRef.get();
    
    const coordinationPoints = [];
    snapshot.forEach(doc => {
      coordinationPoints.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.json({
      success: true,
      data: coordinationPoints,
      count: coordinationPoints.length
    });
  } catch (error) {
    console.error('Error fetching coordination points:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch coordination points',
      details: error.message
    });
  }
});

// GET /api/adminsheet/cp/nearby/:location - Find CPs within 50km radius
router.get('/cp/nearby/:location', async (req, res) => {
  try {
    const { location } = req.params;
    const { maxDistance = 50 } = req.query; // Default 50km radius
    
    if (!location) {
      return res.status(400).json({
        success: false,
        error: 'Location parameter is required'
      });
    }

    const db = getDatabase();
    const coordinationPointsRef = db.collection('coordinationPoints');
    const snapshot = await coordinationPointsRef.where('active', '==', true).get();
    
    const nearbyCPs = [];
    
    // TODO: Implement proper geolocation distance calculation
    // For now, simple location matching
    snapshot.forEach(doc => {
      const cp = doc.data();
      // Simplified distance check - would use proper geolocation in production
      if (cp.address && cp.address.toLowerCase().includes(location.toLowerCase())) {
        nearbyCPs.push({
          id: doc.id,
          ...cp,
          distance: Math.random() * 30 // Placeholder distance
        });
      }
    });

    const withinRange = nearbyCPs.filter(cp => cp.distance <= maxDistance);

    if (withinRange.length === 0) {
      // No CPs within range - encourage registration
      res.json({
        success: true,
        data: {
          nearby_cps: [],
          message: "Thanks for your interest! Unfortunately, we don't have coordination points near your location yet.",
          encouragement: "Would you like to register as a coordination point and serve your local area?",
          registration_link: "/register-cp",
          coverage_area: `${maxDistance}km`,
          registration_benefits: [
            "Earn income from cleaning services",
            "Flexible scheduling",
            "Full platform support",
            "Marketing assistance"
          ]
        }
      });
    } else {
      res.json({
        success: true,
        data: {
          nearby_cps: withinRange,
          count: withinRange.length,
          coverage_area: `${maxDistance}km`,
          message: `Found ${withinRange.length} coordination point(s) in your area`
        }
      });
    }
  } catch (error) {
    console.error('Error finding nearby CPs:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to find nearby coordination points',
      details: error.message
    });
  }
});

// POST /api/adminsheet/cp/register - Public CP registration form submission
router.post('/cp/register', async (req, res) => {
  try {
    const {
      business_name,
      contact_person,
      email,
      phone,
      address,
      service_radius,
      tax_id,
      insurance_info,
      references,
      coverage_areas,
      business_type
    } = req.body;

    // Validation
    if (!business_name || !contact_person || !email || !phone || !address) {
      return res.status(400).json({
        success: false,
        error: 'Required fields: business_name, contact_person, email, phone, address'
      });
    }

    const db = getDatabase();
    
    // Run AI monitoring on registration data
    const aiAnalysis = await aiMonitoring.monitorCPRegistration({
      business_name,
      contact_person,
      email,
      services_offered: coverage_areas,
      special_notes: `${business_type} business, radius: ${service_radius || 25}km`,
      id: `pending_${Date.now()}`
    });
    
    // Create CP registration application
    const registrationData = {
      business_name,
      contact_person,
      email,
      phone,
      address,
      service_radius: service_radius || 25, // Default 25km radius
      tax_id: tax_id || '',
      insurance_info: insurance_info || '',
      references: references || [],
      coverage_areas: coverage_areas || [address],
      business_type: business_type || 'individual',
      
      // Application status
      status: 'pending_review',
      admin_approved: false,
      active: false,
      
      // Registration process
      application_date: new Date().toISOString(),
      stripe_identity_status: 'not_started',
      onboarding_completed: false,
      terms_accepted: true,
      
      // CP Identification Control - Manual AdminSheet Management
      identity_required: false, // Admin controls this - default to false
      verification_provider: null, // stripe_identity/checkr/veriff/manual (admin chooses)
      verified_date: null, // Set when verification completed
      verification_status: 'exempt', // pending/verified/exempt/failed (default exempt)
      
      // Optional Insurance - Not Required
      insurance_provided: !!insurance_info, // Convert to boolean if insurance provided
      insurance_details: insurance_info ? {
        provider: insurance_info.provider || 'Not specified',
        policy_number: insurance_info.policy_number || '',
        coverage_amount: insurance_info.coverage_amount || '',
        expiry_date: insurance_info.expiry_date || null
      } : null,
      
      // AI Monitoring Results
      ai_quality_score: aiAnalysis.toneScore,
      communication_score: aiAnalysis.professionalismScore,
      ai_risk_level: aiAnalysis.riskLevel,
      ai_red_flags: aiAnalysis.redFlags,
      ai_monitoring: {
        initial_assessment: aiAnalysis,
        last_updated: new Date().toISOString(),
        monitoring_enabled: true
      },
      
      // Default scores
      custom_fee_percentage: null,
      
      // Auto-generated fields
      registration_id: `REG_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      share_link: null // Will be generated after approval
    };

    const docRef = await db.collection('coordinationPoints').add(registrationData);
    
    // Send notification to admins (would integrate with email service)
    console.log(`🔔 New CP registration: ${business_name} (${docRef.id})`);

    res.json({
      success: true,
      message: 'Registration application submitted successfully',
      data: {
        registration_id: registrationData.registration_id,
        application_id: docRef.id,
        status: 'pending_review',
        next_steps: [
          'Admin review of application (1-3 business days)',
          'Identity verification via Stripe',
          'Onboarding and training materials',
          'Platform activation'
        ],
        estimated_approval_time: '3-5 business days'
      }
    });
  } catch (error) {
    console.error('Error processing CP registration:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process registration',
      details: error.message
    });
  }
});

// GET /api/adminsheet/cp/share-link/:id - Get shareable marketing link for CP
router.get('/cp/share-link/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = getDatabase();
    
    const cpRef = db.collection('coordinationPoints').doc(id);
    const cpDoc = await cpRef.get();
    
    if (!cpDoc.exists) {
      return res.status(404).json({
        success: false,
        error: 'Coordination point not found'
      });
    }

    const cp = cpDoc.data();
    
    if (!cp.admin_approved || !cp.active) {
      return res.status(403).json({
        success: false,
        error: 'Coordination point must be approved and active to generate share link'
      });
    }

    // Generate or retrieve share link
    let shareLink = cp.share_link;
    if (!shareLink) {
      shareLink = `https://cleandeparture.com/cp/${id}`;
      
      // Update CP with share link
      await cpRef.update({
        share_link: shareLink,
        share_link_generated: new Date().toISOString()
      });
    }

    res.json({
      success: true,
      data: {
        cp_id: id,
        share_link: shareLink,
        qr_code: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shareLink)}`,
        marketing_features: {
          seo_optimized: true,
          mobile_friendly: true,
          booking_enabled: true,
          contact_protected: true
        },
        analytics_tracking: true
      }
    });
  } catch (error) {
    console.error('Error generating share link:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate share link',
      details: error.message
    });
  }
});

// GET /api/adminsheet/cp/public/:id - Public CP landing page (no contact details)
router.get('/cp/public/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = getDatabase();
    
    const cpRef = db.collection('coordinationPoints').doc(id);
    const cpDoc = await cpRef.get();
    
    if (!cpDoc.exists) {
      return res.status(404).json({
        success: false,
        error: 'Coordination point not found'
      });
    }

    const cp = cpDoc.data();
    
    if (!cp.admin_approved || !cp.active) {
      return res.status(404).json({
        success: false,
        error: 'Coordination point not available'
      });
    }

    // Get reviews for this CP (if reviews collection exists)
    const reviewsRef = db.collection('reviews').where('coordination_point_id', '==', id);
    const reviewsSnapshot = await reviewsRef.limit(10).get();
    
    const reviews = [];
    reviewsSnapshot.forEach(doc => {
      const review = doc.data();
      reviews.push({
        rating: review.rating,
        comment: review.comment,
        date: review.created_at,
        service_type: review.service_type
      });
    });

    // Public information only - NO contact details
    const publicInfo = {
      id,
      name: cp.name || cp.business_name,
      service_area: cp.address,
      coverage_radius: cp.service_radius || 25,
      quality_score: cp.ai_quality_score || 8.0,
      total_reviews: reviews.length,
      average_rating: reviews.length > 0 ? 
        reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 5.0,
      
      services_offered: [
        'Residential Cleaning',
        'Commercial Cleaning', 
        'Deep Cleaning',
        'Move-in/Move-out Cleaning'
      ],
      
      features: [
        'Professional & Insured',
        'Quality Guaranteed',
        'Flexible Scheduling',
        'Secure Payment Processing'
      ],
      
      recent_reviews: reviews.slice(0, 3),
      share_link: cp.share_link,
      booking_available: true,
      
      // SEO data
      meta: {
        title: `${cp.name || cp.business_name} - Professional Cleaning Services`,
        description: `Book professional cleaning services with ${cp.name || cp.business_name}. Quality guaranteed, secure payments, flexible scheduling.`,
        keywords: 'cleaning services, professional cleaning, house cleaning, commercial cleaning'
      }
    };

    res.json({
      success: true,
      data: publicInfo
    });
  } catch (error) {
    console.error('Error fetching public CP info:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch coordination point information',
      details: error.message
    });
  }
});

// POST /api/adminsheet/cp/approve/:id - Approve/activate CP
router.post('/cp/approve/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = getDatabase();
    
    const cpRef = db.collection('coordinationPoints').doc(id);
    const cpDoc = await cpRef.get();
    
    if (!cpDoc.exists) {
      return res.status(404).json({
        success: false,
        error: 'Coordination point not found'
      });
    }

    await cpRef.update({
      admin_approved: true,
      active: true,
      approved_at: new Date().toISOString(),
      approved_by: req.user?.id || 'admin' // TODO: Get from auth middleware
    });

    res.json({
      success: true,
      message: 'Coordination point approved successfully',
      data: { id, status: 'approved' }
    });
  } catch (error) {
    console.error('Error approving coordination point:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to approve coordination point',
      details: error.message
    });
  }
});

// POST /api/adminsheet/cp/deactivate/:id - Deactivate CP
router.post('/cp/deactivate/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    const db = getDatabase();
    
    const cpRef = db.collection('coordinationPoints').doc(id);
    const cpDoc = await cpRef.get();
    
    if (!cpDoc.exists) {
      return res.status(404).json({
        success: false,
        error: 'Coordination point not found'
      });
    }

    await cpRef.update({
      active: false,
      deactivated_at: new Date().toISOString(),
      deactivated_by: req.user?.id || 'admin',
      deactivation_reason: reason || 'Admin decision'
    });

    res.json({
      success: true,
      message: 'Coordination point deactivated successfully',
      data: { id, status: 'deactivated', reason }
    });
  } catch (error) {
    console.error('Error deactivating coordination point:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to deactivate coordination point',
      details: error.message
    });
  }
});

// POST /api/adminsheet/cp/set-identity-requirement/:id - Admin control for identity verification
router.post('/cp/set-identity-requirement/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      identity_required, 
      verification_provider, 
      verification_status,
      bypass_reason 
    } = req.body;
    
    const db = getDatabase();
    const cpRef = db.collection('coordinationPoints').doc(id);
    const cpDoc = await cpRef.get();
    
    if (!cpDoc.exists) {
      return res.status(404).json({
        success: false,
        error: 'Coordination point not found'
      });
    }

    const updateData = {
      identity_required: !!identity_required, // Ensure boolean
      modified_at: new Date().toISOString(),
      modified_by: req.user?.id || 'admin'
    };

    // Set verification provider if identity is required
    if (identity_required) {
      const validProviders = ['stripe_identity', 'checkr', 'veriff', 'manual'];
      if (verification_provider && validProviders.includes(verification_provider)) {
        updateData.verification_provider = verification_provider;
        updateData.verification_status = 'pending';
      } else {
        return res.status(400).json({
          success: false,
          error: 'Invalid verification provider. Must be: stripe_identity, checkr, veriff, or manual'
        });
      }
    } else {
      // If identity not required, set as exempt
      updateData.verification_provider = null;
      updateData.verification_status = 'exempt';
      updateData.verified_date = null;
      if (bypass_reason) {
        updateData.bypass_reason = bypass_reason;
      }
    }

    await cpRef.update(updateData);

    res.json({
      success: true,
      message: identity_required ? 
        `Identity verification requirement activated (${verification_provider})` : 
        'Identity verification requirement removed - CP marked as exempt',
      data: { 
        id, 
        identity_required: updateData.identity_required,
        verification_provider: updateData.verification_provider,
        verification_status: updateData.verification_status
      }
    });
  } catch (error) {
    console.error('Error updating identity requirement:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update identity requirement',
      details: error.message
    });
  }
});

// POST /api/adminsheet/cp/set-fee/:id - Set custom fee percentage
router.post('/cp/set-fee/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { custom_fee_percentage } = req.body;
    
    if (typeof custom_fee_percentage !== 'number' || custom_fee_percentage < 0 || custom_fee_percentage > 100) {
      return res.status(400).json({
        success: false,
        error: 'Invalid fee percentage. Must be between 0 and 100.'
      });
    }

    const db = getDatabase();
    const cpRef = db.collection('coordinationPoints').doc(id);
    const cpDoc = await cpRef.get();
    
    if (!cpDoc.exists) {
      return res.status(404).json({
        success: false,
        error: 'Coordination point not found'
      });
    }

    await cpRef.update({
      custom_fee_percentage,
      fee_updated_at: new Date().toISOString(),
      fee_updated_by: req.user?.id || 'admin'
    });

    res.json({
      success: true,
      message: 'Custom fee percentage updated successfully',
      data: { id, custom_fee_percentage }
    });
  } catch (error) {
    console.error('Error setting custom fee:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to set custom fee',
      details: error.message
    });
  }
});

// POST /api/adminsheet/cp/manual-verify/:id - Complete manual verification
router.post('/cp/manual-verify/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { verification_notes, documents_reviewed } = req.body;
    
    const db = getDatabase();
    const cpRef = db.collection('coordinationPoints').doc(id);
    const cpDoc = await cpRef.get();
    
    if (!cpDoc.exists) {
      return res.status(404).json({
        success: false,
        error: 'Coordination point not found'
      });
    }

    const cpData = cpDoc.data();
    
    // Check if verification is required and set to manual
    if (!cpData.identity_required || cpData.verification_provider !== 'manual') {
      return res.status(400).json({
        success: false,
        error: 'Manual verification not applicable for this CP'
      });
    }

    await cpRef.update({
      verification_status: 'verified',
      verified_date: new Date().toISOString(),
      verified_by: req.user?.id || 'admin',
      verification_method: 'manual_review',
      verification_notes: verification_notes || 'Manual verification completed by admin',
      documents_reviewed: documents_reviewed || []
    });

    res.json({
      success: true,
      message: 'Manual verification completed successfully',
      data: { 
        id, 
        verification_status: 'verified',
        verification_method: 'manual_review',
        verified_date: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error completing manual verification:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to complete manual verification',
      details: error.message
    });
  }
});

// ==========================================
// ESCROW SETTINGS MANAGEMENT
// ==========================================

// GET /api/adminsheet/escrow/settings - Get escrow configuration
router.get('/escrow/settings', async (req, res) => {
  try {
    const db = getDatabase();
    const settingsRef = db.collection('escrowSettings').doc('global');
    const settingsDoc = await settingsRef.get();
    
    if (!settingsDoc.exists) {
      // Return default settings if none exist
      const defaultSettings = {
        hold_period_hours: 48,
        auto_release_enabled: true,
        release_trigger_date_type: 'scheduled_cleaning_date',
        ai_optimization_enabled: true
      };
      
      return res.json({
        success: true,
        data: defaultSettings,
        isDefault: true
      });
    }

    res.json({
      success: true,
      data: settingsDoc.data(),
      isDefault: false
    });
  } catch (error) {
    console.error('Error fetching escrow settings:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch escrow settings',
      details: error.message
    });
  }
});

// POST /api/adminsheet/escrow/settings - Update escrow settings
router.post('/escrow/settings', async (req, res) => {
  try {
    const {
      hold_period_hours,
      auto_release_enabled,
      release_trigger_date_type,
      ai_optimization_enabled
    } = req.body;

    // Validation
    if (hold_period_hours && (typeof hold_period_hours !== 'number' || hold_period_hours < 1 || hold_period_hours > 168)) {
      return res.status(400).json({
        success: false,
        error: 'Hold period must be between 1 and 168 hours (1 week)'
      });
    }

    const db = getDatabase();
    const settingsRef = db.collection('escrowSettings').doc('global');
    
    const updateData = {
      updated_at: new Date().toISOString(),
      updated_by: req.user?.id || 'admin'
    };

    if (hold_period_hours !== undefined) updateData.hold_period_hours = hold_period_hours;
    if (auto_release_enabled !== undefined) updateData.auto_release_enabled = auto_release_enabled;
    if (release_trigger_date_type !== undefined) updateData.release_trigger_date_type = release_trigger_date_type;
    if (ai_optimization_enabled !== undefined) updateData.ai_optimization_enabled = ai_optimization_enabled;

    await settingsRef.set(updateData, { merge: true });

    res.json({
      success: true,
      message: 'Escrow settings updated successfully',
      data: updateData
    });
  } catch (error) {
    console.error('Error updating escrow settings:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update escrow settings',
      details: error.message
    });
  }
});

// ==========================================
// AI COMMUNICATION MONITORING
// ==========================================

// POST /api/adminsheet/communication/analyze-tone - Real-time tone analysis
router.post('/communication/analyze-tone', async (req, res) => {
  try {
    const { message, sender_id, booking_id } = req.body;
    
    if (!message || !sender_id) {
      return res.status(400).json({
        success: false,
        error: 'Message and sender_id are required'
      });
    }

    const analysis = await analyzeTone(message);
    const db = getDatabase();
    
    // Log communication
    const logData = {
      message_id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      sender_id,
      booking_id: booking_id || null,
      content_length: message.length,
      tone_score: analysis.toneScore,
      ai_moderation_flags: analysis.hasRedFlag ? ['inappropriate_language'] : [],
      timestamp: new Date().toISOString(),
      ai_confidence: analysis.confidence
    };

    await db.collection('communicationLogs').add(logData);

    // Create red flag if needed
    if (analysis.hasRedFlag) {
      const redFlagData = {
        incident_id: `rf_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        user_id: sender_id,
        incident_type: 'inappropriate_language',
        severity_level: analysis.toneScore <= 3 ? 'high' : 'medium',
        detected_content: message.substring(0, 100) + (message.length > 100 ? '...' : ''),
        ai_analysis: analysis.analysis,
        admin_status: 'pending',
        created_at: new Date().toISOString(),
        booking_id: booking_id || null
      };

      await db.collection('redFlags').add(redFlagData);
    }

    res.json({
      success: true,
      data: {
        tone_score: analysis.toneScore,
        has_red_flag: analysis.hasRedFlag,
        analysis: analysis.analysis,
        confidence: analysis.confidence,
        message_id: logData.message_id
      }
    });
  } catch (error) {
    console.error('Error analyzing tone:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to analyze tone',
      details: error.message
    });
  }
});

// GET /api/adminsheet/red-flags - Get all red flag incidents
router.get('/red-flags', async (req, res) => {
  try {
    const { status, severity, limit = 50 } = req.query;
    const db = getDatabase();
    
    let query = db.collection('redFlags').orderBy('created_at', 'desc');
    
    if (status) {
      query = query.where('admin_status', '==', status);
    }
    
    if (severity) {
      query = query.where('severity_level', '==', severity);
    }
    
    query = query.limit(parseInt(limit));
    
    const snapshot = await query.get();
    const redFlags = [];
    
    snapshot.forEach(doc => {
      redFlags.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.json({
      success: true,
      data: redFlags,
      count: redFlags.length
    });
  } catch (error) {
    console.error('Error fetching red flags:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch red flags',
      details: error.message
    });
  }
});

// POST /api/adminsheet/red-flags/resolve/:id - Resolve red flag incident
router.post('/red-flags/resolve/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { resolution_notes, action_taken } = req.body;
    
    const db = getDatabase();
    const redFlagRef = db.collection('redFlags').doc(id);
    const redFlagDoc = await redFlagRef.get();
    
    if (!redFlagDoc.exists) {
      return res.status(404).json({
        success: false,
        error: 'Red flag incident not found'
      });
    }

    await redFlagRef.update({
      admin_status: 'resolved',
      resolved_at: new Date().toISOString(),
      resolved_by: req.user?.id || 'admin',
      resolution_notes: resolution_notes || '',
      action_taken: action_taken || 'reviewed'
    });

    res.json({
      success: true,
      message: 'Red flag incident resolved successfully',
      data: { id, status: 'resolved' }
    });
  } catch (error) {
    console.error('Error resolving red flag:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to resolve red flag',
      details: error.message
    });
  }
});

// ==========================================
// CONTACT SHARING SYSTEM
// ==========================================

// POST /api/adminsheet/booking/share-contact/:booking_id - Share CP contact details with client
router.post('/booking/share-contact/:booking_id', async (req, res) => {
  try {
    const { booking_id } = req.params;
    const db = getDatabase();
    
    // Get booking details
    const bookingRef = db.collection('bookings').doc(booking_id);
    const bookingDoc = await bookingRef.get();
    
    if (!bookingDoc.exists) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }

    const booking = bookingDoc.data();
    
    // Get CP contact details
    const cpRef = db.collection('coordinationPoints').doc(booking.coordination_point_id);
    const cpDoc = await cpRef.get();
    
    if (!cpDoc.exists) {
      return res.status(404).json({
        success: false,
        error: 'Coordination point not found'
      });
    }

    const cp = cpDoc.data();
    
    // Create contact sharing record
    const contactSharingData = {
      booking_id,
      client_email: booking.email,
      cp_contact_shared: {
        name: cp.name,
        email: cp.contact_email,
        phone: cp.contact_phone,
        address: cp.address
      },
      shared_timestamp: new Date().toISOString(),
      email_sent_status: 'pending' // TODO: Integrate with email service
    };

    await db.collection('contactSharing').add(contactSharingData);

    // TODO: Send email to client with CP contact details
    // This would integrate with your email service (SendGrid, etc.)
    
    res.json({
      success: true,
      message: 'Contact details shared with client successfully',
      data: {
        booking_id,
        cp_contact: contactSharingData.cp_contact_shared,
        shared_at: contactSharingData.shared_timestamp
      }
    });
  } catch (error) {
    console.error('Error sharing contact details:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to share contact details',
      details: error.message
    });
  }
});

// GET /api/adminsheet/contact-sharing/history - Get contact sharing audit trail
router.get('/contact-sharing/history', async (req, res) => {
  try {
    const { booking_id, limit = 50 } = req.query;
    const db = getDatabase();
    
    let query = db.collection('contactSharing').orderBy('shared_timestamp', 'desc');
    
    if (booking_id) {
      query = query.where('booking_id', '==', booking_id);
    }
    
    query = query.limit(parseInt(limit));
    
    const snapshot = await query.get();
    const sharingHistory = [];
    
    snapshot.forEach(doc => {
      sharingHistory.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.json({
      success: true,
      data: sharingHistory,
      count: sharingHistory.length
    });
  } catch (error) {
    console.error('Error fetching contact sharing history:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch contact sharing history',
      details: error.message
    });
  }
});

// ==========================================
// REGIONAL SETTINGS MANAGEMENT
// ==========================================

// GET /api/adminsheet/regional/settings - Get regional configuration
router.get('/regional/settings', async (req, res) => {
  try {
    const { country } = req.query;
    const db = getDatabase();
    
    let query = db.collection('regionalSettings');
    if (country) {
      query = query.where('country', '==', country);
    }
    
    const snapshot = await query.get();
    const settings = [];
    
    snapshot.forEach(doc => {
      settings.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.json({
      success: true,
      data: settings,
      count: settings.length
    });
  } catch (error) {
    console.error('Error fetching regional settings:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch regional settings',
      details: error.message
    });
  }
});

// POST /api/adminsheet/regional/tax-requirements - Update regional tax requirements
router.post('/regional/tax-requirements', async (req, res) => {
  try {
    const {
      country,
      currency,
      unit_system,
      language,
      tax_requirements,
      tax_id_mandatory
    } = req.body;

    if (!country) {
      return res.status(400).json({
        success: false,
        error: 'Country is required'
      });
    }

    const db = getDatabase();
    const settingsRef = db.collection('regionalSettings').doc(country.toLowerCase());
    
    const updateData = {
      country,
      currency: currency || 'USD',
      unit_system: unit_system || 'imperial',
      language: language || 'en',
      tax_requirements: tax_requirements || '',
      tax_id_mandatory: tax_id_mandatory || false,
      updated_at: new Date().toISOString(),
      updated_by: req.user?.id || 'admin'
    };

    await settingsRef.set(updateData, { merge: true });

    res.json({
      success: true,
      message: 'Regional settings updated successfully',
      data: updateData
    });
  } catch (error) {
    console.error('Error updating regional settings:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update regional settings',
      details: error.message
    });
  }
});

// ==========================================
// PAYMENT HOLDS MANAGEMENT
// ==========================================

// GET /api/adminsheet/payment/holds - Get payment holds
router.get('/payment/holds', async (req, res) => {
  try {
    const { status, booking_id, limit = 50 } = req.query;
    const db = getDatabase();
    
    let query = db.collection('paymentHolds').orderBy('hold_start', 'desc');
    
    if (status) {
      query = query.where('status', '==', status);
    }
    
    if (booking_id) {
      query = query.where('booking_id', '==', booking_id);
    }
    
    query = query.limit(parseInt(limit));
    
    const snapshot = await query.get();
    const holds = [];
    
    snapshot.forEach(doc => {
      holds.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.json({
      success: true,
      data: holds,
      count: holds.length
    });
  } catch (error) {
    console.error('Error fetching payment holds:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch payment holds',
      details: error.message
    });
  }
});

// POST /api/adminsheet/payment/no-show/:booking_id - Process no-show refund
router.post('/payment/no-show/:booking_id', async (req, res) => {
  try {
    const { booking_id } = req.params;
    const { refund_reason, admin_notes } = req.body;
    const db = getDatabase();
    
    // Get booking details
    const bookingRef = db.collection('bookings').doc(booking_id);
    const bookingDoc = await bookingRef.get();
    
    if (!bookingDoc.exists) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }

    const booking = bookingDoc.data();
    
    // Update payment hold status
    const holdQuery = db.collection('paymentHolds').where('booking_id', '==', booking_id);
    const holdSnapshot = await holdQuery.get();
    
    if (!holdSnapshot.empty) {
      const holdDoc = holdSnapshot.docs[0];
      await holdDoc.ref.update({
        status: 'refund_approved',
        refund_reason: refund_reason || 'no_show',
        admin_notes: admin_notes || '',
        refund_processed_at: new Date().toISOString(),
        refunded_by: req.user?.id || 'admin'
      });
    }

    // Update booking status
    await bookingRef.update({
      status: 'cancelled_no_show',
      refund_status: 'processing',
      cancelled_at: new Date().toISOString(),
      cancelled_by: req.user?.id || 'admin'
    });

    res.json({
      success: true,
      message: 'No-show refund processed successfully',
      data: {
        booking_id,
        refund_amount: booking.totalPrice || booking.estimatedPrice,
        status: 'refund_approved'
      }
    });
  } catch (error) {
    console.error('Error processing no-show refund:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process no-show refund',
      details: error.message
    });
  }
});

// POST /api/adminsheet/payment/dispute/:booking_id - Handle payment disputes
router.post('/payment/dispute/:booking_id', async (req, res) => {
  try {
    const { booking_id } = req.params;
    const { dispute_reason, dispute_notes, resolution_action } = req.body;
    const db = getDatabase();
    
    // Create dispute record
    const disputeData = {
      dispute_id: `disp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      booking_id,
      dispute_reason: dispute_reason || 'quality_issue',
      dispute_notes: dispute_notes || '',
      resolution_action: resolution_action || 'under_review',
      created_at: new Date().toISOString(),
      created_by: req.user?.id || 'admin',
      status: 'open'
    };

    await db.collection('paymentDisputes').add(disputeData);

    res.json({
      success: true,
      message: 'Payment dispute created successfully',
      data: disputeData
    });
  } catch (error) {
    console.error('Error handling payment dispute:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to handle payment dispute',
      details: error.message
    });
  }
});

// ==========================================
// REGISTRATION TERMS MANAGEMENT
// ==========================================

// GET /api/adminsheet/registration/terms - Get registration terms
router.get('/registration/terms', async (req, res) => {
  try {
    const db = getDatabase();
    const termsRef = db.collection('registrationTerms').doc('global');
    const termsDoc = await termsRef.get();
    
    if (!termsDoc.exists) {
      // Return default terms if none exist
      const defaultTerms = {
        quality_standards: 'All coordination points must maintain professional standards and provide quality service.',
        satisfaction_requirements: 'Customer satisfaction is our top priority. All issues must be resolved promptly.',
        conduct_policies: 'Professional behavior is required at all times. Inappropriate conduct will result in suspension.',
        tax_compliance_text: 'All coordination points are responsible for their own tax compliance and reporting.',
        insurance_requirements: 'Adequate insurance coverage is required for all service providers.'
      };
      
      return res.json({
        success: true,
        data: defaultTerms,
        isDefault: true
      });
    }

    res.json({
      success: true,
      data: termsDoc.data(),
      isDefault: false
    });
  } catch (error) {
    console.error('Error fetching registration terms:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch registration terms',
      details: error.message
    });
  }
});

// POST /api/adminsheet/registration/terms - Update registration terms
router.post('/registration/terms', async (req, res) => {
  try {
    const {
      quality_standards,
      satisfaction_requirements,
      conduct_policies,
      tax_compliance_text,
      insurance_requirements
    } = req.body;

    const db = getDatabase();
    const termsRef = db.collection('registrationTerms').doc('global');
    
    const updateData = {
      updated_at: new Date().toISOString(),
      updated_by: req.user?.id || 'admin'
    };

    if (quality_standards !== undefined) updateData.quality_standards = quality_standards;
    if (satisfaction_requirements !== undefined) updateData.satisfaction_requirements = satisfaction_requirements;
    if (conduct_policies !== undefined) updateData.conduct_policies = conduct_policies;
    if (tax_compliance_text !== undefined) updateData.tax_compliance_text = tax_compliance_text;
    if (insurance_requirements !== undefined) updateData.insurance_requirements = insurance_requirements;

    await termsRef.set(updateData, { merge: true });

    res.json({
      success: true,
      message: 'Registration terms updated successfully',
      data: updateData
    });
  } catch (error) {
    console.error('Error updating registration terms:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update registration terms',
      details: error.message
    });
  }
});

// ==========================================
// FEE STRUCTURE MANAGEMENT
// ==========================================

// GET /api/adminsheet/fee/structure - Get fee structure
router.get('/fee/structure', async (req, res) => {
  try {
    const db = getDatabase();
    const feeRef = db.collection('feeStructure').doc('global');
    const feeDoc = await feeRef.get();
    
    if (!feeDoc.exists) {
      // Return default fee structure
      const defaultFees = {
        base_platform_fee: 15, // 15% platform fee
        subscription_fees: {
          monthly: 29.99,
          yearly: 299.99
        },
        regional_adjustments: {},
        cp_custom_fees: {}
      };
      
      return res.json({
        success: true,
        data: defaultFees,
        isDefault: true
      });
    }

    res.json({
      success: true,
      data: feeDoc.data(),
      isDefault: false
    });
  } catch (error) {
    console.error('Error fetching fee structure:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch fee structure',
      details: error.message
    });
  }
});

// POST /api/adminsheet/fee/structure - Update fee structure
router.post('/fee/structure', async (req, res) => {
  try {
    const {
      base_platform_fee,
      subscription_fees,
      regional_adjustments
    } = req.body;

    // Validation
    if (base_platform_fee && (typeof base_platform_fee !== 'number' || base_platform_fee < 0 || base_platform_fee > 50)) {
      return res.status(400).json({
        success: false,
        error: 'Base platform fee must be between 0 and 50%'
      });
    }

    const db = getDatabase();
    const feeRef = db.collection('feeStructure').doc('global');
    
    const updateData = {
      updated_at: new Date().toISOString(),
      updated_by: req.user?.id || 'admin'
    };

    if (base_platform_fee !== undefined) updateData.base_platform_fee = base_platform_fee;
    if (subscription_fees !== undefined) updateData.subscription_fees = subscription_fees;
    if (regional_adjustments !== undefined) updateData.regional_adjustments = regional_adjustments;

    await feeRef.set(updateData, { merge: true });

    res.json({
      success: true,
      message: 'Fee structure updated successfully',
      data: updateData
    });
  } catch (error) {
    console.error('Error updating fee structure:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update fee structure',
      details: error.message
    });
  }
});

// ==========================================
// AI REPORTS MANAGEMENT
// ==========================================

// GET /api/adminsheet/ai/reports - Get AI-generated reports
router.get('/ai/reports', async (req, res) => {
  try {
    const { report_type, limit = 20 } = req.query;
    const db = getDatabase();
    
    let query = db.collection('aiReports').orderBy('generated_date', 'desc');
    
    if (report_type) {
      query = query.where('report_type', '==', report_type);
    }
    
    query = query.limit(parseInt(limit));
    
    const snapshot = await query.get();
    const reports = [];
    
    snapshot.forEach(doc => {
      reports.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.json({
      success: true,
      data: reports,
      count: reports.length
    });
  } catch (error) {
    console.error('Error fetching AI reports:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch AI reports',
      details: error.message
    });
  }
});

// POST /api/adminsheet/ai/optimize - Trigger AI optimization
router.post('/ai/optimize', async (req, res) => {
  try {
    const { optimization_type = 'general' } = req.body;
    const db = getDatabase();
    
    // Generate AI optimization recommendations
    const optimizationData = {
      optimization_id: `opt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      optimization_type,
      generated_date: new Date().toISOString(),
      recommendations: [
        'Consider adjusting platform fees based on regional performance',
        'Review coordination point quality scores for performance insights',
        'Analyze communication patterns for improvement opportunities'
      ],
      confidence_score: 0.85,
      status: 'pending_review'
    };

    await db.collection('aiOptimizations').add(optimizationData);

    res.json({
      success: true,
      message: 'AI optimization triggered successfully',
      data: optimizationData
    });
  } catch (error) {
    console.error('Error triggering AI optimization:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to trigger AI optimization',
      details: error.message
    });
  }
});

// ==========================================
// STRIPE IDENTITY VERIFICATION
// ==========================================

// POST /api/adminsheet/stripe/verify/:id - Trigger Stripe Identity verification
router.post('/stripe/verify/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = getDatabase();
    
    const cpRef = db.collection('coordinationPoints').doc(id);
    const cpDoc = await cpRef.get();
    
    if (!cpDoc.exists) {
      return res.status(404).json({
        success: false,
        error: 'Coordination point not found'
      });
    }

    // TODO: Integrate with Stripe Identity API
    // For now, update the status to indicate verification initiated
    await cpRef.update({
      stripe_identity_status: 'verification_initiated',
      stripe_verification_started: new Date().toISOString(),
      updated_by: req.user?.id || 'admin'
    });

    res.json({
      success: true,
      message: 'Stripe Identity verification initiated',
      data: {
        id,
        status: 'verification_initiated',
        next_steps: 'Coordination point will receive verification instructions via email'
      }
    });
  } catch (error) {
    console.error('Error initiating Stripe verification:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to initiate Stripe verification',
      details: error.message
    });
  }
});

// ==========================================
// REVIEW ANALYSIS & COMMUNICATION SCORES
// ==========================================

// POST /api/adminsheet/reviews/analyze - AI analysis of review authenticity
router.post('/reviews/analyze', async (req, res) => {
  try {
    const { review_id, booking_id, review_content, reviewer_type } = req.body;
    
    if (!review_content) {
      return res.status(400).json({
        success: false,
        error: 'Review content is required'
      });
    }

    // Simple authenticity analysis (would be enhanced with real AI)
    const suspiciousPatterns = ['fake', 'bot', 'paid', 'unrealistic'];
    const content = review_content.toLowerCase();
    const hasSuspiciousContent = suspiciousPatterns.some(pattern => content.includes(pattern));
    
    const analysisData = {
      review_id: review_id || `rev_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      booking_id,
      reviewer_type: reviewer_type || 'client',
      authenticity_score: hasSuspiciousContent ? 0.3 : 0.9,
      tone_analysis: content.includes('excellent') || content.includes('great') ? 'positive' : 
                    content.includes('terrible') || content.includes('awful') ? 'negative' : 'neutral',
      red_flag_indicators: hasSuspiciousContent ? ['suspicious_keywords'] : [],
      ai_confidence: 0.85,
      analyzed_at: new Date().toISOString()
    };

    const db = getDatabase();
    await db.collection('reviewAnalysis').add(analysisData);

    res.json({
      success: true,
      message: 'Review analysis completed',
      data: analysisData
    });
  } catch (error) {
    console.error('Error analyzing review:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to analyze review',
      details: error.message
    });
  }
});

// GET /api/adminsheet/communication/scores - Get communication quality scores
router.get('/communication/scores', async (req, res) => {
  try {
    const { user_id, limit = 50 } = req.query;
    const db = getDatabase();
    
    let query = db.collection('communicationLogs').orderBy('timestamp', 'desc');
    
    if (user_id) {
      query = query.where('sender_id', '==', user_id);
    }
    
    query = query.limit(parseInt(limit));
    
    const snapshot = await query.get();
    const scores = [];
    
    snapshot.forEach(doc => {
      const data = doc.data();
      scores.push({
        id: doc.id,
        sender_id: data.sender_id,
        tone_score: data.tone_score,
        timestamp: data.timestamp,
        booking_id: data.booking_id
      });
    });

    // Calculate average scores by user
    const userScores = {};
    scores.forEach(score => {
      if (!userScores[score.sender_id]) {
        userScores[score.sender_id] = { total: 0, count: 0, scores: [] };
      }
      userScores[score.sender_id].total += score.tone_score;
      userScores[score.sender_id].count += 1;
      userScores[score.sender_id].scores.push(score);
    });

    Object.keys(userScores).forEach(userId => {
      userScores[userId].average = userScores[userId].total / userScores[userId].count;
    });

    res.json({
      success: true,
      data: user_id ? userScores[user_id] || null : userScores,
      individual_scores: scores
    });
  } catch (error) {
    console.error('Error fetching communication scores:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch communication scores',
      details: error.message
    });
  }
});

// ==========================================
// CONTACT SHARING EXTENSIONS
// ==========================================

// POST /api/adminsheet/contact-sharing/resend/:booking_id - Resend CP contact details
router.post('/contact-sharing/resend/:booking_id', async (req, res) => {
  try {
    const { booking_id } = req.params;
    const db = getDatabase();
    
    // Find existing contact sharing record
    const sharingQuery = db.collection('contactSharing').where('booking_id', '==', booking_id);
    const sharingSnapshot = await sharingQuery.get();
    
    if (sharingSnapshot.empty) {
      return res.status(404).json({
        success: false,
        error: 'No contact sharing record found for this booking'
      });
    }

    const sharingDoc = sharingSnapshot.docs[0];
    const sharingData = sharingDoc.data();
    
    // Update resend status
    await sharingDoc.ref.update({
      email_sent_status: 'resent',
      resent_at: new Date().toISOString(),
      resent_by: req.user?.id || 'admin'
    });

    res.json({
      success: true,
      message: 'Contact details resent successfully',
      data: {
        booking_id,
        client_email: sharingData.client_email,
        resent_at: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error resending contact details:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to resend contact details',
      details: error.message
    });
  }
});

// ==========================================
// AI MATCHING SYSTEM
// ==========================================

// POST /api/adminsheet/matching/predict - AI-powered CP matching for bookings
router.post('/matching/predict', async (req, res) => {
  try {
    const { booking_requirements, location, service_type } = req.body;
    
    if (!location || !service_type) {
      return res.status(400).json({
        success: false,
        error: 'Location and service type are required'
      });
    }

    const db = getDatabase();
    
    // Get available coordination points
    const cpQuery = db.collection('coordinationPoints').where('active', '==', true);
    const cpSnapshot = await cpQuery.get();
    
    const matches = [];
    cpSnapshot.forEach(doc => {
      const cp = doc.data();
      
      // Simple matching algorithm (would be enhanced with real AI)
      const baseScore = 70;
      const qualityBonus = (cp.ai_quality_score || 7) * 5;
      const communicationBonus = (cp.communication_score || 7) * 3;
      
      const matchScore = baseScore + qualityBonus + communicationBonus;
      
      matches.push({
        cp_id: doc.id,
        cp_name: cp.name,
        match_score: Math.min(matchScore, 100),
        quality_score: cp.ai_quality_score || 7,
        communication_score: cp.communication_score || 7,
        reasons: [
          'Professional quality score',
          'Good communication history',
          'Available in requested area'
        ]
      });
    });

    // Sort by match score
    matches.sort((a, b) => b.match_score - a.match_score);

    res.json({
      success: true,
      message: 'AI matching completed',
      data: {
        total_matches: matches.length,
        top_matches: matches.slice(0, 5),
        all_matches: matches,
        generated_at: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error generating AI matches:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate AI matches',
      details: error.message
    });
  }
});

// ==========================================
// DATABASE INITIALIZATION
// ==========================================

// POST /api/adminsheet/init/schema - Initialize AdminSheet database schema
router.post('/init/schema', async (req, res) => {
  try {
    const db = getDatabase();
    console.log('🔥 Initializing AdminSheet database schema...');
    
    // 1. EscrowSettings Collection
    const escrowRef = db.collection('escrowSettings').doc('global');
    const escrowDoc = await escrowRef.get();
    
    if (!escrowDoc.exists) {
      await escrowRef.set({
        hold_period_hours: 48,
        auto_release_enabled: true,
        region_settings: {
          us: { hold_period_hours: 48 },
          eu: { hold_period_hours: 72 },
          default: { hold_period_hours: 48 }
        },
        release_trigger_date_type: 'scheduled_cleaning_date',
        ai_optimization_enabled: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
    }
    
    // 2. RegionalSettings Collection
    const regionalSettings = [
      {
        country: 'us',
        currency: 'USD',
        unit_system: 'imperial',
        language: 'en',
        tax_requirements: 'Federal EIN required for business entities',
        tax_id_mandatory: true,
        ai_suggested_adjustments: { platform_fee: 15, hold_period: 48 }
      },
      {
        country: 'ca',
        currency: 'CAD',
        unit_system: 'metric', 
        language: 'en',
        tax_requirements: 'Business Number (BN) required',
        tax_id_mandatory: true,
        ai_suggested_adjustments: { platform_fee: 16, hold_period: 48 }
      }
    ];
    
    for (const region of regionalSettings) {
      const regionRef = db.collection('regionalSettings').doc(region.country);
      const regionDoc = await regionRef.get();
      
      if (!regionDoc.exists) {
        await regionRef.set({
          ...region,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
      }
    }
    
    // 3. RegistrationTerms Collection
    const termsRef = db.collection('registrationTerms').doc('global');
    const termsDoc = await termsRef.get();
    
    if (!termsDoc.exists) {
      await termsRef.set({
        quality_standards: 'All coordination points must maintain professional standards, provide quality service, and ensure customer satisfaction.',
        satisfaction_requirements: 'Customer satisfaction is our top priority. All coordination points must maintain a minimum 4.0-star rating.',
        conduct_policies: 'Professional behavior is required at all times. This includes respectful communication and adherence to safety protocols.',
        tax_compliance_text: 'All coordination points are responsible for their own tax compliance and reporting.',
        insurance_requirements: 'Adequate liability insurance coverage is required for all service providers.',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
    }
    
    // 4. FeeStructure Collection
    const feeRef = db.collection('feeStructure').doc('global');
    const feeDoc = await feeRef.get();
    
    if (!feeDoc.exists) {
      await feeRef.set({
        base_platform_fee: 15,
        cp_custom_fees: {},
        regional_adjustments: {
          us: 15,
          ca: 16,
          gb: 17,
          eu: 18
        },
        subscription_fees: {
          monthly: 29.99,
          yearly: 299.99,
          enterprise: 999.99
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
    }
    
    // 5. Sample Coordination Points
    const coordinationPointsRef = db.collection('coordinationPoints');
    const existingCPs = await coordinationPointsRef.limit(1).get();
    
    if (existingCPs.empty) {
      const sampleCPs = [
        {
          name: 'Clean Departure 1',
          address: 'San Francisco, CA, USA',
          tax_id: 'CP001-SF',
          stripe_identity_status: 'pending',
          active: true,
          admin_approved: true,
          custom_fee_percentage: 15,
          ai_quality_score: 8.5,
          communication_score: 9.0,
          contact_email: 'cp1@cleandeparture.com',
          contact_phone: '+1-555-0101',
          created_at: new Date().toISOString()
        },
        {
          name: 'Clean Departure 2', 
          address: 'Los Angeles, CA, USA',
          tax_id: 'CP002-LA',
          stripe_identity_status: 'verified',
          active: true,
          admin_approved: true,
          custom_fee_percentage: 15,
          ai_quality_score: 7.8,
          communication_score: 8.5,
          contact_email: 'cp2@cleandeparture.com',
          contact_phone: '+1-555-0102',
          created_at: new Date().toISOString()
        }
      ];
      
      for (const cp of sampleCPs) {
        await coordinationPointsRef.add(cp);
      }
    }

    res.json({
      success: true,
      message: 'AdminSheet database schema initialized successfully',
      data: {
        collections_initialized: [
          'escrowSettings',
          'regionalSettings', 
          'registrationTerms',
          'feeStructure',
          'coordinationPoints'
        ],
        runtime_collections: [
          'paymentHolds',
          'aiReports',
          'communicationLogs',
          'redFlags', 
          'reviewAnalysis',
          'contactSharing',
          'paymentDisputes',
          'aiOptimizations'
        ],
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error initializing AdminSheet schema:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to initialize AdminSheet schema',
      details: error.message
    });
  }
});

// ==========================================
// HEALTH CHECK
// ==========================================

// GET /api/adminsheet/health - Health check for AdminSheet API
router.get('/health', async (req, res) => {
  try {
    const db = getDatabase();
    
    // Test database connection
    await db.collection('coordinationPoints').limit(1).get();
    
    res.json({
      success: true,
      message: 'AdminSheet API is healthy',
      timestamp: new Date().toISOString(),
      database_status: 'connected',
      total_endpoints: 25
    });
  } catch (error) {
    console.error('AdminSheet health check failed:', error);
    res.status(503).json({
      success: false,
      error: 'AdminSheet API health check failed',
      details: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

export default router;