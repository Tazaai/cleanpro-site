/**
 * Analytics API Routes
 * 
 * Provides endpoints for platform analytics dashboard
 * Aggregates data from ai_monitoring_logs, email_logs, matching_logs
 */

import express from 'express';
import analyticsService from '../../services/analytics_service.js';

const router = express.Router();

/**
 * GET /api/analytics/summary
 * Get comprehensive platform analytics summary
 * Query params: timeframe (24h, 7d, 30d, all)
 */
router.get('/summary', async (req, res) => {
    try {
        const { timeframe = '7d' } = req.query;
        
        // Validate timeframe
        const validTimeframes = ['24h', '7d', '30d', 'all'];
        if (!validTimeframes.includes(timeframe)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid timeframe. Use: 24h, 7d, 30d, or all'
            });
        }

        const analytics = await analyticsService.getSummary(timeframe);
        
        res.json(analytics);
    } catch (error) {
        console.error('Analytics summary error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve analytics summary',
            message: error.message
        });
    }
});

/**
 * GET /api/analytics/service/:service
 * Get detailed analytics for specific service
 * Params: service (ai-monitoring, email, smart-matching)
 * Query params: timeframe (24h, 7d, 30d, all)
 */
router.get('/service/:service', async (req, res) => {
    try {
        const { service } = req.params;
        const { timeframe = '7d' } = req.query;
        
        // Validate service
        const validServices = ['ai-monitoring', 'email', 'smart-matching'];
        if (!validServices.includes(service)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid service. Use: ai-monitoring, email, or smart-matching'
            });
        }

        // Validate timeframe
        const validTimeframes = ['24h', '7d', '30d', 'all'];
        if (!validTimeframes.includes(timeframe)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid timeframe. Use: 24h, 7d, 30d, or all'
            });
        }

        const serviceAnalytics = await analyticsService.getServiceAnalytics(service, timeframe);
        
        res.json({
            success: true,
            service,
            timeframe,
            data: serviceAnalytics
        });
    } catch (error) {
        console.error(`Service analytics error for ${req.params.service}:`, error);
        res.status(500).json({
            success: false,
            error: `Failed to retrieve analytics for ${req.params.service}`,
            message: error.message
        });
    }
});

/**
 * GET /api/analytics/health
 * Get real-time system health status
 */
router.get('/health', async (req, res) => {
    try {
        const cutoffDate = new Date(Date.now() - 24 * 60 * 60 * 1000); // Last 24h
        const healthData = await analyticsService.getSystemHealth(cutoffDate);
        
        res.json({
            success: true,
            health: healthData,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Analytics health error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve system health',
            message: error.message
        });
    }
});

/**
 * GET /api/analytics/test
 * Test endpoint to verify analytics service functionality
 */
router.get('/test', async (req, res) => {
    try {
        // Test basic functionality with a small timeframe
        const testAnalytics = await analyticsService.getSummary('24h');
        
        res.json({
            success: true,
            message: 'Analytics service is operational',
            test_data: {
                timeframe: '24h',
                metrics_available: !!testAnalytics.metrics,
                firebase_connected: testAnalytics.success,
                services_tested: ['ai_monitoring', 'email_notifications', 'smart_matching']
            },
            endpoint_info: {
                summary: 'GET /api/analytics/summary?timeframe=7d',
                service_specific: 'GET /api/analytics/service/ai-monitoring?timeframe=24h',
                health: 'GET /api/analytics/health'
            }
        });
    } catch (error) {
        console.error('Analytics test error:', error);
        res.status(500).json({
            success: false,
            error: 'Analytics service test failed',
            message: error.message,
            troubleshooting: 'Check Firebase connection and log collections'
        });
    }
});

/**
 * GET /api/analytics/logs/recent
 * Get recent log entries across all services for debugging
 */
router.get('/logs/recent', async (req, res) => {
    try {
        const { limit = 20 } = req.query;
        const limitNum = Math.min(parseInt(limit) || 20, 100); // Max 100 entries

        // This is a simplified recent logs endpoint
        // In a real implementation, you might want to aggregate from all collections
        const recentSummary = await analyticsService.getSummary('24h');
        
        res.json({
            success: true,
            message: `Recent activity summary (last 24h)`,
            data: {
                ai_monitoring: recentSummary.metrics?.ai_monitoring?.recent_concerns || [],
                email_notifications: recentSummary.metrics?.email_notifications?.recent_failures || [],
                smart_matching: recentSummary.metrics?.smart_matching?.recent_requests || [],
                top_concerns: recentSummary.summary?.top_concerns || []
            },
            limit: limitNum,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Recent logs error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve recent logs',
            message: error.message
        });
    }
});

export default router;