#!/bin/bash

echo "🔥 FIREBASE CONNECTION DIAGNOSIS & FIX"
echo "===================================="
echo ""

echo "📊 CURRENT STATUS ANALYSIS:"
echo "=========================="

# Get current Firebase diagnostic
firebase_diag=$(curl -s "https://cleanpro-backend-2a5pka5baa-ew.a.run.app/debug/firebase")
echo "🔍 Production Firebase Status:"
echo "$firebase_diag" | jq '.diagnostics' 2>/dev/null

# Extract key information
firebase_ready=$(echo "$firebase_diag" | jq -r '.diagnostics.firebaseReady')
has_key=$(echo "$firebase_diag" | jq -r '.diagnostics.hasFirebaseKey')
key_length=$(echo "$firebase_diag" | jq -r '.diagnostics.firebaseKeyLength')
gcp_project=$(echo "$firebase_diag" | jq -r '.diagnostics.gcpProject')

echo ""
echo "📋 ANALYSIS RESULTS:"
echo "==================="
echo "🔑 Has Firebase Key: $has_key"
echo "📏 Key Length: $key_length characters"
echo "🚀 Firebase Ready: $firebase_ready"
echo "📂 GCP Project: $gcp_project"

echo ""
echo "🚨 PROBLEM IDENTIFICATION:"
echo "========================="

if [ "$has_key" = "true" ] && [ "$firebase_ready" = "false" ]; then
    echo "❌ FIREBASE_KEY EXISTS BUT CONNECTION FAILED"
    echo ""
    echo "💡 LIKELY CAUSES:"
    echo "1. 🔍 JSON format issue - newlines, escaping, or malformed JSON"
    echo "2. 🔐 Missing required fields in service account JSON"
    echo "3. 📋 Base64 encoding problems"
    echo "4. 🏗️ Project ID mismatch or permissions issue"
    echo ""
    
    if [ "$key_length" -lt "500" ]; then
        echo "⚠️ KEY LENGTH SUSPICIOUSLY SHORT ($key_length chars)"
        echo "   A full Firebase service account JSON is typically 2000+ characters"
        echo "   This suggests the key might be truncated or incomplete"
    fi
    
    echo "🔧 RECOMMENDED FIXES:"
    echo "===================="
    echo "1. 📥 Download fresh service account JSON from Firebase Console"
    echo "2. 🔍 Validate JSON format with: cat service-account.json | jq ."
    echo "3. 📋 Copy entire JSON content (including newlines) to GitHub Secrets"
    echo "4. 🚫 DO NOT base64 encode - paste raw JSON directly"
    echo "5. ✅ Ensure service account has 'Firebase Admin SDK Admin Service Agent' role"
    echo ""
    
elif [ "$has_key" = "false" ]; then
    echo "❌ FIREBASE_KEY NOT FOUND IN ENVIRONMENT"
    echo "   Check GitHub Secrets configuration"
    echo ""
    
elif [ "$firebase_ready" = "true" ]; then
    echo "✅ FIREBASE CONNECTION WORKING"
    echo "   No action needed for Firebase"
    echo ""
else
    echo "❓ UNKNOWN STATE - Need manual investigation"
fi

echo "🔍 NEXT STEPS:"
echo "============="
echo "1. 🔧 Fix FIREBASE_KEY in GitHub repository secrets"
echo "2. 🚀 Deploy to test Firebase connection"
echo "3. ✅ Verify firebaseReady becomes true"
echo "4. 🗄️ Test real data access vs fallback"
echo ""

echo "📋 TO FIX FIREBASE_KEY:"
echo "======================"
echo "1. Go to GitHub → Repository → Settings → Secrets and variables → Actions"
echo "2. Edit FIREBASE_KEY secret"
echo "3. Paste complete, unmodified JSON from Firebase Console"
echo "4. Save and trigger new deployment"
echo ""

echo "🧪 VERIFY FIX WITH:"
echo "=================="
echo "curl -s 'https://cleanpro-backend-2a5pka5baa-ew.a.run.app/debug/firebase' | jq '.diagnostics.firebaseReady'"
echo "Should return: true"