#!/bin/bash

# firebase_key_automated_validator.sh
# Automated Firebase Key Validation & Diagnostic Tool
# SECURE: No sensitive data exposure, just validation checks

set -e

echo "🔥 Firebase Key Automated Validator"
echo "===================================="
echo "$(date)"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Counter for issues found
ISSUES_FOUND=0

# Function to log issues
log_issue() {
    echo -e "${RED}❌ ISSUE: $1${NC}"
    ((ISSUES_FOUND++))
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

echo "🔍 STEP 1: Production Firebase Status Check"
echo "============================================"

# Check production Firebase status
FIREBASE_STATUS=$(curl -s https://cleanpro-backend-5539254765.europe-west1.run.app/debug/firebase 2>/dev/null || echo '{"error": "connection_failed"}')

if echo "$FIREBASE_STATUS" | jq -e .diagnostics > /dev/null 2>&1; then
    FIREBASE_READY=$(echo "$FIREBASE_STATUS" | jq -r '.diagnostics.firebaseReady')
    HAS_KEY=$(echo "$FIREBASE_STATUS" | jq -r '.diagnostics.hasFirebaseKey')
    KEY_LENGTH=$(echo "$FIREBASE_STATUS" | jq -r '.diagnostics.firebaseKeyLength')
    GCP_PROJECT=$(echo "$FIREBASE_STATUS" | jq -r '.diagnostics.gcpProject' | tr -d '\n')
    
    log_info "Production Firebase Status Retrieved"
    echo "   Firebase Ready: $FIREBASE_READY"
    echo "   Has Firebase Key: $HAS_KEY"
    echo "   Key Length: $KEY_LENGTH characters"
    echo "   GCP Project: $GCP_PROJECT"
    echo ""
    
    # Validate key length
    if [ "$KEY_LENGTH" -lt 2000 ]; then
        log_issue "Firebase key too short ($KEY_LENGTH chars). Expected: 2000-3000 chars"
        log_warning "Key appears truncated when copied to GitHub Secrets"
    else
        log_success "Firebase key length is adequate ($KEY_LENGTH chars)"
    fi
    
    # Validate Firebase ready status
    if [ "$FIREBASE_READY" = "false" ]; then
        log_issue "Firebase not ready in production"
    else
        log_success "Firebase is ready and connected"
    fi
    
else
    log_issue "Cannot connect to production backend for Firebase status"
    echo "$FIREBASE_STATUS"
fi

echo ""
echo "🔍 STEP 2: Local Environment Check"
echo "=================================="

# Check if we're in local development
if [ -f ".env.local" ]; then
    log_info "Local .env.local file found"
    if grep -q "FIREBASE_KEY" .env.local; then
        LOCAL_KEY_LENGTH=$(grep "FIREBASE_KEY" .env.local | cut -d'=' -f2- | wc -c)
        echo "   Local Firebase key length: $((LOCAL_KEY_LENGTH - 1)) characters"
        if [ $LOCAL_KEY_LENGTH -lt 2000 ]; then
            log_warning "Local Firebase key also appears short"
        else
            log_success "Local Firebase key length looks good"
        fi
    else
        log_warning "FIREBASE_KEY not found in .env.local"
    fi
else
    log_info "No .env.local file (normal for production deployment)"
fi

echo ""
echo "🔍 STEP 3: Firebase Key Format Validation Checklist"
echo "==================================================="

echo "📋 Your Firebase service account JSON should contain:"
echo ""

REQUIRED_FIELDS=(
    "type"
    "project_id" 
    "private_key_id"
    "private_key"
    "client_email"
    "client_id"
    "auth_uri"
    "token_uri"
)

for field in "${REQUIRED_FIELDS[@]}"; do
    echo "   ✅ \"$field\": \"...\""
done

echo ""
echo "🔍 STEP 4: Common Issues & Auto-Detection"
echo "========================================="

# Check for common patterns that indicate issues
if [ "$KEY_LENGTH" -eq 392 ]; then
    log_issue "Exact length 392 chars indicates specific truncation pattern"
    echo "   💡 This usually happens when copying incomplete JSON to GitHub Secrets"
fi

if [ "$KEY_LENGTH" -lt 500 ]; then
    log_issue "Key is definitely incomplete (< 500 chars)"
    echo "   💡 A complete service account JSON is typically 2000-3000 characters"
fi

if [ "$FIREBASE_READY" = "false" ] && [ "$HAS_KEY" = "true" ]; then
    log_issue "Key exists but Firebase initialization failed"
    echo "   💡 This indicates malformed or incomplete JSON"
fi

echo ""
echo "🔍 STEP 5: Backend Health Check"
echo "==============================="

BACKEND_HEALTH=$(curl -s https://cleanpro-backend-5539254765.europe-west1.run.app/ 2>/dev/null || echo "connection_failed")

if echo "$BACKEND_HEALTH" | grep -q "CleanPro Backend is running"; then
    log_success "Backend is running and accessible"
else
    log_issue "Backend health check failed"
    echo "   Response: $BACKEND_HEALTH"
fi

echo ""
echo "🔍 STEP 6: Firebase Fallback Data Check"
echo "======================================="

COORD_POINTS=$(curl -s https://cleanpro-backend-5539254765.europe-west1.run.app/api/coordination_points 2>/dev/null || echo "failed")

if echo "$COORD_POINTS" | jq -e '.data[0].source' > /dev/null 2>&1; then
    DATA_SOURCE=$(echo "$COORD_POINTS" | jq -r '.data[0].source')
    if [ "$DATA_SOURCE" = "fallback" ]; then
        log_warning "API using fallback data (Firebase connection issue)"
    elif [ "$DATA_SOURCE" = "firestore" ]; then
        log_success "API using live Firestore data"
    else
        log_info "API data source: $DATA_SOURCE"
    fi
else
    log_issue "Cannot retrieve coordination points data"
fi

echo ""
echo "📊 VALIDATION SUMMARY"
echo "====================="

if [ $ISSUES_FOUND -eq 0 ]; then
    log_success "No critical issues found! Firebase setup appears correct."
else
    echo -e "${RED}❌ Found $ISSUES_FOUND issue(s) that need attention${NC}"
fi

echo ""
echo "🔧 NEXT STEPS"
echo "============="

if [ $ISSUES_FOUND -gt 0 ]; then
    echo "1. 🔑 Generate a NEW Firebase service account key:"
    echo "   → Go to: https://console.firebase.google.com/project/cleanpro-site/settings/serviceaccounts/adminsdk"
    echo "   → Click 'Generate new private key'"
    echo "   → Download the JSON file"
    echo ""
    echo "2. 📋 Copy the COMPLETE JSON content:"
    echo "   → Open the downloaded .json file"
    echo "   → Copy ALL content (should be 2000+ characters)"
    echo "   → Verify it starts with {\"type\":\"service_account\" and ends with }"
    echo ""
    echo "3. 🔒 Update GitHub Secret:"
    echo "   → Go to: https://github.com/Tazaai/cleanpro-site/settings/secrets/actions"
    echo "   → Click 'FIREBASE_KEY' → 'Update'"
    echo "   → Paste the complete JSON (verify character count before saving)"
    echo ""
    echo "4. 🚀 Redeploy:"
    echo "   → Push any commit to trigger new deployment"
    echo "   → Run this script again to verify the fix"
else
    echo "✅ Firebase setup looks good!"
    echo "💡 If you're still experiencing issues, they may be related to:"
    echo "   - Firebase project permissions"
    echo "   - Firestore database rules"
    echo "   - Network connectivity"
fi

echo ""
echo "🔒 SECURITY REMINDER:"
echo "====================="
echo "❌ NEVER paste your Firebase key in chat or logs"
echo "❌ NEVER commit Firebase keys to git repositories"
echo "✅ ONLY use GitHub Secrets for sensitive credentials"
echo "✅ Use this script to validate without exposing data"

echo ""
echo "📝 Script completed at $(date)"
echo "🔄 Run this script after making changes to verify fixes"