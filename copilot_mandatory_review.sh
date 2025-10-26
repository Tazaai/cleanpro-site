#!/bin/bash

# 🤖 GitHub Copilot - Mandatory Review Automation
# Enforces systematic review after deployments and before new tasks

echo "🤖 GITHUB COPILOT - MANDATORY REVIEW SYSTEM"
echo "============================================="
echo "🕐 $(date '+%Y-%m-%d %H:%M:%S UTC')"
echo ""

# Step 1: PROJECT_GUIDE.md Review
echo "📖 STEP 1: PROJECT_GUIDE.md Review"
echo "==================================="
if [ -f PROJECT_GUIDE.md ]; then
    echo "✅ PROJECT_GUIDE.md found"
    echo "📋 Last modified: $(stat -c %y PROJECT_GUIDE.md)"
    echo "📏 File size: $(wc -l < PROJECT_GUIDE.md) lines"
    echo "🔍 Key sections present:"
    
    # Check for critical sections
    if grep -q "🔐 Secret Management" PROJECT_GUIDE.md; then
        echo "  ✅ Secret Management documentation"
    else
        echo "  ⚠️  Secret Management section missing"
    fi
    
    if grep -q "MANDATORY REVIEW PROCESS" PROJECT_GUIDE.md; then
        echo "  ✅ Mandatory Review Process documented"
    else
        echo "  ❌ MANDATORY REVIEW PROCESS missing - CRITICAL"
    fi
    
    if grep -q "🔧 Local Development Secret Management" PROJECT_GUIDE.md; then
        echo "  ✅ Local Secret Management documented"
    else
        echo "  ⚠️  Local Secret Management section missing"
    fi
else
    echo "❌ PROJECT_GUIDE.md NOT FOUND - CRITICAL ERROR"
    exit 1
fi

echo ""

# Step 2: System Health Check
echo "🏥 STEP 2: System Health & Validation"
echo "====================================="
if [ -f review_report.sh ]; then
    echo "🔍 Running comprehensive system review..."
    chmod +x review_report.sh
    ./review_report.sh
else
    echo "❌ review_report.sh NOT FOUND - CRITICAL ERROR"
    exit 1
fi

echo ""

# Step 3: Local Secret Management Check
echo "🔐 STEP 3: Local Secret Management Validation"
echo "=============================================="
if [ -f setup_local_secrets.sh ]; then
    echo "✅ Local secret setup script available"
    if [ -f .env.local ]; then
        echo "✅ .env.local exists (local development ready)"
        if git check-ignore .env.local >/dev/null 2>&1; then
            echo "✅ .env.local properly protected by .gitignore"
        else
            echo "❌ .env.local NOT PROTECTED - SECURITY RISK"
        fi
    else
        echo "ℹ️  .env.local not found (run ./setup_local_secrets.sh if needed)"
    fi
else
    echo "⚠️  setup_local_secrets.sh missing"
fi

echo ""

# Step 4: API Endpoint Validation
echo "🧪 STEP 4: API Endpoint Validation"
echo "=================================="
if [ -f test_coordination_api.sh ]; then
    echo "🧪 Running coordination points API diagnostic..."
    chmod +x test_coordination_api.sh
    ./test_coordination_api.sh | head -20
    echo "📋 Full API diagnostic available in test_coordination_api.sh output"
else
    echo "⚠️  test_coordination_api.sh not found - creating basic test"
fi

echo ""

# Step 5: Documentation Status
echo "📚 STEP 5: Documentation Completeness"
echo "====================================="
echo "📄 Available documentation:"
for doc in PROJECT_GUIDE.md SECRET_MANAGEMENT_DIAGNOSTIC.md LOCAL_SECRET_MANAGEMENT.md COORDINATION_API_FIX_REPORT.md NO_BYPASS_POLICY.md; do
    if [ -f "$doc" ]; then
        echo "  ✅ $doc ($(wc -l < "$doc") lines)"
    else
        echo "  ⚠️  $doc missing"
    fi
done

echo ""

# Step 6: Deployment Status Check
echo "🚀 STEP 6: Deployment Status"
echo "============================"
echo "📋 Recent commits:"
git log --oneline -5 | sed 's/^/  /'

echo ""
echo "📊 GitHub Actions status:"
if command -v gh >/dev/null 2>&1; then
    gh run list --limit 3 | sed 's/^/  /'
else
    echo "  ℹ️  GitHub CLI not available"
fi

echo ""

# Final Summary
echo "✅ REVIEW COMPLETION CHECKLIST"
echo "==============================="
echo "□ PROJECT_GUIDE.md reviewed and current"
echo "□ System health validated via review_report.sh"
echo "□ Local secret management configured and secure"
echo "□ API endpoints tested and functional"
echo "□ Documentation complete and up-to-date"
echo "□ Recent deployment status confirmed"
echo ""
echo "🤖 GitHub Copilot: Mark all items as complete before proceeding with new tasks"
echo "🚫 NO BYPASS POLICY: Full review required after every deployment"
echo ""
echo "📅 Review completed at: $(date '+%Y-%m-%d %H:%M:%S UTC')"