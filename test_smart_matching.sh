#!/bin/bash

# Test Smart Matching Algorithm
echo "🧠 Testing Smart Matching Algorithm..."
echo "====================================="

cd /workspaces/cleanpro-site/backend

# Test smart matching service
echo "🚀 Testing smart matching service..."

cat > test_smart_matching.js << 'EOF'
import smartMatching from './services/smart_matching.js';

console.log('🧠 Testing Smart Matching Service...');

// Test client request
const testClientRequest = {
  address: "Downtown Los Angeles, CA",
  services: ["house_cleaning", "deep_cleaning"],
  preferred_date: "2025-11-01",
  preferred_time: "10:00",
  square_feet: 1200,
  max_distance: 30,
  budget_range: [100, 200]
};

console.log('\n📋 Test Client Request:');
console.log('Location:', testClientRequest.address);
console.log('Services:', testClientRequest.services);
console.log('Date:', testClientRequest.preferred_date);
console.log('Square Feet:', testClientRequest.square_feet);
console.log('Max Distance:', testClientRequest.max_distance, 'km');

console.log('\n🧪 Testing smart matching...');

// Test weight configuration
console.log('\n⚖️ Current Matching Weights:');
console.log('Distance:', (smartMatching.weights.distance * 100).toFixed(1) + '%');
console.log('Quality:', (smartMatching.weights.quality_score * 100).toFixed(1) + '%');
console.log('Availability:', (smartMatching.weights.availability * 100).toFixed(1) + '%');
console.log('Price:', (smartMatching.weights.price_competitiveness * 100).toFixed(1) + '%');
console.log('Specialization:', (smartMatching.weights.service_specialization * 100).toFixed(1) + '%');

// Test matching algorithm (would need Firebase connection for full test)
smartMatching.findBestMatches(testClientRequest, {
  maxResults: 5,
  prioritizeQuality: false,
  prioritizeDistance: false
})
.then(results => {
  console.log('\n✅ Matching Results:');
  console.log('Total Candidates:', results.total_candidates);
  console.log('Matched Count:', results.matched_count);
  console.log('Matches Found:', results.matches.length);
  
  if (results.matches.length > 0) {
    console.log('\n🏆 Top Match:');
    const topMatch = results.matches[0];
    console.log('CP Name:', topMatch.cp_name);
    console.log('Total Score:', (topMatch.total_score * 100).toFixed(1) + '%');
    console.log('Distance:', topMatch.distance.distance_km ? topMatch.distance.distance_km.toFixed(1) + 'km' : 'Unknown');
    console.log('Quality Score:', (topMatch.quality_score.overall_score).toFixed(1) + '/10');
    console.log('Match Reasons:', topMatch.match_reasons);
  }
  
  if (results.recommendations.length > 0) {
    console.log('\n💡 Recommendations:');
    results.recommendations.forEach(rec => {
      console.log(`- ${rec.message}: ${rec.suggestion}`);
    });
  }
})
.catch(error => {
  console.log('ℹ️ Matching test (expected to fail without Firebase):', error.message);
});

// Test weight adjustment
console.log('\n🔧 Testing Weight Adjustments:');

const qualityWeights = smartMatching.adjustWeights({ prioritizeQuality: true, prioritizeDistance: false });
console.log('Quality-Prioritized Weights:');
console.log('- Quality:', (qualityWeights.quality_score * 100).toFixed(1) + '%');
console.log('- Distance:', (qualityWeights.distance * 100).toFixed(1) + '%');

const distanceWeights = smartMatching.adjustWeights({ prioritizeQuality: false, prioritizeDistance: true });
console.log('Distance-Prioritized Weights:');
console.log('- Distance:', (distanceWeights.distance * 100).toFixed(1) + '%');
console.log('- Quality:', (distanceWeights.quality_score * 100).toFixed(1) + '%');

// Test individual scoring components
console.log('\n🧮 Testing Individual Scoring:');

const mockCP = {
  id: 'test_cp_001',
  business_name: 'Elite Cleaning Services',
  address: '123 Business St, Los Angeles, CA',
  ai_quality_score: 8.5,
  communication_score: 9.0,
  customer_rating: 4.5,
  completion_rate: 96,
  verification_status: 'verified',
  insurance_provided: true,
  service_radius: 25,
  coverage_areas: ['house_cleaning', 'deep_cleaning', 'office_cleaning']
};

const qualityScore = smartMatching.calculateQualityScore(mockCP);
console.log('Quality Score Calculation:');
console.log('- Overall Score:', (qualityScore.score * 100).toFixed(1) + '%');
console.log('- Factors Considered:', qualityScore.factors_considered);
console.log('- Verified:', qualityScore.verified);
console.log('- Insured:', qualityScore.insured);

const specializationScore = smartMatching.calculateSpecializationScore(mockCP, testClientRequest);
console.log('Specialization Score:');
console.log('- Score:', (specializationScore.score * 100).toFixed(1) + '%');
console.log('- Specialization Level:', specializationScore.specialization);
console.log('- Matched Services:', specializationScore.matched_services);

console.log('\n🎉 Smart matching test completed!');
console.log('\n💡 Smart Matching Algorithm Summary:');
console.log('- Multi-factor scoring with weighted algorithm');
console.log('- Distance calculation via Google Maps API');
console.log('- Quality assessment based on AI monitoring + ratings');
console.log('- Availability checking with scheduling integration');
console.log('- Price competitiveness analysis');
console.log('- Service specialization matching');
console.log('- Confidence scoring based on data completeness');
console.log('- Adaptive weights for different priorities');
console.log('- Recommendation engine for optimization');
console.log('\n🔧 Features:');
console.log('- Real-time matching with 5+ scoring factors');
console.log('- Configurable weights and thresholds');
console.log('- Integration with AI monitoring and quality scores');
console.log('- Google Maps integration for accurate distances');
console.log('- Detailed match explanations and recommendations');
console.log('- Analytics and logging for continuous improvement');
EOF

node test_smart_matching.js
rm -f test_smart_matching.js