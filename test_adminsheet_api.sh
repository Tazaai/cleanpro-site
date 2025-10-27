#!/bin/bash

# AdminSheet API Testing Script
# Tests all AdminSheet endpoints with comprehensive validation

echo "🧪 AdminSheet API Testing Suite"
echo "==============================="
echo "Testing endpoint: ${BACKEND_URL:-http://localhost:8080}"
echo ""

BASE_URL="${BACKEND_URL:-http://localhost:8080}/api/adminsheet"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Test result counters
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

# Function to run test and check result
run_test() {
    local test_name="$1"
    local curl_command="$2"
    local expected_pattern="$3"
    
    echo -e "${BLUE}🧪 Testing: $test_name${NC}"
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    
    # Execute curl command
    response=$(eval "$curl_command" 2>/dev/null)
    exit_code=$?
    
    # Check if curl succeeded
    if [ $exit_code -ne 0 ]; then
        echo -e "${RED}❌ FAILED: Curl command failed (exit code: $exit_code)${NC}"
        FAILED_TESTS=$((FAILED_TESTS + 1))
        echo ""
        return 1
    fi
    
    # Check response pattern
    if echo "$response" | grep -q "$expected_pattern"; then
        echo -e "${GREEN}✅ PASSED: Response contains expected pattern${NC}"
        PASSED_TESTS=$((PASSED_TESTS + 1))
    else
        echo -e "${RED}❌ FAILED: Expected pattern '$expected_pattern' not found${NC}"
        echo "Response: $response"
        FAILED_TESTS=$((FAILED_TESTS + 1))
    fi
    echo ""
}

# Health Check Test
echo -e "${YELLOW}=== HEALTH CHECK TESTS ===${NC}"
run_test "AdminSheet Health Check" \
    "curl -s '$BASE_URL/health'" \
    '"success".*true'

# Coordination Points Tests
echo -e "${YELLOW}=== COORDINATION POINTS TESTS ===${NC}"
run_test "List Coordination Points" \
    "curl -s '$BASE_URL/coordination-points'" \
    '"success".*true'

run_test "Approve Non-existent CP (Should Fail)" \
    "curl -s -X POST '$BASE_URL/cp/approve/nonexistent'" \
    '"success".*false'

run_test "Set Custom Fee (Invalid)" \
    "curl -s -X POST '$BASE_URL/cp/set-fee/test' -H 'Content-Type: application/json' -d '{\"custom_fee_percentage\": 150}'" \
    '"success".*false'

# Escrow Settings Tests
echo -e "${YELLOW}=== ESCROW SETTINGS TESTS ===${NC}"
run_test "Get Escrow Settings" \
    "curl -s '$BASE_URL/escrow/settings'" \
    '"success".*true'

run_test "Update Escrow Settings" \
    "curl -s -X POST '$BASE_URL/escrow/settings' -H 'Content-Type: application/json' -d '{\"hold_period_hours\": 48, \"auto_release_enabled\": true}'" \
    '"success".*true'

run_test "Invalid Escrow Settings" \
    "curl -s -X POST '$BASE_URL/escrow/settings' -H 'Content-Type: application/json' -d '{\"hold_period_hours\": 200}'" \
    '"success".*false'

# AI Communication Tests
echo -e "${YELLOW}=== AI COMMUNICATION TESTS ===${NC}"
run_test "Analyze Professional Tone" \
    "curl -s -X POST '$BASE_URL/communication/analyze-tone' -H 'Content-Type: application/json' -d '{\"message\": \"Thank you for your professional service. I am very satisfied.\", \"sender_id\": \"test_user_1\"}'" \
    '"success".*true.*"has_red_flag".*false'

run_test "Analyze Inappropriate Tone" \
    "curl -s -X POST '$BASE_URL/communication/analyze-tone' -H 'Content-Type: application/json' -d '{\"message\": \"This is stupid and you are an idiot!\", \"sender_id\": \"test_user_2\"}'" \
    '"success".*true.*"has_red_flag".*true'

run_test "Missing Message Data" \
    "curl -s -X POST '$BASE_URL/communication/analyze-tone' -H 'Content-Type: application/json' -d '{\"sender_id\": \"test_user\"}'" \
    '"success".*false'

# Red Flags Tests
echo -e "${YELLOW}=== RED FLAGS TESTS ===${NC}"
run_test "List Red Flags" \
    "curl -s '$BASE_URL/red-flags'" \
    '"success".*true'

run_test "List Red Flags with Filters" \
    "curl -s '$BASE_URL/red-flags?status=pending&limit=10'" \
    '"success".*true'

run_test "Resolve Non-existent Red Flag" \
    "curl -s -X POST '$BASE_URL/red-flags/resolve/nonexistent' -H 'Content-Type: application/json' -d '{\"resolution_notes\": \"Test resolution\"}'" \
    '"success".*false'

# Contact Sharing Tests
echo -e "${YELLOW}=== CONTACT SHARING TESTS ===${NC}"
run_test "Share Contact for Non-existent Booking" \
    "curl -s -X POST '$BASE_URL/booking/share-contact/nonexistent'" \
    '"success".*false'

run_test "Get Contact Sharing History" \
    "curl -s '$BASE_URL/contact-sharing/history'" \
    '"success".*true'

run_test "Get Contact Sharing History with Filters" \
    "curl -s '$BASE_URL/contact-sharing/history?limit=5'" \
    '"success".*true'

# API Error Handling Tests
echo -e "${YELLOW}=== ERROR HANDLING TESTS ===${NC}"
run_test "Invalid JSON Data" \
    "curl -s -X POST '$BASE_URL/communication/analyze-tone' -H 'Content-Type: application/json' -d 'invalid json'" \
    'error'

run_test "Non-existent Endpoint" \
    "curl -s '$BASE_URL/nonexistent/endpoint'" \
    'Cannot.*GET'

# Summary
echo -e "${YELLOW}=== TEST SUMMARY ===${NC}"
echo "Total Tests: $TOTAL_TESTS"
echo -e "${GREEN}Passed: $PASSED_TESTS${NC}"
echo -e "${RED}Failed: $FAILED_TESTS${NC}"

if [ $FAILED_TESTS -eq 0 ]; then
    echo -e "${GREEN}🎉 All tests passed! AdminSheet API is working correctly.${NC}"
    exit 0
else
    echo -e "${RED}❌ Some tests failed. Please check the AdminSheet API implementation.${NC}"
    exit 1
fi