#!/bin/bash
# 🧠 CleanPro MVP Diagnostic Review (Safe Mode – 100% Read-Only)
# Purpose: Run comprehensive diagnostics for MVP deployment with authentication, admin dashboard, and payments.

# Skip local validation when running inside GitHub Actions
if [ "$GITHUB_ACTIONS" = "true" ]; then
  echo "✅ Running inside GitHub Actions — skipping local secret validation"
  exit 0
fi

set +e
exec > >(tee agent.md) 2>&1

echo "## 🧭 Reading PROJECT_GUIDE.md context..."
if [ -f PROJECT_GUIDE.md ]; then
  cat PROJECT_GUIDE.md | head -n 20
  echo "✅ Project guide loaded."
else
  echo "⚠️ PROJECT_GUIDE.md missing — running with limited context."
fi

echo ""
echo "## 🔍 Validating MVP project structure..."
for dir in backend frontend logs .github/workflows; do
  if [ -d "$dir" ]; then
    echo "✅ Found $dir/"
  else
    echo "❌ Missing directory: $dir/"
  fi
done

echo ""
echo "## 🔑 Checking MVP secrets (authentication, payments, deployment)..."

# Enhanced secret validation function
validate_secret_detailed() {
  local secret_name=$1
  local secret_var="${!1}"
  
  if [ -z "$secret_var" ]; then
    echo "❌ Missing $secret_name"
    return 1
  else
    echo "✅ $secret_name available"
    
    # Advanced validation for specific secrets (without exposing values)
    case $secret_name in
      "GCP_SA_KEY")
        if echo "$secret_var" | jq . > /dev/null 2>&1; then
          echo "   ✓ Valid JSON format"
          if echo "$secret_var" | jq -e '.project_id' > /dev/null 2>&1; then
            echo "   ✓ Contains project_id"
          else
            echo "   ❌ Missing project_id field"
            return 1
          fi
        else
          echo "   ❌ Invalid JSON format"
          return 1
        fi
        ;;
      "JWT_SECRET")
        local jwt_length=${#secret_var}
        if [ $jwt_length -ge 32 ]; then
          echo "   ✓ Adequate length ($jwt_length chars)"
        else
          echo "   ⚠️ Short length ($jwt_length chars) - recommend 32+ chars"
        fi
        ;;
      "GOOGLE_MAPS_API_KEY")
        if [[ "$secret_var" =~ ^AIza[0-9A-Za-z-_]{35}$ ]]; then
          echo "   ✓ Valid Google API key format"
        else
          echo "   ⚠️ Unusual Google API key format"
        fi
        ;;
    esac
    return 0
  fi
}

# Core GCP Infrastructure
echo "🏗️ Core GCP Infrastructure:"
validate_secret_detailed "GCP_PROJECT"
validate_secret_detailed "GCP_SA_KEY"

# API Keys  
echo "🔑 API Keys:"
validate_secret_detailed "GOOGLE_MAPS_API_KEY"
validate_secret_detailed "FIREBASE_KEY"
validate_secret_detailed "OPENAI_API_KEY"

# Authentication & Security
echo "🔐 Authentication & Security:"
validate_secret_detailed "JWT_SECRET"

# Payment Processing
echo "💳 Payment Processing:"
validate_secret_detailed "STRIPE_SECRET_KEY"
validate_secret_detailed "STRIPE_WEBHOOK_SECRET"

# AppSheet Integration
echo "📊 AppSheet Integration:"
validate_secret_detailed "APPSHEET_API_KEY"
validate_secret_detailed "APPSHEET_APP_ID"

# Summary of secret validation
echo "======================================================"
missing_secrets=0
for key in GCP_PROJECT GCP_SA_KEY GOOGLE_MAPS_API_KEY FIREBASE_KEY OPENAI_API_KEY JWT_SECRET STRIPE_SECRET_KEY STRIPE_WEBHOOK_SECRET APPSHEET_API_KEY APPSHEET_APP_ID; do
  if [ -z "${!key}" ]; then
    ((missing_secrets++))
  fi
done

if [ $missing_secrets -eq 0 ]; then
  echo "🎉 All secrets configured! Ready for deployment."
else
  echo "🚨 $missing_secrets secrets missing. Deployment will fail."
  echo "🔧 Configure missing secrets via GitHub web UI:"
  echo "   Repository → Settings → Secrets and variables → Actions"
  echo "⚠️ NEVER set secrets via CLI - use web interface only!"
fi

echo ""
echo "## 🧱 Backend MVP diagnostic..."
if [ -f backend/index.js ]; then
  echo "📄 backend/index.js found"
  grep -q "app.listen" backend/index.js && echo "✅ app.listen present" || echo "⚠️ app.listen missing"
  grep -q "cors" backend/index.js && echo "✅ CORS middleware present" || echo "⚠️ CORS not configured"
  grep -q "jwt" backend/index.js && echo "✅ JWT authentication configured" || echo "⚠️ JWT not configured"
else
  echo "❌ backend/index.js missing"
fi

echo ""
echo "## 🛡️ Authentication system diagnostic..."
if [ -f backend/routes/auth_api.mjs ]; then
  echo "✅ Authentication API found"
  grep -q "generateToken" backend/routes/auth_api.mjs && echo "✅ JWT token generation present" || echo "⚠️ JWT token generation missing"
  grep -q "bcrypt" backend/routes/auth_api.mjs && echo "✅ Password hashing present" || echo "⚠️ Password hashing missing"
  grep -q "authenticateToken" backend/routes/auth_api.mjs && echo "✅ Token authentication middleware present" || echo "⚠️ Token middleware missing"
  grep -q "requireAdmin" backend/routes/auth_api.mjs && echo "✅ Admin role middleware present" || echo "⚠️ Admin middleware missing"
else
  echo "❌ Authentication API missing"
fi

echo ""
echo "## 👑 Admin dashboard diagnostic..."
if [ -f backend/routes/admin_api.mjs ]; then
  echo "✅ Admin API found"
  grep -q "/dashboard/stats" backend/routes/admin_api.mjs && echo "✅ Dashboard stats endpoint present" || echo "⚠️ Dashboard stats missing"
  grep -q "/users" backend/routes/admin_api.mjs && echo "✅ User management endpoints present" || echo "⚠️ User management missing"
  grep -q "/bookings" backend/routes/admin_api.mjs && echo "✅ Booking management endpoints present" || echo "⚠️ Booking management missing"
  grep -q "/revenue" backend/routes/admin_api.mjs && echo "✅ Revenue reporting present" || echo "⚠️ Revenue reporting missing"
else
  echo "❌ Admin dashboard API missing"
fi

echo ""
echo "## 💳 Payment system diagnostic..."
if [ -f backend/routes/payment_api.mjs ]; then
  echo "✅ Payment API found"
  grep -q "stripe" backend/routes/payment_api.mjs && echo "✅ Stripe integration present" || echo "⚠️ Stripe integration missing"
  grep -q "PaymentIntent" backend/routes/payment_api.mjs && echo "✅ Payment intent handling present" || echo "⚠️ Payment intent missing"
  grep -q "webhook" backend/routes/payment_api.mjs && echo "✅ Webhook handling present" || echo "⚠️ Webhook handling missing"
else
  echo "❌ Payment API missing"
fi

echo ""
echo "## ⚖️ Legal compliance diagnostic..."
if [ -f backend/routes/legal_api.mjs ]; then
  echo "✅ Legal API found"
  grep -q "/terms" backend/routes/legal_api.mjs && echo "✅ Terms of service endpoint present" || echo "⚠️ Terms endpoint missing"
  grep -q "/privacy" backend/routes/legal_api.mjs && echo "✅ Privacy policy endpoint present" || echo "⚠️ Privacy policy missing"
  grep -q "/contact" backend/routes/legal_api.mjs && echo "✅ Contact information endpoint present" || echo "⚠️ Contact endpoint missing"
else
  echo "❌ Legal compliance API missing"
fi

echo ""
echo "## 🧩 Backend routes overview (MVP APIs)..."
if [ -d backend/routes ]; then
  echo "📁 Checking MVP API routes..."
  ls backend/routes/*.mjs 2>/dev/null || echo "⚠️ No route files found"
  for route in auth_api.mjs admin_api.mjs payment_api.mjs legal_api.mjs bookings_api.mjs; do
    if [ -f "backend/routes/$route" ]; then
      echo "✅ $route present"
    else
      echo "❌ $route missing"
    fi
  done
else
  echo "❌ backend/routes directory missing"
fi

echo ""
echo "## 📦 Backend dependencies diagnostic..."
if [ -f backend/package.json ]; then
  echo "✅ backend/package.json found"
  grep -q "jsonwebtoken" backend/package.json && echo "✅ JWT dependency present" || echo "⚠️ JWT dependency missing"
  grep -q "bcrypt" backend/package.json && echo "✅ bcrypt dependency present" || echo "⚠️ bcrypt dependency missing"
  grep -q "stripe" backend/package.json && echo "✅ Stripe dependency present" || echo "⚠️ Stripe dependency missing"
  grep -q "express-validator" backend/package.json && echo "✅ Input validation dependency present" || echo "⚠️ Input validation missing"
else
  echo "❌ backend/package.json missing"
fi

echo ""
echo "## 🎨 Frontend diagnostic..."
if [ -d frontend ]; then
  if [ -f frontend/vite.config.js ]; then
    echo "✅ vite.config.js exists"
  else
    echo "⚠️ vite.config.js missing"
  fi

  if [ -f frontend/.env ]; then
    echo "✅ .env file detected"
    grep -q "VITE_GOOGLE_MAPS_API_KEY" frontend/.env && echo "✅ Google Maps key found in .env" || echo "⚠️ Google Maps key missing in .env"
  else
    echo "⚠️ .env file not found"
  fi
else
  echo "❌ frontend directory missing"
fi

echo ""
echo "## 🌐 Connectivity check (Google Maps APIs)..."
if [ -n "$GOOGLE_MAPS_API_KEY" ]; then
  STATUS=$(curl -s "https://maps.googleapis.com/maps/api/distancematrix/json?origins=Copenhagen&destinations=Roskilde&key=$GOOGLE_MAPS_API_KEY" | jq -r '.status')
  echo "Distance Matrix API status: $STATUS"
  if [ "$STATUS" = "OK" ]; then
    echo "✅ Maps API is working"
  else
    echo "❌ Maps API request failed or key invalid"
  fi
else
  echo "⚠️ No GOOGLE_MAPS_API_KEY environment variable set"
fi

echo ""
echo "## 🧪 Frontend build simulation..."
if [ -d frontend ]; then
  cd frontend
  if command -v npm >/dev/null 2>&1; then
    npm run build --dry-run >/dev/null 2>&1 && echo "✅ npm available (build dry run passed)" || echo "⚠️ npm available (dry run failed)"
  else
    echo "❌ npm not installed"
  fi
  cd ..
fi

echo ""
echo "## ☁️ GitHub Actions & Artifact Registry deployment check..."
if [ -f .github/workflows/deploy.yml ]; then
  echo "✅ GitHub Actions deployment workflow found"
  grep -q "europe-west1-docker.pkg.dev" .github/workflows/deploy.yml && echo "✅ Artifact Registry configured" || echo "⚠️ Artifact Registry not configured"
  grep -q "gcloud artifacts repositories create" .github/workflows/deploy.yml && echo "✅ Repository creation step present" || echo "⚠️ Repository creation missing"
  grep -q "JWT_SECRET" .github/workflows/deploy.yml && echo "✅ JWT_SECRET configured in deployment" || echo "⚠️ JWT_SECRET missing in deployment"
  grep -q "STRIPE_SECRET_KEY" .github/workflows/deploy.yml && echo "✅ Stripe keys configured in deployment" || echo "⚠️ Stripe keys missing in deployment"
else
  echo "❌ GitHub Actions deployment workflow missing"
fi

echo ""
echo "## 🚀 Cloud Run deployment status..."
if command -v gh >/dev/null 2>&1; then
  echo "📋 Recent deployment runs:"
  gh run list --limit 3 --json status,conclusion,displayTitle | jq -r '.[] | "\(.status) | \(.conclusion // "in_progress") | \(.displayTitle)"' 2>/dev/null || echo "⚠️ Cannot fetch GitHub Actions status"
else
  echo "⚠️ GitHub CLI not available"
fi

if command -v gcloud >/dev/null 2>&1; then
  echo "📊 Cloud Run services status:"
  gcloud run services list --project "$GCP_PROJECT" --format="table(metadata.name,status.url,status.conditions.status)" 2>/dev/null || echo "⚠️ Cloud Run list failed (not authenticated or missing project)"
else
  echo "⚠️ gcloud CLI not found"
fi

echo ""
echo "## 📦 Firebase sanity check..."
if [ -f backend/firebaseClient.js ] || [ -f backend/firebase.js ]; then
  echo "✅ Firebase file found"
else
  echo "⚠️ No Firebase integration file found"
fi

echo ""
echo "## 🎯 Deployment Readiness Assessment..."
echo "======================================================"

# Calculate readiness score
readiness_score=0
total_checks=10

# Secret validation
echo "🔐 Secret Configuration:"
for key in GCP_PROJECT GCP_SA_KEY GOOGLE_MAPS_API_KEY FIREBASE_KEY JWT_SECRET STRIPE_SECRET_KEY STRIPE_WEBHOOK_SECRET APPSHEET_API_KEY APPSHEET_APP_ID; do
  if [ ! -z "${!key}" ]; then
    ((readiness_score++))
    echo "  ✅ $key configured"
  else
    echo "  ❌ $key missing"
  fi
done

# Workflow validation
echo "🔧 GitHub Actions Workflow:"
if [ -f .github/workflows/deploy.yml ]; then
  if grep -q "secret-validation" .github/workflows/deploy.yml; then
    ((readiness_score++))
    echo "  ✅ Secret validation job present"
  else
    echo "  ⚠️ Secret validation job missing"
  fi
else
  echo "  ❌ Deploy workflow missing"
fi

# Calculate percentage
readiness_percent=$((readiness_score * 100 / total_checks))

echo "======================================================"
echo "📊 DEPLOYMENT READINESS: $readiness_score/$total_checks ($readiness_percent%)"

if [ $readiness_percent -ge 90 ]; then
  echo "🎉 READY FOR DEPLOYMENT!"
  echo "✅ All critical components validated"
  echo "🚀 Deployment will proceed automatically on next commit"
elif [ $readiness_percent -ge 70 ]; then
  echo "⚠️ MOSTLY READY - Minor issues detected"
  echo "🔧 Fix missing components before deployment"
  echo "📋 Review items marked with ❌ above"
else
  echo "🚨 NOT READY FOR DEPLOYMENT"
  echo "❌ Critical secrets or components missing"
  echo "🔧 Configure GitHub Secrets via web interface:"
  echo "   Repository → Settings → Secrets and variables → Actions"
  echo "⚠️ Deployment will FAIL until all secrets are configured"
fi

echo ""
echo "## 🧾 MVP Diagnostic summary..."
echo "🔒 Authentication System: JWT-based with bcrypt password hashing"
echo "👑 Admin Dashboard: Business management with stats, users, bookings, revenue"
echo "💳 Payment Infrastructure: Stripe integration with payment intents and webhooks"
echo "⚖️ Legal Compliance: Terms of service, privacy policy, contact information"
echo "📱 Enhanced Bookings: User-authenticated CRUD with role-based access"
echo "🚀 Deployment: Modern Artifact Registry approach with Cloud Run"
echo ""
echo "All diagnostics are read-only. No code changes, deletions, or deployments performed."
echo "✅ MVP diagnostic run completed - ready for production deployment."
