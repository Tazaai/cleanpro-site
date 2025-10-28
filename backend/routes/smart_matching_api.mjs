import express from 'express';
import smartMatching from '../services/smart_matching.js';
import { getDb } from '../firebase.js';

const router = express.Router();

// Find best matching CPs for a client request
router.post('/find-matches', async (req, res) => {
  try {
    const clientRequest = req.body;
    
    // Validate required fields
    if (!clientRequest.address && !clientRequest.location) {
      return res.status(400).json({
        success: false,
        error: 'Client location (address or location) is required'
      });
    }

    const options = {
      maxResults: parseInt(req.query.max_results) || 5,
      includeUnavailable: req.query.include_unavailable === 'true',
      prioritizeQuality: req.query.prioritize_quality === 'true',
      prioritizeDistance: req.query.prioritize_distance === 'true'
    };

    const matches = await smartMatching.findBestMatches(clientRequest, options);
    
    // Log the matching request for analytics
    await logMatchingRequest(clientRequest, matches, options);
    
    res.json({
      success: true,
      ...matches
    });
  } catch (error) {
    console.error('Smart matching failed:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to find matches',
      details: error.message
    });
  }
});

// Get matching statistics
router.get('/stats', async (req, res) => {
  try {
    const timeframe = req.query.timeframe || '7d';
    const stats = await smartMatching.getMatchingStats(timeframe);
    
    if (!stats) {
      return res.status(500).json({
        success: false,
        error: 'Failed to retrieve matching statistics'
      });
    }

    res.json({
      success: true,
      statistics: stats
    });
  } catch (error) {
    console.error('Failed to get matching stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve statistics',
      details: error.message
    });
  }
});

// Test matching algorithm with sample data
router.post('/test', async (req, res) => {
  try {
    const testRequest = req.body.request || {
      address: "Los Angeles, CA",
      services: ["house_cleaning"],
      preferred_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      preferred_time: "10:00",
      square_feet: 1200,
      max_distance: 25
    };

    const options = {
      maxResults: 3,
      includeUnavailable: false,
      prioritizeQuality: req.body.prioritize_quality || false,
      prioritizeDistance: req.body.prioritize_distance || false
    };

    const matches = await smartMatching.findBestMatches(testRequest, options);
    
    res.json({
      success: true,
      test_request: testRequest,
      test_options: options,
      ...matches,
      note: "This is a test of the smart matching algorithm"
    });
  } catch (error) {
    console.error('Matching test failed:', error);
    res.status(500).json({
      success: false,
      error: 'Matching test failed',
      details: error.message
    });
  }
});

// Get detailed match analysis for a specific CP
router.post('/analyze-cp', async (req, res) => {
  try {
    const { cp_id, client_request } = req.body;
    
    if (!cp_id || !client_request) {
      return res.status(400).json({
        success: false,
        error: 'CP ID and client request are required'
      });
    }

    // Get the specific CP
    const db = getDb();
    const cpDoc = await db.collection('coordinationPoints').doc(cp_id).get();
    
    if (!cpDoc.exists) {
      return res.status(404).json({
        success: false,
        error: 'Coordination point not found'
      });
    }

    const cp = { id: cpDoc.id, ...cpDoc.data() };
    
    // Calculate detailed match score
    const weights = smartMatching.weights;
    const analysis = await smartMatching.calculateMatchScore(cp, client_request, weights);
    
    res.json({
      success: true,
      cp_analysis: analysis,
      matching_weights: weights,
      client_request: client_request
    });
  } catch (error) {
    console.error('CP analysis failed:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to analyze CP',
      details: error.message
    });
  }
});

// Update matching weights (admin only)
router.patch('/weights', async (req, res) => {
  try {
    const newWeights = req.body;
    
    // Validate weights sum to 1.0
    const totalWeight = Object.values(newWeights).reduce((sum, weight) => sum + weight, 0);
    
    if (Math.abs(totalWeight - 1.0) > 0.01) {
      return res.status(400).json({
        success: false,
        error: 'Weights must sum to 1.0',
        current_total: totalWeight
      });
    }

    // Update weights
    Object.assign(smartMatching.weights, newWeights);
    
    res.json({
      success: true,
      message: 'Matching weights updated successfully',
      new_weights: smartMatching.weights
    });
  } catch (error) {
    console.error('Failed to update weights:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update weights',
      details: error.message
    });
  }
});

// Get current matching configuration
router.get('/config', async (req, res) => {
  try {
    res.json({
      success: true,
      configuration: {
        matching_weights: smartMatching.weights,
        max_distance: smartMatching.maxDistance,
        quality_threshold: smartMatching.qualityThreshold,
        scoring_factors: [
          'distance',
          'quality_score', 
          'availability',
          'price_competitiveness',
          'service_specialization'
        ],
        supported_preferences: [
          'prioritize_quality',
          'prioritize_distance',
          'include_unavailable'
        ],
        quality_metrics: [
          'ai_quality_score',
          'communication_score',
          'customer_rating',
          'completion_rate',
          'verification_status'
        ]
      }
    });
  } catch (error) {
    console.error('Failed to get matching config:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve configuration',
      details: error.message
    });
  }
});

// Bulk match multiple requests (admin tool)
router.post('/bulk-match', async (req, res) => {
  try {
    const { requests } = req.body;
    
    if (!Array.isArray(requests)) {
      return res.status(400).json({
        success: false,
        error: 'Requests must be an array'
      });
    }

    const results = [];
    
    for (const request of requests.slice(0, 10)) { // Limit to 10 requests
      try {
        const matches = await smartMatching.findBestMatches(request, { maxResults: 3 });
        results.push({
          request: request,
          matches: matches.matches,
          status: 'success'
        });
      } catch (error) {
        results.push({
          request: request,
          error: error.message,
          status: 'failed'
        });
      }
    }

    res.json({
      success: true,
      bulk_results: results,
      processed_count: results.length,
      successful_matches: results.filter(r => r.status === 'success').length
    });
  } catch (error) {
    console.error('Bulk matching failed:', error);
    res.status(500).json({
      success: false,
      error: 'Bulk matching failed',
      details: error.message
    });
  }
});

// Get matching logs (admin only)
router.get('/logs', async (req, res) => {
  try {
    const db = getDb();
    const limit = parseInt(req.query.limit) || 50;
    
    const snapshot = await db.collection('matching_logs')
      .orderBy('timestamp', 'desc')
      .limit(limit)
      .get();

    const logs = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json({
      success: true,
      matching_logs: logs,
      count: logs.length,
      limit: limit
    });
  } catch (error) {
    console.error('Failed to get matching logs:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve matching logs',
      details: error.message
    });
  }
});

// Helper function to log matching requests
async function logMatchingRequest(clientRequest, matches, options) {
  try {
    const db = getDb();
    const logData = {
      client_request: {
        location: clientRequest.address || clientRequest.location,
        services: clientRequest.services,
        date: clientRequest.preferred_date || clientRequest.service_date,
        square_feet: clientRequest.square_feet,
        max_distance: clientRequest.max_distance
      },
      matches_found: matches.matched_count,
      total_candidates: matches.total_candidates,
      options: options,
      top_match_score: matches.matches.length > 0 ? matches.matches[0].total_score : null,
      timestamp: new Date().toISOString()
    };

    await db.collection('matching_logs').add(logData);
  } catch (error) {
    console.error('❌ Failed to log matching request:', error);
  }
}

export default router;