#!/bin/bash
# ~/cleanpro-site/review_report.sh
# Clean Departure Diagnostic, Auto-Correction, and Reporting Script
# Runs 3x with fixes, validates endpoints/features, integrates with Codox self-healing.

exec > >(tee agent.md) 2>&1
set +e

MAX_RUNS=3
results=()

###############################################################################
# 🧩 Safety: prevent endless Codox re-edits
###############################################################################
if [ -f ".codox_lock" ]; then
  echo "🛡️ Codox lock present — skipping redundant run"
  exit 0
fi
echo "run" > .codox_lock

###############################################################################
# 🔑 Check environment secrets
###############################################################################
echo "## 🔑 Secrets Check"
if [[ -z "$GOOGLE_MAPS_API_KEY" ]]; then
  echo "❌ Missing GOOGLE_MAPS_API_KEY"
  exit 1
else
  echo "✅ GOOGLE_MAPS_API_KEY present"
fi

###############################################################################
# 🚦 Main diagnostic loop
###############################################################################
for run in $(seq 1 $MAX_RUNS); do
  echo
  echo "==============================="
  echo "=== Diagnostic Run $run ==="
  echo "==============================="
  echo "Generated: $(date -u)"

  echo
  echo "## �� Project Overview"
  echo "- Project: Clean Departure"
  echo "- Stack: Node.js backend (Cloud Run) + React frontend"
  echo "- Database: Firestore (AppSheet sync)"
  echo "- Integrations: Google Maps API, Google Calendar API"

  echo
  echo "## ✅ Matches"
  grep -q "app.use(\"/api/services" ~/cleanpro-site/backend/index.js && echo "- Backend mounts /api/services."
  grep -q "app.use(\"/api/pricing" ~/cleanpro-site/backend/index.js && echo "- Backend mounts /api/pricing."
  grep -q "app.use(\"/api/bookings" ~/cleanpro-site/backend/index.js && echo "- Backend mounts /api/bookings."
  grep -q "app.use(\"/api/calendar" ~/cleanpro-site/backend/index.js && echo "- Backend mounts /api/calendar."
  grep -q "app.use(\"/api/gcalendar" ~/cleanpro-site/backend/index.js && echo "- Backend mounts /api/gcalendar."
  grep -q "app.use(\"/api/coordination_points" ~/cleanpro-site/backend/index.js && echo "- Backend mounts /api/coordination_points."
  grep -q "app.get(\"/health" ~/cleanpro-site/backend/index.js && echo "- Health check endpoint present."
  grep -q "EXPOSE 8080" ~/cleanpro-site/backend/Dockerfile && echo "- Dockerfile exposes 8080."
  grep -q "process.env.PORT" ~/cleanpro-site/backend/index.js && echo "- Backend binds to PORT."
  grep -q "firebase-admin" ~/cleanpro-site/backend/* && echo "- Firebase integration present."
  grep -q "node_modules" ~/cleanpro-site/.gitignore && echo "- .gitignore excludes node_modules."

  echo
  echo "## ⚠️ Mismatches"
  grep -q "GOOGLE_MAPS_API_KEY" ~/cleanpro-site/frontend/src/components/BookingMap.jsx || echo "- BookingMap.jsx may not use env var for Google Maps key."
  [ -f ~/cleanpro-site/frontend/src/components/AdminDashboard.jsx ] || echo "- Admin UI not implemented in frontend."
  grep -R "m²" ~/cleanpro-site/frontend/src/components | grep -v "node_modules" && echo "- Frontend still uses m² instead of sq ft."
  [ -f ~/cleanpro-site/backend/test_backend.sh ] || echo "- ⚠️ No backend test script found."
  [ -f ~/cleanpro-site/test_frontend.sh ] || echo "- ⚠️ No frontend test script found."

  echo
  echo "## 🔑 Critical Endpoint Coverage"
  grep -q "/api/createBooking" ~/cleanpro-site/backend/index.js || echo "❌ /api/createBooking missing in backend."
  grep -q "/api/pricePreview" ~/cleanpro-site/backend/index.js || echo "❌ /api/pricePreview missing in backend."

  echo
  echo "## 🧪 Live Endpoint Tests"
  backend_url="https://cleanpro-backend-5539254765.europe-west1.run.app"
  for ep in coordination_points services pricing calendar; do
    resp=$(curl -s -o /tmp/$ep.json -w "%{http_code}" $backend_url/api/$ep)
    results+=("$ep:$resp")
  done

  resp=$(curl -s -o /tmp/booking.json -w "%{http_code}" -X POST $backend_url/api/createBooking \
    -H "Content-Type: application/json" \
    -d '{"name":"Diagnostics Bot","phone":"0001112222","email":"diag@example.com","address":"789 Diagnostics Ave","sqft":800,"bedrooms":1,"bathrooms":1}')
  results+=("createBooking:$resp")

  resp=$(curl -s -o /tmp/pricepreview.json -w "%{http_code}" -X POST $backend_url/api/pricePreview \
    -H "Content-Type: application/json" \
    -d '{"sqft":1000,"bedrooms":2,"bathrooms":1,"address":"123 Test Rd"}')
  results+=("pricePreview:$resp")

  echo
  echo "## 🔧 Auto-corrections"
  sed -i 's/collection("hqs")/collection("coordination_points")/g' \
    ~/cleanpro-site/backend/routes/coordination_points_api.mjs \
    && echo "⚡ Fixed: Firestore collection set to coordination_points"

  sed -i 's/google.maps.places.Autocomplete/google.maps.places.PlaceAutocompleteElement/g' \
    ~/cleanpro-site/frontend/src/components/BookingMap.jsx \
    && echo "⚡ Fixed: Replaced Autocomplete with PlaceAutocompleteElement"

  sed -i 's/m²/sq ft/g' ~/cleanpro-site/frontend/src/components/*.jsx 2>/dev/null \
    && echo "⚡ Fixed: m² → sq ft"

  grep -q "EXPOSE 8080" ~/cleanpro-site/backend/Dockerfile || \
    echo "EXPOSE 8080" >> ~/cleanpro-site/backend/Dockerfile

  grep -q "serviceAccountKey.json" ~/cleanpro-site/.gitignore || \
    echo "serviceAccountKey.json" >> ~/cleanpro-site/.gitignore
  grep -q "firebase_config.json" ~/cleanpro-site/.gitignore || \
    echo "firebase_config.json" >> ~/cleanpro-site/.gitignore
done

###############################################################################
# 📊 Final Summary
###############################################################################
echo
echo "==============================="
echo "=== 📊 Final Resume Summary ==="
echo "==============================="

ok=0; err=0
for entry in "${results[@]}"; do
  key="${entry%%:*}"; code="${entry##*:}"
  if [[ "$code" == "200" ]]; then
    echo "✅ $key OK"; ((ok++))
  else
    echo "❌ $key FAILED ($code)"; ((err++))
  fi
done | sort

echo
echo "Summary: $ok OK, $err errors"

###############################################################################
# 📤 Save for Codox Analysis
###############################################################################
mkdir -p codox_logs
cp agent.md codox_logs/review_full_$(date +'%Y%m%d_%H%M').md
echo "errors=$err" >> $GITHUB_OUTPUT
echo "🧠 Diagnostic log ready for Codox analysis."

###############################################################################
# 🚪 Exit with proper status
###############################################################################
if [[ $err -gt 0 ]]; then
  echo "❌ Blocking CI/CD: $err errors remain after $MAX_RUNS runs."
  sleep 10
  exit 1
else
  echo "✅ All diagnostics passed (no deploy in this script)."
  sleep 5
  exit 0
fi
