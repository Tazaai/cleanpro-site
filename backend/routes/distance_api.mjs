import express from "express";
import { getDb } from "../firebase.js";

const router = express.Router();

// Get fallback coordination points when Firebase is unavailable
const getFallbackCoordinationPoints = () => [
  {
    id: "hq_main",
    name: "Main Headquarters",
    address: "1234 Main Street, San Francisco, CA 94102, USA",
    city: "San Francisco",
    state: "CA",
    zipCode: "94102",
    phone: "+1 (555) 123-4567",
    email: "main@cleandeparture.com",
    active: true,
    coordinates: { lat: 37.7749, lng: -122.4194 },
    serviceRadius: 50,
    capacity: { daily: 20, weekly: 120 }
  },
  {
    id: "hq_east",
    name: "East Bay Operations", 
    address: "5678 Oakland Avenue, Oakland, CA 94607, USA",
    city: "Oakland",
    state: "CA",
    zipCode: "94607",
    phone: "+1 (555) 234-5678",
    email: "eastbay@cleandeparture.com",
    active: true,
    coordinates: { lat: 37.8044, lng: -122.2711 },
    serviceRadius: 40,
    capacity: { daily: 15, weekly: 90 }
  },
  {
    id: "hq_south",
    name: "South Bay Center",
    address: "9999 Silicon Valley Boulevard, San Jose, CA 95110, USA",
    city: "San Jose",
    state: "CA", 
    zipCode: "95110",
    phone: "+1 (555) 345-6789",
    email: "southbay@cleandeparture.com",
    active: true,
    coordinates: { lat: 37.3382, lng: -121.8863 },
    serviceRadius: 45,
    capacity: { daily: 18, weekly: 108 }
  }
];

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

    let coordinationPoints = [];
    let dataSource = "database";

    // Try to get coordination points from Firebase
    try {
      const db = getDb();
      if (db) {
        const snapshot = await db.collection("coordination_points").where("active", "==", true).get();
        if (!snapshot.empty) {
          coordinationPoints = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        }
      }
    } catch (error) {
      console.warn("Firebase unavailable, using fallback data:", error.message);
    }

    // Use fallback data if Firebase failed or no data found
    if (coordinationPoints.length === 0) {
      coordinationPoints = getFallbackCoordinationPoints();
      dataSource = "fallback";
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({
        ok: false,
        error: "Google Maps API key not configured"
      });
    }
    
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
      allDistances: allDistances.sort((a, b) => a.distance.miles - b.distance.miles),
      source: dataSource,
      message: dataSource === "fallback" ? "Using fallback data - Firebase unavailable" : "Data from database"
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
    let coordinationPoints = [];
    let dataSource = "database";

    // Try to get coordination points from Firebase
    try {
      const db = getDb();
      if (db) {
        const snapshot = await db.collection("coordination_points").where("active", "==", true).get();
        if (!snapshot.empty) {
          coordinationPoints = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        }
      }
    } catch (error) {
      console.warn("Firebase unavailable for coverage, using fallback data:", error.message);
    }

    // Use fallback data if Firebase failed or no data found
    if (coordinationPoints.length === 0) {
      coordinationPoints = getFallbackCoordinationPoints();
      dataSource = "fallback";
    }
    
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
      totalCapacity: coverage.reduce((sum, point) => sum + (point.capacity?.daily || 0), 0),
      source: dataSource,
      message: dataSource === "fallback" ? "Using fallback data - Firebase unavailable" : "Data from database"
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