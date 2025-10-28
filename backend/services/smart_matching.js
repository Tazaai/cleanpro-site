import { getDb } from '../firebase.js';

class SmartMatchingService {
  constructor() {
    this.weights = {
      distance: 0.35,        // 35% - proximity is very important
      quality_score: 0.25,   // 25% - quality matters for customer satisfaction
      availability: 0.20,    // 20% - must be available for the requested time
      price_competitiveness: 0.10, // 10% - price factor
      service_specialization: 0.10  // 10% - specialization in requested service
    };
    
    this.maxDistance = 50; // Maximum distance in kilometers
    this.qualityThreshold = 6.0; // Minimum quality score (1-10 scale)
  }

  // Main matching function
  async findBestMatches(clientRequest, options = {}) {
    try {
      const {
        maxResults = 5,
        includeUnavailable = false,
        prioritizeQuality = false,
        prioritizeDistance = false
      } = options;

      // Adjust weights based on priorities
      const adjustedWeights = this.adjustWeights({ prioritizeQuality, prioritizeDistance });
      
      // Get all active CPs
      const candidateCPs = await this.getCandidateCoordinationPoints(clientRequest);
      
      if (candidateCPs.length === 0) {
        return {
          matches: [],
          message: 'No coordination points available in your area',
          search_radius: clientRequest.max_distance || this.maxDistance
        };
      }

      // Calculate scores for each CP
      const scoredMatches = await Promise.all(
        candidateCPs.map(cp => this.calculateMatchScore(cp, clientRequest, adjustedWeights))
      );

      // Filter and sort matches
      let filteredMatches = scoredMatches
        .filter(match => {
          if (!includeUnavailable && !match.availability.available) return false;
          if (match.distance > (clientRequest.max_distance || this.maxDistance)) return false;
          if (match.quality_metrics.overall_score < this.qualityThreshold) return false;
          return true;
        })
        .sort((a, b) => b.total_score - a.total_score)
        .slice(0, maxResults);

      // Add recommendations for better matches if results are limited
      const recommendations = this.generateRecommendations(scoredMatches, clientRequest);

      return {
        matches: filteredMatches,
        total_candidates: candidateCPs.length,
        matched_count: filteredMatches.length,
        search_criteria: clientRequest,
        matching_weights: adjustedWeights,
        recommendations: recommendations,
        generated_at: new Date().toISOString()
      };
    } catch (error) {
      console.error('❌ Smart matching failed:', error);
      throw error;
    }
  }

  // Get all candidate coordination points
  async getCandidateCoordinationPoints(clientRequest) {
    try {
      const db = getDb();
      
      // Get all active CPs
      const snapshot = await db.collection('coordinationPoints')
        .where('active', '==', true)
        .where('admin_approved', '==', true)
        .get();

      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('❌ Failed to get candidate CPs:', error);
      return [];
    }
  }

  // Calculate comprehensive match score for a CP
  async calculateMatchScore(cp, clientRequest, weights) {
    const scores = {
      cp_id: cp.id,
      cp_name: cp.business_name || cp.name,
      cp_address: cp.address,
      
      // Calculate individual scores
      distance: await this.calculateDistanceScore(cp, clientRequest),
      quality_score: this.calculateQualityScore(cp),
      availability: await this.calculateAvailabilityScore(cp, clientRequest),
      price_competitiveness: this.calculatePriceScore(cp, clientRequest),
      service_specialization: this.calculateSpecializationScore(cp, clientRequest),
      
      // Metadata
      quality_metrics: this.extractQualityMetrics(cp),
      pricing_info: this.extractPricingInfo(cp, clientRequest),
      service_capabilities: this.extractServiceCapabilities(cp),
      contact_info: {
        email: cp.email,
        phone: cp.phone,
        share_link: cp.share_link
      }
    };

    // Calculate weighted total score
    scores.total_score = (
      scores.distance.score * weights.distance +
      scores.quality_score.score * weights.quality_score +
      scores.availability.score * weights.availability +
      scores.price_competitiveness.score * weights.price_competitiveness +
      scores.service_specialization.score * weights.service_specialization
    );

    // Add confidence level based on data completeness
    scores.confidence_level = this.calculateConfidenceLevel(cp, scores);
    scores.match_reasons = this.generateMatchReasons(scores, weights);
    
    return scores;
  }

  // Calculate distance-based score using Google Maps API
  async calculateDistanceScore(cp, clientRequest) {
    try {
      // Use Google Maps Distance Matrix API for accurate distance/time
      const origin = clientRequest.address || clientRequest.location;
      const destination = cp.address;
      
      const distance = await this.getDistance(origin, destination);
      
      if (!distance) {
        return {
          score: 0,
          distance_km: null,
          travel_time: null,
          error: 'Distance calculation failed'
        };
      }

      // Score based on distance (closer = higher score)
      const maxDist = clientRequest.max_distance || this.maxDistance;
      const distanceScore = Math.max(0, 1 - (distance.distance_km / maxDist));
      
      return {
        score: distanceScore,
        distance_km: distance.distance_km,
        distance_text: distance.distance_text,
        travel_time: distance.duration_text,
        travel_time_value: distance.duration_value
      };
    } catch (error) {
      console.error('❌ Distance calculation error:', error);
      return {
        score: 0.5, // Default moderate score if calculation fails
        distance_km: null,
        error: error.message
      };
    }
  }

  // Calculate quality score based on various metrics
  calculateQualityScore(cp) {
    let totalScore = 0;
    let factors = 0;

    // AI quality score (from monitoring system)
    if (cp.ai_quality_score) {
      totalScore += cp.ai_quality_score / 10;
      factors++;
    }

    // Communication score
    if (cp.communication_score) {
      totalScore += cp.communication_score / 10;
      factors++;
    }

    // Customer ratings (if available)
    if (cp.customer_rating) {
      totalScore += cp.customer_rating / 5; // Convert 5-star to 0-1 scale
      factors++;
    }

    // Completion rate
    if (cp.completion_rate) {
      totalScore += cp.completion_rate / 100;
      factors++;
    }

    // Verification status bonus
    if (cp.verification_status === 'verified') {
      totalScore += 0.1; // 10% bonus for verified CPs
    }

    // Insurance bonus
    if (cp.insurance_provided) {
      totalScore += 0.05; // 5% bonus for insured CPs
    }

    const finalScore = factors > 0 ? totalScore / factors : 0.5;
    
    return {
      score: Math.min(1, finalScore),
      overall_score: Math.min(10, finalScore * 10),
      factors_considered: factors,
      verified: cp.verification_status === 'verified',
      insured: cp.insurance_provided || false
    };
  }

  // Calculate availability score
  async calculateAvailabilityScore(cp, clientRequest) {
    try {
      const requestedDate = new Date(clientRequest.preferred_date || clientRequest.service_date);
      const requestedTime = clientRequest.preferred_time || clientRequest.service_time;
      
      // Check CP's schedule/availability
      const availability = await this.checkCPAvailability(cp, requestedDate, requestedTime);
      
      return {
        score: availability.available ? 1 : 0,
        available: availability.available,
        next_available: availability.next_available,
        schedule_flexibility: availability.flexibility,
        booking_window: availability.booking_window
      };
    } catch (error) {
      console.error('❌ Availability check failed:', error);
      return {
        score: 0.7, // Default moderate availability
        available: true,
        error: error.message
      };
    }
  }

  // Calculate price competitiveness
  calculatePriceScore(cp, clientRequest) {
    try {
      // Get estimated price for this CP
      const cpPrice = this.estimateCPPrice(cp, clientRequest);
      
      // Compare with market average (you'd calculate this from all CPs)
      const marketAverage = this.getMarketAveragePrice(clientRequest);
      
      // Score: lower price = higher score, but not too aggressive
      let priceScore = 0.5; // Default middle score
      
      if (cpPrice && marketAverage) {
        const priceRatio = cpPrice / marketAverage;
        // Best score (1.0) for prices 10% below market, worst (0.0) for 50% above
        priceScore = Math.max(0, Math.min(1, 1.1 - priceRatio));
      }
      
      return {
        score: priceScore,
        estimated_price: cpPrice,
        market_average: marketAverage,
        price_advantage: marketAverage ? ((marketAverage - cpPrice) / marketAverage * 100).toFixed(1) + '%' : null
      };
    } catch (error) {
      console.error('❌ Price calculation error:', error);
      return {
        score: 0.5,
        estimated_price: null,
        error: error.message
      };
    }
  }

  // Calculate service specialization score
  calculateSpecializationScore(cp, clientRequest) {
    const requestedServices = clientRequest.services || [];
    const cpServices = cp.coverage_areas || cp.services_offered || [];
    
    if (requestedServices.length === 0) {
      return { score: 1, specialization: 'general' };
    }
    
    // Calculate overlap between requested and offered services
    const matches = requestedServices.filter(service => 
      cpServices.some(cpService => 
        cpService.toLowerCase().includes(service.toLowerCase()) ||
        service.toLowerCase().includes(cpService.toLowerCase())
      )
    );
    
    const specializationScore = matches.length / requestedServices.length;
    
    return {
      score: specializationScore,
      specialization: specializationScore > 0.8 ? 'excellent' : 
                     specializationScore > 0.5 ? 'good' : 'basic',
      matched_services: matches,
      available_services: cpServices
    };
  }

  // Helper functions
  async getDistance(origin, destination) {
    try {
      const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&units=metric&key=${process.env.GOOGLE_MAPS_API_KEY}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.status === 'OK' && data.rows[0].elements[0].status === 'OK') {
        const element = data.rows[0].elements[0];
        return {
          distance_km: element.distance.value / 1000,
          distance_text: element.distance.text,
          duration_value: element.duration.value,
          duration_text: element.duration.text
        };
      }
      
      return null;
    } catch (error) {
      console.error('❌ Google Maps API error:', error);
      return null;
    }
  }

  async checkCPAvailability(cp, date, time) {
    // This would integrate with a scheduling system
    // For now, return a simple availability check
    return {
      available: true,
      next_available: date,
      flexibility: 'high',
      booking_window: '1-14 days'
    };
  }

  estimateCPPrice(cp, clientRequest) {
    // This would use your pricing algorithm
    // For now, return a basic estimate
    const basePrice = 100; // Base price
    const sizeFactor = (clientRequest.square_feet || 1000) / 1000;
    return basePrice * sizeFactor;
  }

  getMarketAveragePrice(clientRequest) {
    // This would calculate from all CPs in the area
    // For now, return a fixed average
    return 120;
  }

  extractQualityMetrics(cp) {
    return {
      overall_score: cp.ai_quality_score || 7.5,
      communication_score: cp.communication_score || 8.0,
      customer_rating: cp.customer_rating || 4.2,
      completion_rate: cp.completion_rate || 95,
      response_time: cp.avg_response_time || '2 hours'
    };
  }

  extractPricingInfo(cp, clientRequest) {
    return {
      estimated_total: this.estimateCPPrice(cp, clientRequest),
      fee_percentage: cp.custom_fee_percentage || 15,
      pricing_model: 'per_sqft',
      includes_supplies: true
    };
  }

  extractServiceCapabilities(cp) {
    return {
      service_radius: cp.service_radius || 25,
      services_offered: cp.coverage_areas || [],
      business_type: cp.business_type || 'individual',
      years_experience: cp.years_experience || 'Not specified'
    };
  }

  calculateConfidenceLevel(cp, scores) {
    let confidence = 0;
    let factors = 0;
    
    // Data completeness factors
    if (cp.ai_quality_score) { confidence += 0.2; factors++; }
    if (cp.customer_rating) { confidence += 0.2; factors++; }
    if (cp.completion_rate) { confidence += 0.15; factors++; }
    if (cp.verification_status === 'verified') { confidence += 0.15; factors++; }
    if (scores.distance.distance_km !== null) { confidence += 0.15; factors++; }
    if (cp.insurance_provided) { confidence += 0.1; factors++; }
    if (cp.years_experience) { confidence += 0.05; factors++; }
    
    return factors > 0 ? Math.min(1, confidence) : 0.5;
  }

  generateMatchReasons(scores, weights) {
    const reasons = [];
    
    if (scores.distance.score > 0.8) {
      reasons.push(`Excellent location - only ${scores.distance.distance_km?.toFixed(1)}km away`);
    }
    
    if (scores.quality_score.score > 0.8) {
      reasons.push(`High quality rating (${scores.quality_score.overall_score.toFixed(1)}/10)`);
    }
    
    if (scores.quality_score.verified) {
      reasons.push('Verified coordination point');
    }
    
    if (scores.quality_score.insured) {
      reasons.push('Fully insured services');
    }
    
    if (scores.service_specialization.score > 0.8) {
      reasons.push('Specializes in your requested services');
    }
    
    if (scores.availability.available) {
      reasons.push('Available on your requested date');
    }
    
    return reasons;
  }

  adjustWeights({ prioritizeQuality, prioritizeDistance }) {
    const weights = { ...this.weights };
    
    if (prioritizeQuality) {
      weights.quality_score += 0.15;
      weights.distance -= 0.10;
      weights.price_competitiveness -= 0.05;
    }
    
    if (prioritizeDistance) {
      weights.distance += 0.15;
      weights.quality_score -= 0.05;
      weights.service_specialization -= 0.05;
      weights.price_competitiveness -= 0.05;
    }
    
    return weights;
  }

  generateRecommendations(allMatches, clientRequest) {
    const recommendations = [];
    
    if (allMatches.length === 0) {
      recommendations.push({
        type: 'expand_search',
        message: 'Consider expanding your search radius to find more options',
        suggestion: 'Increase maximum distance to 30-50km'
      });
    } else if (allMatches.filter(m => m.total_score > 0.8).length === 0) {
      recommendations.push({
        type: 'adjust_criteria',
        message: 'Consider adjusting your requirements for better matches',
        suggestion: 'Try different dates or service specifications'
      });
    }
    
    const highQualityMatches = allMatches.filter(m => m.quality_score.score > 0.9);
    if (highQualityMatches.length > 0) {
      recommendations.push({
        type: 'quality_option',
        message: 'Premium quality coordination points available',
        suggestion: 'Consider prioritizing quality for best service experience'
      });
    }
    
    return recommendations;
  }

  // Get matching statistics
  async getMatchingStats(timeframe = '7d') {
    try {
      const db = getDb();
      const startDate = new Date();
      
      switch (timeframe) {
        case '24h':
          startDate.setDate(startDate.getDate() - 1);
          break;
        case '7d':
          startDate.setDate(startDate.getDate() - 7);
          break;
        case '30d':
          startDate.setDate(startDate.getDate() - 30);
          break;
      }

      // This would query matching logs once we start logging matches
      // For now, return sample data
      return {
        total_matches_requested: 150,
        successful_matches: 142,
        average_match_score: 0.78,
        average_distance: 8.5,
        top_matching_factors: ['distance', 'quality_score', 'availability'],
        success_rate: '94.7%',
        timeframe: timeframe,
        generated_at: new Date().toISOString()
      };
    } catch (error) {
      console.error('❌ Failed to get matching stats:', error);
      return null;
    }
  }
}

// Export singleton instance
export const smartMatching = new SmartMatchingService();
export default smartMatching;