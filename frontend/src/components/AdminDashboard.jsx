import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';

const API_BASE = import.meta.env.VITE_API_BASE || window.API_BASE || "https://cleanpro-backend-5539254765.europe-west1.run.app";

export default function AdminDashboard({ onClose }) {
  const { token, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [appsheetConfig, setAppsheetConfig] = useState(null);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    if (!isAdmin) return;
    fetchDashboardData();
  }, [isAdmin, token]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      // Fetch bookings
      const bookingsRes = await fetch(`${API_BASE}/api/admin/bookings`, { headers });
      const bookingsData = await bookingsRes.json();
      if (bookingsData.ok) setBookings(bookingsData.bookings || []);

      // Fetch users
      const usersRes = await fetch(`${API_BASE}/api/admin/users`, { headers });
      const usersData = await usersRes.json();
      if (usersData.ok) setUsers(usersData.users || []);

      // Fetch stats
      const statsRes = await fetch(`${API_BASE}/api/admin/stats`, { headers });
      const statsData = await statsRes.json();
      if (statsData.ok) setStats(statsData.stats || {});

      // Fetch AppSheet config
      const appsheetRes = await fetch(`${API_BASE}/api/appsheet/config`, { headers });
      const appsheetData = await appsheetRes.json();
      if (appsheetData.ok) setAppsheetConfig(appsheetData.config || {});

    } catch (error) {
      toast.error('Failed to load dashboard data');
    }
    setLoading(false);
  };

  const syncAppSheetData = async (type) => {
    setSyncing(true);
    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const endpoint = type === 'all' ? '/api/appsheet/sync/all' : `/api/appsheet/sync/${type}`;
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers
      });
      
      const data = await res.json();
      if (data.ok) {
        toast.success(`${type === 'all' ? 'All data' : type} synced successfully!`);
        fetchDashboardData(); // Refresh data
      } else {
        toast.error(data.error || 'Sync failed');
      }
    } catch (error) {
      toast.error('Sync failed');
    }
    setSyncing(false);
  };

  const testAppSheetConnection = async () => {
    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const res = await fetch(`${API_BASE}/api/appsheet/test`, {
        method: 'POST',
        headers
      });
      
      const data = await res.json();
      if (data.ok) {
        toast.success(`Connection successful! Found ${data.recordCount} records.`);
      } else {
        toast.error(data.error || 'Connection failed');
      }
    } catch (error) {
      toast.error('Connection test failed');
    }
  };

  const updateBookingStatus = async (bookingId, status) => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/bookings/${bookingId}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });

      const data = await res.json();
      if (data.ok) {
        toast.success('Booking status updated');
        fetchDashboardData();
      } else {
        toast.error(data.message || 'Failed to update booking');
      }
    } catch (error) {
      toast.error('Network error');
    }
  };

  if (!isAdmin) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p>You don't have admin privileges.</p>
          <button 
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Stats Overview */}
        <div className="p-6 border-b bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800">Total Bookings</h3>
              <p className="text-2xl font-bold text-blue-600">{stats.totalBookings || 0}</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800">Total Revenue</h3>
              <p className="text-2xl font-bold text-green-600">${stats.totalRevenue || 0}</p>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-800">Active Users</h3>
              <p className="text-2xl font-bold text-purple-600">{stats.activeUsers || 0}</p>
            </div>
            <div className="bg-orange-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-orange-800">Pending Approvals</h3>
              <p className="text-2xl font-bold text-orange-600">
                {(bookings || []).filter(b => b && b.status === 'pending_approval').length}
              </p>
            </div>
          </div>
        </div>

        {/* Priority Alerts for Pending Approvals */}
        {(bookings || []).filter(b => b && b.status === 'pending_approval').length > 0 && (
          <div className="p-4 bg-orange-50 border-l-4 border-orange-400">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="text-orange-400 text-2xl">⚠️</div>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-orange-800">
                  {bookings.filter(b => b.status === 'pending_approval').length} Booking{bookings.filter(b => b.status === 'pending_approval').length > 1 ? 's' : ''} Awaiting Approval
                </h3>
                <p className="text-sm text-orange-700">
                  These customers are waiting for booking confirmation. Please review and approve/reject promptly.
                </p>
                <div className="mt-2 grid grid-cols-1 gap-2">
                  {bookings.filter(b => b.status === 'pending_approval').slice(0, 3).map(booking => (
                    <div key={booking.id} className="bg-white p-2 rounded border">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-medium">{booking.userName}</span>
                          <span className="text-sm text-gray-500 ml-2">{booking.service} - ${booking.totalPrice}</span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                            className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600"
                          >
                            ✅ Approve
                          </button>
                          <button
                            onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                            className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                          >
                            ❌ Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-6 py-3 font-medium ${activeTab === 'bookings' 
              ? 'border-b-2 border-blue-500 text-blue-600' 
              : 'text-gray-500 hover:text-gray-700'}`}
          >
            Bookings
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-6 py-3 font-medium ${activeTab === 'users' 
              ? 'border-b-2 border-blue-500 text-blue-600' 
              : 'text-gray-500 hover:text-gray-700'}`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab('appsheet')}
            className={`px-6 py-3 font-medium ${activeTab === 'appsheet' 
              ? 'border-b-2 border-blue-500 text-blue-600' 
              : 'text-gray-500 hover:text-gray-700'}`}
          >
            📊 AppSheet
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <>
              {activeTab === 'bookings' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Recent Bookings</h3>
                  {bookings.length === 0 ? (
                    <p className="text-gray-500">No bookings found</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 text-left">Customer</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Service</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Amount</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bookings.map((booking) => (
                            <tr key={booking.id} className="hover:bg-gray-50">
                              <td className="border border-gray-300 px-4 py-2">
                                <div>
                                  <div className="font-medium">{booking.userName || booking.name}</div>
                                  <div className="text-sm text-gray-500">{booking.userEmail || booking.email}</div>
                                  {(booking.userPhone || booking.phone) && (
                                    <div className="text-sm text-blue-600">📞 {booking.userPhone || booking.phone}</div>
                                  )}
                                  {booking.address && (
                                    <div className="text-xs text-gray-400 mt-1">📍 {booking.address}</div>
                                  )}
                                </div>
                              </td>
                              <td className="border border-gray-300 px-4 py-2">{booking.service}</td>
                              <td className="border border-gray-300 px-4 py-2">{booking.date}</td>
                              <td className="border border-gray-300 px-4 py-2">
                                <span className={`px-2 py-1 rounded text-xs ${
                                  booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                  booking.status === 'pending_approval' ? 'bg-orange-100 text-orange-800' :
                                  booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                  booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {booking.status === 'pending_approval' ? 'Awaiting Approval' : (booking.status || 'pending')}
                                </span>
                              </td>
                              <td className="border border-gray-300 px-4 py-2">${booking.estimatedPrice || 0}</td>
                              <td className="border border-gray-300 px-4 py-2">
                                {booking.status === 'pending_approval' ? (
                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                                      className="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600 transition-colors"
                                    >
                                      ✅ Approve
                                    </button>
                                    <button
                                      onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                                      className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600 transition-colors"
                                    >
                                      ❌ Reject
                                    </button>
                                  </div>
                                ) : (
                                  <select
                                    value={booking.status || 'pending'}
                                    onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                                    className="text-xs border rounded px-2 py-1"
                                  >
                                    <option value="pending_approval">Pending Approval</option>
                                    <option value="confirmed">Confirmed</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                  </select>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'users' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">User Management</h3>
                  {users.length === 0 ? (
                    <p className="text-gray-500">No users found</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Phone</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Role</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Joined</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                              <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                              <td className="border border-gray-300 px-4 py-2">{user.phone || 'N/A'}</td>
                              <td className="border border-gray-300 px-4 py-2">
                                <span className={`px-2 py-1 rounded text-xs ${
                                  user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                                }`}>
                                  {user.role || 'user'}
                                </span>
                              </td>
                              <td className="border border-gray-300 px-4 py-2">
                                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'appsheet' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">📊 AppSheet Integration</h3>
                    {appsheetConfig && (
                      <div className={`px-3 py-1 rounded text-sm ${
                        appsheetConfig.configured 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {appsheetConfig.configured ? '✅ Configured' : '❌ Not Configured'}
                      </div>
                    )}
                  </div>

                  {appsheetConfig && !appsheetConfig.configured ? (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                      <div className="flex">
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-yellow-800">
                            AppSheet Not Configured
                          </h3>
                          <div className="mt-2 text-sm text-yellow-700">
                            <p>To enable AppSheet integration, configure these environment variables:</p>
                            <ul className="mt-2 list-disc list-inside">
                              <li><code>APPSHEET_API_KEY</code> - Your AppSheet API key</li>
                              <li><code>APPSHEET_APP_ID</code> - Your AppSheet App ID</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Connection Test */}
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h4 className="text-md font-semibold text-gray-800 mb-4">🔗 Connection Test</h4>
                        <p className="text-sm text-gray-600 mb-4">
                          Test the connection to your AppSheet application.
                        </p>
                        <button
                          onClick={testAppSheetConnection}
                          disabled={syncing}
                          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
                        >
                          {syncing ? 'Testing...' : 'Test Connection'}
                        </button>
                      </div>

                      {/* Sync Coordination Points */}
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h4 className="text-md font-semibold text-gray-800 mb-4">📍 Coordination Points</h4>
                        <p className="text-sm text-gray-600 mb-4">
                          Sync coordination points from AppSheet to your application.
                        </p>
                        <button
                          onClick={() => syncAppSheetData('coordination-points')}
                          disabled={syncing}
                          className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400 transition-colors"
                        >
                          {syncing ? 'Syncing...' : 'Sync Coordination Points'}
                        </button>
                      </div>

                      {/* Sync Pricing */}
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h4 className="text-md font-semibold text-gray-800 mb-4">💰 Pricing & Campaign Data</h4>
                        <p className="text-sm text-gray-600 mb-4">
                          Sync pricing information and campaign discounts from AppSheet. Includes base rates (per sq ft), frequency discounts, and campaign promotions (10-50% discounts).
                        </p>
                        <button
                          onClick={() => syncAppSheetData('pricing')}
                          disabled={syncing}
                          className="w-full bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 disabled:bg-gray-400 transition-colors"
                        >
                          {syncing ? 'Syncing...' : 'Sync Pricing & Campaigns'}
                        </button>
                      </div>

                      {/* Sync All */}
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h4 className="text-md font-semibold text-gray-800 mb-4">🔄 Full Sync</h4>
                        <p className="text-sm text-gray-600 mb-4">
                          Sync all data (coordination points and pricing) from AppSheet.
                        </p>
                        <button
                          onClick={() => syncAppSheetData('all')}
                          disabled={syncing}
                          className="w-full bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 disabled:bg-gray-400 transition-colors"
                        >
                          {syncing ? 'Syncing...' : 'Sync All Data'}
                        </button>
                      </div>
                    </div>
                  )}

                  {appsheetConfig && appsheetConfig.configured && (
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                      <div className="flex">
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-blue-800">
                            AppSheet Integration Ready
                          </h3>
                          <div className="mt-2 text-sm text-blue-700">
                            <p>Your AppSheet integration is configured and ready to use. You can sync data from your AppSheet app to keep your pricing and coordination points up to date.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}