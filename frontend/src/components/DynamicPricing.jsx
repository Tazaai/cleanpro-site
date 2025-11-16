import React, { useState, useEffect } from 'react';
import { useLocalization } from './LocalizationEngine';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';

const API_BASE = import.meta.env.VITE_API_BASE || window.API_BASE || "https://cleanpro-backend-5539254765.europe-west1.run.app";

export default function DynamicPricing({ serviceType, duration, frequency, cpId, onPriceUpdate }) {
  const { settings, formatCurrency, convertCurrency } = useLocalization();
  const { token } = useAuth();
  
  const [pricing, setPricing] = useState({
    base_price: 0,
    duration_multiplier: 1,
    frequency_discount: 0,
    location_adjustment: 0,
    total_price: 0,
    currency: 'USD'
  });
  
  const [localizedPricing, setLocalizedPricing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [breakdown, setBreakdown] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize for mobile detection
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate pricing when parameters change
  useEffect(() => {
    if (serviceType && duration) {
      calculatePricing();
    }
  }, [serviceType, duration, frequency, cpId, settings.currency]);

  // Localize pricing when currency changes
  useEffect(() => {
    if (pricing.total_price > 0 && settings.currency) {
      localizePricing();
    }
  }, [pricing, settings.currency]);

  const calculatePricing = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/pricing/calculate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          service_type: serviceType,
          duration: duration,
          frequency: frequency || 'one_time',
          cp_id: cpId,
          user_country: settings.country,
          user_currency: settings.currency
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.ok) {
          setPricing(data.data.pricing);
          setBreakdown(data.data.breakdown || []);
          setPromotions(data.data.promotions || []);
          onPriceUpdate?.(data.data.pricing);
        } else {
          throw new Error(data.error || 'Failed to calculate pricing');
        }
      } else {
        throw new Error('Pricing service unavailable');
      }
    } catch (error) {
      console.error('Error calculating pricing:', error);
      toast.error('Failed to calculate pricing');
      
      // Fallback pricing calculation
      calculateFallbackPricing();
    } finally {
      setLoading(false);
    }
  };

  const calculateFallbackPricing = () => {
    // Basic fallback pricing logic
    const basePrices = {
      'standard_cleaning': 25,
      'deep_cleaning': 35,
      'office_cleaning': 30,
      'carpet_cleaning': 40,
      'window_cleaning': 20
    };

    const basePrice = basePrices[serviceType] || 25;
    const durationMultiplier = duration || 1;
    const frequencyDiscounts = {
      'daily': 0.15,
      'weekly': 0.10,
      'bi_weekly': 0.05,
      'monthly': 0.02,
      'one_time': 0
    };

    const frequencyDiscount = frequencyDiscounts[frequency] || 0;
    const locationAdjustment = 0; // No location data in fallback
    
    const subtotal = basePrice * durationMultiplier;
    const discountAmount = subtotal * frequencyDiscount;
    const totalPrice = subtotal - discountAmount + locationAdjustment;

    setPricing({
      base_price: basePrice,
      duration_multiplier: durationMultiplier,
      frequency_discount: frequencyDiscount,
      location_adjustment: locationAdjustment,
      total_price: totalPrice,
      currency: 'USD'
    });

    setBreakdown([
      { label: 'Base Price', amount: basePrice, type: 'base' },
      { label: `Duration (${duration}h)`, amount: subtotal - basePrice, type: 'addition' },
      { label: 'Frequency Discount', amount: -discountAmount, type: 'discount' },
      { label: 'Location Adjustment', amount: locationAdjustment, type: 'adjustment' }
    ]);
  };

  const localizePricing = async () => {
    if (pricing.currency === settings.currency) {
      setLocalizedPricing(pricing);
      return;
    }

    try {
      // Convert all monetary values to user's currency
      const convertedPricing = { ...pricing };
      
      convertedPricing.base_price = await convertCurrency(
        pricing.base_price, 
        pricing.currency, 
        settings.currency
      );
      
      convertedPricing.total_price = await convertCurrency(
        pricing.total_price, 
        pricing.currency, 
        settings.currency
      );
      
      convertedPricing.currency = settings.currency;

      // Convert breakdown items
      const convertedBreakdown = await Promise.all(
        breakdown.map(async (item) => ({
          ...item,
          amount: await convertCurrency(item.amount, pricing.currency, settings.currency)
        }))
      );

      setLocalizedPricing(convertedPricing);
      setBreakdown(convertedBreakdown);
    } catch (error) {
      console.warn('Currency conversion failed, using original pricing:', error);
      setLocalizedPricing(pricing);
    }
  };

  const formatServiceType = (type) => {
    return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const getFrequencyLabel = (freq) => {
    const labels = {
      'daily': 'Daily',
      'weekly': 'Weekly',
      'bi_weekly': 'Bi-weekly',
      'monthly': 'Monthly',
      'one_time': 'One-time'
    };
    return labels[freq] || 'One-time';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-center min-h-32">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Calculating pricing...</span>
        </div>
      </div>
    );
  }

  const displayPricing = localizedPricing || pricing;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold mb-1">Service Pricing</h2>
            <p className="text-blue-100 text-sm">
              {formatServiceType(serviceType)} • {duration}h • {getFrequencyLabel(frequency)}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">
              {formatCurrency(displayPricing.total_price)}
            </div>
            {localizedPricing && pricing.currency !== settings.currency && (
              <div className="text-xs text-blue-200">
                ≈ {formatCurrency(pricing.total_price, pricing.currency)}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Promotions */}
        {promotions.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">🎉 Active Promotions</h3>
            <div className="space-y-2">
              {promotions.map((promo, index) => (
                <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium text-green-800">{promo.name}</div>
                      <div className="text-sm text-green-700">{promo.description}</div>
                    </div>
                    <div className="text-green-600 font-bold">
                      -{formatCurrency(promo.discount_amount)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Price Breakdown */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Price Breakdown</h3>
          <div className="space-y-2">
            {breakdown.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    item.type === 'base' ? 'bg-blue-500' :
                    item.type === 'addition' ? 'bg-green-500' :
                    item.type === 'discount' ? 'bg-red-500' :
                    'bg-yellow-500'
                  }`}></span>
                  <span className="text-gray-700">{item.label}</span>
                </div>
                <span className={`font-medium ${
                  item.amount < 0 ? 'text-red-600' : 'text-gray-800'
                }`}>
                  {item.amount < 0 ? '' : '+'}{formatCurrency(item.amount)}
                </span>
              </div>
            ))}
            
            <div className="border-t border-gray-200 pt-2 mt-3">
              <div className="flex justify-between items-center font-bold text-lg">
                <span className="text-gray-800">Total</span>
                <span className="text-blue-600">
                  {formatCurrency(displayPricing.total_price)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Frequency Savings */}
        {frequency && frequency !== 'one_time' && displayPricing.frequency_discount > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="text-blue-600 text-2xl">💰</div>
              <div>
                <div className="font-semibold text-blue-800">
                  You're saving {(displayPricing.frequency_discount * 100).toFixed(0)}%
                </div>
                <div className="text-blue-700 text-sm">
                  With {getFrequencyLabel(frequency).toLowerCase()} service
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payment Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span className="text-green-600">✓</span>
            <span>No hidden fees</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600">✓</span>
            <span>Satisfaction guaranteed</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600">✓</span>
            <span>Secure payment processing</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600">✓</span>
            <span>Cancel anytime</span>
          </div>
        </div>

        {/* Currency Notice */}
        {localizedPricing && pricing.currency !== settings.currency && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start gap-2 text-sm">
              <span className="text-yellow-600">ℹ️</span>
              <div className="text-yellow-800">
                <div className="font-medium">Currency Conversion</div>
                <div>
                  Prices converted from {pricing.currency} to {settings.currency} using current exchange rates.
                  Final charge may vary slightly based on payment processor rates.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pricing Validity */}
        <div className="mt-4 text-xs text-gray-500 text-center">
          Pricing valid for 24 hours • Last updated: {new Date().toLocaleString()}
        </div>
      </div>
    </div>
  );
}