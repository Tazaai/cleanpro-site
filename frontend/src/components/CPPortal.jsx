import React, { useState, useEffect } from 'react';

const CPPortal = () => {
  const [analytics, setAnalytics] = useState(null);
  const [systemHealth, setSystemHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = 'https://cleanpro-backend-2a5pka5baa-ew.a.run.app';

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [analyticsRes, healthRes] = await Promise.all([
        fetch(`${API_BASE}/api/analytics/summary?timeframe=7d`),
        fetch(`${API_BASE}/api/analytics/health`)
      ]);

      const analyticsData = await analyticsRes.json();
      const healthData = await healthRes.json();

      setAnalytics(analyticsData);
      setSystemHealth(healthData);
      setError(null);
    } catch (err) {
      setError(`Failed to fetch data: ${err.message}`);
      console.error('Dashboard data fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const MetricCard = ({ title, value, subtitle, status = 'default' }) => {
    const statusColors = {
      success: 'border-green-500 bg-green-50',
      warning: 'border-yellow-500 bg-yellow-50',
      error: 'border-red-500 bg-red-50',
      default: 'border-gray-300 bg-white'
    };

    return (
      <div className={`p-4 rounded-lg border-2 ${statusColors[status]}`}>
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
    );
  };

  const ServiceStatus = ({ name, metrics, isActive }) => (
    <div className="bg-white p-4 rounded-lg shadow border">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold">{name}</h4>
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'
        }`}>
          {isActive ? 'Active' : 'Inactive'}
        </span>
      </div>
      <div className="space-y-2">
        <div className="text-sm">
          <span className="text-gray-600">Total Events: </span>
          <span className="font-medium">{metrics?.total || 0}</span>
        </div>
        <div className="text-sm">
          <span className="text-gray-600">Success Rate: </span>
          <span className="font-medium">{metrics?.success_rate || 100}%</span>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading CP Portal...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️ Error</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={fetchDashboardData}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                CP Portal Dashboard
              </h1>
              <p className="text-gray-600">Clean Departure Coordination Point Management</p>
            </div>
            <button 
              onClick={fetchDashboardData}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* System Health Overview */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">System Health</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <MetricCard 
              title="System Status"
              value={systemHealth?.health?.status || 'Unknown'}
              status={systemHealth?.health?.status === 'healthy' ? 'success' : 'warning'}
            />
            <MetricCard 
              title="Total Activity"
              value={analytics?.summary?.total_events || 0}
              subtitle="Last 7 days"
            />
            <MetricCard 
              title="Success Rate"
              value={`${analytics?.summary?.success_rate || 100}%`}
              status={parseFloat(analytics?.summary?.success_rate || 100) >= 95 ? 'success' : 'warning'}
            />
            <MetricCard 
              title="Active Services"
              value={systemHealth?.health ? 
                Object.values(systemHealth.health.services).filter(s => s === 'active').length : 0
              }
              subtitle="out of 3 services"
            />
          </div>
        </div>

        {/* Services Overview */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Service Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ServiceStatus 
              name="AI Monitoring"
              metrics={analytics?.metrics?.ai_monitoring}
              isActive={systemHealth?.health?.services?.ai_monitoring === 'active'}
            />
            <ServiceStatus 
              name="Email Notifications"
              metrics={analytics?.metrics?.email_notifications}
              isActive={systemHealth?.health?.services?.email_service === 'active'}
            />
            <ServiceStatus 
              name="Smart Matching"
              metrics={analytics?.metrics?.smart_matching}
              isActive={systemHealth?.health?.services?.smart_matching === 'active'}
            />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="bg-white rounded-lg shadow">
            {analytics?.summary?.top_concerns?.length > 0 ? (
              <div className="p-6">
                <h3 className="font-medium mb-4">Top Concerns</h3>
                <div className="space-y-3">
                  {analytics.summary.top_concerns.slice(0, 5).map((concern, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <div>
                        <span className="font-medium text-gray-900">{concern.type}</span>
                        <p className="text-sm text-gray-600">{concern.description}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        concern.severity === 'high' ? 'bg-red-100 text-red-800' :
                        concern.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {concern.severity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-6 text-center text-gray-500">
                <div className="text-4xl mb-2">✅</div>
                <p>No concerns detected. System is running smoothly!</p>
              </div>
            )}
          </div>
        </div>

        {/* Analytics Summary */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Analytics Summary</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-3">Time Period</h3>
                <p className="text-sm text-gray-600">
                  {analytics?.timeframe?.toUpperCase()} 
                  ({analytics?.period?.from ? 
                    new Date(analytics.period.from).toLocaleDateString() : 'N/A'
                  } - {analytics?.period?.to ? 
                    new Date(analytics.period.to).toLocaleDateString() : 'N/A'
                  })
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-3">Generated</h3>
                <p className="text-sm text-gray-600">
                  {analytics?.generated_at ? 
                    new Date(analytics.generated_at).toLocaleString() : 'N/A'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition">
                <div className="text-center">
                  <div className="text-2xl mb-2">🔍</div>
                  <p className="font-medium">View Detailed Analytics</p>
                  <p className="text-sm text-gray-600">Drill down into service metrics</p>
                </div>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition">
                <div className="text-center">
                  <div className="text-2xl mb-2">🎯</div>
                  <p className="font-medium">Test Smart Matching</p>
                  <p className="text-sm text-gray-600">Run matching algorithm test</p>
                </div>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition">
                <div className="text-center">
                  <div className="text-2xl mb-2">⚙️</div>
                  <p className="font-medium">System Configuration</p>
                  <p className="text-sm text-gray-600">Manage CP settings</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CPPortal;