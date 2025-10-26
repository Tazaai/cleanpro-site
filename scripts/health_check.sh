#!/bin/bash

# =============================================================
# 🩺 Production Health Check Script
# =============================================================
# This script runs comprehensive health checks before deployment
# to ensure system stability and prevent downtime.

set -e

echo "🩺 PRODUCTION HEALTH CHECK"
echo "=========================="
echo ""

# Configuration
BACKEND_URL="https://cleanpro-backend-2a5pka5baa-ew.a.run.app"
FRONTEND_URL="https://cleanpro-frontend-2a5pka5baa-ew.a.run.app"
TIMEOUT=10

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Track overall status
OVERALL_STATUS=0

# Helper function for status reporting
check_status() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ $2${NC}"
    else
        echo -e "${RED}❌ $2${NC}"
        OVERALL_STATUS=1
    fi
}

# Helper function for warnings
warn_status() {
    echo -e "${YELLOW}⚠️ $1${NC}"
}

# 1. Backend Health Check
echo "🔧 Backend Health Check:"
echo "========================"
backend_health=$(curl -s --max-time $TIMEOUT "$BACKEND_URL/health" || echo '{"ok":false}')
backend_ok=$(echo "$backend_health" | jq -r '.ok // false' 2>/dev/null || echo "false")

if [ "$backend_ok" = "true" ]; then
    check_status 0 "Backend health endpoint responsive"
else
    check_status 1 "Backend health endpoint failed"
fi

# 2. Frontend Health Check
echo ""
echo "🎨 Frontend Health Check:"
echo "========================="
frontend_status=$(curl -s -o /dev/null -w "%{http_code}" --max-time $TIMEOUT "$FRONTEND_URL/" || echo "000")

if [ "$frontend_status" = "200" ]; then
    check_status 0 "Frontend loading (HTTP $frontend_status)"
else
    check_status 1 "Frontend failed (HTTP $frontend_status)"
fi

# 3. API Endpoints Check
echo ""
echo "📡 API Endpoints Check:"
echo "======================"

# Coordination Points API
coord_result=$(curl -s --max-time $TIMEOUT "$BACKEND_URL/api/coordination_points" || echo '{"ok":false}')
coord_ok=$(echo "$coord_result" | jq -r '.ok // false' 2>/dev/null || echo "false")
coord_error=$(echo "$coord_result" | jq -r '.error // ""' 2>/dev/null || echo "")

if [ "$coord_ok" = "true" ]; then
    coord_count=$(echo "$coord_result" | jq -r '.coordinationPoints | length // (.hqs | length) // 0' 2>/dev/null || echo "0")
    check_status 0 "Coordination Points API ($coord_count points)"
else
    check_status 1 "Coordination Points API failed: $coord_error"
fi

# Pricing API
price_result=$(curl -s --max-time $TIMEOUT -X POST "$BACKEND_URL/api/bookings/preview" \
    -H "Content-Type: application/json" \
    -d '{"service": "basic", "sqMeters": 100, "distance": 5}' || echo '{"ok":false}')
price_ok=$(echo "$price_result" | jq -r '.ok // false' 2>/dev/null || echo "false")

if [ "$price_ok" = "true" ]; then
    price_value=$(echo "$price_result" | jq -r '.price // "N/A"' 2>/dev/null || echo "N/A")
    check_status 0 "Pricing API (sample price: \$${price_value})"
else
    price_error=$(echo "$price_result" | jq -r '.error // "Unknown error"' 2>/dev/null || echo "Unknown error")
    check_status 1 "Pricing API failed: $price_error"
fi

# 4. Google Maps Integration Check
echo ""
echo "🗺️ Google Maps Integration:"
echo "==========================="
frontend_content=$(curl -s --max-time $TIMEOUT "$FRONTEND_URL/" || echo "")
maps_count=$(echo "$frontend_content" | grep -c "maps.googleapis.com" || echo "0")

if [ "$maps_count" -gt "0" ]; then
    check_status 0 "Google Maps API integration found"
    api_key_present=$(echo "$frontend_content" | grep -o "key=[^&'\"]*" | head -1 || echo "")
    if [ -n "$api_key_present" ]; then
        check_status 0 "Google Maps API key present"
    else
        warn_status "Google Maps API key not detected in frontend"
    fi
else
    check_status 1 "Google Maps API integration missing"
fi

# 5. Database Connectivity (via API)
echo ""
echo "🗄️ Database Connectivity:"
echo "========================="
# Test through coordination points since it requires DB access
if [ "$coord_ok" = "true" ]; then
    check_status 0 "Database accessible via API"
else
    if [[ "$coord_error" == *"Firebase"* ]]; then
        check_status 1 "Database connection failed (Firebase issue)"
    else
        warn_status "Database status unclear"
    fi
fi

# 6. Security Headers Check
echo ""
echo "🛡️ Security Headers:"
echo "===================="
security_headers=$(curl -s -I --max-time $TIMEOUT "$FRONTEND_URL/" | grep -i "content-security-policy\|x-frame-options\|x-content-type-options" | wc -l || echo "0")

if [ "$security_headers" -gt "0" ]; then
    check_status 0 "Security headers present ($security_headers found)"
else
    warn_status "No security headers detected"
fi

# Final Summary
echo ""
echo "📊 HEALTH CHECK SUMMARY:"
echo "========================"

if [ $OVERALL_STATUS -eq 0 ]; then
    echo -e "${GREEN}🎉 ALL CRITICAL SYSTEMS OPERATIONAL${NC}"
    echo -e "${GREEN}✅ SAFE TO DEPLOY${NC}"
    exit 0
else
    echo -e "${RED}⚠️ CRITICAL ISSUES DETECTED${NC}"
    echo -e "${RED}❌ DEPLOYMENT NOT RECOMMENDED${NC}"
    echo ""
    echo "Please fix the above issues before deploying."
    exit 1
fi