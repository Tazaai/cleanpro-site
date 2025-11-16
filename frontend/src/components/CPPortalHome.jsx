import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';

const API_BASE = import.meta.env.VITE_API_BASE || window.API_BASE || "https://cleanpro-backend-5539254765.europe-west1.run.app";

export default function CPPortalHome() {
  const { token, user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentBookings, setRecentBookings] = useState([]);
  const [cpInfo, setCpInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize for mobile detection
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (user?.coordination_point_id) {
      fetchCPData();
    }
  }, [user]);

  const fetchCPData = async () => {
    setLoading(true);
    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      // Fetch CP stats
      const statsResponse = await fetch(`${API_BASE}/api/cp/bookings/stats?cp_id=${user.coordination_point_id}`, { headers });
      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData.data);
      }

      // Fetch recent bookings
      const bookingsResponse = await fetch(`${API_BASE}/api/cp/bookings?cp_id=${user.coordination_point_id}&limit=5`, { headers });
      if (bookingsResponse.ok) {
        const bookingsData = await bookingsResponse.json();
        setRecentBookings(bookingsData.data || []);
      }

      // Fetch CP information
      const cpResponse = await fetch(`${API_BASE}/api/coordination_points/${user.coordination_point_id}`, { headers });
      if (cpResponse.ok) {
        const cpData = await cpResponse.json();
        setCpInfo(cpData.data);
      }

    } catch (error) {
      console.error('Error fetching CP data:', error);
      toast.error('Failed to load dashboard data');
    }
    setLoading(false);
  };

  const updateBookingStatus = async (bookingId, newStatus) => {
    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const response = await fetch(`${API_BASE}/api/cp/bookings/${bookingId}/status`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ 
          status: newStatus,
          cp_id: user.coordination_point_id 
        })
      });

      const data = await response.json();
      
      if (data.ok) {
        toast.success(`Booking ${newStatus} successfully`);
        fetchCPData(); // Refresh data
      } else {
        toast.error(data.error || 'Failed to update booking');
      }
    } catch (error) {
      console.error('Error updating booking:', error);
      toast.error('Failed to update booking status');
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    }).format(date);
  };

  const getStatusColor = (status) => {
    const colors = {
      'pending_approval': 'bg-yellow-100 text-yellow-800',
      'confirmed': 'bg-green-100 text-green-800',
      'in_progress': 'bg-blue-100 text-blue-800',
      'completed': 'bg-purple-100 text-purple-800',
      'cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user?.coordination_point_id) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 text-center">
        <div className="text-4xl mb-4">🏢</div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">No Coordination Point Access</h2>
        <p className="text-gray-600">
          You don't have access to any coordination point. Please contact your administrator.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg p-6 text-white">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Welcome back!</h1>
            <p className="text-blue-100">
              {cpInfo?.name || 'Your Coordination Point'} Dashboard
            </p>
            {cpInfo?.location && (
              <p className="text-sm text-blue-200 mt-1">📍 {cpInfo.location}</p>
            )}
          </div>
          <div className="text-right">
            <div className="text-sm text-blue-200">Today</div>
            <div className="text-xl font-semibold">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long',
                month: 'short', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      {stats && (
        <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} gap-4`}>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="text-3xl text-blue-600 mr-3">📊</div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{stats.total_bookings}</div>
                <div className="text-sm text-gray-600">Total Bookings</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="text-3xl text-yellow-500 mr-3">⏳</div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{stats.pending_bookings}</div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="text-3xl text-green-600 mr-3">💰</div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{formatCurrency(stats.total_revenue)}</div>
                <div className="text-sm text-gray-600">Revenue</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="text-3xl text-purple-600 mr-3">⭐</div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{stats.avg_rating?.toFixed(1) || 'N/A'}</div>
                <div className="text-sm text-gray-600">Avg Rating</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Bookings */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-xl font-bold text-gray-800">Recent Bookings</h2>
          <button
            onClick={fetchCPData}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            🔄 Refresh
          </button>
        </div>

        {recentBookings.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">📅</div>
            <p>No recent bookings</p>
            <p className="text-sm mt-1">New bookings will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentBookings.map(booking => (
              <div key={booking.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="font-medium text-gray-900">{booking.service}</h3>
                      <span className={`px-2 py-1 rounded text-xs ${getStatusColor(booking.status)}`}>
                        {booking.status.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm text-gray-600">
                      <div>📅 {formatDate(booking.date)}</div>
                      <div>👤 {booking.customer_name}</div>
                      <div>💰 {formatCurrency(booking.estimated_price)}</div>
                      {booking.address && (
                        <div className="sm:col-span-2 lg:col-span-3">📍 {booking.address}</div>
                      )}
                    </div>
                  </div>
                  
                  {booking.status === 'pending_approval' && (
                    <div className="flex gap-2 w-full lg:w-auto">
                      <button
                        onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                        className="flex-1 lg:flex-none bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                      >
                        ✅ Accept
                      </button>
                      <button
                        onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                        className="flex-1 lg:flex-none bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                      >
                        ❌ Reject
                      </button>
                    </div>
                  )}
                  
                  {booking.status === 'confirmed' && (
                    <button
                      onClick={() => updateBookingStatus(booking.id, 'in_progress')}
                      className="w-full lg:w-auto bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                    >
                      🚀 Start Service
                    </button>
                  )}
                  
                  {booking.status === 'in_progress' && (
                    <button
                      onClick={() => updateBookingStatus(booking.id, 'completed')}
                      className="w-full lg:w-auto bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700 transition-colors"
                    >
                      ✨ Mark Complete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CP Performance */}
      {stats && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Performance Metrics</h2>
          <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-4`}>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{stats.completion_rate?.toFixed(1)}%</div>
              <div className="text-sm text-blue-700">Completion Rate</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{stats.response_time?.toFixed(0)}h</div>
              <div className="text-sm text-green-700">Avg Response Time</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{stats.monthly_bookings}</div>
              <div className="text-sm text-purple-700">This Month</div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-4'} gap-4`}>
          <button className="p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors text-left">
            <div className="text-2xl mb-2">📋</div>
            <div className="font-medium text-blue-800">View All Bookings</div>
            <div className="text-sm text-blue-600">Manage your schedule</div>
          </button>
          <button className="p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors text-left">
            <div className="text-2xl mb-2">💰</div>
            <div className="font-medium text-green-800">Payment History</div>
            <div className="text-sm text-green-600">Track earnings</div>
          </button>
          <button className="p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors text-left">
            <div className="text-2xl mb-2">📊</div>
            <div className="font-medium text-purple-800">Analytics</div>
            <div className="text-sm text-purple-600">Performance reports</div>
          </button>
          <button className="p-4 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors text-left">
            <div className="text-2xl mb-2">⚙️</div>
            <div className="font-medium text-orange-800">Settings</div>
            <div className="text-sm text-orange-600">Manage preferences</div>
          </button>
        </div>
      </div>
    </div>
  );
}