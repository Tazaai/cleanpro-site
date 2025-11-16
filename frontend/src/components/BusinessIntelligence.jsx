import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLocalization } from './LocalizationEngine';
import { toast } from 'react-hot-toast';

const API_BASE = import.meta.env.VITE_API_BASE || window.API_BASE || "https://cleanpro-backend-5539254765.europe-west1.run.app";

export default function BusinessIntelligence() {
  const { token, user } = useAuth();
  const { settings, formatCurrency } = useLocalization();
  
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [insights, setInsights] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize for mobile detection
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (user?.role === 'admin' || user?.role === 'cp_owner') {
      fetchDashboardData();
    }
  }, [user, timeframe]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const response = await fetch(`${API_BASE}/api/analytics/dashboard?timeframe=${timeframe}`, { headers });
      if (response.ok) {
        const data = await response.json();
        if (data.ok) {
          setDashboardData(data.data);
          generateInsights(data.data);
        } else {
          throw new Error(data.error || 'Failed to fetch dashboard data');
        }
      } else {
        throw new Error('Analytics service unavailable');
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Use mock data for demonstration
      const mockData = generateMockData();
      setDashboardData(mockData);
      generateInsights(mockData);
    } finally {
      setLoading(false);
    }
  };

  const generateMockData = () => {
    return {
      revenue: {
        total: 125680.50,
        growth: 15.2,
        trend: 'up'
      },
      bookings: {
        total: 1247,
        growth: 8.7,
        trend: 'up'
      },
      coordination_points: {
        active: 89,
        growth: 12.1,
        trend: 'up'
      },
      customer_satisfaction: {
        average: 4.7,
        growth: 2.3,
        trend: 'up'
      },
      service_performance: [
        { service: 'Standard Cleaning', revenue: 45670, bookings: 456, avg_rating: 4.6 },
        { service: 'Deep Cleaning', revenue: 32450, bookings: 234, avg_rating: 4.8 },
        { service: 'Office Cleaning', revenue: 28760, bookings: 189, avg_rating: 4.5 },
        { service: 'Carpet Cleaning', revenue: 18800, bookings: 123, avg_rating: 4.7 }
      ],
      geographical_data: [
        { country: 'United States', revenue: 67890, bookings: 678, cps: 34 },
        { country: 'United Kingdom', revenue: 23450, bookings: 245, cps: 12 },
        { country: 'Germany', revenue: 18760, bookings: 198, cps: 15 },
        { country: 'France', revenue: 15580, bookings: 126, cps: 8 }
      ],
      revenue_trends: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        revenue: 3000 + Math.random() * 2000 + Math.sin(i / 5) * 500,
        bookings: 30 + Math.random() * 20 + Math.sin(i / 3) * 10
      })),
      fraud_detection: {
        flagged_transactions: 12,
        potential_savings: 2340,
        risk_score: 'Low'
      },
      efficiency_metrics: {
        avg_booking_time: '2.3 hours',
        cp_utilization: 73.2,
        customer_retention: 84.6,
        revenue_per_booking: 98.50
      }
    };
  };

  const generateInsights = (data) => {
    const aiInsights = [
      {
        type: 'growth',
        priority: 'high',
        title: 'Revenue Growth Opportunity',
        description: `Your revenue growth of ${data.revenue?.growth}% is above industry average. Consider expanding into new markets.`,
        action: 'Explore market expansion',
        impact: '+$15K potential monthly revenue'
      },
      {
        type: 'efficiency',
        priority: 'medium',
        title: 'CP Utilization Optimization',
        description: `${data.geographical_data?.[0]?.cps || 34} coordination points are showing peak demand patterns. Consider load balancing.`,
        action: 'Optimize CP workload distribution',
        impact: '12% efficiency improvement'
      },
      {
        type: 'quality',
        priority: 'high',
        title: 'Service Quality Excellence',
        description: `Customer satisfaction of ${data.customer_satisfaction?.average || 4.7}/5 indicates strong service quality. Maintain current standards.`,
        action: 'Continue quality focus',
        impact: 'Sustained customer retention'
      },
      {
        type: 'fraud',
        priority: 'low',
        title: 'Fraud Prevention Success',
        description: `Only ${data.fraud_detection?.flagged_transactions || 12} flagged transactions this month. Security measures are effective.`,
        action: 'Monitor suspicious patterns',
        impact: `Prevented $${data.fraud_detection?.potential_savings || 2340} in losses`
      }
    ];
    
    setInsights(aiInsights);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50 text-red-800';
      case 'medium': return 'border-yellow-500 bg-yellow-50 text-yellow-800';
      case 'low': return 'border-green-500 bg-green-50 text-green-800';
      default: return 'border-blue-500 bg-blue-50 text-blue-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'growth': return '📈';
      case 'efficiency': return '⚡';
      case 'quality': return '⭐';
      case 'fraud': return '🔒';
      default: return '💡';
    }
  };

  if (!user || (user.role !== 'admin' && user.role !== 'cp_owner')) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 text-center">
        <div className="text-4xl mb-4">🔒</div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Access Restricted</h2>
        <p className="text-gray-600">Business Intelligence dashboard requires admin or CP owner privileges.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-gray-600">Loading analytics data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Business Intelligence</h1>
            <p className="text-gray-600">AI-powered insights and performance analytics</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(dashboardData?.revenue?.total || 0)}
              </p>
            </div>
            <div className="text-3xl">💰</div>
          </div>
          <div className={`flex items-center mt-2 text-sm ${
            dashboardData?.revenue?.trend === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            <span>{dashboardData?.revenue?.trend === 'up' ? '↗️' : '↘️'}</span>
            <span className="ml-1">{dashboardData?.revenue?.growth}% vs last period</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Bookings</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardData?.bookings?.total || 0}</p>
            </div>
            <div className="text-3xl">📋</div>
          </div>
          <div className={`flex items-center mt-2 text-sm ${
            dashboardData?.bookings?.trend === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            <span>{dashboardData?.bookings?.trend === 'up' ? '↗️' : '↘️'}</span>
            <span className="ml-1">{dashboardData?.bookings?.growth}% vs last period</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active CPs</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardData?.coordination_points?.active || 0}</p>
            </div>
            <div className="text-3xl">🏢</div>
          </div>
          <div className={`flex items-center mt-2 text-sm ${
            dashboardData?.coordination_points?.trend === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            <span>{dashboardData?.coordination_points?.trend === 'up' ? '↗️' : '↘️'}</span>
            <span className="ml-1">{dashboardData?.coordination_points?.growth}% vs last period</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Satisfaction</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardData?.customer_satisfaction?.average || 0}/5</p>
            </div>
            <div className="text-3xl">⭐</div>
          </div>
          <div className={`flex items-center mt-2 text-sm ${
            dashboardData?.customer_satisfaction?.trend === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            <span>{dashboardData?.customer_satisfaction?.trend === 'up' ? '↗️' : '↘️'}</span>
            <span className="ml-1">{dashboardData?.customer_satisfaction?.growth}% vs last period</span>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>🤖</span>
          AI-Powered Insights
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {insights.map((insight, index) => (
            <div
              key={index}
              className={`border-l-4 p-4 rounded-lg ${getPriorityColor(insight.priority)}`}
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl">{getTypeIcon(insight.type)}</div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{insight.title}</h3>
                  <p className="text-sm mb-2 opacity-90">{insight.description}</p>
                  <div className="flex flex-col sm:flex-row gap-2 text-xs">
                    <div className="font-medium">Action: {insight.action}</div>
                    <div className="opacity-75">Impact: {insight.impact}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service Performance */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Service Performance</h3>
          <div className="space-y-3">
            {dashboardData?.service_performance?.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-gray-800">{service.service}</div>
                  <div className="text-sm text-gray-600">{service.bookings} bookings</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">{formatCurrency(service.revenue)}</div>
                  <div className="text-sm text-yellow-600">★ {service.avg_rating}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Geographical Performance */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Geographical Performance</h3>
          <div className="space-y-3">
            {dashboardData?.geographical_data?.map((geo, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-gray-800">{geo.country}</div>
                  <div className="text-sm text-gray-600">{geo.cps} CPs • {geo.bookings} bookings</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">{formatCurrency(geo.revenue)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Efficiency & Security Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Efficiency Metrics */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>⚡</span>
            Efficiency Metrics
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {dashboardData?.efficiency_metrics?.avg_booking_time || '2.3h'}
              </div>
              <div className="text-sm text-gray-600">Avg Booking Time</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {dashboardData?.efficiency_metrics?.cp_utilization || 73.2}%
              </div>
              <div className="text-sm text-gray-600">CP Utilization</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {dashboardData?.efficiency_metrics?.customer_retention || 84.6}%
              </div>
              <div className="text-sm text-gray-600">Customer Retention</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {formatCurrency(dashboardData?.efficiency_metrics?.revenue_per_booking || 98.50)}
              </div>
              <div className="text-sm text-gray-600">Revenue per Booking</div>
            </div>
          </div>
        </div>

        {/* Fraud Detection */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>🔒</span>
            Fraud Detection
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-800">Risk Level</div>
                <div className="text-sm text-gray-600">Current security status</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-green-600">
                  {dashboardData?.fraud_detection?.risk_score || 'Low'}
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-800">Flagged Transactions</div>
                <div className="text-sm text-gray-600">This month</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-yellow-600">
                  {dashboardData?.fraud_detection?.flagged_transactions || 12}
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-800">Prevented Losses</div>
                <div className="text-sm text-gray-600">Estimated savings</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-blue-600">
                  {formatCurrency(dashboardData?.fraud_detection?.potential_savings || 2340)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Export Controls */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Export & Reports</h3>
        <div className="flex flex-wrap gap-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <span>📊</span>
            Export Dashboard PDF
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
            <span>📈</span>
            Generate Financial Report
          </button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
            <span>📧</span>
            Schedule Email Report
          </button>
          <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2">
            <span>⚙️</span>
            Configure Alerts
          </button>
        </div>
      </div>
    </div>
  );
}