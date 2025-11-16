import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';

const API_BASE = import.meta.env.VITE_API_BASE || window.API_BASE || "https://cleanpro-backend-5539254765.europe-west1.run.app";

export default function AdminIDControl() {
  const { token, user } = useAuth();
  const [verifications, setVerifications] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVerification, setSelectedVerification] = useState(null);
  const [filter, setFilter] = useState('pending');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize for mobile detection
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchVerifications();
      fetchStats();
    }
  }, [user, filter]);

  const fetchVerifications = async () => {
    setLoading(true);
    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const response = await fetch(`${API_BASE}/api/admin/id_verification?status=${filter}`, { headers });
      const data = await response.json();
      
      if (data.ok) {
        setVerifications(data.data || []);
      } else {
        toast.error(data.error || 'Failed to fetch verifications');
      }
    } catch (error) {
      console.error('Error fetching verifications:', error);
      toast.error('Failed to load verification data');
    }
    setLoading(false);
  };

  const fetchStats = async () => {
    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const response = await fetch(`${API_BASE}/api/admin/id_verification/stats`, { headers });
      const data = await response.json();
      
      if (data.ok) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Error fetching verification stats:', error);
    }
  };

  const handleDecision = async (verificationId, decision, reason = '') => {
    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const response = await fetch(`${API_BASE}/api/admin/id_verification/${verificationId}/decision`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          decision,
          admin_id: user.id,
          reason: reason || undefined
        })
      });

      const data = await response.json();
      
      if (data.ok) {
        toast.success(`Verification ${decision} successfully`);
        setSelectedVerification(null);
        fetchVerifications();
        fetchStats();
      } else {
        toast.error(data.error || 'Failed to process decision');
      }
    } catch (error) {
      console.error('Error processing decision:', error);
      toast.error('Failed to process verification decision');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'approved': 'bg-green-100 text-green-800',
      'rejected': 'bg-red-100 text-red-800',
      'under_review': 'bg-blue-100 text-blue-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 70) return 'text-yellow-600';
    return 'text-red-600';
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

  if (!user || user.role !== 'admin') {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 text-center">
        <div className="text-4xl mb-4">🔒</div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Access Denied</h2>
        <p className="text-gray-600">You need admin privileges to access ID verification control.</p>
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
            <h1 className="text-2xl font-bold text-gray-800 mb-2">ID Verification Control</h1>
            <p className="text-gray-600">Review and manage user identity verification requests</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="flex-1 sm:flex-none border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="pending">Pending Review</option>
              <option value="under_review">Under Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="all">All Verifications</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      {stats && (
        <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} gap-4`}>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="text-3xl text-yellow-500 mr-3">⏳</div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{stats.pending_count}</div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="text-3xl text-green-600 mr-3">✅</div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{stats.approved_count}</div>
                <div className="text-sm text-gray-600">Approved</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="text-3xl text-red-600 mr-3">❌</div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{stats.rejected_count}</div>
                <div className="text-sm text-gray-600">Rejected</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="text-3xl text-blue-600 mr-3">📊</div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{stats.approval_rate?.toFixed(1)}%</div>
                <div className="text-sm text-gray-600">Approval Rate</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Verifications List */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Verification Requests</h2>
        
        {verifications.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">🆔</div>
            <p>No {filter === 'all' ? '' : filter} verifications found</p>
            <p className="text-sm mt-1">Verification requests will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {verifications.map(verification => (
              <div key={verification.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <h3 className="font-medium text-gray-900">{verification.user_name || 'Unknown User'}</h3>
                      <span className={`px-2 py-1 rounded text-xs ${getStatusColor(verification.status)}`}>
                        {verification.status.replace('_', ' ')}
                      </span>
                      {verification.ai_confidence && (
                        <span className={`text-xs font-medium ${getConfidenceColor(verification.ai_confidence)}`}>
                          AI: {verification.ai_confidence}% confidence
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                      <div>📧 {verification.user_email}</div>
                      <div>📅 Submitted: {formatDate(verification.submitted_at)}</div>
                      <div>🆔 Type: {verification.document_type}</div>
                      {verification.document_number && (
                        <div>🔢 Number: {verification.document_number}</div>
                      )}
                    </div>

                    {verification.ai_analysis && (
                      <div className="text-sm bg-blue-50 border border-blue-200 rounded p-3 mb-3">
                        <div className="font-medium text-blue-800 mb-1">AI Analysis:</div>
                        <div className="text-blue-700">{verification.ai_analysis}</div>
                      </div>
                    )}

                    {verification.admin_reason && (
                      <div className="text-sm bg-gray-50 border border-gray-200 rounded p-3">
                        <div className="font-medium text-gray-800 mb-1">Admin Notes:</div>
                        <div className="text-gray-700">{verification.admin_reason}</div>
                        <div className="text-gray-500 mt-1">
                          Reviewed by {verification.reviewed_by} on {formatDate(verification.reviewed_at)}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-2 w-full lg:w-auto">
                    {verification.document_urls && verification.document_urls.length > 0 && (
                      <button
                        onClick={() => setSelectedVerification(verification)}
                        className="w-full lg:w-auto bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition-colors"
                      >
                        👁️ View Documents
                      </button>
                    )}
                    
                    {verification.status === 'pending' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDecision(verification.id, 'approved')}
                          className="flex-1 bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700 transition-colors"
                        >
                          ✅ Approve
                        </button>
                        <button
                          onClick={() => {
                            const reason = prompt('Reason for rejection (optional):');
                            if (reason !== null) {
                              handleDecision(verification.id, 'rejected', reason);
                            }
                          }}
                          className="flex-1 bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-700 transition-colors"
                        >
                          ❌ Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Document Viewer Modal */}
      {selectedVerification && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className={`bg-white rounded-lg shadow-xl ${isMobile ? 'w-full max-w-lg' : 'w-full max-w-4xl'} max-h-[90vh] overflow-y-auto`}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  {selectedVerification.user_name} - Document Review
                </h2>
                <button
                  onClick={() => setSelectedVerification(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ✕
                </button>
              </div>

              {/* Verification Details */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-medium text-gray-700">Document Type:</div>
                    <div>{selectedVerification.document_type}</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-700">Document Number:</div>
                    <div>{selectedVerification.document_number || 'Not provided'}</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-700">AI Confidence:</div>
                    <div className={getConfidenceColor(selectedVerification.ai_confidence)}>
                      {selectedVerification.ai_confidence}%
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-700">Submitted:</div>
                    <div>{formatDate(selectedVerification.submitted_at)}</div>
                  </div>
                </div>
                {selectedVerification.ai_analysis && (
                  <div className="mt-3">
                    <div className="font-medium text-gray-700 mb-1">AI Analysis:</div>
                    <div className="text-sm">{selectedVerification.ai_analysis}</div>
                  </div>
                )}
              </div>

              {/* Document Images */}
              {selectedVerification.document_urls && selectedVerification.document_urls.length > 0 ? (
                <div className="space-y-4">
                  {selectedVerification.document_urls.map((url, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-100 px-4 py-2 text-sm font-medium">
                        Document {index + 1}
                      </div>
                      <div className="p-4">
                        <img 
                          src={url} 
                          alt={`Document ${index + 1}`}
                          className="w-full h-auto max-h-96 object-contain border border-gray-200 rounded"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextElementSibling.style.display = 'block';
                          }}
                        />
                        <div className="text-center text-gray-500 py-8 hidden">
                          Unable to load image
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-2">📄</div>
                  <p>No documents available for review</p>
                </div>
              )}

              {/* Action Buttons */}
              {selectedVerification.status === 'pending' && (
                <div className="flex gap-3 pt-6 border-t mt-6">
                  <button
                    onClick={() => handleDecision(selectedVerification.id, 'approved')}
                    className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    ✅ Approve Verification
                  </button>
                  <button
                    onClick={() => {
                      const reason = prompt('Reason for rejection:');
                      if (reason !== null) {
                        handleDecision(selectedVerification.id, 'rejected', reason);
                      }
                    }}
                    className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    ❌ Reject Verification
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