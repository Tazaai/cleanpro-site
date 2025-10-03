#!/bin/bash
# ~/cleanpro-site/review_report.sh
# Clean Departure Diagnostic, Auto-Correction, and Deployment Script
# Runs 3x with fixes, validates endpoints/features, redeploys backend+frontend.

exec > >(tee agent.md) 2>&1
set +e

MAX_RUNS=3
results=()
final_errors=0

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
# 📦 Ensure gcloud CLI available
###############################################################################
if ! command -v gcloud >/dev/null 2>&1; then
  echo "⚡ Installing Google Cloud SDK..."
  curl -sSL https://sdk.cloud.google.com | bash > /dev/null
  source "$HOME/google-cloud-sdk/path.bash.inc"
fi

if [[ -n "$GCP_SA_KEY" ]]; then
  echo "$GCP_SA_KEY" | base64 -d > $HOME/gcp-key.json
  gcloud auth activate-service-account --key-file=$HOME/gcp-key.json
fi

if [[ -n "$GCP_PROJECT" ]]; then
  gcloud config set project "$GCP_PROJECT"
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
  echo "## 📖 Project Overview"
  echo "- Project Name: Clean Departure"
  echo "- Deployment: Google Cloud Run (Node.js container, port 8080)"
  echo "- Backend: Node.js + Express on Cloud Run"
  echo "- Database: Firebase Firestore (AppSheet sync)"
  echo "- Frontend: React (Vite)"
  echo "- Integrations: Google Maps API, Google Calendar API"
  echo "- Pricing: Variable \$/sqft + mileage + discounts (AppSheet adjustable)"
  echo "- Workflow: createBooking → coordination_points → transport fee → pricePreview → confirmation → admin approval → AM/PM slots."

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
  echo "## 📋 Business Feature Validation"
  grep -q "Commercial" ~/cleanpro-site/backend/routes/services_api.mjs && grep -q "Residential" ~/cleanpro-site/backend/routes/services_api.mjs \
    && echo "✅ Service categories present" || echo "❌ Missing Commercial/Residential categories"
  grep -q "Standard" ~/cleanpro-site/backend/routes/services_api.mjs && grep -q "Deep" ~/cleanpro-site/backend/routes/services_api.mjs && grep -q "move" ~/cleanpro-site/backend/routes/services_api.mjs \
    && echo "✅ Residential subtypes present" || echo "❌ Missing residential subtypes"
  grep -R "m²" ~/cleanpro-site/frontend/src/components | grep -v "node_modules" && echo "❌ Frontend still uses m²" || echo "✅ Frontend uses sq ft"
  grep -q "bedroom" ~/cleanpro-site/frontend/src/components/BookingForm.jsx && grep -q "bathroom" ~/cleanpro-site/frontend/src/components/BookingForm.jsx \
    && echo "✅ Bedrooms & Bathrooms fields found" || echo "❌ Bedrooms/Bathrooms missing"
  grep -q "property" ~/cleanpro-site/frontend/src/components/BookingForm.jsx && echo "✅ Property type field found" || echo "❌ Property type missing"

  echo
  echo "## 🧑‍⚖️ Expert Panel Review"
  echo "👨‍💻 Dev: APIs structured? Firestore/AppSheet sync OK?"
  echo "🧑 UX: Replace m² → sq ft, clear dropdowns, mobile flow."
  echo "💼 Business: Separate Commercial/Residential, recurring discounts."
  echo "🧑‍🤝‍🧑 User: Expect Google Autocomplete, clear breakdown."
  echo "🧑‍�� Admin: Dashboard missing, AppSheet sync works."

  echo
  echo "## 🔧 Auto-corrections"
  sed -i 's/collection("hqs")/collection("coordination_points")/g' ~/cleanpro-site/backend/routes/coordination_points_api.mjs \
    && echo "⚡ Fixed: Firestore collection set to coordination_points"

  sed -i 's/google.maps.places.Autocomplete/google.maps.places.PlaceAutocompleteElement/g' ~/cleanpro-site/frontend/src/components/BookingMap.jsx \
    && echo "⚡ Fixed: Replaced Autocomplete with PlaceAutocompleteElement"

  sed -i 's/m²/sq ft/g' ~/cleanpro-site/frontend/src/components/*.jsx 2>/dev/null && echo "⚡ Fixed: m² → sq ft"

  grep -q "EXPOSE 8080" ~/cleanpro-site/backend/Dockerfile || echo "EXPOSE 8080" >> ~/cleanpro-site/backend/Dockerfile
  grep -q "serviceAccountKey.json" ~/cleanpro-site/.gitignore || echo "serviceAccountKey.json" >> ~/cleanpro-site/.gitignore
  grep -q "firebase_config.json" ~/cleanpro-site/.gitignore || echo "firebase_config.json" >> ~/cleanpro-site/.gitignore

done

echo
echo "==============================="
echo "=== 📊 Final Resume Summary ==="
echo "==============================="

ok=0; warn=0; err=0
for entry in "${results[@]}"; do
  key="${entry%%:*}"; code="${entry##*:}"
  if [[ "$code" == "200" ]]; then
    echo "✅ $key OK"; ((ok++))
  else
    echo "❌ $key FAILED ($code)"; ((err++))
  fi
done | sort

echo
echo "Summary: $ok OK, $err errors, $warn warnings"

###############################################################################
# 🚀 Deployment
###############################################################################
if [[ $err -gt 0 ]]; then
  echo "❌ Blocking CI/CD: $err errors remain after $MAX_RUNS runs."
  exit 1
else
  echo "✅ All critical checks passed. Proceeding to deployment..."

  echo "## 🚀 Deploy Backend"
  cd ~/cleanpro-site/backend
  gcloud run deploy cleanpro-backend --source . --region europe-west1 --platform managed \
    --clear-base-image \
    --set-env-vars GOOGLE_MAPS_API_KEY=$GOOGLE_MAPS_API_KEY \
    --allow-unauthenticated --quiet || exit 1

  echo "## 🚀 Deploy Frontend"
  cd ~/cleanpro-site/frontend
  gcloud run deploy cleanpro-frontend --source . --region europe-west1 --platform managed \
    --clear-base-image \
    --allow-unauthenticated --quiet || exit 1

  echo "## 🧪 Run Playwright Tests"
  cd ~/cleanpro-site/frontend
  npx playwright test || exit 1

  echo "✅ Deployment complete!"
fi
