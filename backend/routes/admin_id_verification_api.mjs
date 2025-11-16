import express from 'express';
import { z } from 'zod';
import { getDb, initFirebase } from '../firebase.js';

const router = express.Router();

// Initialize Firebase
await initFirebase();

// Get all ID verification requests
router.get('/', async (req, res) => {
  try {
    const db = getDb();
    const { status } = req.query;
    
    let query = db.collection('id_verifications');
    
    if (status && status !== 'all') {
      query = query.where('status', '==', status);
    }
    
    const snapshot = await query.orderBy('submitted_at', 'desc').get();
    
    const verifications = [];
    snapshot.forEach(doc => {
      verifications.push({
        id: doc.id,
        ...doc.data()
      });
    });

    console.log(`✅ Retrieved ${verifications.length} ID verification requests`);
    
    return res.json({
      ok: true,
      data: verifications,
      count: verifications.length
    });
  } catch (error) {
    console.error('Error fetching ID verifications:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to fetch verification requests'
    });
  }
});

// Process admin decision on verification
router.post('/:verification_id/decision', async (req, res) => {
  try {
    const db = getDb();
    const { verification_id } = req.params;
    const { decision, admin_id, reason } = req.body;
    
    if (!['approved', 'rejected'].includes(decision)) {
      return res.status(400).json({
        ok: false,
        error: 'Invalid decision. Must be approved or rejected'
      });
    }

    const verificationDoc = await db.collection('id_verifications').doc(verification_id).get();
    
    if (!verificationDoc.exists) {
      return res.status(404).json({
        ok: false,
        error: 'Verification request not found'
      });
    }

    const verificationData = verificationDoc.data();
    
    if (verificationData.status !== 'pending') {
      return res.status(400).json({
        ok: false,
        error: 'Verification request already processed'
      });
    }

    const updateData = {
      status: decision,
      reviewed_by: admin_id,
      reviewed_at: new Date().toISOString(),
      admin_reason: reason || null
    };

    await db.collection('id_verifications').doc(verification_id).update(updateData);

    console.log(`✅ ${decision} verification request ${verification_id}`);
    
    return res.json({
      ok: true,
      data: {
        id: verification_id,
        ...verificationData,
        ...updateData
      }
    });
  } catch (error) {
    console.error('Error processing verification decision:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to process verification decision'
    });
  }
});

// Get verification statistics
router.get('/stats/summary', async (req, res) => {
  try {
    const db = getDb();
    
    const [pending, approved, rejected, total] = await Promise.all([
      db.collection('id_verifications').where('status', '==', 'pending').get(),
      db.collection('id_verifications').where('status', '==', 'approved').get(),
      db.collection('id_verifications').where('status', '==', 'rejected').get(),
      db.collection('id_verifications').get()
    ]);

    const stats = {
      pending_count: pending.size,
      approved_count: approved.size,
      rejected_count: rejected.size,
      total_count: total.size,
      approval_rate: total.size > 0 ? (approved.size / (approved.size + rejected.size)) * 100 : 0
    };

    console.log(`✅ Generated ID verification statistics:`, stats);
    
    return res.json({
      ok: true,
      data: stats
    });
  } catch (error) {
    console.error('Error generating verification stats:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to generate verification statistics'
    });
  }
});

export default router;