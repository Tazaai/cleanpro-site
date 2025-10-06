#!/bin/bash
OUT=~/cleanpro-site/CLEANPRO_REVIEW.md

{
echo "# CleanPro Review Report (Read-Only)"
echo "Generated: $(date)"
echo

### ✅ Matches
echo "## ✅ Matches"
grep -q "app.use(\"/api/services\"" ~/cleanpro-site/backend/index.js && echo "- Backend mounts /api/services."
grep -q "app.use(\"/api/pricing\"" ~/cleanpro-site/backend/index.js && echo "- Backend mounts /api/pricing."
grep -q "app.use(\"/api/bookings\"" ~/cleanpro-site/backend/index.js && echo "- Backend mounts /api/bookings."
grep -q "app.use(\"/api/calendar\"" ~/cleanpro-site/backend/index.js && echo "- Backend mounts /api/calendar."
grep -q "app.use(\"/api/gcalendar\"" ~/cleanpro-site/backend/index.js && echo "- Backend mounts /api/gcalendar."
grep -q "app.get(\"/\"" ~/cleanpro-site/backend/index.js && echo "- Health check endpoint present."
grep -q "EXPOSE 8080" ~/cleanpro-site/backend/Dockerfile && echo "- Dockerfile exposes 8080."
grep -q "const PORT" ~/cleanpro-site/backend/index.js && grep -q "app.listen" ~/cleanpro-site/backend/index.js && echo "- Backend binds to PORT."
grep -q "formData.phone" ~/cleanpro-site/frontend/src/components/BookingForm.jsx && echo "- BookingForm.jsx collects phone field."
grep -q "firebase" ~/cleanpro-site/backend/firebase.js && echo "- Firebase integration present."
grep -q "node_modules/" ~/cleanpro-site/.gitignore && echo "- .gitignore excludes node_modules."

### ⚠️ Mismatches
echo
echo "## ⚠️ Mismatches"
! grep -q "firebase_config.json" ~/cleanpro-site/backend/Dockerfile && echo "- Dockerfile missing COPY firebase_config.json."
! grep -q "phone" ~/cleanpro-site/backend/routes/bookings_api.mjs && echo "- bookings_api.mjs may not save 'phone'."
! grep -q "process.env.GOOGLE_MAPS_API_KEY" ~/cleanpro-site/frontend/src/components/BookingMap.jsx && echo "- BookingMap.jsx may not use env var for Google Maps key."
! grep -q "CALENDAR_ID" ~/cleanpro-site/PROJECT_GUIDE.md && echo "- PROJECT_GUIDE.md missing CALENDAR_ID reference."
! grep -q "Stripe" ~/cleanpro-site/PROJECT_GUIDE.md && echo "- Payment integration not yet defined."
! grep -q "admin" ~/cleanpro-site/frontend/src/App.jsx && echo "- Admin UI not implemented in frontend."

### 🔎 Frontend → Backend API Match Check
echo
echo "## 🔎 Frontend → Backend API Match"
grep -q "/api/services" ~/cleanpro-site/frontend/src/components/BookingForm.jsx && grep -q "app.use(\"/api/services\"" ~/cleanpro-site/backend/index.js && echo "- BookingForm calls /api/services → backend route confirmed."
grep -q "/api/pricing" ~/cleanpro-site/frontend/src/components/BookingForm.jsx && grep -q "app.use(\"/api/pricing\"" ~/cleanpro-site/backend/index.js && echo "- BookingForm calls /api/pricing → backend route confirmed."
grep -q "/api/bookings" ~/cleanpro-site/frontend/src/components/BookingForm.jsx && grep -q "app.use(\"/api/bookings\"" ~/cleanpro-site/backend/index.js && echo "- BookingForm calls /api/bookings → backend route confirmed."
grep -q "/api/maps" ~/cleanpro-site/frontend/src/components/BookingMap.jsx && grep -q "app.use(\"/api/maps\"" ~/cleanpro-site/backend/index.js && echo "- BookingMap calls /api/maps → backend route confirmed."
grep -q "/api/calendar" ~/cleanpro-site/frontend/src/components/BookingForm.jsx && grep -q "app.use(\"/api/calendar\"" ~/cleanpro-site/backend/index.js && echo "- Frontend calls /api/calendar → backend route confirmed."
grep -q "/api/gcalendar" ~/cleanpro-site/frontend/src/components/BookingForm.jsx && grep -q "app.use(\"/api/gcalendar\"" ~/cleanpro-site/backend/index.js && echo "- Frontend calls /api/gcalendar → backend route confirmed."

### 🔮 Recommendations
echo
echo "## 🔮 Recommendations (for intervention)"
echo "- Add COPY firebase_config.json in Dockerfile."
echo "- Ensure bookings_api.mjs saves phone and other fields."
echo "- Use process.env.GOOGLE_MAPS_API_KEY in BookingMap.jsx."
echo "- Implement payments (Stripe/PayPal) as per roadmap."
echo "- Add Admin dashboard frontend (AppSheet or React)."
echo "- Add automated API tests (services, pricing, bookings)."
echo "- CI/CD pipeline should lint for duplicate PORT declarations."
echo "- Add monitoring with Cloud Logging."

### 📊 Roadmap Progress
echo
echo "## 📊 Roadmap Progress"
while read -r line; do
  case "$line" in
    *"[x]"*) echo "✅ ${line//\[x\]/}" ;;
    *"[ ]"*) echo "⚠️ ${line//\[ \]/}" ;;
  esac
done < <(grep -E "\[x\]|\[ \]" ~/cleanpro-site/PROJECT_GUIDE.md)

### 🗂️ Firestore Collections
echo
echo "## 🗂️ Firestore Usage"
grep -q "collection(" ~/cleanpro-site/backend/routes/hqs_api.mjs && echo "- HQs API uses Firestore collection."
grep -q "collection(" ~/cleanpro-site/backend/routes/bookings_api.mjs && echo "- Bookings API uses Firestore collection."
grep -q "collection(" ~/cleanpro-site/backend/routes/calendar_api.mjs && echo "- Calendar API uses Firestore collection."
grep -q "collection(" ~/cleanpro-site/backend/firebase.js && echo "- Firebase initialized with Firestore."

### 🎤 Panel Review
echo
echo "## 🎤 (Pannel) Critical Expert Review"
echo "- **Web Developer:** Good modular Express setup, but fragile deployments. Stronger validation/tests needed for frontend-backend sync."
echo "- **Web Designer:** Booking flow works but UX lacks polish — needs responsive design checks and clear feedback for errors/success."
echo "- **Business:** Service/pricing APIs solid, but lack of payments/admin dashboard delays monetization."
echo "- **User:** Booking possible but trust is low without confirmation emails, booking history, or cancellation options."
echo "- **Admin:** Deployment instability shows need for CI/CD checks and monitoring. Firestore integration works but needs auditing for data integrity."

echo
echo "---"
echo "(End of Review)"
} > "$OUT"

cat "$OUT"
