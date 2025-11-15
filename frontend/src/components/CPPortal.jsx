import React, { useState, useEffect } from 'react';

const CPPortal = () => {
  const [analytics, setAnalytics] = useState(null);
  const [systemHealth, setSystemHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');
  const [expandedCards, setExpandedCards] = useState({});

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

  const MetricCard = ({ title, value, subtitle, status = 'default', expandable = false, id }) => {
    const statusColors = {
      success: 'border-green-500 bg-green-50',
      warning: 'border-yellow-500 bg-yellow-50',
      error: 'border-red-500 bg-red-50',
      default: 'border-gray-300 bg-white'
    };

    const isExpanded = expandedCards[id] || false;
    
    const toggleExpanded = () => {
      if (expandable) {
        setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }));
      }
    };

    return (
      <div 
        className={`p-3 sm:p-4 rounded-lg border-2 ${statusColors[status]} transition-all duration-200 ${
          expandable ? 'cursor-pointer hover:shadow-md' : ''
        }`}
        onClick={toggleExpanded}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="text-xs sm:text-sm font-medium text-gray-600 truncate">{title}</h3>
            <p className="text-lg sm:text-2xl font-bold text-gray-900">{value}</p>
            {subtitle && <p className="text-xs sm:text-sm text-gray-500">{subtitle}</p>}
          </div>
          {expandable && (
            <div className="ml-2 text-gray-400">
              {isExpanded ? '▼' : '▶'}
            </div>
          )}
        </div>
        {expandable && isExpanded && (
          <div className="mt-3 pt-3 border-t border-gray-200 text-sm text-gray-600">
            <p>Detailed metrics and trends would appear here...</p>
          </div>
        )}
      </div>
    );
  };

  const ServiceStatus = ({ name, metrics, isActive, mobile = false }) => (
    <div className={`bg-white rounded-lg shadow border transition-all hover:shadow-md ${
      mobile ? 'p-4' : 'p-3 sm:p-4'
    }`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${
            isActive ? 'bg-green-500' : 'bg-gray-400'
          }`} />
          <h4 className={`font-semibold truncate ${
            mobile ? 'text-base' : 'text-sm sm:text-base'
          }`}>{name}</h4>
        </div>
        <span className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${
          isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'
        }`}>
          {isActive ? 'Active' : 'Inactive'}
        </span>
      </div>
      
      {/* Progress bar for success rate */}
      <div className="mb-3">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-gray-600">Success Rate</span>
          <span className="text-xs font-medium">{metrics?.success_rate || 100}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${
              (metrics?.success_rate || 100) >= 95 ? 'bg-green-500' : 
              (metrics?.success_rate || 100) >= 80 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${metrics?.success_rate || 100}%` }}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-600">Total Events</span>
          <span className="text-sm font-medium">{metrics?.total || 0}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-600">Last 24h</span>
          <span className="text-sm font-medium">{metrics?.recent || 0}</span>
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

  // Mobile Navigation Component
  const MobileNavigation = () => (
    <div className={`fixed inset-0 z-50 lg:hidden ${
      sidebarOpen ? 'block' : 'hidden'
    }`}>
      <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
      <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
        <div className="absolute top-0 right-0 -mr-12 pt-2">
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span className="text-white text-xl">×</span>
          </button>
        </div>
        <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
          <div className="px-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">CP Portal</h2>
            <nav className="space-y-2">
              {[
                { id: 'dashboard', label: '📊 Dashboard', icon: '📊' },
                { id: 'analytics', label: '📈 Analytics', icon: '📈' },
                { id: 'coordination', label: '🎯 CPs', icon: '🎯' },
                { id: 'settings', label: '⚙️ Settings', icon: '⚙️' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveView(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeView === item.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label.replace(/^.\s/, '')}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileNavigation />
      
      {/* Mobile Header */}
      <div className="bg-white shadow-sm border-b lg:hidden">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="text-xl">☰</span>
            </button>
            <h1 className="text-lg font-semibold text-gray-900">CP Portal</h1>
            <button 
              onClick={fetchDashboardData}
              className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              ↻
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="bg-white shadow-sm border-b hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                CP Portal Dashboard
              </h1>
              <p className="text-gray-600">Clean Departure Coordination Point Management</p>
            </div>
            <div className="flex space-x-3">
              {[
                { id: 'dashboard', label: 'Dashboard' },
                { id: 'analytics', label: 'Analytics' },
                { id: 'coordination', label: 'CPs' },
                { id: 'settings', label: 'Settings' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                    activeView === item.id
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button 
                onClick={fetchDashboardData}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* System Health Overview - Mobile Optimized */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-semibold">System Health</h2>
            <div className="flex items-center space-x-2">
              <span className={`w-3 h-3 rounded-full ${
                systemHealth?.health?.status === 'healthy' ? 'bg-green-500' : 'bg-yellow-500'
              }`} />
              <span className="text-sm text-gray-600 hidden sm:inline">
                {systemHealth?.health?.status === 'healthy' ? 'All systems operational' : 'Some issues detected'}
              </span>
            </div>
          </div>
          
          {/* Mobile: 2 columns, Tablet: 2 columns, Desktop: 4 columns */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            <MetricCard 
              id="system-status"
              title="System Status"
              value={systemHealth?.health?.status || 'Unknown'}
              status={systemHealth?.health?.status === 'healthy' ? 'success' : 'warning'}
              expandable={true}
            />
            <MetricCard 
              id="total-activity"
              title="Total Activity"
              value={analytics?.summary?.total_events || 0}
              subtitle="Last 7 days"
              expandable={true}
            />
            <MetricCard 
              id="success-rate"
              title="Success Rate"
              value={`${analytics?.summary?.success_rate || 100}%`}
              status={parseFloat(analytics?.summary?.success_rate || 100) >= 95 ? 'success' : 'warning'}
              expandable={true}
            />
            <MetricCard 
              id="active-services"
              title="Active Services"
              value={systemHealth?.health ? 
                Object.values(systemHealth.health.services).filter(s => s === 'active').length : 0
              }
              subtitle="out of 3 services"
              expandable={true}
            />
          </div>
        </div>

        {/* Services Overview - Mobile Swipeable */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Service Status</h2>
          
          {/* Mobile: Horizontal scroll, Desktop: Grid */}
          <div className="lg:hidden">
            <div className="flex space-x-4 overflow-x-auto pb-4 snap-x snap-mandatory">
              <div className="flex-none w-72 snap-start">
                <ServiceStatus 
                  name="AI Monitoring"
                  metrics={analytics?.metrics?.ai_monitoring}
                  isActive={systemHealth?.health?.services?.ai_monitoring === 'active'}
                  mobile={true}
                />
              </div>
              <div className="flex-none w-72 snap-start">
                <ServiceStatus 
                  name="Email Notifications"
                  metrics={analytics?.metrics?.email_notifications}
                  isActive={systemHealth?.health?.services?.email_service === 'active'}
                  mobile={true}
                />
              </div>
              <div className="flex-none w-72 snap-start">
                <ServiceStatus 
                  name="Smart Matching"
                  metrics={analytics?.metrics?.smart_matching}
                  isActive={systemHealth?.health?.services?.smart_matching === 'active'}
                  mobile={true}
                />
              </div>
            </div>
            <div className="flex justify-center space-x-2 mt-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            </div>
          </div>
          
          {/* Desktop Grid */}
          <div className="hidden lg:grid grid-cols-3 gap-6">
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