#!/bin/bash
# ~/cleanpro-site/review_report.sh
# Clean Departure Diagnostic Report (Read-Only)
# 🚫 GPT / Codox: Run diagnostics only. Do NOT edit, add, or remove code without explicit permission.

set +e  # ✅ allow script to continue even if curl or grep fails

echo "# Clean Departure Diagnostic Report"
echo "Generated: $(date -u)"

###############################################################################
# 📖 Project Context
###############################################################################
echo
echo "## 📖 Project Overview"
echo "- Project Name: Clean Departure"
echo "- Deployment: Google Cloud Run (Node.js container, port 8080)"
echo "- Backend: Node.js + Express on Cloud Run"
echo "- Database: Firebase Firestore (AppSheet sync)"
echo "- Frontend: React (Vite)"
echo "- Integrations: Google Maps API, Google Calendar API"
echo "- Pricing: Variable \$/sqft + mileage + discounts (adjustable via AppSheet)"
echo "- Workflow: createBooking → coordination_points → transport fee → pricePreview → confirmation → admin approval → AM/PM slots."

###############################################################################
# ✅ Matches
###############################################################################
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

###############################################################################
# ⚠️ Mismatches
###############################################################################
echo
echo "## ⚠️ Mismatches"
grep -q "GOOGLE_MAPS_API_KEY" ~/cleanpro-site/frontend/src/components/BookingMap.jsx || echo "- BookingMap.jsx may not use env var for Google Maps key."
[ -f ~/cleanpro-site/frontend/src/components/AdminDashboard.jsx ] || echo "- Admin UI not implemented in frontend."
grep -R "m2" ~/cleanpro-site/frontend/src/components | grep -v "node_modules" && echo "- Frontend still uses m² instead of sqft."

###############################################################################
# 🔎 Endpoint Coverage Check
###############################################################################
echo
echo "## 🔎 Endpoint Coverage Check"
echo "- Backend exposed endpoints (from index.js):"
grep "app.use" ~/cleanpro-site/backend/index.js | sed 's/^/- /'
echo
echo "- Frontend API calls (from src/components):"
grep -R "/api/" ~/cleanpro-site/frontend/src/components | sed 's/^/- /'

###############################################################################
# 🔑 Critical Endpoint Coverage
###############################################################################
echo
echo "## 🔑 Critical Endpoint Coverage"
grep -q "/api/createBooking" ~/cleanpro-site/backend/index.js || echo "❌ /api/createBooking missing in backend."
grep -q "/api/pricePreview" ~/cleanpro-site/backend/index.js || echo "❌ /api/pricePreview missing in backend."

###############################################################################
# 🧪 Live Endpoint Tests
###############################################################################
echo
echo "## 🧪 Live Endpoint Tests"
declare -A results

# Coordination points
resp=$(curl -s -o /tmp/hqs.json -w "%{http_code}" https://cleanpro-backend-5539254765.europe-west1.run.app/api/coordination_points)
results["coordination_points"]=$resp

# Services
resp=$(curl -s -o /tmp/services.json -w "%{http_code}" https://cleanpro-backend-5539254765.europe-west1.run.app/api/services)
results["services"]=$resp

# Pricing
resp=$(curl -s -o /tmp/pricing.json -w "%{http_code}" https://cleanpro-backend-5539254765.europe-west1.run.app/api/pricing)
results["pricing"]=$resp

# Calendar
resp=$(curl -s -o /tmp/calendar.json -w "%{http_code}" https://cleanpro-backend-5539254765.europe-west1.run.app/api/calendar)
results["calendar"]=$resp

# CreateBooking
resp=$(curl -s -o /tmp/booking.json -w "%{http_code}" -X POST https://cleanpro-backend-5539254765.europe-west1.run.app/api/createBooking \
  -H "Content-Type: application/json" \
  -d '{"name":"Diagnostics Bot","phone":"0001112222","email":"diag@example.com","address":"789 Diagnostics Ave","sqft":800,"bedrooms":1,"bathrooms":1}')
results["createBooking"]=$resp

# PricePreview
resp=$(curl -s -o /tmp/pricepreview.json -w "%{http_code}" -X POST https://cleanpro-backend-5539254765.europe-west1.run.app/api/pricePreview \
  -H "Content-Type: application/json" \
  -d '{"sqft":1000,"bedrooms":2,"bathrooms":1,"address":"123 Test Rd"}')
results["pricePreview"]=$resp

###############################################################################
# 🏢 Firestore/AppSheet Schema Validation
###############################################################################
echo
echo "## 🏢 Firestore/AppSheet Schema Validation"

echo "### coordination_points"
if [ -s /tmp/hqs.json ]; then
  total=$(jq '.coordination_points | length' /tmp/hqs.json)
  active=$(jq '[.coordination_points[] | select(.active == true)] | length' /tmp/hqs.json)
  echo "- Coordination Points: $active active / $total total"

  jq -c '.coordination_points[]' /tmp/hqs.json | while read -r doc; do
    id=$(echo "$doc" | jq -r '.id // empty')
    name=$(echo "$doc" | jq -r '.name // empty')
    addr=$(echo "$doc" | jq -r '.address // empty')
    act=$(echo "$doc" | jq -r '.active // empty')
    created=$(echo "$doc" | jq -r '.createdAt // empty')

    echo "- $id"
    [ -n "$name" ] || echo "  ❌ Missing: Name"
    [ -n "$addr" ] || echo "  ❌ Missing: Address"
    [[ "$act" == "true" || "$act" == "false" ]] || echo "  ❌ Active not boolean"
    [ -n "$created" ] || echo "  ⚠️ Missing: CreatedAt"
    [[ "$addr" =~ [0-9]+ ]] || echo "  ⚠️ Address may be invalid: $addr"
  done
else
  echo "❌ coordination_points endpoint unavailable"
fi

echo "### PricingConfig"
if [ -s /tmp/pricing.json ]; then
  jq -c '.pricing | to_entries[]' /tmp/pricing.json | while read -r entry; do
    svc=$(echo "$entry" | jq -r '.key')
    val=$(echo "$entry" | jq -r '.value')
    echo "- $svc"

    ppm2=$(echo "$val" | jq -r '.pricePerM2 // empty')
    ppmile=$(echo "$val" | jq -r '.pricePerMile // empty')
    fm=$(echo "$val" | jq -r '.freeMiles // empty')
    wd=$(echo "$val" | jq -r '.weeklyDiscount // empty')
    md=$(echo "$val" | jq -r '.monthlyDiscount // empty')

    [[ "$ppm2" =~ ^[0-9]+(\.[0-9]+)?$ ]] || echo "  ❌ pricePerM2 not numeric: $ppm2"
    [[ "$ppmile" =~ ^[0-9]+(\.[0-9]+)?$ ]] || echo "  ❌ pricePerMile not numeric: $ppmile"
    [[ "$fm" =~ ^[0-9]+$ ]] || echo "  ❌ freeMiles not integer: $fm"
    [[ "$wd" =~ ^0(\.[0-9]+)?$ || "$wd" == "1" ]] || echo "  ❌ weeklyDiscount out of range: $wd"
    [[ "$md" =~ ^0(\.[0-9]+)?$ || "$md" == "1" ]] || echo "  ❌ monthlyDiscount out of range: $md"

    (( $(echo "$ppm2 > 0 && $ppm2 < 100" | bc -l) )) || echo "  ⚠️ pricePerM2 looks unrealistic: $ppm2"
    (( $(echo "$ppmile > 0 && $ppmile < 20" | bc -l) )) || echo "  ⚠️ pricePerMile looks unrealistic: $ppmile"
  done
else
  echo "❌ pricing endpoint unavailable"
fi

###############################################################################
# 📊 Resume Summary
###############################################################################
echo
echo "## 📊 Resume Summary"
for key in "${!results[@]}"; do
  code=${results[$key]}
  if [[ "$code" == "200" ]]; then
    echo "✅ $key OK (HTTP $code)"
  else
    echo "❌ $key FAILED (HTTP $code)"
  fi
done | sort

###############################################################################
# 🛑 Correction Policy
###############################################################################
echo
echo "## 🛑 Correction Policy"
echo "- GPT/Codox may only **report findings** here."
echo "- If fixes are required, Codox must **ask explicit permission first**."
