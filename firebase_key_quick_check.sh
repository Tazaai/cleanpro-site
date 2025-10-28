#!/bin/bash

# firebase_key_quick_check.sh
# Quick Firebase Key Health Check
# Safe validation without exposing sensitive data

echo "🔥 Firebase Key Quick Health Check"
echo "=================================="
echo ""

# Quick production check
echo "🔍 Checking production Firebase status..."
FIREBASE_STATUS=$(curl -s https://cleanpro-backend-5539254765.europe-west1.run.app/debug/firebase)

if echo "$FIREBASE_STATUS" | jq -e .diagnostics > /dev/null 2>&1; then
    FIREBASE_READY=$(echo "$FIREBASE_STATUS" | jq -r '.diagnostics.firebaseReady')
    KEY_LENGTH=$(echo "$FIREBASE_STATUS" | jq -r '.diagnostics.firebaseKeyLength')
    
    echo "📊 Current Status:"
    echo "   Firebase Ready: $FIREBASE_READY"
    echo "   Key Length: $KEY_LENGTH characters"
    echo ""
    
    # Quick assessment
    if [ "$FIREBASE_READY" = "true" ]; then
        echo "✅ Firebase is working correctly!"
        exit 0
    elif [ "$KEY_LENGTH" -lt 2000 ]; then
        echo "❌ Firebase key is too short ($KEY_LENGTH chars)"
        echo "💡 Expected: 2000-3000 characters"
        echo ""
        echo "🔧 Quick Fix:"
        echo "1. Generate new Firebase service account key"
        echo "2. Copy COMPLETE JSON (verify 2000+ chars)"
        echo "3. Update FIREBASE_KEY in GitHub Secrets"
        echo "4. Redeploy"
        exit 1
    else
        echo "⚠️  Firebase key length OK, but connection failed"
        echo "💡 Check Firebase project permissions or rules"
        exit 1
    fi
else
    echo "❌ Cannot connect to backend"
    exit 1
fi