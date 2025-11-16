import { getDb } from '../firebase.js';

// Utility function to get database instance with error handling
export function getDatabase() {
  try {
    return getDb();
  } catch (error) {
    console.error('Failed to get database instance:', error);
    throw new Error('Database connection failed');
  }
}

// Middleware to add database instance to request object
export function addDatabaseMiddleware(req, res, next) {
  try {
    req.db = getDatabase();
    next();
  } catch (error) {
    console.error('Database middleware error:', error);
    return res.status(500).json({
      ok: false,
      error: 'Database connection failed'
    });
  }
}