## 🔑 Secrets Check
✅ GOOGLE_MAPS_API_KEY present

===============================
=== Diagnostic Run 1 ===
===============================
Generated: Fri Oct  3 19:32:08 UTC 2025

## 📖 Project Overview
- Project Name: Clean Departure
- Deployment: Google Cloud Run (Node.js container, port 8080)
- Backend: Node.js + Express on Cloud Run
- Database: Firebase Firestore (AppSheet sync)
- Frontend: React (Vite)
- Integrations: Google Maps API, Google Calendar API
- Pricing: Variable $/sqft + mileage + discounts (AppSheet adjustable)
- Workflow: createBooking → coordination_points → transport fee → pricePreview → confirmation → admin approval → AM/PM slots.

## ✅ Matches
- Backend mounts /api/services.
- Backend mounts /api/pricing.
- Backend mounts /api/bookings.
- Backend mounts /api/calendar.
- Backend mounts /api/gcalendar.
- Backend mounts /api/coordination_points.
- Dockerfile exposes 8080.
- Backend binds to PORT.
- Firebase integration present.
- .gitignore excludes node_modules.

## ⚠️ Mismatches
- Admin UI not implemented in frontend.
- ⚠️ No backend test script found.

## 🔑 Critical Endpoint Coverage
❌ /api/createBooking missing in backend.
❌ /api/pricePreview missing in backend.

## 🧪 Live Endpoint Tests

## 📋 Business Feature Validation
❌ Missing Commercial/Residential categories
❌ Missing residential subtypes
✅ Frontend uses sq ft
❌ Bedrooms/Bathrooms missing
❌ Property type missing

## 🧑‍⚖️ Expert Panel Review
👨‍💻 Dev: APIs structured? Firestore/AppSheet sync OK?
�� UX: Replace m² → sq ft, clear dropdowns, mobile flow.
💼 Business: Separate Commercial/Residential, recurring discounts.
🧑‍🤝‍🧑 User: Expect Google Autocomplete, clear breakdown.
🧑‍💼 Admin: Dashboard missing, AppSheet sync works.

## 🔧 Auto-corrections
⚡ Fixed: Firestore collection set to coordination_points
⚡ Fixed: Replaced Autocomplete with PlaceAutocompleteElement
⚡ Fixed: m² → sq ft

===============================
=== Diagnostic Run 2 ===
===============================
Generated: Fri Oct  3 19:32:08 UTC 2025

## 📖 Project Overview
- Project Name: Clean Departure
- Deployment: Google Cloud Run (Node.js container, port 8080)
- Backend: Node.js + Express on Cloud Run
- Database: Firebase Firestore (AppSheet sync)
- Frontend: React (Vite)
- Integrations: Google Maps API, Google Calendar API
- Pricing: Variable $/sqft + mileage + discounts (AppSheet adjustable)
- Workflow: createBooking → coordination_points → transport fee → pricePreview → confirmation → admin approval → AM/PM slots.

## ✅ Matches
- Backend mounts /api/services.
- Backend mounts /api/pricing.
- Backend mounts /api/bookings.
- Backend mounts /api/calendar.
- Backend mounts /api/gcalendar.
- Backend mounts /api/coordination_points.
- Dockerfile exposes 8080.
- Backend binds to PORT.
- Firebase integration present.
- .gitignore excludes node_modules.

## ⚠️ Mismatches
- Admin UI not implemented in frontend.
- ⚠️ No backend test script found.

## 🔑 Critical Endpoint Coverage
❌ /api/createBooking missing in backend.
❌ /api/pricePreview missing in backend.

## 🧪 Live Endpoint Tests

## 📋 Business Feature Validation
❌ Missing Commercial/Residential categories
❌ Missing residential subtypes
✅ Frontend uses sq ft
❌ Bedrooms/Bathrooms missing
❌ Property type missing

## 🧑‍⚖️ Expert Panel Review
👨‍💻 Dev: APIs structured? Firestore/AppSheet sync OK?
�� UX: Replace m² → sq ft, clear dropdowns, mobile flow.
💼 Business: Separate Commercial/Residential, recurring discounts.
🧑‍🤝‍🧑 User: Expect Google Autocomplete, clear breakdown.
🧑‍💼 Admin: Dashboard missing, AppSheet sync works.

## 🔧 Auto-corrections
⚡ Fixed: Firestore collection set to coordination_points
⚡ Fixed: Replaced Autocomplete with PlaceAutocompleteElement
⚡ Fixed: m² → sq ft

===============================
=== Diagnostic Run 3 ===
===============================
Generated: Fri Oct  3 19:32:09 UTC 2025

## 📖 Project Overview
- Project Name: Clean Departure
- Deployment: Google Cloud Run (Node.js container, port 8080)
- Backend: Node.js + Express on Cloud Run
- Database: Firebase Firestore (AppSheet sync)
- Frontend: React (Vite)
- Integrations: Google Maps API, Google Calendar API
- Pricing: Variable $/sqft + mileage + discounts (AppSheet adjustable)
- Workflow: createBooking → coordination_points → transport fee → pricePreview → confirmation → admin approval → AM/PM slots.

## ✅ Matches
- Backend mounts /api/services.
- Backend mounts /api/pricing.
- Backend mounts /api/bookings.
- Backend mounts /api/calendar.
- Backend mounts /api/gcalendar.
- Backend mounts /api/coordination_points.
- Dockerfile exposes 8080.
- Backend binds to PORT.
- Firebase integration present.
- .gitignore excludes node_modules.

## ⚠️ Mismatches
- Admin UI not implemented in frontend.
- ⚠️ No backend test script found.

## 🔑 Critical Endpoint Coverage
❌ /api/createBooking missing in backend.
❌ /api/pricePreview missing in backend.

## 🧪 Live Endpoint Tests

## 📋 Business Feature Validation
❌ Missing Commercial/Residential categories
❌ Missing residential subtypes
✅ Frontend uses sq ft
❌ Bedrooms/Bathrooms missing
❌ Property type missing

## 🧑‍⚖️ Expert Panel Review
👨‍💻 Dev: APIs structured? Firestore/AppSheet sync OK?
�� UX: Replace m² → sq ft, clear dropdowns, mobile flow.
💼 Business: Separate Commercial/Residential, recurring discounts.
🧑‍🤝‍🧑 User: Expect Google Autocomplete, clear breakdown.
🧑‍💼 Admin: Dashboard missing, AppSheet sync works.

## 🔧 Auto-corrections
⚡ Fixed: Firestore collection set to coordination_points
⚡ Fixed: Replaced Autocomplete with PlaceAutocompleteElement
⚡ Fixed: m² → sq ft

===============================
=== 📊 Final Resume Summary ===
===============================
✅ calendar OK
✅ calendar OK
✅ calendar OK
✅ pricing OK
✅ pricing OK
✅ pricing OK
✅ services OK
✅ services OK
✅ services OK
❌ coordination_points FAILED (500)
❌ coordination_points FAILED (500)
❌ coordination_points FAILED (500)
❌ createBooking FAILED (404)
❌ createBooking FAILED (404)
❌ createBooking FAILED (404)
❌ pricePreview FAILED (404)
❌ pricePreview FAILED (404)
❌ pricePreview FAILED (404)

Summary: 0 OK, 0 errors, 0 warnings
✅ All critical checks passed. Proceeding to deployment...
## 🚀 Deploy Backend
Building using Dockerfile and deploying container to Cloud Run service [[1mcleanpro-backend[m] in project [[1mcleanpro-site[m] region [[1meurope-west1[m]
Building and deploying...
Uploading sources............................................................................................................done
Building Container..........................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................done
Setting IAM Policy..............done
Creating Revision.....................................................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00344-lxv' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00344-lxv&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00344-lxv%22 
For more troubleshooting guidance, see https://cloud.google.com/run/docs/troubleshooting#container-failed-to-start
