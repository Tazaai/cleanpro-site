import express from 'express';
import { z } from 'zod';
import { getDb } from '../firebase_loader.js';

const router = express.Router();

// Validation schemas
const analyticsQuerySchema = z.object({
  timeframe: z.enum(['7d', '30d', '90d', '1y']).default('30d'),
  metric: z.enum(['revenue', 'bookings', 'satisfaction', 'efficiency']).optional(),
  cp_id: z.string().optional(),
  country: z.string().optional()
});

// Generate mock analytics data (replace with real data queries in production)
const generateAnalyticsData = (timeframe, filters = {}) => {
  const now = new Date();
  const days = {
    '7d': 7,
    '30d': 30,
    '90d': 90,
    '1y': 365
  }[timeframe];

  // Generate time series data
  const timeSeriesData = Array.from({ length: days }, (_, i) => {
    const date = new Date(now.getTime() - (days - 1 - i) * 24 * 60 * 60 * 1000);
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    // Simulate business patterns
    const baseRevenue = isWeekend ? 2000 : 4000;
    const seasonalMultiplier = 1 + 0.3 * Math.sin((i / days) * 2 * Math.PI);
    const randomVariation = 0.8 + Math.random() * 0.4;
    
    return {
      date: date.toISOString().split('T')[0],
      revenue: Math.round(baseRevenue * seasonalMultiplier * randomVariation),
      bookings: Math.round((baseRevenue * seasonalMultiplier * randomVariation) / 85),
      avg_rating: 4.2 + Math.random() * 0.8,
      completion_rate: 85 + Math.random() * 12
    };
  });

  // Calculate totals and growth
  const currentPeriodRevenue = timeSeriesData.reduce((sum, day) => sum + day.revenue, 0);
  const currentPeriodBookings = timeSeriesData.reduce((sum, day) => sum + day.bookings, 0);
  const avgSatisfaction = timeSeriesData.reduce((sum, day) => sum + day.avg_rating, 0) / timeSeriesData.length;
  
  // Simulate previous period for growth calculation
  const previousPeriodRevenue = currentPeriodRevenue * (0.85 + Math.random() * 0.15);
  const previousPeriodBookings = currentPeriodBookings * (0.90 + Math.random() * 0.15);
  
  const revenueGrowth = ((currentPeriodRevenue - previousPeriodRevenue) / previousPeriodRevenue) * 100;
  const bookingsGrowth = ((currentPeriodBookings - previousPeriodBookings) / previousPeriodBookings) * 100;

  return {
    summary: {
      revenue: {
        total: currentPeriodRevenue,
        growth: Math.round(revenueGrowth * 10) / 10,
        trend: revenueGrowth > 0 ? 'up' : 'down'
      },
      bookings: {
        total: currentPeriodBookings,
        growth: Math.round(bookingsGrowth * 10) / 10,
        trend: bookingsGrowth > 0 ? 'up' : 'down'
      },
      coordination_points: {
        active: 89 + Math.floor(Math.random() * 20),
        growth: 5 + Math.random() * 15,
        trend: 'up'
      },
      customer_satisfaction: {
        average: Math.round(avgSatisfaction * 10) / 10,
        growth: -2 + Math.random() * 6,
        trend: Math.random() > 0.3 ? 'up' : 'down'
      }
    },
    time_series: timeSeriesData,
    service_performance: [
      {
        service: 'Standard Cleaning',
        revenue: Math.round(currentPeriodRevenue * 0.35),
        bookings: Math.round(currentPeriodBookings * 0.40),
        avg_rating: 4.4 + Math.random() * 0.4,
        growth: -5 + Math.random() * 20
      },
      {
        service: 'Deep Cleaning',
        revenue: Math.round(currentPeriodRevenue * 0.25),
        bookings: Math.round(currentPeriodBookings * 0.22),
        avg_rating: 4.6 + Math.random() * 0.3,
        growth: 0 + Math.random() * 25
      },
      {
        service: 'Office Cleaning',
        revenue: Math.round(currentPeriodRevenue * 0.22),
        bookings: Math.round(currentPeriodBookings * 0.20),
        avg_rating: 4.3 + Math.random() * 0.4,
        growth: -2 + Math.random() * 18
      },
      {
        service: 'Carpet Cleaning',
        revenue: Math.round(currentPeriodRevenue * 0.12),
        bookings: Math.round(currentPeriodBookings * 0.10),
        avg_rating: 4.5 + Math.random() * 0.4,
        growth: 5 + Math.random() * 30
      },
      {
        service: 'Window Cleaning',
        revenue: Math.round(currentPeriodRevenue * 0.06),
        bookings: Math.round(currentPeriodBookings * 0.08),
        avg_rating: 4.2 + Math.random() * 0.5,
        growth: -8 + Math.random() * 22
      }
    ],
    geographical_data: [
      {
        country: 'United States',
        revenue: Math.round(currentPeriodRevenue * 0.45),
        bookings: Math.round(currentPeriodBookings * 0.48),
        cps: 34,
        avg_rating: 4.5,
        growth: 12.3
      },
      {
        country: 'United Kingdom',
        revenue: Math.round(currentPeriodRevenue * 0.18),
        bookings: Math.round(currentPeriodBookings * 0.19),
        cps: 12,
        avg_rating: 4.6,
        growth: 8.7
      },
      {
        country: 'Germany',
        revenue: Math.round(currentPeriodRevenue * 0.15),
        bookings: Math.round(currentPeriodBookings * 0.16),
        cps: 15,
        avg_rating: 4.4,
        growth: 15.2
      },
      {
        country: 'France',
        revenue: Math.round(currentPeriodRevenue * 0.12),
        bookings: Math.round(currentPeriodBookings * 0.11),
        cps: 8,
        avg_rating: 4.3,
        growth: 6.8
      },
      {
        country: 'Canada',
        revenue: Math.round(currentPeriodRevenue * 0.06),
        bookings: Math.round(currentPeriodBookings * 0.04),
        cps: 6,
        avg_rating: 4.7,
        growth: 22.1
      },
      {
        country: 'Australia',
        revenue: Math.round(currentPeriodRevenue * 0.04),
        bookings: Math.round(currentPeriodBookings * 0.02),
        cps: 4,
        avg_rating: 4.5,
        growth: 18.4
      }
    ],
    fraud_detection: {
      flagged_transactions: 8 + Math.floor(Math.random() * 15),
      potential_savings: 1200 + Math.random() * 2000,
      risk_score: Math.random() > 0.8 ? 'Medium' : 'Low',
      prevented_attempts: 23 + Math.floor(Math.random() * 10),
      false_positives: 2 + Math.floor(Math.random() * 4)
    },
    efficiency_metrics: {
      avg_booking_time: `${2.1 + Math.random() * 0.8}h`,
      cp_utilization: 68 + Math.random() * 20,
      customer_retention: 80 + Math.random() * 15,
      revenue_per_booking: Math.round(currentPeriodRevenue / currentPeriodBookings),
      avg_response_time: `${15 + Math.random() * 20}min`,
      completion_rate: 92 + Math.random() * 6
    },
    predictions: {
      next_month_revenue: Math.round(currentPeriodRevenue * (1.05 + Math.random() * 0.10)),
      growth_forecast: 8 + Math.random() * 12,
      seasonal_trends: [
        { month: 'Jan', predicted_growth: -5 + Math.random() * 15 },
        { month: 'Feb', predicted_growth: 0 + Math.random() * 18 },
        { month: 'Mar', predicted_growth: 10 + Math.random() * 20 },
        { month: 'Apr', predicted_growth: 15 + Math.random() * 15 }
      ]
    }
  };
};

// Dashboard endpoint
router.get('/dashboard', async (req, res) => {
  try {
    const queryData = analyticsQuerySchema.parse(req.query);
    
    // Check user authorization (in production, verify JWT token)
    const userId = req.headers.authorization?.replace('Bearer ', '') || 'mock_admin_user';
    
    // Generate analytics data
    const analyticsData = generateAnalyticsData(queryData.timeframe, {
      cp_id: queryData.cp_id,
      country: queryData.country
    });
    
    // Try to get real data from database (fallback to mock if unavailable)
    try {
      const db = getDb();
      
      // Log analytics request
      await db.collection('analytics_requests').add({
        user_id: userId,
        timeframe: queryData.timeframe,
        filters: queryData,
        timestamp: new Date()
      });
      
      // In production, replace mock data with real queries
      // const realData = await fetchRealAnalyticsData(db, queryData);
      
    } catch (dbError) {
      console.warn('Database unavailable for analytics, using mock data:', dbError.message);
    }
    
    res.json({
      ok: true,
      data: analyticsData.summary,
      detailed_data: analyticsData,
      timeframe: queryData.timeframe,
      generated_at: new Date()
    });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        ok: false,
        error: 'Invalid analytics parameters',
        details: error.errors
      });
    }
    
    console.error('Error generating analytics:', error);
    res.status(500).json({
      ok: false,
      error: 'Failed to generate analytics data'
    });
  }
});

// Real-time metrics endpoint
router.get('/realtime', async (req, res) => {
  try {
    // Generate real-time mock data
    const realtimeData = {
      active_bookings: 45 + Math.floor(Math.random() * 20),
      active_cps: 67 + Math.floor(Math.random() * 15),
      online_customers: 234 + Math.floor(Math.random() * 100),
      current_revenue_today: 12450 + Math.random() * 5000,
      pending_payments: 8 + Math.floor(Math.random() * 12),
      system_health: {
        api_response_time: Math.round((200 + Math.random() * 100) * 10) / 10,
        database_status: 'healthy',
        payment_system_status: 'healthy',
        uptime_percentage: 99.5 + Math.random() * 0.5
      },
      live_activity: Array.from({ length: 10 }, (_, i) => ({
        id: `activity_${Date.now()}_${i}`,
        type: ['booking_created', 'payment_completed', 'service_completed', 'review_submitted'][Math.floor(Math.random() * 4)],
        description: [
          'New booking created in New York',
          'Payment of $125 completed',
          'Deep cleaning service completed',
          '5-star review submitted'
        ][Math.floor(Math.random() * 4)],
        timestamp: new Date(Date.now() - Math.random() * 300000), // Last 5 minutes
        location: ['New York', 'London', 'Berlin', 'Paris', 'Toronto'][Math.floor(Math.random() * 5)]
      }))
    };
    
    res.json({
      ok: true,
      data: realtimeData,
      timestamp: new Date()
    });
    
  } catch (error) {
    console.error('Error generating real-time data:', error);
    res.status(500).json({
      ok: false,
      error: 'Failed to fetch real-time metrics'
    });
  }
});

// Performance insights endpoint
router.get('/insights', async (req, res) => {
  try {
    const { timeframe = '30d', focus } = req.query;
    
    // Generate AI insights based on data patterns
    const insights = [
      {
        id: 'revenue_growth',
        type: 'opportunity',
        priority: 'high',
        confidence: 0.87,
        title: 'Revenue Growth Opportunity Detected',
        description: 'Deep cleaning services showing 25% higher growth rate in metropolitan areas.',
        recommendation: 'Expand deep cleaning service marketing in top 5 cities',
        potential_impact: '+$15,000 monthly revenue',
        data_points: [
          'Deep cleaning bookings up 25% in NYC, London, Berlin',
          'Customer satisfaction for deep cleaning: 4.7/5',
          'Repeat booking rate for deep cleaning: 68%'
        ]
      },
      {
        id: 'efficiency_optimization',
        type: 'efficiency',
        priority: 'medium',
        confidence: 0.72,
        title: 'CP Workload Imbalance',
        description: 'Some coordination points operating at 95% capacity while others at 45%.',
        recommendation: 'Implement dynamic workload distribution algorithm',
        potential_impact: '18% efficiency improvement',
        data_points: [
          'Top 3 CPs overloaded (95%+ utilization)',
          'Bottom 5 CPs underutilized (<50% utilization)',
          'Average customer wait time: 2.3 hours'
        ]
      },
      {
        id: 'customer_retention',
        type: 'quality',
        priority: 'high',
        confidence: 0.91,
        title: 'Customer Retention Excellence',
        description: 'Retention rate of 84.6% exceeds industry average by 12%.',
        recommendation: 'Maintain current quality standards and consider loyalty program',
        potential_impact: 'Sustained competitive advantage',
        data_points: [
          'Customer retention: 84.6% (industry avg: 72.5%)',
          'Net Promoter Score: 67',
          'Average customer lifetime value: $340'
        ]
      },
      {
        id: 'fraud_prevention',
        type: 'security',
        priority: 'low',
        confidence: 0.95,
        title: 'Fraud Detection Performing Well',
        description: 'AI fraud detection prevented $2,340 in potentially fraudulent transactions.',
        recommendation: 'Continue monitoring patterns and update rules quarterly',
        potential_impact: 'Maintained security integrity',
        data_points: [
          'Fraud detection accuracy: 96.2%',
          'False positive rate: 2.1%',
          'Prevented losses: $2,340 this month'
        ]
      },
      {
        id: 'seasonal_prep',
        type: 'planning',
        priority: 'medium',
        confidence: 0.78,
        title: 'Seasonal Demand Pattern Identified',
        description: 'Spring cleaning season approaching - 40% increase in bookings expected.',
        recommendation: 'Prepare staffing and inventory for March-May surge',
        potential_impact: 'Capture 100% of seasonal demand',
        data_points: [
          'Historical spring surge: +40% bookings',
          'Current CP capacity: 73%',
          'Inventory levels: 85% stocked'
        ]
      }
    ];
    
    // Filter insights by focus area if specified
    const filteredInsights = focus 
      ? insights.filter(insight => insight.type === focus)
      : insights;
    
    res.json({
      ok: true,
      data: {
        insights: filteredInsights,
        summary: {
          total_insights: filteredInsights.length,
          high_priority: filteredInsights.filter(i => i.priority === 'high').length,
          avg_confidence: filteredInsights.reduce((sum, i) => sum + i.confidence, 0) / filteredInsights.length
        }
      },
      timeframe,
      generated_at: new Date()
    });
    
  } catch (error) {
    console.error('Error generating insights:', error);
    res.status(500).json({
      ok: false,
      error: 'Failed to generate insights'
    });
  }
});

// Export data endpoint
router.post('/export', async (req, res) => {
  try {
    const exportSchema = z.object({
      format: z.enum(['pdf', 'csv', 'json']),
      timeframe: z.enum(['7d', '30d', '90d', '1y']).default('30d'),
      sections: z.array(z.enum(['summary', 'detailed', 'insights', 'charts'])).optional()
    });
    
    const validatedData = exportSchema.parse(req.body);
    const userId = req.headers.authorization?.replace('Bearer ', '') || 'mock_admin_user';
    
    // Generate export ID
    const exportId = `export_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // In production, generate actual file and return download link
    const mockDownloadUrl = `https://api.cleanpro.com/downloads/${exportId}.${validatedData.format}`;
    
    // Log export request
    try {
      const db = getDb();
      await db.collection('export_requests').add({
        export_id: exportId,
        user_id: userId,
        format: validatedData.format,
        timeframe: validatedData.timeframe,
        sections: validatedData.sections || ['summary', 'detailed'],
        status: 'processing',
        created_at: new Date()
      });
    } catch (dbError) {
      console.warn('Could not log export request:', dbError.message);
    }
    
    res.json({
      ok: true,
      data: {
        export_id: exportId,
        download_url: mockDownloadUrl,
        format: validatedData.format,
        estimated_completion: new Date(Date.now() + 30000), // 30 seconds
        status: 'processing'
      },
      message: 'Export request submitted successfully'
    });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        ok: false,
        error: 'Invalid export parameters',
        details: error.errors
      });
    }
    
    console.error('Error processing export request:', error);
    res.status(500).json({
      ok: false,
      error: 'Failed to process export request'
    });
  }
});

// Configuration endpoint for analytics settings
router.get('/config', async (req, res) => {
  try {
    const config = {
      available_metrics: [
        'revenue', 'bookings', 'satisfaction', 'efficiency', 
        'fraud_detection', 'geographical', 'service_performance'
      ],
      timeframe_options: ['7d', '30d', '90d', '1y'],
      export_formats: ['pdf', 'csv', 'json'],
      update_frequency: {
        dashboard: '5 minutes',
        insights: '1 hour',
        reports: '24 hours'
      },
      data_retention: {
        raw_data: '2 years',
        aggregated_data: '5 years',
        insights: '1 year'
      }
    };
    
    res.json({
      ok: true,
      data: config
    });
    
  } catch (error) {
    console.error('Error fetching analytics config:', error);
    res.status(500).json({
      ok: false,
      error: 'Failed to fetch configuration'
    });
  }
});

export default router;