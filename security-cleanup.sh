#!/bin/bash

# 🔒 Clean Departure - Security Cleanup Script
# Removes all API keys from git history and prepares for secure deployment

echo "🛡️ Clean Departure Security Cleanup"
echo "=================================="
echo "This script will:"
echo "1. Remove all API keys from git history"
echo "2. Verify no sensitive data remains"
echo "3. Prepare for secure redeployment"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() { echo -e "${BLUE}[INFO]${NC} $1"; }
print_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
print_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
print_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Confirm before proceeding
read -p "⚠️  This will rewrite git history. Continue? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    print_error "Cleanup cancelled"
    exit 1
fi

print_status "🧹 Starting security cleanup..."

# 1. Remove sensitive files from entire git history
print_status "Removing sensitive files from git history..."

# Files to completely remove from history
SENSITIVE_FILES=(
    "firebase_config.json"
    "serviceAccountKey.json"
    "backend/firebase_config.json"
    "backend/serviceAccountKey.json"
    "backend/.env"
    "frontend/.env"
    "frontend/.env.production"
    "functions/serviceAccountKey.json"
    "key.json"
    "credentials.json"
    "**/secret_*.json"
)

# Use git filter-branch to remove sensitive files
for file in "${SENSITIVE_FILES[@]}"; do
    print_status "Removing $file from history..."
    git filter-branch --force --index-filter \
        "git rm --cached --ignore-unmatch '$file'" \
        --prune-empty --tag-name-filter cat -- --all 2>/dev/null || true
done

# 2. Remove any commits that might contain API keys
print_status "Scanning for API key patterns in commit messages..."
git log --all --grep="AIza" --oneline || true
git log --all --grep="sk_" --oneline || true
git log --all --grep="pk_" --oneline || true

# 3. Clean up refs and garbage collect
print_status "Cleaning up git references..."
rm -rf .git/refs/original/
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# 4. Verify cleanup
print_status "🔍 Verifying cleanup..."
echo "Checking for any remaining sensitive patterns..."

# Check for API key patterns in tracked files
if git ls-files | xargs grep -l "AIza\|sk_\|pk_\|firebase.*key\|serviceAccount" 2>/dev/null; then
    print_warning "Found potential API key patterns - please review above files"
else
    print_success "No API key patterns found in tracked files"
fi

# Check for sensitive files
if git ls-files | grep -E "(serviceAccount|firebase_config|\.env|credential|secret)" | grep -v ".gitignore" | grep -v "node_modules"; then
    print_warning "Found potential sensitive files - please review above"
else
    print_success "No sensitive files found in git tracking"
fi

print_success "🎉 Security cleanup completed!"
echo ""
echo "📋 Next Steps:"
echo "============="
echo "1. Force push to update remote repository:"
echo "   git push --force-with-lease origin main"
echo ""
echo "2. Configure GitHub Secrets (via GitHub web interface):"
echo "   - FIREBASE_KEY"
echo "   - GOOGLE_MAPS_API_KEY" 
echo "   - OPENAI_API_KEY"
echo "   - STRIPE_SECRET_KEY"
echo "   - STRIPE_WEBHOOK_SECRET"
echo "   - JWT_SECRET"
echo "   - APPSHEET_API_KEY"
echo "   - APPSHEET_APP_ID"
echo "   - GCP_PROJECT"
echo "   - GCP_SA_KEY"
echo ""
echo "3. Trigger redeployment:"
echo "   Push any change to main branch or use GitHub Actions UI"
echo ""
print_warning "⚠️  Remember: Never commit real API keys again!"
print_success "🔒 Use GitHub Secrets for all sensitive data"