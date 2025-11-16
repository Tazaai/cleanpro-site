import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';

const API_BASE = import.meta.env.VITE_API_BASE || window.API_BASE || "https://cleanpro-backend-5539254765.europe-west1.run.app";

export default function AdminFeesPanel() {
  const { token, user } = useAuth();
  const [fees, setFees] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingFee, setEditingFee] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const [formData, setFormData] = useState({
    type: 'percentage',
    value: '',
    description: '',
    region: 'global',
    service_type: 'all',
    status: 'active',
    min_amount: '',
    max_amount: ''
  });

  // Handle window resize for mobile detection
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchFees();
      fetchStats();
    }
  }, [user]);

  const fetchFees = async () => {
    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const response = await fetch(`${API_BASE}/api/admin/fees`, { headers });
      const data = await response.json();
      
      if (data.ok) {
        setFees(data.data || []);
      } else {
        toast.error(data.error || 'Failed to fetch fees');
      }
    } catch (error) {
      console.error('Error fetching fees:', error);
      toast.error('Failed to load fee data');
    }
    setLoading(false);
  };

  const fetchStats = async () => {
    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const response = await fetch(`${API_BASE}/api/admin/fees/stats`, { headers });
      const data = await response.json();
      
      if (data.ok) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Error fetching fee stats:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      type: 'percentage',
      value: '',
      description: '',
      region: 'global',
      service_type: 'all',
      status: 'active',
      min_amount: '',
      max_amount: ''
    });
    setEditingFee(null);
    setShowCreateForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const url = editingFee 
        ? `${API_BASE}/api/admin/fees/${editingFee.id}`
        : `${API_BASE}/api/admin/fees`;
      
      const method = editingFee ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers,
        body: JSON.stringify({
          ...formData,
          value: parseFloat(formData.value),
          min_amount: formData.min_amount ? parseFloat(formData.min_amount) : null,
          max_amount: formData.max_amount ? parseFloat(formData.max_amount) : null
        })
      });

      const data = await response.json();
      
      if (data.ok) {
        toast.success(editingFee ? 'Fee updated successfully' : 'Fee created successfully');
        resetForm();
        fetchFees();
        fetchStats();
      } else {
        toast.error(data.error || 'Failed to save fee');
      }
    } catch (error) {
      console.error('Error saving fee:', error);
      toast.error('Failed to save fee');
    }
  };

  const handleEdit = (fee) => {
    setFormData({
      type: fee.type,
      value: fee.value.toString(),
      description: fee.description,
      region: fee.region || 'global',
      service_type: fee.service_type || 'all',
      status: fee.status || 'active',
      min_amount: fee.min_amount?.toString() || '',
      max_amount: fee.max_amount?.toString() || ''
    });
    setEditingFee(fee);
    setShowCreateForm(true);
  };

  const handleDelete = async (feeId) => {
    if (!window.confirm('Are you sure you want to delete this fee structure?')) {
      return;
    }

    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const response = await fetch(`${API_BASE}/api/admin/fees/${feeId}`, {
        method: 'DELETE',
        headers
      });

      const data = await response.json();
      
      if (data.ok) {
        toast.success('Fee deleted successfully');
        fetchFees();
        fetchStats();
      } else {
        toast.error(data.error || 'Failed to delete fee');
      }
    } catch (error) {
      console.error('Error deleting fee:', error);
      toast.error('Failed to delete fee');
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatFeeValue = (fee) => {
    if (fee.type === 'percentage') {
      return `${fee.value}%`;
    }
    return formatCurrency(fee.value);
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 text-center">
        <div className="text-4xl mb-4">🔒</div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Access Denied</h2>
        <p className="text-gray-600">You need admin privileges to access fee management.</p>
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
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Fee Management</h1>
            <p className="text-gray-600">Manage platform fees and revenue structure</p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <span>➕</span>
            {isMobile ? 'Add Fee' : 'Create New Fee'}
          </button>
        </div>
      </div>

      {/* Stats */}
      {stats && (
        <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} gap-4`}>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="text-3xl text-green-600 mr-3">💰</div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{formatCurrency(stats.total_revenue)}</div>
                <div className="text-sm text-gray-600">Total Revenue</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="text-3xl text-blue-600 mr-3">📊</div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{stats.active_fees}</div>
                <div className="text-sm text-gray-600">Active Fees</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="text-3xl text-purple-600 mr-3">📈</div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{formatCurrency(stats.monthly_revenue)}</div>
                <div className="text-sm text-gray-600">Monthly Revenue</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="text-3xl text-orange-600 mr-3">⭐</div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{stats.avg_fee_rate?.toFixed(1)}%</div>
                <div className="text-sm text-gray-600">Avg Fee Rate</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create/Edit Form Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`bg-white rounded-lg shadow-xl ${isMobile ? 'w-full max-w-lg' : 'w-full max-w-2xl'} max-h-[90vh] overflow-y-auto`}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  {editingFee ? 'Edit Fee Structure' : 'Create New Fee Structure'}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fee Type</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="percentage">Percentage</option>
                      <option value="fixed">Fixed Amount</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {formData.type === 'percentage' ? 'Percentage (%)' : 'Fixed Amount ($)'}
                    </label>
                    <input
                      type="number"
                      name="value"
                      value={formData.value}
                      onChange={handleInputChange}
                      step={formData.type === 'percentage' ? '0.1' : '0.01'}
                      min="0"
                      max={formData.type === 'percentage' ? '100' : undefined}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                    <select
                      name="region"
                      value={formData.region}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="global">Global</option>
                      <option value="us">United States</option>
                      <option value="eu">Europe</option>
                      <option value="ca">Canada</option>
                      <option value="uk">United Kingdom</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
                    <select
                      name="service_type"
                      value={formData.service_type}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="all">All Services</option>
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                      <option value="deep_clean">Deep Clean</option>
                      <option value="regular_clean">Regular Clean</option>
                      <option value="move_clean">Move-in/out Clean</option>
                    </select>
                  </div>

                  {formData.type === 'percentage' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Min Amount ($)</label>
                        <input
                          type="number"
                          name="min_amount"
                          value={formData.min_amount}
                          onChange={handleInputChange}
                          step="0.01"
                          min="0"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Optional minimum fee"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Max Amount ($)</label>
                        <input
                          type="number"
                          name="max_amount"
                          value={formData.max_amount}
                          onChange={handleInputChange}
                          step="0.01"
                          min="0"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Optional maximum fee"
                        />
                      </div>
                    </>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Describe when this fee applies..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {editingFee ? 'Update Fee' : 'Create Fee'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Fee Structures List */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Fee Structures</h2>
        
        {fees.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">💰</div>
            <p>No fee structures configured</p>
            <p className="text-sm mt-1">Create your first fee structure to get started</p>
          </div>
        ) : (
          <div className={`${isMobile ? 'space-y-4' : 'overflow-x-auto'}`}>
            {isMobile ? (
              // Mobile Card Layout
              <div className="space-y-4">
                {fees.map(fee => (
                  <div key={fee.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{fee.description}</div>
                        <div className="text-lg font-bold text-blue-600">{formatFeeValue(fee)}</div>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs ${
                        fee.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {fee.status}
                      </span>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600 mb-3">
                      <div>Region: {fee.region}</div>
                      <div>Service: {fee.service_type}</div>
                      {fee.min_amount && <div>Min: {formatCurrency(fee.min_amount)}</div>}
                      {fee.max_amount && <div>Max: {formatCurrency(fee.max_amount)}</div>}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(fee)}
                        className="flex-1 bg-blue-600 text-white py-1 px-3 rounded text-sm hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(fee.id)}
                        className="flex-1 bg-red-600 text-white py-1 px-3 rounded text-sm hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Desktop Table Layout
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Description</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Value</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Region</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Service</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Range</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {fees.map(fee => (
                    <tr key={fee.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">{fee.description}</td>
                      <td className="py-3 px-4 font-medium text-blue-600">{formatFeeValue(fee)}</td>
                      <td className="py-3 px-4">{fee.region}</td>
                      <td className="py-3 px-4">{fee.service_type}</td>
                      <td className="py-3 px-4 text-sm">
                        {fee.min_amount && fee.max_amount 
                          ? `${formatCurrency(fee.min_amount)} - ${formatCurrency(fee.max_amount)}`
                          : fee.min_amount 
                          ? `Min: ${formatCurrency(fee.min_amount)}`
                          : fee.max_amount
                          ? `Max: ${formatCurrency(fee.max_amount)}`
                          : 'No limits'
                        }
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs ${
                          fee.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {fee.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(fee)}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(fee.id)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}