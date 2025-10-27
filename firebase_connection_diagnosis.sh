#!/bin/bash

# firebase_connection_diagnosis.sh
# Comprehensive Firebase Connection Diagnosis
# Following PROJECT_GUIDE.md NO BYPASS POLICY - Permanent Solutions Only

echo "🔥 Firebase Connection Comprehensive Diagnosis"
echo "=============================================="
echo "Date: $(date)"
echo ""

# Test local Firebase connection
echo "🏠 LOCAL ENVIRONMENT TESTING"
echo "============================="

# Check if backend is running
if curl -s http://localhost:8080/health >/dev/null 2>&1; then
    echo "✅ Backend server is running locally"
    
    # Test Firebase diagnostic endpoint
    echo "🔍 Firebase Local Diagnostic:"
    LOCAL_FIREBASE=$(curl -s http://localhost:8080/debug/firebase)
    echo "$LOCAL_FIREBASE" | jq '.' 2>/dev/null || echo "$LOCAL_FIREBASE"
    
    # Parse the results
    if echo "$LOCAL_FIREBASE" | grep -q '"firebaseReady":true'; then
        echo "✅ Local Firebase connection: WORKING"
    else
        echo "❌ Local Firebase connection: FAILED"
    fi
    
    if echo "$LOCAL_FIREBASE" | grep -q '"hasFirebaseKey":false'; then
        echo "✅ Local using ADC (Application Default Credentials): CORRECT"
    else
        echo "⚠️  Local using FIREBASE_KEY instead of ADC"
    fi
else
    echo "❌ Backend server not running locally"
    echo "💡 Start with: cd backend && npm start"
fi

echo ""
echo "☁️  PRODUCTION ENVIRONMENT TESTING"
echo "================================="

# Test production endpoint
PROD_URL="https://cleanpro-backend-5539254765.europe-west1.run.app"
echo "🌍 Testing production URL: $PROD_URL"

if curl -s -m 10 "$PROD_URL/health" >/dev/null 2>&1; then
    echo "✅ Production server is accessible"
    
    # Test Firebase diagnostic endpoint in production
    echo "🔍 Firebase Production Diagnostic:"
    PROD_FIREBASE=$(curl -s -m 10 "$PROD_URL/debug/firebase")
    echo "$PROD_FIREBASE" | jq '.' 2>/dev/null || echo "$PROD_FIREBASE"
    
    # Parse the results
    if echo "$PROD_FIREBASE" | grep -q '"firebaseReady":true'; then
        echo "✅ Production Firebase connection: WORKING"
    else
        echo "❌ Production Firebase connection: FAILED"
    fi
    
    if echo "$PROD_FIREBASE" | grep -q '"hasFirebaseKey":true'; then
        echo "✅ Production has FIREBASE_KEY: PRESENT"
        
        # Check Firebase key length
        KEY_LENGTH=$(echo "$PROD_FIREBASE" | jq -r '.diagnostics.firebaseKeyLength' 2>/dev/null)
        if [ "$KEY_LENGTH" != "null" ] && [ "$KEY_LENGTH" != "" ]; then
            echo "📊 Firebase key length: $KEY_LENGTH characters"
            
            if [ "$KEY_LENGTH" -lt 1000 ]; then
                echo "❌ CRITICAL: Firebase key is too short ($KEY_LENGTH chars)"
                echo "   Expected: 2000+ characters for complete service account JSON"
                echo "   Issue: FIREBASE_KEY in GitHub Secrets is truncated"
            elif [ "$KEY_LENGTH" -gt 2000 ]; then
                echo "✅ Firebase key length looks correct ($KEY_LENGTH chars)"
            else
                echo "⚠️  Firebase key length is borderline ($KEY_LENGTH chars)"
            fi
        fi
    else
        echo "❌ Production FIREBASE_KEY: MISSING"
        echo "   Issue: FIREBASE_KEY not present in production environment"
    fi
else
    echo "❌ Production server not accessible"
    echo "   This could indicate deployment issues"
fi

echo ""
echo "🔧 SOLUTION RECOMMENDATIONS"
echo "=========================="

# Check local Firebase key length if present
if [ -n "$FIREBASE_KEY" ]; then
    LOCAL_KEY_LENGTH=${#FIREBASE_KEY}
    echo "📊 Local FIREBASE_KEY length: $LOCAL_KEY_LENGTH characters"
else
    echo "📊 Local FIREBASE_KEY: Not set (using ADC - correct for development)"
fi

echo ""
echo "🎯 ROOT CAUSE ANALYSIS:"
echo "======================="

# Analyze the issue
if echo "$PROD_FIREBASE" | grep -q '"firebaseReady":false'; then
    echo "❌ Production Firebase connection failed"
    
    KEY_LENGTH=$(echo "$PROD_FIREBASE" | jq -r '.diagnostics.firebaseKeyLength' 2>/dev/null)
    if [ "$KEY_LENGTH" != "null" ] && [ "$KEY_LENGTH" -lt 1000 ]; then
        echo ""
        echo "🚨 CONFIRMED ISSUE: FIREBASE_KEY TRUNCATION"
        echo "========================================="
        echo "Problem: FIREBASE_KEY in GitHub Secrets is truncated"
        echo "Current length: $KEY_LENGTH characters"
        echo "Expected length: 2000+ characters"
        echo ""
        echo "🔧 REQUIRED ACTIONS:"
        echo "1. Go to GitHub Repository → Settings → Secrets and variables → Actions"
        echo "2. Delete the current FIREBASE_KEY secret"
        echo "3. Download the complete service account JSON from Firebase Console:"
        echo "   - Go to https://console.firebase.google.com/"
        echo "   - Project Settings → Service Accounts"
        echo "   - Generate new private key → Download JSON"
        echo "4. Copy the ENTIRE JSON content (2000+ characters)"
        echo "5. Create new FIREBASE_KEY secret with the complete JSON"
        echo "6. Redeploy the application"
        echo ""
        echo "⚠️  CRITICAL: The JSON must be complete and unmodified"
    else
        echo "Issue: Unknown Firebase connection problem"
        echo "The key length appears correct but connection still fails"
    fi
else
    echo "✅ Firebase connection analysis complete"
fi

echo ""
echo "📋 NEXT STEPS SUMMARY:"
echo "====================="
echo "1. 🔥 Fix FIREBASE_KEY in GitHub Secrets (if truncated)"
echo "2. 🚀 Redeploy application after fixing the key"
echo "3. 🧪 Re-run this diagnostic to verify the fix"
echo "4. ✅ Continue with AdminSheet API implementation once Firebase is working"
echo ""
echo "💡 Following PROJECT_GUIDE.md NO BYPASS POLICY:"
echo "   - Permanent solutions only"
echo "   - Fix root cause before proceeding"
echo "   - No temporary workarounds"