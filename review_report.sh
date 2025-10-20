#!/bin/bash
# 🧠 Codox Diagnostic Review (Safe Mode – 100% Read-Only)
# Purpose: Run full diagnostics without any auto-healing, editing, or deployment.

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
echo "## 🔍 Validating project structure..."
for dir in backend frontend logs; do
  if [ -d "$dir" ]; then
    echo "✅ Found $dir/"
  else
    echo "❌ Missing directory: $dir/"
  fi
done

echo ""
echo "## 🔑 Checking required secrets..."
for key in GOOGLE_MAPS_API_KEY GCP_PROJECT GCP_SA_KEY FIREBASE_KEY; do
  if [ -z "${!key}" ]; then
    echo "❌ Missing $key"
  else
    echo "✅ $key available"
  fi
done

echo ""
echo "## 🧱 Backend diagnostic..."
if [ -f backend/index.js ]; then
  echo "📄 backend/index.js found"
  grep -q "app.listen" backend/index.js && echo "✅ app.listen present" || echo "⚠️ app.listen missing"
  grep -q "cors" backend/index.js && echo "✅ CORS middleware present" || echo "⚠️ CORS not configured"
else
  echo "❌ backend/index.js missing"
fi

echo ""
echo "## 🧩 Backend routes overview..."
if [ -d backend/routes ]; then
  ls backend/routes/*.mjs 2>/dev/null || echo "⚠️ No route files found"
else
  echo "❌ backend/routes directory missing"
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
echo "## ☁️ Cloud Run connection test..."
if command -v gcloud >/dev/null 2>&1; then
  gcloud run services list --project "$GCP_PROJECT" --format="value(metadata.name,status.conditions.status)" 2>/dev/null || echo "⚠️ Cloud Run list failed (not authenticated or missing project)"
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
echo "## 🧾 Diagnostic summary..."
echo "All diagnostics are read-only. No code changes, deletions, or deployments performed."

echo "✅ Safe diagnostic run completed."
