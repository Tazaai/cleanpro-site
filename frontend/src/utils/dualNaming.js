/**
 * Utility functions for handling dual naming conventions
 * Supports both 'coordinationPoints' and 'hqs' naming
 */

/**
 * Extract coordination points from API response supporting both naming conventions
 * @param {Object} apiResponse - Response from coordination points API
 * @returns {Array} Array of coordination points
 */
export function extractCoordinationPoints(apiResponse) {
  if (!apiResponse || typeof apiResponse !== 'object') {
    return [];
  }
  
  // Support both naming conventions with fallback to empty array
  return apiResponse.coordinationPoints || apiResponse.hqs || [];
}

/**
 * Create dual-compatible API response
 * @param {Array} points - Array of coordination points
 * @param {Object} options - Additional response options
 * @returns {Object} API response with both naming conventions
 */
export function createDualResponse(points = [], options = {}) {
  return {
    ok: true,
    coordinationPoints: points,
    hqs: points, // Backward compatibility
    ...options
  };
}

/**
 * Validate that an API response includes both naming conventions
 * @param {Object} response - API response to validate
 * @returns {Object} Validation result
 */
export function validateDualNaming(response) {
  const hasCoordinationPoints = response && typeof response === 'object' && 'coordinationPoints' in response;
  const hasHqs = response && typeof response === 'object' && 'hqs' in response;
  
  return {
    valid: hasCoordinationPoints && hasHqs,
    hasCoordinationPoints,
    hasHqs,
    message: hasCoordinationPoints && hasHqs 
      ? 'Both naming conventions supported' 
      : 'Missing naming convention support'
  };
}

/**
 * Normalize state management for components using both naming conventions
 * @param {Array} points - Points array to sync
 * @param {Function} setCoordinationPoints - Setter for coordinationPoints
 * @param {Function} setHqs - Setter for hqs
 */
export function syncDualState(points, setCoordinationPoints, setHqs) {
  if (typeof setCoordinationPoints === 'function') {
    setCoordinationPoints(points);
  }
  if (typeof setHqs === 'function') {
    setHqs(points);
  }
}

/**
 * Get count of coordination points supporting both naming conventions
 * @param {Object} response - API response
 * @returns {number} Count of coordination points
 */
export function getCoordinationPointsCount(response) {
  const points = extractCoordinationPoints(response);
  return Array.isArray(points) ? points.length : 0;
}

/**
 * Health check helper for coordination points API
 * @param {string} apiUrl - Base API URL
 * @returns {Promise<Object>} Health check result
 */
export async function healthCheckCoordinationPoints(apiUrl) {
  try {
    const response = await fetch(`${apiUrl}/api/coordination_points`);
    const data = await response.json();
    
    const validation = validateDualNaming(data);
    const count = getCoordinationPointsCount(data);
    
    return {
      ok: response.ok && data.ok,
      status: response.status,
      count,
      dualNaming: validation,
      needsSeeding: data.needsSeeding || false,
      error: data.error || null
    };
  } catch (error) {
    return {
      ok: false,
      status: 0,
      count: 0,
      dualNaming: { valid: false, hasCoordinationPoints: false, hasHqs: false },
      needsSeeding: false,
      error: error.message
    };
  }
}

// Example usage:
/*
// Frontend component
const response = await fetch('/api/coordination_points');
const data = await response.json();
const points = extractCoordinationPoints(data);
syncDualState(points, setCoordinationPoints, setHqs);

// Backend API
router.get('/', (req, res) => {
  const points = await getPointsFromDatabase();
  res.json(createDualResponse(points, { needsSeeding: points.length === 0 }));
});

// Health check
const health = await healthCheckCoordinationPoints('https://api.example.com');
console.log(`Found ${health.count} points, dual naming: ${health.dualNaming.valid}`);
*/