import express from 'express';
import { z } from 'zod';
import { getDb, initFirebase } from '../firebase.js';

const router = express.Router();

// Initialize Firebase
await initFirebase();

// Zod schemas
const payoutRequestSchema = z.object({
  user_id: z.string().min(1),
  amount: z.number().min(1),
  description: z.string().min(1),
  bank_details: z.string().min(1)
});

// Create new payout request
router.post('/', async (req, res) => {
  try {
    const db = getDb();
    const validatedData = payoutRequestSchema.parse(req.body);
    
    const payoutData = {
      ...validatedData,
      status: 'pending',
      requested_at: new Date().toISOString(),
      processed_at: null,
      stripe_transfer_id: null,
      admin_notes: null
    };

    const docRef = await db.collection('payouts').add(payoutData);
    
    console.log(`✅ Created payout request ${docRef.id} for user ${validatedData.user_id}`);
    
    return res.status(201).json({
      ok: true,
      data: {
        id: docRef.id,
        ...payoutData
      }
    });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({
        ok: false,
        error: 'Invalid payout data',
        details: error.errors
      });
    }
    
    console.error('Error creating payout request:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to create payout request'
    });
  }
});

// Get payout requests (admin or user-specific)
router.get('/', async (req, res) => {
  try {
    const db = getDb();
    const { user_id, status } = req.query;
    
    let query = db.collection('payouts');
    
    if (user_id) {
      query = query.where('user_id', '==', user_id);
    }
    
    if (status && status !== 'all') {
      query = query.where('status', '==', status);
    }
    
    const snapshot = await query.orderBy('requested_at', 'desc').get();
    
    const payouts = [];
    snapshot.forEach(doc => {
      payouts.push({
        id: doc.id,
        ...doc.data()
      });
    });

    console.log(`✅ Retrieved ${payouts.length} payout requests`);
    
    return res.json({
      ok: true,
      data: payouts,
      count: payouts.length
    });
  } catch (error) {
    console.error('Error fetching payouts:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to fetch payout requests'
    });
  }
});

// Approve payout request
router.post('/:payout_id/approve', async (req, res) => {
  try {
    const db = getDb();
    const { payout_id } = req.params;
    const { admin_id } = req.body;
    
    const payoutRef = db.collection('payouts').doc(payout_id);
    const payoutDoc = await payoutRef.get();

    if (!payoutDoc.exists) {
      return res.status(404).json({
        ok: false,
        error: 'Payout request not found'
      });
    }

    const payoutData = payoutDoc.data();
    
    if (payoutData.status !== 'pending') {
      return res.status(400).json({
        ok: false,
        error: 'Payout request already processed'
      });
    }

    await payoutRef.update({
      status: 'approved',
      approved_by: admin_id,
      approved_at: new Date().toISOString()
    });

    console.log(`✅ Approved payout request ${payout_id}`);
    
    return res.json({
      ok: true,
      message: 'Payout request approved successfully'
    });
  } catch (error) {
    console.error('Error approving payout:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to approve payout request'
    });
  }
});

// Reject payout request
router.post('/:payout_id/reject', async (req, res) => {
  try {
    const db = getDb();
    const { payout_id } = req.params;
    const { admin_id, reason } = req.body;
    
    const payoutRef = db.collection('payouts').doc(payout_id);
    const payoutDoc = await payoutRef.get();

    if (!payoutDoc.exists) {
      return res.status(404).json({
        ok: false,
        error: 'Payout request not found'
      });
    }

    const payoutData = payoutDoc.data();
    
    if (payoutData.status !== 'pending') {
      return res.status(400).json({
        ok: false,
        error: 'Payout request already processed'
      });
    }

    await payoutRef.update({
      status: 'rejected',
      rejected_by: admin_id,
      rejected_at: new Date().toISOString(),
      admin_notes: reason || 'No reason provided'
    });

    console.log(`✅ Rejected payout request ${payout_id}`);
    
    return res.json({
      ok: true,
      message: 'Payout request rejected successfully'
    });
  } catch (error) {
    console.error('Error rejecting payout:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to reject payout request'
    });
  }
});

// Process payout (Stripe integration)
router.post('/:payout_id/process', async (req, res) => {
  try {
    const db = getDb();
    const { payout_id } = req.params;
    
    const payoutDoc = await db.collection('payouts').doc(payout_id).get();
    
    if (!payoutDoc.exists) {
      return res.status(404).json({
        ok: false,
        error: 'Payout request not found'
      });
    }

    const payoutData = payoutDoc.data();
    
    if (payoutData.status !== 'approved') {
      return res.status(400).json({
        ok: false,
        error: 'Payout must be approved before processing'
      });
    }

    // Simulate Stripe transfer (in production, integrate with actual Stripe API)
    const mockTransferId = `tr_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;

    await db.collection('payouts').doc(payout_id).update({
      status: 'completed',
      processed_at: new Date().toISOString(),
      stripe_transfer_id: mockTransferId
    });

    console.log(`✅ Processed payout ${payout_id} with transfer ${mockTransferId}`);
    
    return res.json({
      ok: true,
      data: {
        payout_id,
        stripe_transfer_id: mockTransferId,
        status: 'completed'
      }
    });
  } catch (error) {
    console.error('Error processing payout:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to process payout'
    });
  }
});

// Get payout statistics
router.get('/stats/summary', async (req, res) => {
  try {
    const db = getDb();
    const { user_id } = req.query;
    
    let query = db.collection('payouts');
    if (user_id) {
      query = query.where('user_id', '==', user_id);
    }
    
    const [processed, pending] = await Promise.all([
      query.where('status', '==', 'completed').get(),
      query.where('status', '==', 'pending').get()
    ]);

    let totalAmount = 0;
    let completedAmount = 0;
    let monthlyAmount = 0;
    
    const currentDate = new Date();

    processed.forEach(doc => {
      const payout = doc.data();
      const amount = payout.amount || 0;
      completedAmount += amount;
      
      // Check if processed this month
      const processedDate = new Date(payout.processed_at);
      if (processedDate.getMonth() === currentDate.getMonth() && 
          processedDate.getFullYear() === currentDate.getFullYear()) {
        monthlyAmount += amount;
      }
    });

    pending.forEach(doc => {
      totalAmount += doc.data().amount || 0;
    });

    totalAmount += completedAmount;

    const stats = {
      total_amount: totalAmount,
      completed_amount: completedAmount,
      monthly_amount: monthlyAmount,
      pending_count: pending.size,
      completed_count: processed.size
    };

    console.log(`✅ Generated payout statistics:`, stats);
    
    return res.json({
      ok: true,
      data: stats
    });
  } catch (error) {
    console.error('Error generating payout stats:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to generate payout statistics'
    });
  }
});

export default router;