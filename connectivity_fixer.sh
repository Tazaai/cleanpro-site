#!/bin/bash

echo "🔧 FIREBASE & APPSHEET CONNECTION FIXER"
echo "======================================="
echo ""

echo "📋 CURRENT ISSUES IDENTIFIED:"
echo "============================="
echo "🔥 Firebase: Has FIREBASE_KEY but firebaseReady=false in production"
echo "📊 AppSheet: Endpoints now mounted but secrets not configured"  
echo "🗄️ Data: Using fallback data instead of real Firebase collections"
echo ""

echo "🔍 STEP 1: Test Current Connectivity"
echo "===================================="

# Test production Firebase status
echo "🔥 Production Firebase Status:"
firebase_status=$(curl -s "https://cleanpro-backend-2a5pka5baa-ew.a.run.app/debug/firebase" | jq -r '.diagnostics.firebaseReady')
echo "Firebase Ready: $firebase_status"

if [ "$firebase_status" = "false" ]; then
    echo "❌ FIREBASE CONNECTION FAILED"
    echo ""
    echo "💡 LIKELY CAUSES:"
    echo "1. FIREBASE_KEY JSON format issue in GitHub Secrets"
    echo "2. Missing required fields in service account JSON"  
    echo "3. Newline/encoding problems in secret storage"
    echo ""
    echo "🔧 REQUIRED ACTIONS:"
    echo "1. Verify FIREBASE_KEY in GitHub Secrets is valid JSON"
    echo "2. Ensure service account has Firestore permissions"
    echo "3. Check for newline characters breaking JSON parsing"
    echo ""
else
    echo "✅ Firebase Connected"
fi

# Test AppSheet API availability
echo "📊 AppSheet API Status:"
appsheet_config=$(curl -s "https://cleanpro-backend-2a5pka5baa-ew.a.run.app/api/appsheet/config" | jq -r '.ok // .error')
echo "AppSheet Config: $appsheet_config"

if [ "$appsheet_config" = "false" ] || [ "$appsheet_config" = "Endpoint not found" ]; then
    echo "❌ APPSHEET API ISSUES"
    echo ""
    echo "💡 REQUIRED ACTIONS:"
    echo "1. Set APPSHEET_API_KEY in GitHub Secrets"
    echo "2. Set APPSHEET_APP_ID in GitHub Secrets"
    echo "3. Configure AppSheet app with proper table structure"
    echo ""
else
    echo "✅ AppSheet API Available"
fi

echo "🗄️ STEP 2: Data Structure Analysis"
echo "=================================="

echo "📊 Current Data Sources:"
coord_source=$(curl -s "https://cleanpro-backend-2a5pka5baa-ew.a.run.app/api/coordination_points" | jq -r '.source')
echo "Coordination Points: $coord_source"

pricing_data=$(curl -s "https://cleanpro-backend-2a5pka5baa-ew.a.run.app/api/pricing" | jq -r '.ok // .error')
echo "Pricing Data: $pricing_data"

services_data=$(curl -s "https://cleanpro-backend-2a5pka5baa-ew.a.run.app/api/services" | jq -r '.ok // .error')  
echo "Services Data: $services_data"

if [ "$coord_source" = "fallback" ]; then
    echo ""
    echo "⚠️ USING FALLBACK DATA - FIREBASE NOT CONNECTED"
    echo "This means we're not accessing real business data!"
    echo ""
    echo "🎯 PRIORITY: Fix Firebase connection to access real data"
fi

echo ""
echo "🚀 STEP 3: Next Actions Required"
echo "================================"
echo "1. 🔥 Fix FIREBASE_KEY format in GitHub Secrets"
echo "2. 📊 Configure APPSHEET_API_KEY and APPSHEET_APP_ID"  
echo "3. 🗄️ Establish real data connections before API fixes"
echo "4. 🧪 Validate data structure and business logic"
echo ""
echo "🚫 DO NOT PROCEED with more API fixes until connections established"
echo "📋 Focus on data connectivity first, then API functionality"