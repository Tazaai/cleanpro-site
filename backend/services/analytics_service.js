/**
 * Analytics Service - Platform Metrics Aggregation
 * 
 * Aggregates data from ai_monitoring_logs, email_logs, matching_logs
 * to provide dashboard insights and KPIs for Clean Departure platform
 */

import admin from 'firebase-admin';

class AnalyticsService {
    constructor() {
        // Don't initialize Firebase connection in constructor
        // This will be done lazily when methods are called
        this.db = null;
    }

    /**
     * Get Firestore database instance (lazy initialization)
     */
    getDb() {
        if (!this.db) {
            try {
                this.db = admin.firestore();
            } catch (error) {
                console.error('Firebase not initialized:', error);
                throw new Error('Firebase connection unavailable');
            }
        }
        return this.db;
    }

    // Lazy initialization of Firebase connection
    getDB() {
        if (!this.db) {
            try {
                this.db = admin.firestore();
            } catch (error) {
                console.error('Firebase not initialized for analytics service:', error.message);
                throw new Error('Firebase connection not available');
            }
        }
        return this.db;
    }

    /**
     * Get comprehensive platform analytics summary
     * @param {string} timeframe - '24h', '7d', '30d', 'all'
     * @returns {Object} Analytics summary with key metrics
     */
    async getSummary(timeframe = '7d') {
        try {
            const cutoffDate = this.getCutoffDate(timeframe);
            
            const [
                aiMetrics,
                emailMetrics,
                matchingMetrics,
                systemHealth
            ] = await Promise.all([
                this.getAIMetrics(cutoffDate),
                this.getEmailMetrics(cutoffDate),
                this.getMatchingMetrics(cutoffDate),
                this.getSystemHealth(cutoffDate)
            ]);

            return {
                success: true,
                timeframe,
                period: {
                    from: cutoffDate,
                    to: new Date()
                },
                metrics: {
                    ai_monitoring: aiMetrics,
                    email_notifications: emailMetrics,
                    smart_matching: matchingMetrics,
                    system_health: systemHealth
                },
                summary: {
                    total_events: aiMetrics.total + emailMetrics.total + matchingMetrics.total,
                    success_rate: this.calculateOverallSuccessRate(aiMetrics, emailMetrics, matchingMetrics),
                    top_concerns: await this.getTopConcerns(cutoffDate)
                },
                generated_at: new Date().toISOString()
            };
        } catch (error) {
            console.error('Analytics service error:', error);
            return {
                success: false,
                error: 'Failed to generate analytics summary',
                fallback_message: 'Analytics service temporarily unavailable'
            };
        }
    }

    /**
     * Get AI monitoring metrics
     */
    async getAIMetrics(cutoffDate) {
        try {
            const query = this.getDb().collection('ai_monitoring_logs')
                .where('timestamp', '>=', cutoffDate)
                .orderBy('timestamp', 'desc');

            const snapshot = await query.get();
            const logs = snapshot.docs.map(doc => doc.data());

            const redFlags = logs.filter(log => log.red_flags && log.red_flags.length > 0);
            const emergencyAlerts = logs.filter(log => log.emergency_alert === true);
            const toneScores = logs.filter(log => log.tone_score).map(log => log.tone_score);

            return {
                total: logs.length,
                red_flags: redFlags.length,
                emergency_alerts: emergencyAlerts.length,
                average_tone_score: toneScores.length > 0 ? 
                    toneScores.reduce((a, b) => a + b, 0) / toneScores.length : 0,
                success_rate: logs.length > 0 ? 
                    ((logs.length - emergencyAlerts.length) / logs.length * 100).toFixed(1) : 100,
                recent_concerns: redFlags.slice(0, 5).map(log => ({
                    timestamp: log.timestamp,
                    type: log.communication_type,
                    concerns: log.red_flags
                }))
            };
        } catch (error) {
            console.error('AI metrics error:', error);
            return { total: 0, error: 'AI metrics unavailable' };
        }
    }

    /**
     * Get email notification metrics
     */
    async getEmailMetrics(cutoffDate) {
        try {
            const query = this.getDb().collection('email_logs')
                .where('timestamp', '>=', cutoffDate)
                .orderBy('timestamp', 'desc');

            const snapshot = await query.get();
            const logs = snapshot.docs.map(doc => doc.data());

            const successful = logs.filter(log => log.status === 'sent');
            const failed = logs.filter(log => log.status === 'failed');
            const cpRegistrations = logs.filter(log => log.type === 'cp_registration');
            const criticalAlerts = logs.filter(log => log.type === 'critical_ai_alert');

            return {
                total: logs.length,
                successful: successful.length,
                failed: failed.length,
                success_rate: logs.length > 0 ? 
                    (successful.length / logs.length * 100).toFixed(1) : 100,
                types: {
                    cp_registrations: cpRegistrations.length,
                    critical_alerts: criticalAlerts.length,
                    general_notifications: logs.length - cpRegistrations.length - criticalAlerts.length
                },
                recent_failures: failed.slice(0, 5).map(log => ({
                    timestamp: log.timestamp,
                    type: log.type,
                    error: log.error_message
                }))
            };
        } catch (error) {
            console.error('Email metrics error:', error);
            return { total: 0, error: 'Email metrics unavailable' };
        }
    }

    /**
     * Get smart matching metrics
     */
    async getMatchingMetrics(cutoffDate) {
        try {
            const query = this.getDb().collection('matching_logs')
                .where('timestamp', '>=', cutoffDate)
                .orderBy('timestamp', 'desc');

            const snapshot = await query.get();
            const logs = snapshot.docs.map(doc => doc.data());

            const successful = logs.filter(log => log.matches_found && log.matches_found > 0);
            const noMatches = logs.filter(log => log.matches_found === 0);
            const avgScore = logs.filter(log => log.best_match_score)
                .map(log => log.best_match_score);

            return {
                total: logs.length,
                successful_matches: successful.length,
                no_matches: noMatches.length,
                success_rate: logs.length > 0 ? 
                    (successful.length / logs.length * 100).toFixed(1) : 100,
                average_match_score: avgScore.length > 0 ? 
                    (avgScore.reduce((a, b) => a + b, 0) / avgScore.length).toFixed(2) : 0,
                performance: {
                    high_quality_matches: successful.filter(log => log.best_match_score >= 80).length,
                    medium_quality_matches: successful.filter(log => 
                        log.best_match_score >= 60 && log.best_match_score < 80).length,
                    low_quality_matches: successful.filter(log => log.best_match_score < 60).length
                },
                recent_requests: logs.slice(0, 5).map(log => ({
                    timestamp: log.timestamp,
                    location: log.request_location,
                    matches_found: log.matches_found,
                    best_score: log.best_match_score
                }))
            };
        } catch (error) {
            console.error('Matching metrics error:', error);
            return { total: 0, error: 'Matching metrics unavailable' };
        }
    }

    /**
     * Get system health metrics
     */
    async getSystemHealth(cutoffDate) {
        try {
            // Check recent activity across all services
            const [aiCount, emailCount, matchingCount] = await Promise.all([
                this.getDb().collection('ai_monitoring_logs').where('timestamp', '>=', cutoffDate).get(),
                this.getDb().collection('email_logs').where('timestamp', '>=', cutoffDate).get(),
                this.getDb().collection('matching_logs').where('timestamp', '>=', cutoffDate).get()
            ]);

            const totalActivity = aiCount.size + emailCount.size + matchingCount.size;
            const now = new Date();
            const hourAgo = new Date(now.getTime() - 60 * 60 * 1000);

            // Check recent activity (last hour)
            const recentActivity = await Promise.all([
                this.getDb().collection('ai_monitoring_logs').where('timestamp', '>=', hourAgo).get(),
                this.getDb().collection('email_logs').where('timestamp', '>=', hourAgo).get(),
                this.getDb().collection('matching_logs').where('timestamp', '>=', hourAgo).get()
            ]);

            const recentTotal = recentActivity[0].size + recentActivity[1].size + recentActivity[2].size;

            return {
                status: totalActivity > 0 ? 'healthy' : 'inactive',
                total_activity: totalActivity,
                recent_activity: recentTotal,
                services: {
                    ai_monitoring: aiCount.size > 0 ? 'active' : 'inactive',
                    email_service: emailCount.size > 0 ? 'active' : 'inactive',
                    smart_matching: matchingCount.size > 0 ? 'active' : 'inactive'
                },
                last_activity: totalActivity > 0 ? 'Recent' : 'No recent activity'
            };
        } catch (error) {
            console.error('System health error:', error);
            return { status: 'error', error: 'Health check failed' };
        }
    }

    /**
     * Get time-based cutoff date
     */
    getCutoffDate(timeframe) {
        const now = new Date();
        switch (timeframe) {
            case '24h':
                return new Date(now.getTime() - 24 * 60 * 60 * 1000);
            case '7d':
                return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            case '30d':
                return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            case 'all':
                return new Date('2024-01-01'); // Platform start date
            default:
                return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        }
    }

    /**
     * Calculate overall success rate across all services
     */
    calculateOverallSuccessRate(aiMetrics, emailMetrics, matchingMetrics) {
        const totalEvents = aiMetrics.total + emailMetrics.total + matchingMetrics.total;
        if (totalEvents === 0) return 100;

        const successEvents = 
            (aiMetrics.total - (aiMetrics.emergency_alerts || 0)) +
            (emailMetrics.successful || 0) +
            (matchingMetrics.successful_matches || 0);

        return (successEvents / totalEvents * 100).toFixed(1);
    }

    /**
     * Get top concerns across all services
     */
    async getTopConcerns(cutoffDate) {
        try {
            const concerns = [];

            // AI red flags
            const aiQuery = this.getDb().collection('ai_monitoring_logs')
                .where('timestamp', '>=', cutoffDate)
                .where('red_flags', '!=', null);
            
            const aiSnapshot = await aiQuery.get();
            aiSnapshot.docs.forEach(doc => {
                const data = doc.data();
                if (data.red_flags && data.red_flags.length > 0) {
                    concerns.push({
                        type: 'ai_red_flag',
                        timestamp: data.timestamp,
                        description: `AI detected: ${data.red_flags.join(', ')}`,
                        severity: data.emergency_alert ? 'high' : 'medium'
                    });
                }
            });

            // Email failures
            const emailQuery = this.getDb().collection('email_logs')
                .where('timestamp', '>=', cutoffDate)
                .where('status', '==', 'failed');
            
            const emailSnapshot = await emailQuery.get();
            emailSnapshot.docs.forEach(doc => {
                const data = doc.data();
                concerns.push({
                    type: 'email_failure',
                    timestamp: data.timestamp,
                    description: `Email delivery failed: ${data.error_message || 'Unknown error'}`,
                    severity: data.type === 'critical_ai_alert' ? 'high' : 'low'
                });
            });

            // Poor matching results
            const matchingQuery = this.getDb().collection('matching_logs')
                .where('timestamp', '>=', cutoffDate)
                .where('matches_found', '==', 0);
            
            const matchingSnapshot = await matchingQuery.get();
            if (matchingSnapshot.size > 3) {
                concerns.push({
                    type: 'matching_issues',
                    timestamp: new Date(),
                    description: `Multiple requests with no matches (${matchingSnapshot.size} cases)`,
                    severity: 'medium'
                });
            }

            // Sort by severity and timestamp
            return concerns
                .sort((a, b) => {
                    const severityOrder = { high: 3, medium: 2, low: 1 };
                    if (severityOrder[a.severity] !== severityOrder[b.severity]) {
                        return severityOrder[b.severity] - severityOrder[a.severity];
                    }
                    return new Date(b.timestamp) - new Date(a.timestamp);
                })
                .slice(0, 10);
        } catch (error) {
            console.error('Top concerns error:', error);
            return [];
        }
    }

    /**
     * Get detailed analytics for specific service
     */
    async getServiceAnalytics(service, timeframe = '7d') {
        try {
            const cutoffDate = this.getCutoffDate(timeframe);
            
            switch (service) {
                case 'ai-monitoring':
                    return await this.getAIMetrics(cutoffDate);
                case 'email':
                    return await this.getEmailMetrics(cutoffDate);
                case 'smart-matching':
                    return await this.getMatchingMetrics(cutoffDate);
                default:
                    throw new Error(`Unknown service: ${service}`);
            }
        } catch (error) {
            console.error(`Service analytics error for ${service}:`, error);
            return {
                success: false,
                error: `Failed to get analytics for ${service}`,
                service
            };
        }
    }
}

export default new AnalyticsService();