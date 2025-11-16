import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLocalization } from './LocalizationEngine';

export default function MobileNavigationDrawer({ isOpen, onClose, currentPage, onNavigate }) {
  const { user, logout } = useAuth();
  const { settings, getCountryName } = useLocalization();
  const [activeSection, setActiveSection] = useState(null);

  // Close drawer when page changes or user clicks outside
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleNavigation = (page) => {
    onNavigate(page);
    onClose();
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const menuItems = {
    customer: [
      {
        section: 'Booking',
        items: [
          { id: 'home', label: 'Home', icon: '🏠' },
          { id: 'book', label: 'Book Cleaning', icon: '📅' },
          { id: 'my-bookings', label: 'My Bookings', icon: '📋' },
          { id: 'calendar', label: 'My Calendar', icon: '📆' }
        ]
      },
      {
        section: 'Account',
        items: [
          { id: 'profile', label: 'Profile', icon: '👤' },
          { id: 'payments', label: 'Payment Methods', icon: '💳' },
          { id: 'addresses', label: 'Saved Addresses', icon: '📍' },
          { id: 'preferences', label: 'Preferences', icon: '⚙️' }
        ]
      },
      {
        section: 'Support',
        items: [
          { id: 'help', label: 'Help Center', icon: '❓' },
          { id: 'contact', label: 'Contact Support', icon: '📞' },
          { id: 'feedback', label: 'Send Feedback', icon: '💬' }
        ]
      }
    ],
    coordination_point: [
      {
        section: 'Dashboard',
        items: [
          { id: 'cp-home', label: 'CP Dashboard', icon: '🏢' },
          { id: 'cp-bookings', label: 'Bookings', icon: '📅' },
          { id: 'cp-calendar', label: 'Calendar', icon: '📆' },
          { id: 'cp-stats', label: 'Performance', icon: '📊' }
        ]
      },
      {
        section: 'Management',
        items: [
          { id: 'cp-team', label: 'Team Members', icon: '👥' },
          { id: 'cp-services', label: 'Services', icon: '🧹' },
          { id: 'cp-areas', label: 'Service Areas', icon: '📍' },
          { id: 'payouts', label: 'Payouts', icon: '💰' }
        ]
      },
      {
        section: 'Account',
        items: [
          { id: 'cp-profile', label: 'CP Profile', icon: '🏪' },
          { id: 'cp-settings', label: 'Settings', icon: '⚙️' }
        ]
      }
    ],
    admin: [
      {
        section: 'Overview',
        items: [
          { id: 'admin-dashboard', label: 'Admin Dashboard', icon: '🎛️' },
          { id: 'analytics', label: 'Analytics', icon: '📈' },
          { id: 'reports', label: 'Reports', icon: '📊' }
        ]
      },
      {
        section: 'Management',
        items: [
          { id: 'coordination-points', label: 'Coordination Points', icon: '🏢' },
          { id: 'users', label: 'Users', icon: '👥' },
          { id: 'admin-bookings', label: 'All Bookings', icon: '📅' },
          { id: 'fees', label: 'Fee Management', icon: '💰' }
        ]
      },
      {
        section: 'Control',
        items: [
          { id: 'id-verification', label: 'ID Verification', icon: '🆔' },
          { id: 'admin-payouts', label: 'Payout Control', icon: '💳' },
          { id: 'system-settings', label: 'System Settings', icon: '⚙️' },
          { id: 'audit-logs', label: 'Audit Logs', icon: '📝' }
        ]
      }
    ]
  };

  const userRole = user?.role || 'customer';
  const currentMenuItems = menuItems[userRole] || menuItems.customer;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`fixed left-0 top-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xl font-bold">CleanPro</div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-2xl"
            >
              ✕
            </button>
          </div>
          
          {/* User Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <span className="text-lg">
                {user?.role === 'admin' ? '👑' : 
                 user?.role === 'coordination_point' ? '🏢' : '👤'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">
                {user?.name || user?.email || 'User'}
              </div>
              <div className="text-sm text-blue-200 capitalize">
                {user?.role?.replace('_', ' ') || 'Customer'}
              </div>
            </div>
          </div>
          
          {/* Location Info */}
          <div className="mt-3 pt-3 border-t border-blue-500 border-opacity-30">
            <div className="flex items-center gap-2 text-sm text-blue-200">
              <span>📍</span>
              <span>{getCountryName()} • {settings.currency}</span>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto pb-20">
          {currentMenuItems.map((section, sectionIndex) => (
            <div key={sectionIndex} className="border-b border-gray-100">
              <button
                onClick={() => toggleSection(section.section)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-800">{section.section}</span>
                <span className={`transform transition-transform ${
                  activeSection === section.section ? 'rotate-180' : ''
                }`}>
                  ⌄
                </span>
              </button>
              
              {activeSection === section.section && (
                <div className="bg-gray-50">
                  {section.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavigation(item.id)}
                      className={`w-full flex items-center gap-3 px-6 py-3 text-left hover:bg-gray-100 transition-colors ${
                        currentPage === item.id ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'
                      }`}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Quick Actions */}
          <div className="p-4">
            <div className="text-sm font-medium text-gray-600 mb-3">Quick Actions</div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleNavigation('help')}
                className="flex flex-col items-center gap-1 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <span className="text-xl">❓</span>
                <span className="text-xs text-blue-600">Help</span>
              </button>
              <button
                onClick={() => handleNavigation('contact')}
                className="flex flex-col items-center gap-1 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
              >
                <span className="text-xl">📞</span>
                <span className="text-xs text-green-600">Support</span>
              </button>
              <button
                onClick={() => handleNavigation('settings')}
                className="flex flex-col items-center gap-1 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
              >
                <span className="text-xl">⚙️</span>
                <span className="text-xs text-purple-600">Settings</span>
              </button>
              <button
                onClick={() => handleNavigation('feedback')}
                className="flex flex-col items-center gap-1 p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
              >
                <span className="text-xl">💬</span>
                <span className="text-xs text-orange-600">Feedback</span>
              </button>
            </div>
          </div>

          {/* App Info */}
          <div className="p-4 border-t border-gray-200">
            <div className="text-center text-xs text-gray-500">
              <div className="mb-2">CleanPro v2.0.0</div>
              <div className="flex justify-center gap-4">
                <button className="text-blue-600 hover:underline">Privacy</button>
                <button className="text-blue-600 hover:underline">Terms</button>
                <button className="text-blue-600 hover:underline">About</button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleNavigation('profile')}
              className="flex items-center justify-center gap-2 py-2 px-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <span>👤</span>
              <span className="text-sm">Profile</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 py-2 px-3 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
            >
              <span>🚪</span>
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}