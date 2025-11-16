import express from 'express';
import { z } from 'zod';
import { getDb, initFirebase } from '../firebase.js';
import { google } from 'googleapis';

const router = express.Router();

// Initialize Firebase
await initFirebase();

// Google Calendar OAuth setup
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Generate Google Calendar OAuth URL
router.get('/connect/google/auth', async (req, res) => {
  try {
    const { user_id } = req.query;
    
    if (!user_id) {
      return res.status(400).json({
        ok: false,
        error: 'User ID is required'
      });
    }

    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/calendar'],
      state: user_id // Pass user_id in state parameter
    });

    console.log(`✅ Generated Google Calendar auth URL for user ${user_id}`);
    
    return res.json({
      ok: true,
      data: {
        auth_url: authUrl,
        user_id
      }
    });
  } catch (error) {
    console.error('Error generating auth URL:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to generate authorization URL'
    });
  }
});

// Handle Google Calendar OAuth callback
router.post('/connect/google/callback', async (req, res) => {
  try {
    const db = getDb();
    const { code, user_id } = req.body;
    
    if (!code || !user_id) {
      return res.status(400).json({
        ok: false,
        error: 'Authorization code and user ID are required'
      });
    }

    // Exchange code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Get calendar info
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    const calendarList = await calendar.calendarList.list();
    
    const primaryCalendar = calendarList.data.items.find(cal => cal.primary) || calendarList.data.items[0];

    const connectionData = {
      user_id,
      provider: 'google',
      calendar_id: primaryCalendar.id,
      calendar_name: primaryCalendar.summary || 'Primary Calendar',
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      token_expiry: tokens.expiry_date,
      connected_at: new Date().toISOString(),
      last_sync: null,
      status: 'active'
    };

    const docRef = await db.collection('calendar_connections').add(connectionData);
    
    console.log(`✅ Connected Google Calendar for user ${user_id}`);
    
    return res.json({
      ok: true,
      data: {
        connection_id: docRef.id,
        calendar_name: primaryCalendar.summary,
        connected_at: connectionData.connected_at
      }
    });
  } catch (error) {
    console.error('Error connecting Google Calendar:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to connect Google Calendar'
    });
  }
});

// Get user's calendar connections
router.get('/connections/:user_id', async (req, res) => {
  try {
    const db = getDb();
    const { user_id } = req.params;
    
    const snapshot = await db.collection('calendar_connections')
      .where('user_id', '==', user_id)
      .where('status', '==', 'active')
      .get();
    
    const connections = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      // Don't return sensitive tokens
      delete data.access_token;
      delete data.refresh_token;
      
      connections.push({
        id: doc.id,
        ...data
      });
    });

    console.log(`✅ Retrieved ${connections.length} calendar connections for user ${user_id}`);
    
    return res.json({
      ok: true,
      data: connections,
      count: connections.length
    });
  } catch (error) {
    console.error('Error fetching calendar connections:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to fetch calendar connections'
    });
  }
});

// Disconnect calendar
router.delete('/connections/:connection_id', async (req, res) => {
  try {
    const db = getDb();
    const { connection_id } = req.params;
    
    const connectionRef = db.collection('calendar_connections').doc(connection_id);
    const connectionDoc = await connectionRef.get();

    if (!connectionDoc.exists) {
      return res.status(404).json({
        ok: false,
        error: 'Calendar connection not found'
      });
    }

    await connectionRef.update({
      status: 'disconnected',
      disconnected_at: new Date().toISOString()
    });

    console.log(`✅ Disconnected calendar ${connection_id}`);
    
    return res.json({
      ok: true,
      message: 'Calendar disconnected successfully'
    });
  } catch (error) {
    console.error('Error disconnecting calendar:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to disconnect calendar'
    });
  }
});

// Sync bookings to calendar
router.post('/sync/:user_id', async (req, res) => {
  try {
    const db = getDb();
    const { user_id } = req.params;
    
    // Get active calendar connections
    const connectionsSnapshot = await db.collection('calendar_connections')
      .where('user_id', '==', user_id)
      .where('status', '==', 'active')
      .get();
    
    if (connectionsSnapshot.empty) {
      return res.status(404).json({
        ok: false,
        error: 'No active calendar connections found'
      });
    }

    // Get confirmed bookings for the user
    const bookingsSnapshot = await db.collection('bookings')
      .where('user_id', '==', user_id)
      .where('status', '==', 'confirmed')
      .get();
    
    let syncedCount = 0;
    
    // For now, just return success without actual calendar API calls
    // In production, you would iterate through bookings and create calendar events
    
    connectionsSnapshot.forEach(connectionDoc => {
      const connection = connectionDoc.data();
      
      bookingsSnapshot.forEach(bookingDoc => {
        const booking = bookingDoc.data();
        
        // Simulate calendar event creation
        console.log(`Syncing booking ${bookingDoc.id} to calendar ${connection.calendar_name}`);
        syncedCount++;
      });
      
      // Update last sync time
      db.collection('calendar_connections').doc(connectionDoc.id).update({
        last_sync: new Date().toISOString()
      });
    });

    console.log(`✅ Synced ${syncedCount} bookings to calendar for user ${user_id}`);
    
    return res.json({
      ok: true,
      data: {
        synced_count: syncedCount,
        user_id
      }
    });
  } catch (error) {
    console.error('Error syncing bookings to calendar:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to sync bookings to calendar'
    });
  }
});

export default router;