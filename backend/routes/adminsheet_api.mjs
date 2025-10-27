import express from 'express';
import { getDb } from '../firebase.js';

const router = express.Router();

// Helper function to get database with error handling
async function getDatabase() {
  try {
    const db = await getDb();
    if (!db) {
      throw new Error('Database connection not available');
    }
    return db;
  } catch (error) {
    console.error('Database connection error:', error);
    throw new Error('Database connection failed');
  }
}

// Helper function for AI tone analysis (placeholder for OpenAI integration)
async function analyzeTone(content) {
  // TODO: Integrate with OpenAI API for real tone analysis
  // For now, simple keyword detection
  const redFlags = ['stupid', 'idiot', 'hate', 'kill', 'threat', 'scam'];
  const lowercaseContent = content.toLowerCase();
  
  const hasRedFlag = redFlags.some(flag => lowercaseContent.includes(flag));
  const toneScore = hasRedFlag ? 2 : 8; // Scale 1-10, lower is worse
  
  return {
    toneScore,
    hasRedFlag,
    confidence: 0.85,
    analysis: hasRedFlag ? 'Potentially inappropriate language detected' : 'Professional communication'
  };
}

// ==========================================
// COORDINATION POINTS MANAGEMENT
// ==========================================

// GET /api/adminsheet/coordination-points - List all CPs with status and scores
router.get('/coordination-points', async (req, res) => {
  try {
    const db = await getDatabase();
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

// POST /api/adminsheet/cp/approve/:id - Approve/activate CP
router.post('/cp/approve/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = await getDatabase();
    
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
    const db = await getDatabase();
    
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

    const db = await getDatabase();
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

// ==========================================
// ESCROW SETTINGS MANAGEMENT
// ==========================================

// GET /api/adminsheet/escrow/settings - Get escrow configuration
router.get('/escrow/settings', async (req, res) => {
  try {
    const db = await getDatabase();
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

    const db = await getDatabase();
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
    const db = await getDatabase();
    
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
    const db = await getDatabase();
    
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
    
    const db = await getDatabase();
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
    const db = await getDatabase();
    
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
    const db = await getDatabase();
    
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
// HEALTH CHECK
// ==========================================

// GET /api/adminsheet/health - Health check for AdminSheet API
router.get('/health', async (req, res) => {
  try {
    const db = await getDatabase();
    
    // Test database connection
    await db.collection('coordinationPoints').limit(1).get();
    
    res.json({
      success: true,
      message: 'AdminSheet API is healthy',
      timestamp: new Date().toISOString(),
      database_status: 'connected'
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