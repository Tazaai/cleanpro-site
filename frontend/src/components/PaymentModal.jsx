import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import toast from 'react-hot-toast';

const API_BASE = import.meta.env.VITE_API_BASE || window.API_BASE || "https://cleanpro-backend-5539254765.europe-west1.run.app";

// Load Stripe (you'll need to add your publishable key to environment variables)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder');

const PaymentForm = ({ amount, onSuccess, onError, bookingData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    try {
      // Create payment intent
      const response = await fetch(`${API_BASE}/api/payment/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100), // Convert to cents
          metadata: {
            serviceType: bookingData?.service || '',
            customerEmail: bookingData?.email || '',
            customerName: bookingData?.name || '',
            bookingId: bookingData?.id || '',
          }
        }),
      });

      const { clientSecret, paymentIntentId } = await response.json();

      if (!clientSecret) {
        throw new Error('Failed to create payment intent');
      }

      // Confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: bookingData?.name || '',
            email: bookingData?.email || '',
          },
        }
      });

      if (result.error) {
        toast.error(result.error.message);
        onError?.(result.error);
      } else {
        toast.success('Payment successful!');
        onSuccess?.(result.paymentIntent, paymentIntentId);
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
      onError?.(error);
    }

    setLoading(false);
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 border rounded-lg bg-gray-50">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Information
        </label>
        <div className="p-3 border rounded bg-white">
          <CardElement options={cardElementOptions} />
        </div>
      </div>

      <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
        <span className="text-lg font-semibold text-gray-800">
          Total: ${amount.toFixed(2)}
        </span>
        <button
          type="submit"
          disabled={!stripe || loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {loading ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
        </button>
      </div>

      <p className="text-xs text-gray-500 text-center">
        🔒 Your payment information is secure and encrypted
      </p>
    </form>
  );
};

export default function PaymentModal({ isOpen, onClose, amount, bookingData }) {
  const [paymentStatus, setPaymentStatus] = useState('pending'); // pending, success, error

  const handlePaymentSuccess = (paymentIntent, paymentIntentId) => {
    setPaymentStatus('success');
    // Here you could update the booking status in your backend
    setTimeout(() => {
      onClose();
      setPaymentStatus('pending');
    }, 2000);
  };

  const handlePaymentError = (error) => {
    setPaymentStatus('error');
    setTimeout(() => {
      setPaymentStatus('pending');
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">Complete Payment</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          {paymentStatus === 'success' ? (
            <div className="text-center py-8">
              <div className="text-green-600 text-6xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-green-800 mb-2">Payment Successful!</h3>
              <p className="text-gray-600">Your booking has been confirmed.</p>
            </div>
          ) : paymentStatus === 'error' ? (
            <div className="text-center py-8">
              <div className="text-red-600 text-6xl mb-4">❌</div>
              <h3 className="text-xl font-bold text-red-800 mb-2">Payment Failed</h3>
              <p className="text-gray-600">Please check your card details and try again.</p>
            </div>
          ) : (
            <>
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Booking Summary</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Service:</strong> {bookingData?.service || 'N/A'}</p>
                  <p><strong>Customer:</strong> {bookingData?.name || 'N/A'}</p>
                  <p><strong>Email:</strong> {bookingData?.email || 'N/A'}</p>
                  <p><strong>Amount:</strong> ${amount?.toFixed(2) || '0.00'}</p>
                </div>
              </div>

              <Elements stripe={stripePromise}>
                <PaymentForm
                  amount={amount}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                  bookingData={bookingData}
                />
              </Elements>
            </>
          )}
        </div>
      </div>
    </div>
  );
}