#!/bin/bash

echo "🔍 DETAILED FIREBASE DIAGNOSTIC"
echo "==============================="

echo "🔥 1. Firebase Environment Check:"
echo "================================="
curl -s "https://cleanpro-backend-2a5pka5baa-ew.a.run.app/debug/firebase" | jq '.diagnostics' 2>/dev/null

echo ""
echo "🔧 2. Test Firebase Data Access:"
echo "==============================="

echo "📊 Testing coordination_points collection directly:"
coord_test=$(curl -s "https://cleanpro-backend-2a5pka5baa-ew.a.run.app/api/coordination_points")
echo "Source: $(echo "$coord_test" | jq -r '.source')"
echo "Message: $(echo "$coord_test" | jq -r '.message')"
echo "Count: $(echo "$coord_test" | jq -r '.count')"

echo ""
echo "💰 Testing pricing collection:"
pricing_test=$(curl -s "https://cleanpro-backend-2a5pka5baa-ew.a.run.app/api/pricing")
echo "Pricing API status: $(echo "$pricing_test" | jq -r '.ok // .error')"

echo ""
echo "🔥 3. Firebase Initialization Status:"
echo "===================================="
health_check=$(curl -s "https://cleanpro-backend-2a5pka5baa-ew.a.run.app/health")
echo "Health check firebase status: $(echo "$health_check" | jq -r '.firebase')"

echo ""
echo "🧭 4. Expected vs Actual:"
echo "========================="
echo "❓ Expected: Firebase should be connected to real Firestore database"
echo "❓ Expected: Should see coordination points from Firestore, not fallback"
echo "❓ Actual: Firebase shows ready=false, using fallback data"
echo ""
echo "🚫 ROOT CAUSE: Firebase initialization is failing in Cloud Run environment"
echo "💡 SOLUTION NEEDED: Fix Firebase connection before proceeding with more APIs"