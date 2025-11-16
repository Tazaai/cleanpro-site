import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLocalization } from './LocalizationEngine';
import { toast } from 'react-hot-toast';

const API_BASE = import.meta.env.VITE_API_BASE || window.API_BASE || "https://cleanpro-backend-5539254765.europe-west1.run.app";

export default function StripeConfig() {
  const { token, user } = useAuth();
  const { settings, formatCurrency } = useLocalization();
  const [config, setConfig] = useState({
    mode: 'test', // 'test' or 'live'
    publishable_key_test: '',
    publishable_key_live: '',
    webhook_endpoint: '',
    escrow_enabled: true,
    auto_payout_threshold: 100,
    payout_delay_days: 3
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testResults, setTestResults] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize for mobile detection
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchConfig();
    }
  }, [user]);

  const fetchConfig = async () => {
    setLoading(true);
    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const response = await fetch(`${API_BASE}/api/admin/stripe/config`, { headers });
      if (response.ok) {
        const data = await response.json();
        if (data.ok) {
          setConfig({ ...config, ...data.data });
        }
      }
    } catch (error) {
      console.error('Error fetching Stripe config:', error);
      // Use default config if fetch fails
    }
    setLoading(false);
  };

  const saveConfig = async () => {
    setSaving(true);
    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const response = await fetch(`${API_BASE}/api/admin/stripe/config`, {
        method: 'POST',
        headers,
        body: JSON.stringify(config)
      });

      if (response.ok) {
        const data = await response.json();
        if (data.ok) {
          toast.success('Stripe configuration saved successfully');
        } else {
          toast.error(data.error || 'Failed to save configuration');
        }
      } else {
        toast.error('Failed to save Stripe configuration');
      }
    } catch (error) {
      console.error('Error saving config:', error);
      toast.error('Failed to save configuration');
    }
    setSaving(false);
  };

  const testStripeConnection = async () => {
    setTestResults(null);
    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const response = await fetch(`${API_BASE}/api/admin/stripe/test`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          mode: config.mode,
          publishable_key: config.mode === 'test' ? config.publishable_key_test : config.publishable_key_live
        })
      });

      if (response.ok) {
        const data = await response.json();
        setTestResults(data);
        
        if (data.ok) {
          toast.success('Stripe connection test successful');
        } else {
          toast.error('Stripe connection test failed');
        }
      } else {
        setTestResults({ ok: false, error: 'Test request failed' });
        toast.error('Connection test failed');
      }
    } catch (error) {
      console.error('Error testing Stripe connection:', error);
      setTestResults({ ok: false, error: error.message });
      toast.error('Connection test error');
    }
  };

  const handleInputChange = (field, value) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const toggleMode = () => {
    const newMode = config.mode === 'test' ? 'live' : 'test';
    setConfig(prev => ({ ...prev, mode: newMode }));
    
    if (newMode === 'live') {
      toast.success('⚠️ Switched to LIVE mode - Real payments will be processed!', {
        duration: 5000
      });
    } else {
      toast.success('Switched to TEST mode - Safe for development');
    }
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 text-center">
        <div className="text-4xl mb-4">🔒</div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Access Denied</h2>
        <p className="text-gray-600">Admin privileges required for Stripe configuration.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Stripe Configuration</h1>
            <p className="text-gray-600">
              Configure payment processing settings and manage Stripe integration
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Mode Toggle */}
            <div className={`flex items-center gap-2 p-2 rounded-lg ${
              config.mode === 'live' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
            }`}>
              <span className="text-sm font-medium">
                {config.mode === 'live' ? '🔴 LIVE MODE' : '🔵 TEST MODE'}
              </span>
              <button
                onClick={toggleMode}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  config.mode === 'live' 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Switch to {config.mode === 'live' ? 'Test' : 'Live'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Configuration Form */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">API Keys & Settings</h2>
        
        <div className="space-y-6">
          {/* API Keys Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Test Keys */}
            <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
              <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                <span>🧪</span>
                Test Environment Keys
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Test Publishable Key
                  </label>
                  <input
                    type="password"
                    value={config.publishable_key_test}
                    onChange={(e) => handleInputChange('publishable_key_test', e.target.value)}
                    placeholder="pk_test_..."
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Live Keys */}
            <div className="p-4 border border-red-200 rounded-lg bg-red-50">
              <h3 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                <span>⚠️</span>
                Live Environment Keys
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Live Publishable Key
                  </label>
                  <input
                    type="password"
                    value={config.publishable_key_live}
                    onChange={(e) => handleInputChange('publishable_key_live', e.target.value)}
                    placeholder="pk_live_..."
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Webhook Configuration */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Webhook Configuration</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Webhook Endpoint URL
              </label>
              <input
                type="url"
                value={config.webhook_endpoint}
                onChange={(e) => handleInputChange('webhook_endpoint', e.target.value)}
                placeholder="https://your-domain.com/api/stripe/webhook"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-gray-600 mt-1">
                Configure this URL in your Stripe dashboard to receive webhook events
              </p>
            </div>
          </div>

          {/* Payment & Payout Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={config.escrow_enabled}
                  onChange={(e) => handleInputChange('escrow_enabled', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Enable Escrow</span>
              </label>
              <p className="text-xs text-gray-600 mt-1">
                Hold payments until service completion
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Auto-Payout Threshold
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={config.auto_payout_threshold}
                  onChange={(e) => handleInputChange('auto_payout_threshold', parseFloat(e.target.value))}
                  min="0"
                  step="10"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <span className="text-sm text-gray-600">{settings.currency}</span>
              </div>
              <p className="text-xs text-gray-600 mt-1">
                Minimum amount for automatic payouts
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payout Delay (Days)
              </label>
              <input
                type="number"
                value={config.payout_delay_days}
                onChange={(e) => handleInputChange('payout_delay_days', parseInt(e.target.value))}
                min="0"
                max="30"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-gray-600 mt-1">
                Days to wait before processing payouts
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={testStripeConnection}
            disabled={saving}
            className="flex-1 sm:flex-none bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors flex items-center justify-center gap-2"
          >
            <span>🔍</span>
            Test Connection
          </button>
          
          <button
            onClick={saveConfig}
            disabled={saving}
            className="flex-1 sm:flex-none bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors flex items-center justify-center gap-2"
          >
            <span>💾</span>
            {saving ? 'Saving...' : 'Save Configuration'}
          </button>
        </div>
      </div>

      {/* Test Results */}
      {testResults && (
        <div className={`bg-white rounded-lg shadow-lg p-6 border-l-4 ${
          testResults.ok ? 'border-green-500' : 'border-red-500'
        }`}>
          <h3 className={`font-semibold mb-3 ${
            testResults.ok ? 'text-green-800' : 'text-red-800'
          }`}>
            {testResults.ok ? '✅ Connection Test Results' : '❌ Connection Test Failed'}
          </h3>
          
          {testResults.ok ? (
            <div className="space-y-2 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-medium text-gray-600">Account ID:</span>
                  <span className="ml-2 text-gray-800">{testResults.data?.account_id}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Business Name:</span>
                  <span className="ml-2 text-gray-800">{testResults.data?.business_name}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Country:</span>
                  <span className="ml-2 text-gray-800">{testResults.data?.country}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Currency:</span>
                  <span className="ml-2 text-gray-800">{testResults.data?.currency}</span>
                </div>
              </div>
              {testResults.data?.capabilities && (
                <div className="mt-3">
                  <span className="font-medium text-gray-600">Capabilities:</span>
                  <div className="ml-2 flex flex-wrap gap-1 mt-1">
                    {Object.entries(testResults.data.capabilities).map(([capability, status]) => (
                      <span
                        key={capability}
                        className={`px-2 py-1 rounded text-xs ${
                          status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {capability}: {status}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-sm text-red-700">
              <p className="font-medium">Error:</p>
              <p>{testResults.error}</p>
            </div>
          )}
        </div>
      )}

      {/* Configuration Guide */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Configuration Guide</h3>
        <div className="space-y-4 text-sm">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">🔵 Test Mode Setup</h4>
            <ul className="list-disc list-inside space-y-1 text-blue-700">
              <li>Use test API keys from your Stripe dashboard</li>
              <li>Test payments won't process real money</li>
              <li>Use test card numbers for testing</li>
              <li>Perfect for development and staging</li>
            </ul>
          </div>
          
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <h4 className="font-medium text-red-800 mb-2">🔴 Live Mode Setup</h4>
            <ul className="list-disc list-inside space-y-1 text-red-700">
              <li>Requires live API keys from Stripe</li>
              <li>All payments process real money</li>
              <li>Account must be fully verified</li>
              <li>Only use in production environment</li>
            </ul>
          </div>
          
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-medium text-yellow-800 mb-2">⚠️ Security Notes</h4>
            <ul className="list-disc list-inside space-y-1 text-yellow-700">
              <li>Never expose secret keys in frontend code</li>
              <li>Use environment variables for API keys</li>
              <li>Regularly rotate your API keys</li>
              <li>Monitor webhook signature validation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}