import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useAuth } from '../contexts/AuthContext';
import { useLocalization } from './LocalizationEngine';
import { toast } from 'react-hot-toast';

const API_BASE = import.meta.env.VITE_API_BASE || window.API_BASE || "https://cleanpro-backend-5539254765.europe-west1.run.app";

// Payment form component that uses Stripe Elements
function PaymentForm({ bookingData, onPaymentSuccess, onPaymentError }) {
  const stripe = useStripe();
  const elements = useElements();
  const { token, user } = useAuth();
  const { settings, formatCurrency, convertCurrency } = useLocalization();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [saveCard, setSaveCard] = useState(false);
  const [localizedAmount, setLocalizedAmount] = useState(null);

  // Convert amount to user's currency
  useEffect(() => {
    if (bookingData?.total_amount && settings.currency) {
      convertCurrency(bookingData.total_amount, 'USD', settings.currency)
        .then(converted => {
          setLocalizedAmount(converted);
        })
        .catch(error => {
          console.warn('Currency conversion failed, using original amount:', error);
          setLocalizedAmount(bookingData.total_amount);
        });
    }
  }, [bookingData, settings.currency, convertCurrency]);

  const handlePayment = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      setPaymentError('Payment system not loaded');
      return;
    }

    if (!bookingData) {
      setPaymentError('Booking information missing');
      return;
    }

    setIsProcessing(true);
    setPaymentError(null);

    try {
      // Create payment intent on backend
      const paymentIntentResponse = await fetch(`${API_BASE}/api/payments/create-intent`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          booking_id: bookingData.id,
          amount: localizedAmount || bookingData.total_amount,
          currency: settings.currency || 'USD',
          payment_method_types: [paymentMethod],
          metadata: {
            booking_type: bookingData.service_type,
            cp_id: bookingData.cp_id,
            user_id: user.uid
          }
        })
      });

      if (!paymentIntentResponse.ok) {
        throw new Error('Failed to create payment intent');
      }

      const { client_secret } = await paymentIntentResponse.json();

      // Confirm payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.displayName || user.email,
            email: user.email
          }
        },
        setup_future_usage: saveCard ? 'off_session' : undefined
      });

      if (error) {
        setPaymentError(error.message);
        onPaymentError?.(error);
      } else if (paymentIntent.status === 'succeeded') {
        // Payment successful
        toast.success('Payment processed successfully!');
        onPaymentSuccess?.(paymentIntent);
        
        // Update booking status
        await fetch(`${API_BASE}/api/bookings/${bookingData.id}/payment`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            payment_intent_id: paymentIntent.id,
            status: 'paid',
            amount_paid: paymentIntent.amount / 100,
            currency: paymentIntent.currency
          })
        });
      }
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentError(error.message);
      onPaymentError?.(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const cardStyle = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
        padding: '12px',
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  if (!localizedAmount && bookingData) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Converting currency...</span>
      </div>
    );
  }

  return (
    <form onSubmit={handlePayment} className="space-y-6">
      {/* Payment Summary */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-800 mb-3">Payment Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Service:</span>
            <span className="font-medium">{bookingData?.service_type}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Date:</span>
            <span className="font-medium">{new Date(bookingData?.scheduled_date).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Duration:</span>
            <span className="font-medium">{bookingData?.duration} hours</span>
          </div>
          <div className="border-t pt-2 flex justify-between font-semibold">
            <span>Total Amount:</span>
            <span className="text-lg">{formatCurrency(localizedAmount || bookingData?.total_amount)}</span>
          </div>
          {localizedAmount !== bookingData?.total_amount && (
            <div className="text-xs text-gray-500">
              Original: {formatCurrency(bookingData?.total_amount, 'USD')}
            </div>
          )}
        </div>
      </div>

      {/* Payment Method Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Payment Method
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => setPaymentMethod('card')}
            className={`p-3 border rounded-lg text-center transition-colors ${
              paymentMethod === 'card'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className="text-2xl mb-1">💳</div>
            <div className="text-xs font-medium">Credit Card</div>
          </button>
          
          <button
            type="button"
            onClick={() => setPaymentMethod('sepa_debit')}
            className={`p-3 border rounded-lg text-center transition-colors ${
              paymentMethod === 'sepa_debit'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className="text-2xl mb-1">🏦</div>
            <div className="text-xs font-medium">Bank Transfer</div>
          </button>
          
          <button
            type="button"
            onClick={() => setPaymentMethod('klarna')}
            className={`p-3 border rounded-lg text-center transition-colors ${
              paymentMethod === 'klarna'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className="text-2xl mb-1">📱</div>
            <div className="text-xs font-medium">Buy Now Pay Later</div>
          </button>
        </div>
      </div>

      {/* Card Details */}
      {paymentMethod === 'card' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Card Information
          </label>
          <div className="border border-gray-300 rounded-lg p-3 bg-white">
            <CardElement options={cardStyle} />
          </div>
          
          {/* Save card option */}
          <div className="mt-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={saveCard}
                onChange={(e) => setSaveCard(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Save card for future payments</span>
            </label>
          </div>
        </div>
      )}

      {/* Security Notice */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="text-green-600 text-xl">🔒</div>
          <div className="text-sm">
            <div className="font-medium text-green-800 mb-1">Secure Payment</div>
            <div className="text-green-700">
              Your payment information is encrypted and secure. We use Stripe for payment processing.
            </div>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {paymentError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="text-red-600 text-xl">❌</div>
            <div className="text-sm">
              <div className="font-medium text-red-800 mb-1">Payment Error</div>
              <div className="text-red-700">{paymentError}</div>
            </div>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
      >
        {isProcessing ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Processing Payment...
          </>
        ) : (
          <>
            <span>🔒</span>
            Pay {formatCurrency(localizedAmount || bookingData?.total_amount)}
          </>
        )}
      </button>

      {/* Terms */}
      <div className="text-xs text-gray-600 text-center">
        By completing this payment, you agree to our{' '}
        <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a>
        {' '}and{' '}
        <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
      </div>
    </form>
  );
}

// Main Payment Processing component
export default function PaymentProcessor({ bookingData, onPaymentComplete }) {
  const [stripePromise, setStripePromise] = useState(null);
  const [stripeConfig, setStripeConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    initializeStripe();
  }, []);

  const initializeStripe = async () => {
    setLoading(true);
    try {
      // Get Stripe configuration
      const response = await fetch(`${API_BASE}/api/admin/stripe/config`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.ok) {
          setStripeConfig(data.data);
          
          // Initialize Stripe with appropriate publishable key
          const publishableKey = data.data.mode === 'live' 
            ? data.data.publishable_key_live 
            : data.data.publishable_key_test;
            
          if (publishableKey) {
            const stripe = await loadStripe(publishableKey);
            setStripePromise(Promise.resolve(stripe));
          } else {
            setError('Stripe not configured. Please contact administrator.');
          }
        } else {
          setError(data.error || 'Failed to load payment configuration');
        }
      } else {
        setError('Payment system unavailable');
      }
    } catch (err) {
      console.error('Error initializing Stripe:', err);
      setError('Failed to initialize payment system');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = (paymentIntent) => {
    onPaymentComplete?.({
      success: true,
      paymentIntent,
      message: 'Payment completed successfully!'
    });
  };

  const handlePaymentError = (error) => {
    onPaymentComplete?.({
      success: false,
      error,
      message: 'Payment failed. Please try again.'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-gray-600">Loading payment system...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <div className="text-4xl mb-4">❌</div>
        <h2 className="text-xl font-bold text-red-800 mb-2">Payment System Error</h2>
        <p className="text-red-700 mb-4">{error}</p>
        <button
          onClick={initializeStripe}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!stripePromise) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
        <div className="text-4xl mb-4">⚠️</div>
        <h2 className="text-xl font-bold text-yellow-800 mb-2">Payment System Not Ready</h2>
        <p className="text-yellow-700">
          The payment system is not properly configured. Please contact support.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Complete Payment</h2>
        <p className="text-gray-600">
          Secure payment powered by Stripe • {stripeConfig?.mode === 'live' ? 'Live Mode' : 'Test Mode'}
        </p>
      </div>

      <Elements stripe={stripePromise}>
        <PaymentForm
          bookingData={bookingData}
          onPaymentSuccess={handlePaymentSuccess}
          onPaymentError={handlePaymentError}
        />
      </Elements>
    </div>
  );
}