import express from 'express';
import { z } from 'zod';
import { getDb, initFirebase } from '../firebase.js';

const router = express.Router();

// Initialize Firebase
await initFirebase();

// Zod schemas
const feeSchema = z.object({
  type: z.enum(['percentage', 'fixed']),
  value: z.number().min(0),
  description: z.string().min(1),
  region: z.string().default('global'),
  service_type: z.string().default('all'),
  status: z.enum(['active', 'inactive']).default('active'),
  min_amount: z.number().min(0).optional(),
  max_amount: z.number().min(0).optional()
});

// Get all fee structures
router.get('/', async (req, res) => {
  try {
    const db = getDb();
    const { region, service_type, status } = req.query;
    
    let query = db.collection('fee_structures');
    
    if (region && region !== 'all') {
      query = query.where('region', '==', region);
    }
    
    if (service_type && service_type !== 'all') {
      query = query.where('service_type', '==', service_type);
    }
    
    if (status && status !== 'all') {
      query = query.where('status', '==', status);
    }
    
    const snapshot = await query.orderBy('created_at', 'desc').get();
    
    const fees = [];
    snapshot.forEach(doc => {
      fees.push({
        id: doc.id,
        ...doc.data()
      });
    });

    console.log(`✅ Retrieved ${fees.length} fee structures`);
    
    return res.json({
      ok: true,
      data: fees,
      count: fees.length
    });
  } catch (error) {
    console.error('Error fetching fees:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to fetch fee structures'
    });
  }
});

// Get single fee structure
router.get('/:id', async (req, res) => {
  try {
    const db = getDb();
    const { id } = req.params;
    
    const feeDoc = await db.collection('fee_structures').doc(id).get();
    
    if (!feeDoc.exists) {
      return res.status(404).json({
        ok: false,
        error: 'Fee structure not found'
      });
    }

    return res.json({
      ok: true,
      data: {
        id: feeDoc.id,
        ...feeDoc.data()
      }
    });
  } catch (error) {
    console.error('Error fetching fee:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to fetch fee structure'
    });
  }
});

// Create new fee structure
router.post('/', async (req, res) => {
  try {
    const db = getDb();
    const validatedData = feeSchema.parse(req.body);
    
    const feeData = {
      ...validatedData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const docRef = await db.collection('fee_structures').add(feeData);
    
    console.log(`✅ Created fee structure ${docRef.id}`);
    
    return res.status(201).json({
      ok: true,
      data: {
        id: docRef.id,
        ...feeData
      }
    });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({
        ok: false,
        error: 'Invalid fee data',
        details: error.errors
      });
    }
    
    console.error('Error creating fee:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to create fee structure'
    });
  }
});

// Update fee structure
router.put('/:id', async (req, res) => {
  try {
    const db = getDb();
    const { id } = req.params;
    const validatedData = feeSchema.parse(req.body);
    
    const feeRef = db.collection('fee_structures').doc(id);
    const feeDoc = await feeRef.get();

    if (!feeDoc.exists) {
      return res.status(404).json({
        ok: false,
        error: 'Fee structure not found'
      });
    }

    const updateData = {
      ...validatedData,
      updated_at: new Date().toISOString()
    };

    await feeRef.update(updateData);

    console.log(`✅ Updated fee structure ${id}`);
    
    return res.json({
      ok: true,
      data: {
        id,
        ...feeDoc.data(),
        ...updateData
      }
    });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({
        ok: false,
        error: 'Invalid fee data',
        details: error.errors
      });
    }
    
    console.error('Error updating fee:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to update fee structure'
    });
  }
});

// Delete fee structure
router.delete('/:id', async (req, res) => {
  try {
    const db = getDb();
    const { id } = req.params;
    
    const feeRef = db.collection('fee_structures').doc(id);
    const feeDoc = await feeRef.get();

    if (!feeDoc.exists) {
      return res.status(404).json({
        ok: false,
        error: 'Fee structure not found'
      });
    }

    await feeRef.delete();

    console.log(`✅ Deleted fee structure ${id}`);
    
    return res.json({
      ok: true,
      message: 'Fee structure deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting fee:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to delete fee structure'
    });
  }
});

// Get fee statistics
router.get('/stats/summary', async (req, res) => {
  try {
    const db = getDb();
    
    const snapshot = await db.collection('fee_structures')
      .where('status', '==', 'active')
      .get();
    
    const stats = {
      active_fees: 0,
      total_revenue: 0,
      monthly_revenue: 0,
      avg_fee_rate: 0
    };

    let totalRate = 0;
    let feeCount = 0;

    snapshot.forEach(doc => {
      const fee = doc.data();
      stats.active_fees++;
      
      if (fee.type === 'percentage') {
        totalRate += fee.value;
        feeCount++;
      }
    });

    if (feeCount > 0) {
      stats.avg_fee_rate = totalRate / feeCount;
    }

    console.log(`✅ Generated fee statistics:`, stats);
    
    return res.json({
      ok: true,
      data: stats
    });
  } catch (error) {
    console.error('Error generating fee stats:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to generate fee statistics'
    });
  }
});

export default router;