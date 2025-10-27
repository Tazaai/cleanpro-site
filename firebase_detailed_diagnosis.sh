#!/bin/bash

# firebase_detailed_diagnosis.sh
# Deep Firebase Key Analysis - Following NO BYPASS POLICY
# Analyzes Firebase key structure, validation, and activation issues

echo "🔥 Firebase Detailed Key Analysis"
echo "================================="
echo "Date: $(date)"
echo ""

# Test production Firebase key validation
echo "🔍 PRODUCTION FIREBASE KEY ANALYSIS"
echo "==================================="

PROD_URL="https://cleanpro-backend-5539254765.europe-west1.run.app"

# Get current diagnostic
echo "📊 Current Production Status:"
PROD_FIREBASE=$(curl -s -m 10 "$PROD_URL/debug/firebase")
echo "$PROD_FIREBASE" | jq '.' 2>/dev/null

# Extract key details
KEY_LENGTH=$(echo "$PROD_FIREBASE" | jq -r '.diagnostics.firebaseKeyLength' 2>/dev/null)
HAS_KEY=$(echo "$PROD_FIREBASE" | jq -r '.diagnostics.hasFirebaseKey' 2>/dev/null)
FIREBASE_READY=$(echo "$PROD_FIREBASE" | jq -r '.diagnostics.firebaseReady' 2>/dev/null)
GCP_PROJECT=$(echo "$PROD_FIREBASE" | jq -r '.diagnostics.gcpProject' 2>/dev/null)

echo ""
echo "🔍 KEY ANALYSIS:"
echo "==============="
echo "Has Firebase Key: $HAS_KEY"
echo "Key Length: $KEY_LENGTH characters"
echo "Firebase Ready: $FIREBASE_READY"
echo "GCP Project: '$GCP_PROJECT'"

# Analyze specific issues
echo ""
echo "🚨 ISSUE ANALYSIS:"
echo "=================="

if [ "$KEY_LENGTH" == "392" ]; then
    echo "❌ ISSUE CONFIRMED: Key length is still 392 characters"
    echo "   This suggests either:"
    echo "   1. New key was not properly deployed to Cloud Run"
    echo "   2. GitHub Secrets update didn't trigger redeployment"
    echo "   3. Cache issue in Cloud Run container"
    echo ""
    echo "🔧 DEPLOYMENT STATUS CHECK:"
    echo "   - Check GitHub Actions: Did deployment run after updating FIREBASE_KEY?"
    echo "   - Check Cloud Run: Was container rebuilt with new environment variables?"
    echo ""
elif [ "$KEY_LENGTH" -gt 1500 ]; then
    echo "✅ Key length looks correct ($KEY_LENGTH chars)"
    echo "   Issue might be with key content or format"
else
    echo "⚠️ Key length is unexpected: $KEY_LENGTH chars"
fi

# Check if redeployment is needed
echo ""
echo "🚀 DEPLOYMENT VERIFICATION:"
echo "=========================="

# Check latest GitHub Actions run
echo "💡 ACTION ITEMS:"
echo "1. Verify FIREBASE_KEY was updated in GitHub Secrets"
echo "2. Check GitHub Actions tab for recent deployment after key update"
echo "3. If no deployment ran, manually trigger deployment:"
echo "   git commit --allow-empty -m 'Trigger deployment for Firebase key update'"
echo "   git push origin main"
echo ""

# Test if we can make a test API call to validate the key structure
echo "🧪 FIREBASE KEY STRUCTURE TEST:"
echo "==============================="

# Try to get more detailed error from a Firebase operation
echo "Testing Firebase connectivity with a simple operation..."
FIREBASE_TEST=$(curl -s -m 10 "$PROD_URL/api/adminsheet/health" 2>/dev/null)
echo "AdminSheet Health Response:"
echo "$FIREBASE_TEST" | jq '.' 2>/dev/null || echo "$FIREBASE_TEST"

if echo "$FIREBASE_TEST" | grep -q "Unable to detect a Project Id"; then
    echo ""
    echo "❌ IDENTIFIED ISSUE: Project ID Detection Failed"
    echo "   This indicates the Firebase service account JSON is malformed"
    echo "   or missing required fields"
    echo ""
    echo "🔧 FIREBASE KEY REQUIREMENTS:"
    echo "   The service account JSON must contain:"
    echo "   - type: 'service_account'"
    echo "   - project_id: 'your-project-id'"
    echo "   - private_key_id: '...'"
    echo "   - private_key: '-----BEGIN PRIVATE KEY-----...'"
    echo "   - client_email: '...@your-project.iam.gserviceaccount.com'"
    echo "   - client_id: '...'"
    echo "   - auth_uri: 'https://accounts.google.com/o/oauth2/auth'"
    echo "   - token_uri: 'https://oauth2.googleapis.com/token'"
elif echo "$FIREBASE_TEST" | grep -q "credentials"; then
    echo ""
    echo "❌ CREDENTIALS ISSUE: Firebase authentication problem"
    echo "   The key might be present but invalid or expired"
fi

echo ""
echo "🎯 NEXT STEPS DIAGNOSIS:"
echo "======================="
echo "1. 🔍 Check GitHub Actions for recent deployments"
echo "2. 🔄 If no deployment after key update, trigger manual deployment"
echo "3. 📋 If deployment ran but still 392 chars, check key content"
echo "4. 🔥 Verify Firebase service account permissions and activation"
echo ""

# Check recent GitHub Actions
echo "📊 GITHUB ACTIONS CHECK:"
echo "========================"
echo "Go to: https://github.com/Tazaai/cleanpro-site/actions"
echo "Look for workflows that ran AFTER you updated FIREBASE_KEY"
echo "If no recent deployments, the key update didn't trigger redeployment"
echo ""

echo "🔧 MANUAL DEPLOYMENT TRIGGER:"
echo "============================="
echo "cd /workspaces/cleanpro-site"
echo "git commit --allow-empty -m 'fix: trigger deployment for Firebase key update'"
echo "git push origin main"
echo ""

echo "⚠️ IMPORTANT: Following PROJECT_GUIDE.md NO BYPASS POLICY"
echo "- Fix root cause before proceeding with AdminSheet implementation"
echo "- No temporary workarounds"
echo "- Comprehensive validation after fix"