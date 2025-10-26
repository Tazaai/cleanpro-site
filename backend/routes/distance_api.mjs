import admin from "firebase-admin";
import express from "express";
import { getFirestore } from "firebase-admin/firestore";

const router = express.Router();

// DO NOT initialize Firebase here — index.js must initialize it.
const getDb = () => {
  if (!admin.apps.length) {
    throw new Error("Firebase not initialized");
  }
  return getFirestore();
};

// Calculate distance to nearest coordination point
router.get("/nearest", async (req, res) => {
  try {
    const { address } = req.query;
    
    if (!address) {
      return res.status(400).json({
        ok: false,
        error: "Address parameter is required"
      });
    }

    const db = getDb();
    const snapshot = await db.collection("coordination_points").where("active", "==", true).get();
    
    if (snapshot.empty) {
      return res.status(404).json({
        ok: false,
        error: "No active coordination points found"
      });
    }

    const coordinationPoints = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({
        ok: false,
        error: "Google Maps API key not configured"
      });
    }

    let nearestPoint = null;
    let shortestDistance = Infinity;
    let allDistances = [];

    // Calculate distance to each coordination point
    for (const point of coordinationPoints) {
      try {
        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
          point.address
        )}&destinations=${encodeURIComponent(address)}&key=${apiKey}&units=imperial`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.status === "OK" && data.rows?.[0]?.elements?.[0]?.status === "OK") {
          const element = data.rows[0].elements[0];
          const distanceInMiles = element.distance.value / 1609.34; // Convert meters to miles
          
          allDistances.push({
            coordinationPoint: {
              id: point.id,
              name: point.name,
              address: point.address,
              city: point.city,
              state: point.state
            },
            distance: {
              miles: Math.round(distanceInMiles * 10) / 10, // Round to 1 decimal
              text: element.distance.text
            },
            duration: {
              minutes: Math.round(element.duration.value / 60),
              text: element.duration.text
            },
            withinServiceRadius: distanceInMiles <= (point.serviceRadius || 50)
          });
          
          if (distanceInMiles < shortestDistance) {
            shortestDistance = distanceInMiles;
            nearestPoint = allDistances[allDistances.length - 1];
          }
        }
      } catch (error) {
        console.error(`Error calculating distance to ${point.name}:`, error.message);
      }
    }

    if (!nearestPoint) {
      return res.status(500).json({
        ok: false,
        error: "Unable to calculate distances to coordination points"
      });
    }

    // Check if address is within service area
    const isServiceable = nearestPoint.withinServiceRadius;
    
    res.json({
      ok: true,
      clientAddress: address,
      nearest: nearestPoint,
      isServiceable,
      serviceableMessage: isServiceable 
        ? `We serve this area from our ${nearestPoint.coordinationPoint.name}` 
        : `This address is outside our current service area (${nearestPoint.distance.miles} miles from nearest point)`,
      allDistances: allDistances.sort((a, b) => a.distance.miles - b.distance.miles)
    });

  } catch (error) {
    console.error("Distance calculation error:", error);
    res.status(500).json({
      ok: false,
      error: error.message
    });
  }
});

// Get service area coverage
router.get("/coverage", async (req, res) => {
  try {
    const db = getDb();
    const snapshot = await db.collection("coordination_points").where("active", "==", true).get();
    
    const coordinationPoints = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    const coverage = coordinationPoints.map(point => ({
      id: point.id,
      name: point.name,
      address: point.address,
      city: point.city,
      state: point.state,
      coordinates: point.coordinates,
      serviceRadius: point.serviceRadius || 50,
      capacity: point.capacity
    }));

    res.json({
      ok: true,
      coordinationPoints: coverage,
      totalPoints: coverage.length,
      totalCapacity: coverage.reduce((sum, point) => sum + (point.capacity?.daily || 0), 0)
    });

  } catch (error) {
    console.error("Coverage error:", error);
    res.status(500).json({
      ok: false,
      error: error.message
    });
  }
});

export default router;