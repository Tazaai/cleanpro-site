import express from "express";
import Stripe from "stripe";

const router = express.Router();

// Initialize Stripe (will be configured via environment variable)
let stripe;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
}

// Create payment intent
router.post("/create-payment-intent", async (req, res) => {
  try {
    if (!stripe) {
      return res.status(500).json({
        ok: false,
        error: "Payment system not configured"
      });
    }

    const { amount, currency = "eur", metadata = {} } = req.body;

    if (!amount || amount < 50) { // Minimum 50 cents
      return res.status(400).json({
        ok: false,
        error: "Invalid amount"
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // Amount in cents
      currency,
      metadata: {
        service_type: metadata.serviceType || "unknown",
        customer_email: metadata.customerEmail || "",
        booking_id: metadata.bookingId || "",
        ...metadata
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({
      ok: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });

  } catch (error) {
    console.error("Payment intent creation failed:", error);
    res.status(500).json({
      ok: false,
      error: "Payment processing error"
    });
  }
});

// Get payment status
router.get("/payment-status/:paymentIntentId", async (req, res) => {
  try {
    if (!stripe) {
      return res.status(500).json({
        ok: false,
        error: "Payment system not configured"
      });
    }

    const { paymentIntentId } = req.params;
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    res.json({
      ok: true,
      status: paymentIntent.status,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      metadata: paymentIntent.metadata
    });

  } catch (error) {
    console.error("Payment status check failed:", error);
    res.status(500).json({
      ok: false,
      error: "Payment status check failed"
    });
  }
});

// Webhook endpoint for Stripe events
router.post("/webhook", express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) {
      return res.status(500).send("Webhook not configured");
    }

    const sig = req.headers['stripe-signature'];
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log('✅ Payment succeeded:', paymentIntent.id);
        // TODO: Update booking status in Firestore
        break;
      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object;
        console.log('❌ Payment failed:', failedPayment.id);
        // TODO: Update booking status in Firestore
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });

  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).send('Webhook processing failed');
  }
});

export default router;