import express from 'express';
import { z } from 'zod';
import { getDb, initFirebase } from '../firebase.js';

const router = express.Router();

// Initialize Firebase before using routes
await initFirebase();

// Zod schemas
const bookingSchema = z.object({
  cp_id: z.string().min(1),
  client_name: z.string().min(2),
  client_email: z.string().email(),
  client_phone: z.string().min(10),
  service_type: z.enum(['standard_cleaning', 'deep_cleaning', 'office_cleaning', 'move_inout_cleaning']),
  area_sqft: z.number().min(1),
  address: z.string().min(10),
  date: z.string(),
  time_slot: z.string(),
  frequency: z.enum(['one_time', 'weekly', 'bi_weekly', 'monthly']).default('one_time'),
  estimated_price: z.number().min(0),
  special_instructions: z.string().optional()
});

// Validation middleware
const validateSchema = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    console.error('Validation error:', error);
    return res.status(400).json({
      ok: false,
      error: 'Invalid request data',
      details: error.errors
    });
  }
};

// Get all bookings for a coordination point
router.get('/:cp_id', async (req, res) => {
  try {
    const { cp_id } = req.params;
    const status = req.query.status || 'all';
    
    const db = getDb();
    let query = db.collection('cp_bookings').where('cp_id', '==', cp_id);
    
    if (status !== 'all') {
      query = query.where('status', '==', status);
    }
    
    const snapshot = await query.orderBy('created_at', 'desc').get();
    
    const bookings = [];
    snapshot.forEach(doc => {
      bookings.push({
        id: doc.id,
        ...doc.data()
      });
    });

    console.log(`✅ Retrieved ${bookings.length} bookings for CP ${cp_id}`);
    
    return res.json({
      ok: true,
      data: bookings,
      count: bookings.length,
      cp_id
    });
  } catch (error) {
    console.error('Error fetching CP bookings:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to fetch bookings'
    });
  }
});

// Create new booking for CP
router.post('/', validateSchema(bookingSchema), async (req, res) => {
  try {
    const db = getDb();
    const bookingData = {
      ...req.body,
      status: 'pending_approval',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      payment_status: 'pending',
      escrow_held: true,
      cp_notified: false
    };

    const docRef = await db.collection('cp_bookings').add(bookingData);
    
    console.log(`✅ Created booking ${docRef.id} for CP ${req.body.cp_id}`);
    
    return res.status(201).json({
      ok: true,
      data: {
        id: docRef.id,
        ...bookingData
      }
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to create booking'
    });
  }
});

// Update booking status
router.put('/:booking_id/status', async (req, res) => {
  try {
    const db = getDb();
    const { booking_id } = req.params;
    const { status, cp_notes } = req.body;
    
    if (!['pending_approval', 'confirmed', 'in_progress', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({
        ok: false,
        error: 'Invalid status'
      });
    }

    const bookingRef = db.collection('cp_bookings').doc(booking_id);
    const bookingDoc = await bookingRef.get();

    if (!bookingDoc.exists) {
      return res.status(404).json({
        ok: false,
        error: 'Booking not found'
      });
    }

    const updateData = {
      status,
      updated_at: new Date().toISOString()
    };

    if (cp_notes) {
      updateData.cp_notes = cp_notes;
    }

    await bookingRef.update(updateData);

    console.log(`✅ Updated booking ${booking_id} status to ${status}`);
    
    return res.json({
      ok: true,
      data: {
        id: booking_id,
        ...bookingDoc.data(),
        ...updateData
      }
    });
  } catch (error) {
    console.error('Error updating booking status:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to update booking status'
    });
  }
});

// Get booking details
router.get('/booking/:booking_id', async (req, res) => {
  try {
    const db = getDb();
    const { booking_id } = req.params;
    
    const bookingDoc = await db.collection('cp_bookings').doc(booking_id).get();
    
    if (!bookingDoc.exists) {
      return res.status(404).json({
        ok: false,
        error: 'Booking not found'
      });
    }

    return res.json({
      ok: true,
      data: {
        id: bookingDoc.id,
        ...bookingDoc.data()
      }
    });
  } catch (error) {
    console.error('Error fetching booking details:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to fetch booking details'
    });
  }
});

// Get booking statistics for CP
router.get('/stats/:cp_id', async (req, res) => {
  try {
    const db = getDb();
    const { cp_id } = req.params;
    
    const bookingsSnapshot = await db.collection('cp_bookings')
      .where('cp_id', '==', cp_id)
      .get();
    
    let stats = {
      total_bookings: 0,
      pending_bookings: 0,
      confirmed_bookings: 0,
      completed_bookings: 0,
      total_revenue: 0,
      avg_rating: 0,
      completion_rate: 0,
      response_time: 0,
      monthly_bookings: 0
    };

    bookingsSnapshot.forEach(doc => {
      const booking = doc.data();
      stats.total_bookings++;
      
      if (booking.status === 'pending_approval') stats.pending_bookings++;
      if (booking.status === 'confirmed') stats.confirmed_bookings++;
      if (booking.status === 'completed') {
        stats.completed_bookings++;
        stats.total_revenue += booking.estimated_price || 0;
      }
      
      // Check if booking is from this month
      const bookingDate = new Date(booking.created_at);
      const currentDate = new Date();
      if (bookingDate.getMonth() === currentDate.getMonth() && 
          bookingDate.getFullYear() === currentDate.getFullYear()) {
        stats.monthly_bookings++;
      }
    });

    // Calculate completion rate
    if (stats.total_bookings > 0) {
      stats.completion_rate = ((stats.completed_bookings / stats.total_bookings) * 100);
    }

    console.log(`✅ Generated stats for CP ${cp_id}:`, stats);
    
    return res.json({
      ok: true,
      data: stats
    });
  } catch (error) {
    console.error('Error generating CP stats:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to generate statistics'
    });
  }
});

export default router;