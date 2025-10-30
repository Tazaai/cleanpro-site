#!/bin/bash

# Analytics API Test Script
# Tests the analytics endpoints for functionality and data aggregation

echo "🧪 Analytics API Test Script"
echo "============================="

# Configuration
BACKEND_URL="https://cleanpro-backend-2a5pka5baa-ew.a.run.app"
LOCAL_URL="http://localhost:8080"

# Use production URL by default, fallback to local if specified
if [ "$1" = "local" ]; then
    BASE_URL=$LOCAL_URL
    echo "🏠 Testing against LOCAL backend: $BASE_URL"
else
    BASE_URL=$BACKEND_URL
    echo "☁️ Testing against PRODUCTION backend: $BASE_URL"
fi

echo "🕐 $(date)"
echo ""

# Test 1: Analytics API Health Check
echo "1️⃣ Testing Analytics Health Endpoint..."
echo "URL: $BASE_URL/api/analytics/health"
echo "Response:"
curl -s "$BASE_URL/api/analytics/health" | jq '.'
echo ""

# Test 2: Analytics Test Endpoint
echo "2️⃣ Testing Analytics Test Endpoint..."
echo "URL: $BASE_URL/api/analytics/test"
echo "Response:"
curl -s "$BASE_URL/api/analytics/test" | jq '.'
echo ""

# Test 3: Analytics Summary (24h)
echo "3️⃣ Testing Analytics Summary (24h)..."
echo "URL: $BASE_URL/api/analytics/summary?timeframe=24h"
echo "Response:"
curl -s "$BASE_URL/api/analytics/summary?timeframe=24h" | jq '.'
echo ""

# Test 4: Analytics Summary (7d - default)
echo "4️⃣ Testing Analytics Summary (7d - default)..."
echo "URL: $BASE_URL/api/analytics/summary"
echo "Response:"
curl -s "$BASE_URL/api/analytics/summary" | jq '.'
echo ""

# Test 5: Service-specific Analytics - AI Monitoring
echo "5️⃣ Testing AI Monitoring Analytics..."
echo "URL: $BASE_URL/api/analytics/service/ai-monitoring?timeframe=7d"
echo "Response:"
curl -s "$BASE_URL/api/analytics/service/ai-monitoring?timeframe=7d" | jq '.'
echo ""

# Test 6: Service-specific Analytics - Email
echo "6️⃣ Testing Email Analytics..."
echo "URL: $BASE_URL/api/analytics/service/email?timeframe=7d"
echo "Response:"
curl -s "$BASE_URL/api/analytics/service/email?timeframe=7d" | jq '.'
echo ""

# Test 7: Service-specific Analytics - Smart Matching
echo "7️⃣ Testing Smart Matching Analytics..."
echo "URL: $BASE_URL/api/analytics/service/smart-matching?timeframe=7d"
echo "Response:"
curl -s "$BASE_URL/api/analytics/service/smart-matching?timeframe=7d" | jq '.'
echo ""

# Test 8: Recent Logs
echo "8️⃣ Testing Recent Logs Endpoint..."
echo "URL: $BASE_URL/api/analytics/logs/recent?limit=5"
echo "Response:"
curl -s "$BASE_URL/api/analytics/logs/recent?limit=5" | jq '.'
echo ""

# Test 9: Error handling - Invalid timeframe
echo "9️⃣ Testing Error Handling (Invalid Timeframe)..."
echo "URL: $BASE_URL/api/analytics/summary?timeframe=invalid"
echo "Response:"
curl -s "$BASE_URL/api/analytics/summary?timeframe=invalid" | jq '.'
echo ""

# Test 10: Error handling - Invalid service
echo "🔟 Testing Error Handling (Invalid Service)..."
echo "URL: $BASE_URL/api/analytics/service/invalid-service"
echo "Response:"
curl -s "$BASE_URL/api/analytics/service/invalid-service" | jq '.'
echo ""

echo "✅ Analytics API testing complete!"
echo ""
echo "📊 Available Analytics Endpoints:"
echo "   GET /api/analytics/summary?timeframe={24h|7d|30d|all}"
echo "   GET /api/analytics/service/{ai-monitoring|email|smart-matching}?timeframe={24h|7d|30d|all}"
echo "   GET /api/analytics/health"
echo "   GET /api/analytics/test"
echo "   GET /api/analytics/logs/recent?limit={number}"
echo ""
echo "🔬 For detailed testing with authentication or CORS issues:"
echo "   bash test_analytics_api.sh local    # Test against local backend"
echo "   bash test_analytics_api.sh          # Test against production"