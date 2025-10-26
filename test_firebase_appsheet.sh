#!/bin/bash

echo "🔥 FIREBASE & APPSHEET CONNECTIVITY TEST"
echo "========================================"
echo "Backend URL: https://cleanpro-backend-2a5pka5baa-ew.a.run.app"
echo ""

echo "1️⃣ Firebase Diagnostic..."
echo "========================="
firebase_diag=$(curl -s "https://cleanpro-backend-2a5pka5baa-ew.a.run.app/debug/firebase")
echo "$firebase_diag" | jq . 2>/dev/null || echo "$firebase_diag"
echo ""

echo "2️⃣ Testing Firebase Collections..."
echo "=================================="

echo "📊 Coordination Points Collection:"
coord_response=$(curl -s "https://cleanpro-backend-2a5pka5baa-ew.a.run.app/api/coordination_points")
echo "$coord_response" | jq '.source, .coordinationPoints | length' 2>/dev/null || echo "Failed to parse"
echo ""

echo "💰 Pricing Collection:"
pricing_response=$(curl -s "https://cleanpro-backend-2a5pka5baa-ew.a.run.app/api/pricing")
echo "$pricing_response" | jq '.source // .error' 2>/dev/null || echo "Failed to parse"
echo ""

echo "🏢 Services Collection:"
services_response=$(curl -s "https://cleanpro-backend-2a5pka5baa-ew.a.run.app/api/services")
echo "$services_response" | jq '.source // .error' 2>/dev/null || echo "Failed to parse"
echo ""

echo "3️⃣ Testing AppSheet Integration..."
echo "================================="

echo "📋 AppSheet Config:"
appsheet_config=$(curl -s "https://cleanpro-backend-2a5pka5baa-ew.a.run.app/api/appsheet/config")
echo "$appsheet_config" | jq . 2>/dev/null || echo "$appsheet_config"
echo ""

echo "🧪 AppSheet Test:"
appsheet_test=$(curl -s -X POST "https://cleanpro-backend-2a5pka5baa-ew.a.run.app/api/appsheet/test")
echo "$appsheet_test" | jq . 2>/dev/null || echo "$appsheet_test"
echo ""

echo "📊 CONNECTIVITY SUMMARY"
echo "======================="

# Check Firebase connection
if echo "$firebase_diag" | jq -e '.diagnostics.firebaseReady == true' >/dev/null 2>&1; then
    echo "🔥 Firebase: ✅ Connected"
else
    echo "🔥 Firebase: ❌ Not Connected"
    echo "   📋 Issue: $(echo "$firebase_diag" | jq -r '.diagnostics | tostring' 2>/dev/null || echo "Unknown")"
fi

# Check AppSheet connection
if echo "$appsheet_config" | jq -e '.configured == true' >/dev/null 2>&1; then
    echo "📊 AppSheet: ✅ Configured"
else
    echo "📊 AppSheet: ❌ Not Configured"
fi

# Check data sources
coord_source=$(echo "$coord_response" | jq -r '.source' 2>/dev/null)
if [ "$coord_source" = "database" ]; then
    echo "🗄️ Data Source: ✅ Using Firebase Database"
elif [ "$coord_source" = "fallback" ]; then
    echo "🗄️ Data Source: ⚠️ Using Fallback Data (Firebase issue)"
else
    echo "🗄️ Data Source: ❌ Unknown/Error"
fi

echo ""
echo "🔧 Next Steps if Issues Found:"
echo "- Firebase not connected: Check FIREBASE_KEY in GitHub Secrets"
echo "- AppSheet not configured: Check APPSHEET_API_KEY and APPSHEET_APP_ID"
echo "- Using fallback data: Firebase connection needs to be established"