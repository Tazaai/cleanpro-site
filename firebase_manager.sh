#!/bin/bash

# firebase_manager.sh
# Complete Firebase Key Management & Diagnostic Suite
# Safe automated validation and troubleshooting

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${CYAN}🔥 Firebase Manager - Complete Diagnostic Suite${NC}"
echo "================================================="
echo "$(date)"
echo ""

# Show available commands
show_help() {
    echo "🛠️  Available Commands:"
    echo "====================="
    echo ""
    echo "1. check       - Quick Firebase health check"
    echo "2. validate    - Comprehensive validation with detailed diagnostics"
    echo "3. format      - Validate Firebase key format before upload"
    echo "4. fix-guide   - Step-by-step fix instructions"
    echo "5. monitor     - Real-time Firebase status monitoring"
    echo "6. test-api    - Test Firebase-dependent API endpoints"
    echo ""
    echo "Usage: $0 [command]"
    echo "   or: $0 (interactive mode)"
}

# Quick health check
quick_check() {
    echo -e "${BLUE}🔍 Quick Firebase Health Check${NC}"
    echo "=============================="
    
    FIREBASE_STATUS=$(curl -s https://cleanpro-backend-5539254765.europe-west1.run.app/debug/firebase)
    
    if echo "$FIREBASE_STATUS" | jq -e .diagnostics > /dev/null 2>&1; then
        FIREBASE_READY=$(echo "$FIREBASE_STATUS" | jq -r '.diagnostics.firebaseReady')
        KEY_LENGTH=$(echo "$FIREBASE_STATUS" | jq -r '.diagnostics.firebaseKeyLength')
        
        if [ "$FIREBASE_READY" = "true" ]; then
            echo -e "${GREEN}✅ Firebase is working correctly!${NC}"
            echo "   Key Length: $KEY_LENGTH characters"
            return 0
        else
            echo -e "${RED}❌ Firebase connection failed${NC}"
            echo "   Key Length: $KEY_LENGTH characters"
            
            if [ "$KEY_LENGTH" -lt 2000 ]; then
                echo -e "${YELLOW}💡 Key is too short - likely truncated during copy${NC}"
            fi
            return 1
        fi
    else
        echo -e "${RED}❌ Cannot connect to backend${NC}"
        return 1
    fi
}

# Comprehensive validation
comprehensive_validation() {
    echo -e "${BLUE}🔍 Running Comprehensive Firebase Validation${NC}"
    echo "============================================="
    
    if command -v ./firebase_key_automated_validator.sh > /dev/null 2>&1; then
        ./firebase_key_automated_validator.sh
    else
        echo -e "${RED}❌ Automated validator not found${NC}"
        echo "Run this script from the project root directory"
        return 1
    fi
}

# Format validation
format_validation() {
    echo -e "${BLUE}🔒 Firebase Key Format Validation${NC}"
    echo "=================================="
    
    if command -v ./firebase_key_format_checker.sh > /dev/null 2>&1; then
        ./firebase_key_format_checker.sh
    else
        echo -e "${RED}❌ Format checker not found${NC}"
        echo "Run this script from the project root directory"
        return 1
    fi
}

# Fix guide
show_fix_guide() {
    echo -e "${YELLOW}🔧 Firebase Key Resolution Guide${NC}"
    echo "================================"
    echo ""
    echo "✅ SUCCESS STORY: Firebase key issue has been resolved!"
    echo "📊 Working configuration: 3176 characters (perfect size)"
    echo ""
    echo -e "${GREEN}What worked (for future reference):${NC}"
    echo ""
    echo "1. 🔑 Generated Fresh Firebase Service Account Key:"
    echo "   → Firebase Console: project/cleanpro-site/settings/serviceaccounts/adminsdk"
    echo "   → Downloaded complete JSON service account file"
    echo ""
    echo "2. 🔧 Key Discovery:"
    echo "   → Issue: Studio V editor was truncating/formatting the JSON improperly"
    echo "   → Solution: Used Notepad to view and copy the raw JSON content"
    echo "   → Result: Complete 3176-character key instead of truncated 392 characters"
    echo ""
    echo "3. 🔒 GitHub Secret Update:"
    echo "   → Updated FIREBASE_KEY in GitHub repository secrets"
    echo "   → Used complete JSON content (no Base64 needed in this case)"
    echo "   → Deployment automatically picked up the corrected key"
    echo ""
    echo "4. ✅ Validation & Success:"
    echo "   → Firebase Ready: true"
    echo "   → Key Length: 3176 characters"
    echo "   → Admin Apps: 1 (properly initialized)"
    echo "   → All Firebase-dependent APIs now functional"
    echo ""
    echo -e "${BLUE}🎯 Best Practices Learned:${NC}"
    echo "✅ Use simple text editors (Notepad) for copying JSON credentials"
    echo "✅ Always verify character count before uploading to GitHub Secrets"
    echo "✅ Use our validation tools to confirm proper format"
    echo "✅ Test Firebase connection after each deployment"
    echo ""
    echo -e "${GREEN}🚀 Current Status: Firebase Fully Operational!${NC}"
    echo ""
    echo "If you encounter similar issues in the future:"
    echo "1. Check key length with: ./firebase_manager.sh check"
    echo "2. Validate format with: ./firebase_key_format_checker.sh"
    echo "3. Use simple text editors for credential handling"
    echo "4. Always verify the complete JSON structure"
    echo -e "${RED}⚠️  SECURITY REMINDERS:${NC}"
    echo "❌ Never paste Firebase keys in chat or logs"
    echo "❌ Never commit Firebase keys to git"
    echo "✅ Only use GitHub Secrets for sensitive data"
    echo "✅ Use this script to validate without exposing data"
}

# Monitor Firebase status
monitor_status() {
    echo -e "${CYAN}📊 Firebase Status Monitor${NC}"
    echo "=========================="
    echo "Press Ctrl+C to stop monitoring"
    echo ""
    
    while true; do
        echo -n "$(date '+%H:%M:%S') - "
        
        FIREBASE_STATUS=$(curl -s https://cleanpro-backend-5539254765.europe-west1.run.app/debug/firebase 2>/dev/null || echo '{"error":"failed"}')
        
        if echo "$FIREBASE_STATUS" | jq -e .diagnostics > /dev/null 2>&1; then
            FIREBASE_READY=$(echo "$FIREBASE_STATUS" | jq -r '.diagnostics.firebaseReady')
            KEY_LENGTH=$(echo "$FIREBASE_STATUS" | jq -r '.diagnostics.firebaseKeyLength')
            
            if [ "$FIREBASE_READY" = "true" ]; then
                echo -e "${GREEN}✅ Firebase OK${NC} (${KEY_LENGTH} chars)"
            else
                echo -e "${RED}❌ Firebase Failed${NC} (${KEY_LENGTH} chars)"
            fi
        else
            echo -e "${RED}❌ Backend Unreachable${NC}"
        fi
        
        sleep 5
    done
}

# Test API endpoints
test_api_endpoints() {
    echo -e "${BLUE}🧪 Testing Firebase-dependent API Endpoints${NC}"
    echo "============================================"
    
    endpoints=(
        "/api/coordination_points"
        "/api/bookings"
        "/api/admin/stats"
    )
    
    for endpoint in "${endpoints[@]}"; do
        echo -n "Testing $endpoint... "
        
        response=$(curl -s -o /dev/null -w "%{http_code}" "https://cleanpro-backend-5539254765.europe-west1.run.app$endpoint" 2>/dev/null || echo "000")
        
        if [ "$response" = "200" ]; then
            echo -e "${GREEN}✅ OK${NC}"
        else
            echo -e "${RED}❌ Failed (HTTP $response)${NC}"
        fi
    done
    
    echo ""
    echo "📊 Testing data sources..."
    
    coord_data=$(curl -s https://cleanpro-backend-5539254765.europe-west1.run.app/api/coordination_points 2>/dev/null || echo '{"error":"failed"}')
    
    if echo "$coord_data" | jq -e '.data[0].source' > /dev/null 2>&1; then
        source=$(echo "$coord_data" | jq -r '.data[0].source')
        if [ "$source" = "firestore" ]; then
            echo -e "${GREEN}✅ Using live Firestore data${NC}"
        elif [ "$source" = "fallback" ]; then
            echo -e "${YELLOW}⚠️  Using fallback data (Firebase issue)${NC}"
        else
            echo -e "${BLUE}ℹ️  Data source: $source${NC}"
        fi
    else
        echo -e "${RED}❌ Cannot retrieve coordination points data${NC}"
    fi
}

# Main menu
interactive_mode() {
    echo "🛠️  Firebase Manager - Interactive Mode"
    echo "======================================"
    echo ""
    echo "What would you like to do?"
    echo ""
    echo "1. Quick health check"
    echo "2. Comprehensive validation"
    echo "3. Format validation (for new keys)"
    echo "4. Show fix guide"
    echo "5. Monitor status (real-time)"
    echo "6. Test API endpoints"
    echo "7. Help"
    echo "8. Exit"
    echo ""
    
    while true; do
        read -p "Enter your choice (1-8): " choice
        echo ""
        
        case $choice in
            1) quick_check; break ;;
            2) comprehensive_validation; break ;;
            3) format_validation; break ;;
            4) show_fix_guide; break ;;
            5) monitor_status; break ;;
            6) test_api_endpoints; break ;;
            7) show_help; break ;;
            8) echo "👋 Goodbye!"; exit 0 ;;
            *) echo "❌ Invalid choice. Please enter 1-8." ;;
        esac
    done
}

# Handle command line arguments
case "${1:-}" in
    "check"|"c") quick_check ;;
    "validate"|"v") comprehensive_validation ;;
    "format"|"f") format_validation ;;
    "fix-guide"|"fix"|"guide") show_fix_guide ;;
    "monitor"|"m") monitor_status ;;
    "test-api"|"test"|"api") test_api_endpoints ;;
    "help"|"h"|"-h"|"--help") show_help ;;
    "") interactive_mode ;;
    *) 
        echo -e "${RED}❌ Unknown command: $1${NC}"
        echo ""
        show_help
        exit 1
        ;;
esac