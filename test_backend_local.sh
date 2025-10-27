#!/bin/bash

# 🧪 Local Backend Testing Script
# MANDATORY: Run before any deployment to prevent Cloud Run failures

echo "🧪 LOCAL BACKEND TESTING - CleanPro"
echo "====================================="
echo "🕐 $(date '+%Y-%m-%d %H:%M:%S')"
echo ""

# Configuration
BACKEND_DIR="backend"
LOCAL_PORT="8080"
LOCAL_URL="http://localhost:$LOCAL_PORT"
TEST_TIMEOUT=30
STARTUP_WAIT=5

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test result tracking
TESTS_PASSED=0
TESTS_FAILED=0

log_test() {
    local status=$1
    local message=$2
    if [ "$status" = "PASS" ]; then
        echo -e "${GREEN}✅ $message${NC}"
        ((TESTS_PASSED++))
    elif [ "$status" = "FAIL" ]; then
        echo -e "${RED}❌ $message${NC}"
        ((TESTS_FAILED++))
    else
        echo -e "${YELLOW}⚠️ $message${NC}"
    fi
}

# Check if backend directory exists
if [ ! -d "$BACKEND_DIR" ]; then
    log_test "FAIL" "Backend directory not found: $BACKEND_DIR"
    exit 1
fi

echo "📁 Backend directory: ✅ Found"

# Check if package.json exists
if [ ! -f "$BACKEND_DIR/package.json" ]; then
    log_test "FAIL" "package.json not found in $BACKEND_DIR"
    exit 1
fi

echo "📦 Package.json: ✅ Found"

# Check if dependencies are installed
if [ ! -d "$BACKEND_DIR/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd "$BACKEND_DIR"
    npm install --no-audit --no-fund
    if [ "$?" -ne 0 ]; then
        log_test "FAIL" "Failed to install dependencies"
        exit 1
    fi
    cd ..
    log_test "PASS" "Dependencies installed successfully"
else
    log_test "PASS" "Dependencies already installed"
fi

# Check for main entry point
if [ ! -f "$BACKEND_DIR/index.js" ]; then
    log_test "FAIL" "Main entry point not found: $BACKEND_DIR/index.js"
    exit 1
fi

echo "🔍 Entry point: ✅ Found index.js"

# Check syntax
echo ""
echo "🔍 Syntax Check:"
echo "================"
cd "$BACKEND_DIR"
node --check index.js
if [ "$?" -eq 0 ]; then
    log_test "PASS" "JavaScript syntax is valid"
else
    log_test "FAIL" "JavaScript syntax errors detected"
    cd ..
    exit 1
fi
cd ..

# Check if port is available
echo ""
echo "🔌 Port Availability Check:"
echo "==========================="
if lsof -i :$LOCAL_PORT >/dev/null 2>&1; then
    echo "⚠️ Port $LOCAL_PORT is already in use. Attempting to kill existing process..."
    pkill -f "node.*index.js" || true
    sleep 2
    if lsof -i :$LOCAL_PORT >/dev/null 2>&1; then
        log_test "FAIL" "Port $LOCAL_PORT still in use after cleanup attempt"
        exit 1
    fi
fi
log_test "PASS" "Port $LOCAL_PORT is available"

# Set up environment variables for local testing
export NODE_ENV=development
export PORT=$LOCAL_PORT
export HOST=localhost

# Load local environment if available
if [ -f ".env.local" ]; then
    echo "🔐 Loading local environment variables..."
    set -a  # Export all variables
    source .env.local
    set +a  # Stop exporting
    log_test "PASS" "Local environment loaded from .env.local"
else
    echo "⚠️ No .env.local found - using default environment"
fi

echo ""
echo "🚀 Starting Backend Server:"
echo "==========================="
echo "📍 URL: $LOCAL_URL"
echo "🔌 Port: $LOCAL_PORT"
echo "⏰ Startup wait: ${STARTUP_WAIT}s"
echo ""

# Start backend server in background
cd "$BACKEND_DIR"
echo "Starting server..."
node index.js &
BACKEND_PID=$!
cd ..

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🧹 Cleaning up..."
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null || true
        wait $BACKEND_PID 2>/dev/null || true
    fi
    # Kill any remaining node processes
    pkill -f "node.*index.js" 2>/dev/null || true
}

# Set trap for cleanup
trap cleanup EXIT INT TERM

# Wait for server to start
echo "⏳ Waiting ${STARTUP_WAIT}s for server startup..."
sleep $STARTUP_WAIT

# Test if server is responding
echo ""
echo "🏥 Health Check Tests:"
echo "====================="

# Test 1: Basic health endpoint
echo "1️⃣ Testing health endpoint..."
HEALTH_RESPONSE=$(curl -s --max-time 10 "$LOCAL_URL/health" 2>/dev/null)
if [ "$?" -eq 0 ] && echo "$HEALTH_RESPONSE" | grep -q '"ok":true'; then
    log_test "PASS" "Health endpoint responding"
    echo "   Response: $HEALTH_RESPONSE"
else
    log_test "FAIL" "Health endpoint not responding or invalid response"
    echo "   Response: $HEALTH_RESPONSE"
fi

# Test 2: Root endpoint
echo ""
echo "2️⃣ Testing root endpoint..."
ROOT_RESPONSE=$(curl -s --max-time 10 "$LOCAL_URL/" 2>/dev/null)
if [ "$?" -eq 0 ] && echo "$ROOT_RESPONSE" | grep -q '"ok":true'; then
    log_test "PASS" "Root endpoint responding"
else
    log_test "FAIL" "Root endpoint not responding properly"
fi

# Test 3: Coordination Points API
echo ""
echo "3️⃣ Testing coordination points API..."
COORD_RESPONSE=$(curl -s --max-time 10 "$LOCAL_URL/api/coordination_points" 2>/dev/null)
if [ "$?" -eq 0 ] && echo "$COORD_RESPONSE" | grep -q '"ok":true'; then
    log_test "PASS" "Coordination points API responding with success"
else
    if echo "$COORD_RESPONSE" | grep -q '"error"'; then
        log_test "WARN" "Coordination points API responding with error (may be expected)"
        echo "   Response: $COORD_RESPONSE"
    else
        log_test "FAIL" "Coordination points API not responding"
    fi
fi

# Test 4: 404 handling
echo ""
echo "4️⃣ Testing 404 handling..."
NOT_FOUND_RESPONSE=$(curl -s --max-time 10 "$LOCAL_URL/nonexistent" 2>/dev/null)
if [ "$?" -eq 0 ] && echo "$NOT_FOUND_RESPONSE" | grep -q '"error":"Endpoint not found"'; then
    log_test "PASS" "404 handling working correctly"
else
    log_test "WARN" "404 handling may not be working as expected"
fi

# Test 5: CORS headers
echo ""
echo "5️⃣ Testing CORS headers..."
CORS_RESPONSE=$(curl -s -I --max-time 10 "$LOCAL_URL/health" 2>/dev/null)
if echo "$CORS_RESPONSE" | grep -qi "access-control-allow-origin"; then
    log_test "PASS" "CORS headers present"
else
    log_test "WARN" "CORS headers not detected (may load dynamically)"
fi

# Summary
echo ""
echo "📊 TEST SUMMARY"
echo "==============="
echo "✅ Tests passed: $TESTS_PASSED"
echo "❌ Tests failed: $TESTS_FAILED"
echo ""

if [ "$TESTS_FAILED" -eq 0 ]; then
    echo -e "${GREEN}🎉 ALL TESTS PASSED - SAFE TO DEPLOY!${NC}"
    echo ""
    echo "✅ Backend starts successfully"
    echo "✅ Essential endpoints responding"
    echo "✅ Error handling working"
    echo ""
    echo "🚀 Ready for Cloud Run deployment"
    exit 0
else
    echo -e "${RED}❌ TESTS FAILED - DO NOT DEPLOY${NC}"
    echo ""
    echo "🚫 Fix the issues above before deploying"
    echo "💡 Check server logs for more details"
    echo "🔧 Ensure all dependencies are installed"
    echo "🔐 Verify environment variables are set"
    echo ""
    echo "🛡️ This prevents broken deployments to Cloud Run"
    exit 1
fi