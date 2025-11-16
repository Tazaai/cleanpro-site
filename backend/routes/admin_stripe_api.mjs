import express from 'express';
import { z } from 'zod';
import { getDb } from '../firebase_loader.js';

const router = express.Router();

// Validation schemas
const stripeConfigSchema = z.object({
  mode: z.enum(['test', 'live']),
  publishable_key_test: z.string().optional(),
  publishable_key_live: z.string().optional(),
  webhook_endpoint: z.string().url().optional().or(z.literal('')),
  escrow_enabled: z.boolean().default(true),
  auto_payout_threshold: z.number().min(0).default(100),
  payout_delay_days: z.number().min(0).max(30).default(3)
});

const stripeTestSchema = z.object({
  mode: z.enum(['test', 'live']),
  publishable_key: z.string().min(1)
});

// Mock Stripe account verification (replace with real Stripe SDK in production)
const mockStripeAccountVerification = async (publishableKey, mode) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock responses based on key format
  if (mode === 'test' && publishableKey.startsWith('pk_test_')) {
    return {
      ok: true,
      data: {
        account_id: 'acct_test_1234567890',
        business_name: 'CleanPro Test Account',
        country: 'US',
        currency: 'usd',
        capabilities: {
          card_payments: 'active',
          transfers: 'active',
          payouts: 'active'
        }
      }
    };
  } else if (mode === 'live' && publishableKey.startsWith('pk_live_')) {
    return {
      ok: true,
      data: {
        account_id: 'acct_live_1234567890',
        business_name: 'CleanPro Live Account',
        country: 'US',
        currency: 'usd',
        capabilities: {
          card_payments: 'active',
          transfers: 'pending_verification',
          payouts: 'active'
        }
      }
    };
  } else {
    return {
      ok: false,
      error: 'Invalid API key format or mode mismatch'
    };
  }
};

// Get Stripe configuration
router.get('/config', async (req, res) => {
  try {
    // Check if user is admin (in real implementation, verify JWT token)
    const userId = req.headers.authorization?.replace('Bearer ', '') || 'mock_admin_user';
    
    // Try to get existing configuration from database
    try {
      const db = getDb();
      const configDoc = await db.collection('stripe_config').doc('global').get();
      
      if (configDoc.exists) {
        const data = configDoc.data();
        
        // Don't send secret keys to frontend
        const safeConfig = {
          mode: data.mode || 'test',
          webhook_endpoint: data.webhook_endpoint || '',
          escrow_enabled: data.escrow_enabled !== false,
          auto_payout_threshold: data.auto_payout_threshold || 100,
          payout_delay_days: data.payout_delay_days || 3,
          // Only send key existence, not actual keys
          has_test_key: !!data.publishable_key_test,
          has_live_key: !!data.publishable_key_live
        };
        
        return res.json({
          ok: true,
          data: safeConfig,
          message: 'Configuration retrieved successfully'
        });
      }
    } catch (dbError) {
      console.warn('Database unavailable, using default config:', dbError.message);
    }
    
    // Return default configuration (fallback for development)
    res.json({
      ok: true,
      data: {
        mode: 'test',
        webhook_endpoint: '',
        escrow_enabled: true,
        auto_payout_threshold: 100,
        payout_delay_days: 3,
        has_test_key: false,
        has_live_key: false
      },
      message: 'Default configuration returned (development mode)'
    });
  } catch (error) {
    console.error('Error fetching Stripe config:', error);
    res.status(500).json({
      ok: false,
      error: 'Failed to fetch configuration'
    });
  }
});

// Save Stripe configuration
router.post('/config', async (req, res) => {
  try {
    const validatedData = stripeConfigSchema.parse(req.body);
    const db = getDb();
    
    // Check if user is admin (in real implementation, verify JWT token)
    const userId = req.headers.authorization?.replace('Bearer ', '') || 'mock_admin_user';
    
    // Prepare configuration data
    const configData = {
      ...validatedData,
      updated_at: new Date(),
      updated_by: userId
    };
    
    // Save to Firestore
    await db.collection('stripe_config').doc('global').set(configData, { merge: true });
    
    // Log configuration change
    await db.collection('admin_logs').add({
      action: 'stripe_config_updated',
      user_id: userId,
      timestamp: new Date(),
      details: {
        mode: validatedData.mode,
        escrow_enabled: validatedData.escrow_enabled,
        auto_payout_threshold: validatedData.auto_payout_threshold
      }
    });
    
    res.json({
      ok: true,
      message: 'Stripe configuration saved successfully'
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        ok: false,
        error: 'Invalid configuration data',
        details: error.errors
      });
    }
    
    console.error('Error saving Stripe config:', error);
    res.status(500).json({
      ok: false,
      error: 'Failed to save configuration'
    });
  }
});

// Test Stripe connection
router.post('/test', async (req, res) => {
  try {
    const validatedData = stripeTestSchema.parse(req.body);
    
    // Check if user is admin (in real implementation, verify JWT token)
    const userId = req.headers.authorization?.replace('Bearer ', '') || 'mock_admin_user';
    
    // Test the Stripe connection
    const testResult = await mockStripeAccountVerification(
      validatedData.publishable_key,
      validatedData.mode
    );
    
    // Log test attempt
    const db = getDb();
    await db.collection('admin_logs').add({
      action: 'stripe_connection_test',
      user_id: userId,
      timestamp: new Date(),
      details: {
        mode: validatedData.mode,
        success: testResult.ok
      }
    });
    
    res.json(testResult);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        ok: false,
        error: 'Invalid test parameters',
        details: error.errors
      });
    }
    
    console.error('Error testing Stripe connection:', error);
    res.status(500).json({
      ok: false,
      error: 'Failed to test connection'
    });
  }
});

// Get payment statistics
router.get('/stats', async (req, res) => {
  try {
    const db = getDb();
    
    // Check if user is admin (in real implementation, verify JWT token)
    const userId = req.headers.authorization?.replace('Bearer ', '') || 'mock_admin_user';
    
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
    
    // Mock payment statistics (replace with real Stripe data in production)
    const stats = {
      total_payments: {
        count: 1247,
        amount: 156780.50,
        currency: 'USD'
      },
      successful_payments: {
        count: 1198,
        amount: 151234.75,
        success_rate: 96.1
      },
      failed_payments: {
        count: 49,
        amount: 5545.75,
        failure_rate: 3.9
      },
      pending_payouts: {
        count: 23,
        amount: 12456.30
      },
      escrow_balance: {
        amount: 8932.45
      },
      last_30_days: {
        payments_count: 342,
        payments_amount: 43567.80,
        payouts_count: 156,
        payouts_amount: 38901.25
      },
      payment_methods: {
        card: 89.2,
        bank_transfer: 8.1,
        digital_wallet: 2.7
      },
      top_currencies: [
        { currency: 'USD', percentage: 67.3, amount: 105234.56 },
        { currency: 'EUR', percentage: 22.8, amount: 35678.90 },
        { currency: 'GBP', percentage: 9.9, amount: 15867.04 }
      ]
    };
    
    res.json({
      ok: true,
      data: stats,
      generated_at: now
    });
  } catch (error) {
    console.error('Error fetching payment stats:', error);
    res.status(500).json({
      ok: false,
      error: 'Failed to fetch payment statistics'
    });
  }
});

// Process manual payout
router.post('/payout', async (req, res) => {
  try {
    const payoutSchema = z.object({
      cp_id: z.string().min(1),
      amount: z.number().min(0.01),
      currency: z.string().length(3).toUpperCase(),
      reason: z.string().optional()
    });
    
    const validatedData = payoutSchema.parse(req.body);
    const db = getDb();
    
    // Check if user is admin (in real implementation, verify JWT token)
    const userId = req.headers.authorization?.replace('Bearer ', '') || 'mock_admin_user';
    
    // Get CP details
    const cpDoc = await db.collection('coordination_points').doc(validatedData.cp_id).get();
    if (!cpDoc.exists) {
      return res.status(404).json({
        ok: false,
        error: 'Coordination Point not found'
      });
    }
    
    const cpData = cpDoc.data();
    
    // Simulate Stripe payout creation (replace with real Stripe SDK in production)
    const payoutId = `po_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Create payout record
    const payoutData = {
      payout_id: payoutId,
      cp_id: validatedData.cp_id,
      cp_name: cpData.name,
      amount: validatedData.amount,
      currency: validatedData.currency,
      status: 'processing',
      initiated_by: userId,
      initiated_at: new Date(),
      reason: validatedData.reason || 'Manual payout',
      stripe_payout_id: `stripe_${payoutId}`,
      estimated_arrival: new Date(Date.now() + (2 * 24 * 60 * 60 * 1000)) // 2 days from now
    };
    
    await db.collection('payouts').add(payoutData);
    
    // Update CP balance (mock)
    await db.collection('coordination_points').doc(validatedData.cp_id).update({
      pending_balance: (cpData.pending_balance || 0) - validatedData.amount,
      last_payout: new Date()
    });
    
    // Log payout
    await db.collection('admin_logs').add({
      action: 'manual_payout_initiated',
      user_id: userId,
      timestamp: new Date(),
      details: {
        cp_id: validatedData.cp_id,
        amount: validatedData.amount,
        currency: validatedData.currency,
        payout_id: payoutId
      }
    });
    
    res.json({
      ok: true,
      data: {
        payout_id: payoutId,
        status: 'processing',
        estimated_arrival: payoutData.estimated_arrival
      },
      message: 'Payout initiated successfully'
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        ok: false,
        error: 'Invalid payout data',
        details: error.errors
      });
    }
    
    console.error('Error processing payout:', error);
    res.status(500).json({
      ok: false,
      error: 'Failed to process payout'
    });
  }
});

// Handle Stripe webhooks
router.post('/webhook', async (req, res) => {
  try {
    // In production, verify webhook signature first
    const event = req.body;
    
    console.log('Stripe webhook received:', event.type);
    
    const db = getDb();
    
    switch (event.type) {
      case 'payment_intent.succeeded':
        // Handle successful payment
        await db.collection('webhook_events').add({
          type: 'payment_succeeded',
          stripe_event_id: event.id,
          data: event.data.object,
          processed_at: new Date()
        });
        break;
        
      case 'payment_intent.payment_failed':
        // Handle failed payment
        await db.collection('webhook_events').add({
          type: 'payment_failed',
          stripe_event_id: event.id,
          data: event.data.object,
          processed_at: new Date()
        });
        break;
        
      case 'payout.paid':
        // Handle successful payout
        await db.collection('webhook_events').add({
          type: 'payout_completed',
          stripe_event_id: event.id,
          data: event.data.object,
          processed_at: new Date()
        });
        break;
        
      case 'account.updated':
        // Handle account updates
        await db.collection('webhook_events').add({
          type: 'account_updated',
          stripe_event_id: event.id,
          data: event.data.object,
          processed_at: new Date()
        });
        break;
        
      default:
        console.log('Unhandled webhook event:', event.type);
    }
    
    res.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({
      ok: false,
      error: 'Failed to process webhook'
    });
  }
});

export default router;