import express from 'express';
import aiMonitoring from '../services/ai_monitoring.js';
import { getDb } from '../firebase.js';

const router = express.Router();

// Test AI monitoring functionality
router.get('/test', async (req, res) => {
  try {
    const testContent = req.query.content || "Hello, I would like to schedule a professional cleaning service. Thank you!";
    
    const analysis = await aiMonitoring.analyzeCommunication(testContent, {
      type: 'test',
      timestamp: new Date().toISOString()
    });

    res.json({
      success: true,
      test_content: testContent,
      analysis: analysis,
      ai_enabled: aiMonitoring.isEnabled
    });
  } catch (error) {
    console.error('AI monitoring test failed:', error);
    res.status(500).json({
      success: false,
      error: 'AI monitoring test failed',
      details: error.message
    });
  }
});

// Get AI monitoring statistics
router.get('/stats', async (req, res) => {
  try {
    const timeframe = req.query.timeframe || '7d';
    const stats = await aiMonitoring.getMonitoringStats(timeframe);
    
    if (!stats) {
      return res.status(500).json({
        success: false,
        error: 'Failed to retrieve monitoring statistics'
      });
    }

    res.json({
      success: true,
      statistics: stats
    });
  } catch (error) {
    console.error('Failed to get AI monitoring stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve statistics',
      details: error.message
    });
  }
});

// Get AI alerts for admin review
router.get('/alerts', async (req, res) => {
  try {
    const db = getDb();
    const status = req.query.status || 'pending_review';
    const limit = parseInt(req.query.limit) || 50;
    
    let query = db.collection('ai_alerts');
    
    if (status !== 'all') {
      query = query.where('status', '==', status);
    }
    
    query = query.orderBy('timestamp', 'desc').limit(limit);
    
    const snapshot = await query.get();
    const alerts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json({
      success: true,
      alerts: alerts,
      count: alerts.length,
      filter: { status, limit }
    });
  } catch (error) {
    console.error('Failed to get AI alerts:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve alerts',
      details: error.message
    });
  }
});

// Update AI alert status
router.patch('/alerts/:alertId/status', async (req, res) => {
  try {
    const { alertId } = req.params;
    const { status, admin_notes } = req.body;
    
    const validStatuses = ['pending_review', 'reviewed', 'escalated', 'resolved', 'false_positive'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status',
        valid_statuses: validStatuses
      });
    }

    const db = getDb();
    const updateData = {
      status: status,
      last_updated: new Date().toISOString()
    };

    if (admin_notes) {
      updateData.admin_notes = admin_notes;
    }

    if (status === 'escalated') {
      updateData.escalated = true;
      updateData.escalated_at = new Date().toISOString();
    }

    await db.collection('ai_alerts').doc(alertId).update(updateData);

    res.json({
      success: true,
      message: `Alert status updated to ${status}`,
      alert_id: alertId
    });
  } catch (error) {
    console.error('Failed to update alert status:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update alert status',
      details: error.message
    });
  }
});

// Analyze custom content (admin tool)
router.post('/analyze', async (req, res) => {
  try {
    const { content, context } = req.body;
    
    if (!content || typeof content !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Content is required and must be a string'
      });
    }

    const analysis = await aiMonitoring.analyzeCommunication(content, {
      type: 'admin_analysis',
      timestamp: new Date().toISOString(),
      ...context
    });

    res.json({
      success: true,
      analysis: analysis,
      content_length: content.length,
      ai_enabled: aiMonitoring.isEnabled
    });
  } catch (error) {
    console.error('Content analysis failed:', error);
    res.status(500).json({
      success: false,
      error: 'Content analysis failed',
      details: error.message
    });
  }
});

// Get AI monitoring configuration and status
router.get('/config', async (req, res) => {
  try {
    res.json({
      success: true,
      configuration: {
        ai_enabled: aiMonitoring.isEnabled,
        openai_configured: !!process.env.OPENAI_API_KEY,
        monitoring_active: aiMonitoring.isEnabled,
        supported_analysis_types: [
          'cp_registration',
          'booking_request',
          'chat_message',
          'admin_analysis',
          'test'
        ],
        risk_levels: ['low', 'medium', 'high', 'critical'],
        fallback_mode: !aiMonitoring.isEnabled
      }
    });
  } catch (error) {
    console.error('Failed to get AI config:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve configuration',
      details: error.message
    });
  }
});

// Bulk analyze recent communications (admin tool)
router.post('/bulk-analyze', async (req, res) => {
  try {
    const { collection_name, limit = 10, content_field = 'content' } = req.body;
    
    if (!collection_name) {
      return res.status(400).json({
        success: false,
        error: 'collection_name is required'
      });
    }

    const db = getDb();
    const snapshot = await db.collection(collection_name)
      .orderBy('timestamp', 'desc')
      .limit(limit)
      .get();

    const documents = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const results = [];

    for (const doc of documents) {
      const content = doc[content_field];
      if (content && typeof content === 'string') {
        const analysis = await aiMonitoring.analyzeCommunication(content, {
          type: 'bulk_analysis',
          document_id: doc.id,
          collection: collection_name,
          timestamp: new Date().toISOString()
        });
        
        results.push({
          document_id: doc.id,
          content_preview: content.substring(0, 100) + (content.length > 100 ? '...' : ''),
          analysis: analysis
        });
      }
    }

    res.json({
      success: true,
      analyzed_documents: results.length,
      results: results,
      collection: collection_name
    });
  } catch (error) {
    console.error('Bulk analysis failed:', error);
    res.status(500).json({
      success: false,
      error: 'Bulk analysis failed',
      details: error.message
    });
  }
});

export default router;