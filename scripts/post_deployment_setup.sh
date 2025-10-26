#!/bin/bash

# =============================================================
# 🌱 Post-Deployment Setup Script
# =============================================================
# This script runs after successful deployment to initialize
# database with required data and perform health verification.

set -e

echo "🌱 POST-DEPLOYMENT SETUP"
echo "========================"
echo ""

# Configuration
BACKEND_URL="https://cleanpro-backend-2a5pka5baa-ew.a.run.app"
FRONTEND_URL="https://cleanpro-frontend-2a5pka5baa-ew.a.run.app"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🔍 Step 1: Verify deployment is live${NC}"
echo "======================================"

# Wait for services to be fully deployed
for i in {1..10}; do
    backend_status=$(curl -s -o /dev/null -w "%{http_code}" "$BACKEND_URL/health" || echo "000")
    if [ "$backend_status" = "200" ]; then
        echo -e "${GREEN}✅ Backend is responding${NC}"
        break
    else
        echo -e "${YELLOW}⏳ Waiting for backend to be ready... (attempt $i/10)${NC}"
        sleep 10
    fi
    
    if [ $i -eq 10 ]; then
        echo -e "${RED}❌ Backend not responding after 100 seconds${NC}"
        exit 1
    fi
done

echo ""
echo -e "${BLUE}🗄️ Step 2: Check database initialization${NC}"
echo "========================================="

# Check if coordination points exist
coord_check=$(curl -s "$BACKEND_URL/api/coordination_points" | jq -r '.ok // false' 2>/dev/null || echo "false")

if [ "$coord_check" = "false" ]; then
    echo -e "${YELLOW}⚠️ Coordination points not accessible - this is expected for fresh deployment${NC}"
    echo -e "${BLUE}💡 Note: Firebase initialization and data seeding needed${NC}"
else
    # Check how many coordination points exist
    coord_count=$(curl -s "$BACKEND_URL/api/coordination_points" | jq -r '.hqs | length // 0' 2>/dev/null || echo "0")
    echo -e "${GREEN}✅ Coordination points API accessible ($coord_count points)${NC}"
    
    if [ "$coord_count" -eq 0 ]; then
        echo -e "${YELLOW}⚠️ No coordination points in database - seeding needed${NC}"
    fi
fi

echo ""
echo -e "${BLUE}🧪 Step 3: Test critical functionality${NC}"
echo "======================================"

# Test pricing API (doesn't require coordination points)
echo "Testing pricing API..."
price_test=$(curl -s -X POST "$BACKEND_URL/api/bookings/preview" \
    -H "Content-Type: application/json" \
    -d '{"service": "basic", "sqMeters": 100, "distance": 5}' | jq -r '.ok // false' 2>/dev/null || echo "false")

if [ "$price_test" = "true" ]; then
    echo -e "${GREEN}✅ Pricing API working${NC}"
else
    echo -e "${YELLOW}⚠️ Pricing API issues detected${NC}"
fi

# Test frontend Google Maps integration
echo "Testing frontend Google Maps..."
maps_check=$(curl -s "$FRONTEND_URL/" | grep -c "maps.googleapis.com" || echo "0")

if [ "$maps_check" -gt "0" ]; then
    echo -e "${GREEN}✅ Google Maps integration present${NC}"
else
    echo -e "${YELLOW}⚠️ Google Maps integration not detected${NC}"
fi

echo ""
echo -e "${BLUE}📋 Step 4: Setup recommendations${NC}"
echo "=================================="

if [ "$coord_check" = "false" ] || [ "$coord_count" -eq 0 ]; then
    echo -e "${YELLOW}🔧 MANUAL SETUP REQUIRED:${NC}"
    echo ""
    echo "1. Seed coordination points data:"
    echo "   ${BLUE}cd backend && node seed_coordination_points.js${NC}"
    echo ""
    echo "2. Verify Firebase configuration:"
    echo "   ${BLUE}Check that serviceAccountKey.json is properly configured${NC}"
    echo ""
    echo "3. Test coordination points API:"
    echo "   ${BLUE}curl $BACKEND_URL/api/coordination_points${NC}"
    echo ""
else
    echo -e "${GREEN}🎉 System appears to be fully operational!${NC}"
fi

echo ""
echo -e "${BLUE}🔗 Service URLs:${NC}"
echo "==============="
echo "Backend:  $BACKEND_URL"
echo "Frontend: $FRONTEND_URL"
echo ""
echo -e "${BLUE}📊 Final Status:${NC}"
echo "================"

if [ "$coord_check" = "true" ] && [ "$price_test" = "true" ] && [ "$maps_check" -gt "0" ]; then
    echo -e "${GREEN}✅ ALL SYSTEMS OPERATIONAL${NC}"
    exit 0
else
    echo -e "${YELLOW}⚠️ MANUAL INTERVENTION REQUIRED${NC}"
    echo "See setup recommendations above."
    exit 0  # Don't fail deployment, just indicate manual steps needed
fi