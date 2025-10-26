#!/bin/bash

# 🧪 Coordination Points API Diagnostic Script
# Tests the coordination points API and provides detailed analysis

BACKEND_URL="https://cleanpro-backend-2a5pka5baa-ew.a.run.app"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

echo "🧪 Coordination Points API Diagnostic"
echo "====================================="
echo "Timestamp: $TIMESTAMP"
echo "Backend URL: $BACKEND_URL"
echo ""

# Test 1: Health Check
echo "1️⃣ Testing Backend Health..."
echo "URL: $BACKEND_URL/health"
echo "Response:"
curl -s "$BACKEND_URL/health" | jq . || echo "❌ Health check failed"
echo ""

# Test 2: Basic Coordination Points API
echo "2️⃣ Testing Coordination Points API..."
echo "URL: $BACKEND_URL/api/coordination_points"
echo "Response:"
curl -s "$BACKEND_URL/api/coordination_points" | jq . || echo "❌ Coordination points API failed"
echo ""

# Test 3: Coordination Points API with Distance Parameters
echo "3️⃣ Testing Coordination Points API with Distance..."
echo "URL: $BACKEND_URL/api/coordination_points?origin=San Francisco, CA&destination=Oakland, CA"
echo "Response:"
curl -s "$BACKEND_URL/api/coordination_points?origin=San%20Francisco,%20CA&destination=Oakland,%20CA" | jq . || echo "❌ Distance calculation failed"
echo ""

# Test 4: Check Available Routes
echo "4️⃣ Testing Available API Routes..."
echo "Testing /api/services:"
curl -s "$BACKEND_URL/api/services" | jq -r '.message // .error // "No response"'
echo "Testing /api/payment:"
curl -s "$BACKEND_URL/api/payment" | jq -r '.message // .error // "No response"'
echo "Testing /api/legal:"
curl -s "$BACKEND_URL/api/legal" | jq -r '.message // .error // "No response"'
echo ""

# Test 5: Firebase Debug (if available)
echo "5️⃣ Testing Firebase Debug Endpoint..."
echo "URL: $BACKEND_URL/debug/firebase"
curl -s "$BACKEND_URL/debug/firebase" | jq . || echo "❌ Firebase debug endpoint not available"
echo ""

echo "📋 Diagnostic complete!"
echo "If coordination points API is failing, check:"
echo "- Firebase initialization in backend logs"
echo "- Service account credentials in GitHub Secrets"  
echo "- Route mounting in backend/index.js"
echo "- Error handling in coordination_points_api.mjs"