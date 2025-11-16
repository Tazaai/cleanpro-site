import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';

const API_BASE = import.meta.env.VITE_API_BASE || window.API_BASE || "https://cleanpro-backend-5539254765.europe-west1.run.app";

export default function PayoutCenter() {
  const { token, user } = useAuth();
  const [payouts, setPayouts] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [selectedPayout, setSelectedPayout] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isAdmin, setIsAdmin] = useState(false);

  const [requestForm, setRequestForm] = useState({
    amount: '',
    description: '',
    bank_details: ''
  });

  // Handle window resize for mobile detection
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (user?.id) {
      setIsAdmin(user.role === 'admin');
      fetchPayouts();
      fetchStats();
    }
  }, [user]);

  const fetchPayouts = async () => {
    setLoading(true);
    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      // Admin sees all payouts, users see only their own
      const url = isAdmin 
        ? `${API_BASE}/api/admin/payouts`
        : `${API_BASE}/api/admin/payouts?user_id=${user.id}`;

      const response = await fetch(url, { headers });
      const data = await response.json();
      
      if (data.ok) {
        setPayouts(data.data || []);
      } else {
        toast.error(data.error || 'Failed to fetch payouts');
      }
    } catch (error) {
      console.error('Error fetching payouts:', error);
      toast.error('Failed to load payout data');
    }
    setLoading(false);
  };

  const fetchStats = async () => {
    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const url = isAdmin 
        ? `${API_BASE}/api/admin/payouts/stats`
        : `${API_BASE}/api/admin/payouts/stats?user_id=${user.id}`;

      const response = await fetch(url, { headers });
      const data = await response.json();
      
      if (data.ok) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Error fetching payout stats:', error);
    }
  };

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const response = await fetch(`${API_BASE}/api/admin/payouts`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          user_id: user.id,
          amount: parseFloat(requestForm.amount),
          description: requestForm.description,
          bank_details: requestForm.bank_details
        })
      });

      const data = await response.json();
      
      if (data.ok) {
        toast.success('Payout request submitted successfully');
        setShowRequestForm(false);
        setRequestForm({ amount: '', description: '', bank_details: '' });
        fetchPayouts();
        fetchStats();
      } else {
        toast.error(data.error || 'Failed to submit payout request');
      }
    } catch (error) {
      console.error('Error submitting payout request:', error);
      toast.error('Failed to submit payout request');
    }
  };

  const handleAdminAction = async (payoutId, action) => {
    if (!isAdmin) return;

    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const response = await fetch(`${API_BASE}/api/admin/payouts/${payoutId}/${action}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          admin_id: user.id
        })
      });

      const data = await response.json();
      
      if (data.ok) {
        toast.success(`Payout ${action} successfully`);
        setSelectedPayout(null);
        fetchPayouts();
        fetchStats();
      } else {
        toast.error(data.error || `Failed to ${action} payout`);
      }
    } catch (error) {
      console.error(`Error ${action} payout:`, error);
      toast.error(`Failed to ${action} payout`);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'approved': 'bg-blue-100 text-blue-800', 
      'processing': 'bg-purple-100 text-purple-800',
      'completed': 'bg-green-100 text-green-800',
      'rejected': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

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
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {isAdmin ? 'Payout Management' : 'My Payouts'}
            </h1>
            <p className="text-gray-600">
              {isAdmin 
                ? 'Review and process payout requests from coordination points'
                : 'Request and track your earnings payouts'
              }
            </p>
          </div>
          {!isAdmin && (
            <button
              onClick={() => setShowRequestForm(true)}
              className="w-full sm:w-auto bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <span>💰</span>
              {isMobile ? 'Request Payout' : 'Request New Payout'}
            </button>
          )}
        </div>
      </div>

      {/* Stats */}
      {stats && (
        <div className={`grid ${isMobile ? 'grid-cols-2' : isAdmin ? 'grid-cols-4' : 'grid-cols-3'} gap-4`}>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="text-3xl text-green-600 mr-3">💰</div>
              <div>
                <div className="text-2xl font-bold text-gray-800">
                  {formatCurrency(stats.total_amount || 0)}
                </div>
                <div className="text-sm text-gray-600">Total Payouts</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="text-3xl text-yellow-500 mr-3">⏳</div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{stats.pending_count || 0}</div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="text-3xl text-blue-600 mr-3">✅</div>
              <div>
                <div className="text-2xl font-bold text-gray-800">
                  {formatCurrency(stats.completed_amount || 0)}
                </div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
            </div>
          </div>

          {isAdmin && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center">
                <div className="text-3xl text-purple-600 mr-3">📊</div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">
                    {formatCurrency(stats.monthly_amount || 0)}
                  </div>
                  <div className="text-sm text-gray-600">This Month</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Request Form Modal */}
      {showRequestForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`bg-white rounded-lg shadow-xl ${isMobile ? 'w-full max-w-lg' : 'w-full max-w-2xl'} max-h-[90vh] overflow-y-auto`}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Request Payout</h2>
                <button
                  onClick={() => setShowRequestForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleRequestSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payout Amount ($)
                  </label>
                  <input
                    type="number"
                    value={requestForm.amount}
                    onChange={(e) => setRequestForm(prev => ({ ...prev, amount: e.target.value }))}
                    step="0.01"
                    min="1"
                    max={stats?.available_balance || 10000}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter amount to request"
                    required
                  />
                  {stats?.available_balance && (
                    <div className="text-sm text-gray-600 mt-1">
                      Available balance: {formatCurrency(stats.available_balance)}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={requestForm.description}
                    onChange={(e) => setRequestForm(prev => ({ ...prev, description: e.target.value }))}
                    rows="3"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Describe the reason for this payout request..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bank Details
                  </label>
                  <textarea
                    value={requestForm.bank_details}
                    onChange={(e) => setRequestForm(prev => ({ ...prev, bank_details: e.target.value }))}
                    rows="3"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter your bank account details or preferred payment method..."
                    required
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <span className="text-blue-500 text-lg mr-3">ℹ️</span>
                    <div className="text-sm text-blue-700">
                      <div className="font-medium mb-1">Payout Processing Information:</div>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Payouts are typically processed within 2-5 business days</li>
                        <li>Minimum payout amount is $1.00</li>
                        <li>Ensure your bank details are accurate to avoid delays</li>
                        <li>You'll receive an email notification when your payout is processed</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowRequestForm(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Payouts List */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {isAdmin ? 'All Payout Requests' : 'My Payout History'}
        </h2>
        
        {payouts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">💰</div>
            <p>No payout requests found</p>
            <p className="text-sm mt-1">
              {isAdmin 
                ? 'Payout requests will appear here for review'
                : 'Submit your first payout request to get started'
              }
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {payouts.map(payout => (
              <div key={payout.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <div className="font-medium text-gray-900">
                        {formatCurrency(payout.amount)}
                      </div>
                      <span className={`px-2 py-1 rounded text-xs ${getStatusColor(payout.status)}`}>
                        {payout.status.replace('_', ' ')}
                      </span>
                      {isAdmin && (
                        <span className="text-sm text-gray-600">
                          by {payout.user_name || 'Unknown User'}
                        </span>
                      )}
                    </div>

                    <div className="space-y-1 text-sm text-gray-600 mb-3">
                      <div>📅 Requested: {formatDate(payout.requested_at)}</div>
                      {payout.processed_at && (
                        <div>✅ Processed: {formatDate(payout.processed_at)}</div>
                      )}
                      <div>📝 {payout.description}</div>
                    </div>

                    {payout.admin_notes && (
                      <div className="text-sm bg-gray-50 border border-gray-200 rounded p-3 mb-3">
                        <div className="font-medium text-gray-700 mb-1">Admin Notes:</div>
                        <div>{payout.admin_notes}</div>
                      </div>
                    )}

                    {payout.stripe_transfer_id && (
                      <div className="text-sm text-green-600 flex items-center gap-1">
                        <span>💳</span>
                        <span>Transfer ID: {payout.stripe_transfer_id}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-2 w-full lg:w-auto">
                    <button
                      onClick={() => setSelectedPayout(payout)}
                      className="w-full lg:w-auto bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition-colors"
                    >
                      👁️ View Details
                    </button>
                    
                    {isAdmin && payout.status === 'pending' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAdminAction(payout.id, 'approve')}
                          className="flex-1 bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700 transition-colors"
                        >
                          ✅ Approve
                        </button>
                        <button
                          onClick={() => handleAdminAction(payout.id, 'reject')}
                          className="flex-1 bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-700 transition-colors"
                        >
                          ❌ Reject
                        </button>
                      </div>
                    )}

                    {isAdmin && payout.status === 'approved' && (
                      <button
                        onClick={() => handleAdminAction(payout.id, 'process')}
                        className="w-full bg-purple-600 text-white px-4 py-2 rounded text-sm hover:bg-purple-700 transition-colors"
                      >
                        🚀 Process Payment
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Payout Details Modal */}
      {selectedPayout && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className={`bg-white rounded-lg shadow-xl ${isMobile ? 'w-full max-w-lg' : 'w-full max-w-2xl'} max-h-[90vh] overflow-y-auto`}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Payout Details</h2>
                <button
                  onClick={() => setSelectedPayout(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-medium text-gray-700">Amount:</div>
                      <div className="text-lg font-bold text-green-600">
                        {formatCurrency(selectedPayout.amount)}
                      </div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-700">Status:</div>
                      <span className={`px-2 py-1 rounded text-xs ${getStatusColor(selectedPayout.status)}`}>
                        {selectedPayout.status.replace('_', ' ')}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-700">Requested:</div>
                      <div>{formatDate(selectedPayout.requested_at)}</div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-700">User:</div>
                      <div>{selectedPayout.user_name || selectedPayout.user_email}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="font-medium text-gray-700 mb-2">Description:</div>
                  <div className="bg-white border border-gray-200 rounded p-3 text-sm">
                    {selectedPayout.description}
                  </div>
                </div>

                <div>
                  <div className="font-medium text-gray-700 mb-2">Bank Details:</div>
                  <div className="bg-white border border-gray-200 rounded p-3 text-sm whitespace-pre-wrap">
                    {selectedPayout.bank_details}
                  </div>
                </div>

                {selectedPayout.admin_notes && (
                  <div>
                    <div className="font-medium text-gray-700 mb-2">Admin Notes:</div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded p-3 text-sm">
                      {selectedPayout.admin_notes}
                    </div>
                  </div>
                )}

                {selectedPayout.stripe_transfer_id && (
                  <div>
                    <div className="font-medium text-gray-700 mb-2">Payment Details:</div>
                    <div className="bg-green-50 border border-green-200 rounded p-3 text-sm">
                      <div className="flex items-center gap-2">
                        <span>💳</span>
                        <span>Stripe Transfer ID: {selectedPayout.stripe_transfer_id}</span>
                      </div>
                      {selectedPayout.processed_at && (
                        <div className="mt-2">
                          Processed on {formatDate(selectedPayout.processed_at)}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Admin Action Buttons */}
              {isAdmin && selectedPayout.status === 'pending' && (
                <div className="flex gap-3 pt-6 border-t mt-6">
                  <button
                    onClick={() => handleAdminAction(selectedPayout.id, 'approve')}
                    className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    ✅ Approve Payout
                  </button>
                  <button
                    onClick={() => handleAdminAction(selectedPayout.id, 'reject')}
                    className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    ❌ Reject Payout
                  </button>
                </div>
              )}

              {isAdmin && selectedPayout.status === 'approved' && (
                <div className="pt-6 border-t mt-6">
                  <button
                    onClick={() => handleAdminAction(selectedPayout.id, 'process')}
                    className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    🚀 Process Payment via Stripe
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}