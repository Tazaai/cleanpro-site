import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';

const API_BASE = import.meta.env.VITE_API_BASE || window.API_BASE || "https://cleanpro-backend-5539254765.europe-west1.run.app";

export default function MyCalendar() {
  const { token, user } = useAuth();
  const [calendarConnections, setCalendarConnections] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncLoading, setSyncLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize for mobile detection
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load calendar data
  useEffect(() => {
    if (user?.id) {
      fetchCalendarData();
    }
  }, [user]);

  const fetchCalendarData = async () => {
    setLoading(true);
    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      // Fetch calendar connections
      const connectionsRes = await fetch(`${API_BASE}/api/calendar/connections/${user.id}`, { headers });
      if (connectionsRes.ok) {
        const connectionsData = await connectionsRes.json();
        setCalendarConnections(connectionsData.data || []);
      }

      // Fetch upcoming events (bookings)
      const bookingsRes = await fetch(`${API_BASE}/api/bookings?user_id=${user.id}&status=confirmed`, { headers });
      if (bookingsRes.ok) {
        const bookingsData = await bookingsRes.json();
        setUpcomingEvents(bookingsData.data || []);
      }

    } catch (error) {
      console.error('Error fetching calendar data:', error);
      toast.error('Failed to load calendar data');
    }
    setLoading(false);
  };

  const connectGoogleCalendar = async () => {
    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const response = await fetch(`${API_BASE}/api/calendar/connect/google/auth?user_id=${user.id}`, { headers });
      const data = await response.json();

      if (data.ok) {
        // Open Google auth in popup
        const popup = window.open(
          data.data.auth_url,
          'google-calendar-auth',
          'width=500,height=600,scrollbars=yes,resizable=yes'
        );

        // Check for popup close
        const checkClosed = setInterval(() => {
          if (popup.closed) {
            clearInterval(checkClosed);
            // Refresh data after potential connection
            setTimeout(() => fetchCalendarData(), 2000);
            toast.success('Calendar connection process completed');
          }
        }, 1000);
      } else {
        toast.error(data.error || 'Failed to initiate calendar connection');
      }
    } catch (error) {
      console.error('Error connecting calendar:', error);
      toast.error('Failed to connect calendar');
    }
  };

  const syncBookingsToCalendar = async () => {
    setSyncLoading(true);
    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const response = await fetch(`${API_BASE}/api/calendar/sync/${user.id}`, {
        method: 'POST',
        headers
      });
      
      const data = await response.json();
      
      if (data.ok) {
        toast.success(`Synced ${data.data.synced_count} booking(s) to calendar`);
        fetchCalendarData();
      } else {
        toast.error(data.error || 'Sync failed');
      }
    } catch (error) {
      console.error('Error syncing to calendar:', error);
      toast.error('Failed to sync bookings');
    }
    setSyncLoading(false);
  };

  const disconnectCalendar = async (connectionId) => {
    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const response = await fetch(`${API_BASE}/api/calendar/connections/${connectionId}`, {
        method: 'DELETE',
        headers
      });
      
      if (response.ok) {
        toast.success('Calendar disconnected successfully');
        fetchCalendarData();
      } else {
        toast.error('Failed to disconnect calendar');
      }
    } catch (error) {
      console.error('Error disconnecting calendar:', error);
      toast.error('Failed to disconnect calendar');
    }
  };

  const formatEventDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    }).format(date);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg ${isMobile ? 'p-4' : 'p-6'}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">My Calendar</h2>
        <div className="flex gap-2 w-full sm:w-auto">
          {calendarConnections.length === 0 ? (
            <button
              onClick={connectGoogleCalendar}
              className="flex-1 sm:flex-none bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <span>📅</span>
              {isMobile ? 'Connect Calendar' : 'Connect Google Calendar'}
            </button>
          ) : (
            <button
              onClick={syncBookingsToCalendar}
              disabled={syncLoading}
              className="flex-1 sm:flex-none bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors flex items-center justify-center gap-2"
            >
              <span>🔄</span>
              {syncLoading ? 'Syncing...' : 'Sync Bookings'}
            </button>
          )}
        </div>
      </div>

      {/* Calendar Connections Status */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Calendar Connections</h3>
        {calendarConnections.length === 0 ? (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <span className="text-yellow-400 text-xl">⚠️</span>
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-yellow-800">No Calendar Connected</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  Connect your Google Calendar to automatically sync your cleaning appointments.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {calendarConnections.map(connection => (
              <div key={connection.id} className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-green-600 text-xl">✅</span>
                  <div>
                    <div className="font-medium text-green-800">{connection.calendar_name}</div>
                    <div className="text-sm text-green-600">
                      Connected {new Date(connection.connected_at).toLocaleDateString()}
                      {connection.last_sync && ` • Last synced: ${new Date(connection.last_sync).toLocaleDateString()}`}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => disconnectCalendar(connection.id)}
                  className="text-red-600 hover:text-red-800 text-sm underline"
                >
                  Disconnect
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upcoming Events */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Upcoming Appointments</h3>
        {upcomingEvents.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">📅</div>
            <p>No upcoming appointments</p>
            <p className="text-sm mt-1">Book a cleaning service to see it here!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {upcomingEvents.map(event => (
              <div key={event.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{event.service}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      📅 {formatEventDate(event.date)}
                    </div>
                    {event.address && (
                      <div className="text-sm text-gray-600 mt-1">
                        📍 {event.address}
                      </div>
                    )}
                    <div className="text-sm text-gray-600 mt-1">
                      💰 ${event.estimatedPrice} • {event.area} sqft • {event.frequency}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      event.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      event.status === 'pending_approval' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {event.status === 'pending_approval' ? 'Pending' : event.status}
                    </span>
                    {calendarConnections.length > 0 && (
                      <button
                        onClick={syncBookingsToCalendar}
                        disabled={syncLoading}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        📤 Add to Calendar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Calendar Integration Info */}
      {calendarConnections.length > 0 && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">📱 Calendar Integration Active</h4>
          <p className="text-sm text-blue-700">
            Your confirmed bookings will automatically appear in your connected calendar(s). 
            You'll receive email reminders 24 hours and 30 minutes before each appointment.
          </p>
        </div>
      )}
    </div>
  );
}