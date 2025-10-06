# CleanPro Site – Project Guide

⚠️ IMPORTANT:
This file is **for context only**.
It must **never be edited** or used to trigger code changes.
Codex should read this file to understand project goals, objectives, and structure — not to modify the project.

---

## 🎯 Goal
Build a professional **cleaning service platform** for CleanPro that supports:
- Service presentation (residential, deep, office, move in/out, etc.)
- Transparent and dynamic pricing
- Online booking with availability management
- Integration with Google Maps (distance-based pricing)
- Integration with Google Calendar (availability & scheduling)
- Admin panel via AppSheet/Firestore

Future integrations: **Firestore for data**, **Stripe/PayPal** for payments, etc.

---

## ✅ Objectives
1. **Backend (Node.js / Express)**
   - REST APIs for services, pricing, bookings, calendar, HQs, maps, config, gcalendar.
   - Firestore integration for persistent data.
   - Deployable to Cloud Run (must bind to `$PORT`).

2. **Frontend (React / Vite)**
   - Clean UI with Tailwind / Material UI.
   - Booking form with service selection, address, size, frequency, date & time.
   - Price preview (dynamic from backend).
   - Mobile-friendly, professional look.

3. **Infrastructure**
   - Backend & frontend in separate Cloud Run services.
   - Secret Manager for API keys (Google Maps, etc.).
   - `.gitignore` excludes `node_modules/`.

---

## 🗂 Project Structure

### Backend Routes
- backend/routes/services_api.mjs  
- backend/routes/pricing_api.mjs  
- backend/routes/calendar_api.mjs  
- backend/routes/maps_api.mjs  
- backend/routes/hqs_api.mjs  
- backend/routes/bookings_api.mjs   # unified (create + list)  
- backend/routes/gcalendar_api.mjs  
- backend/routes/config_api.mjs     # admin only  

### Backend Core Files
- backend/firebase.js  
- backend/index.js  
- backend/Dockerfile  
- backend/deploy_backend.sh  
- backend/seedCapacity.mjs  

### Frontend Components
- frontend/src/App.jsx  
- frontend/src/main.jsx  
- frontend/src/components/Services.jsx  
- frontend/src/components/BookingForm.jsx  
- frontend/src/components/BookingMap.jsx  
- frontend/src/components/WorkWithUs.jsx  

### Frontend Config
- frontend/Dockerfile  
- frontend/package.json  
- frontend/vite.config.js  

---

## ⚙️ Workflow Rules
- Always run `npm install` in Codespace instead of committing `node_modules/`.
- Cloud Run must listen on `process.env.PORT || 8080`.
- Health check endpoint = `GET /` → returns `"✅ CleanPro Backend is running"`.
- API keys managed via environment variables (not hardcoded).
- Never push secrets to GitHub.
- Always deploy using:
  - `bash deploy_backend.sh`
  - `bash deploy_frontend.sh`

### Required Environment Variables
- `GOOGLE_APPLICATION_CREDENTIALS=/app/firebase_config.json`  
- `CALENDAR_ID=rahpodcast2022@gmail.com`  
- `GOOGLE_MAPS_API_KEY=<key>`  

---

## 🚀 Roadmap
- [x] Basic backend routes  
- [x] Dynamic pricing API  
- [x] Booking system with Firestore  
- [ ] Fix Google Calendar JWT signing issue  
- [ ] Payment integration (Stripe/PayPal)  
- [ ] Admin dashboard (AppSheet or custom UI)  
- [ ] Customer accounts & authentication  
- [ ] Nearest HQ assignment during booking  
- [ ] Monitoring & error logging (Cloud Logging)  

---

## 🛡️ Notes
- `node_modules/` must **never** be in the repo → add `.gitignore`.  
- This file is the **source of truth** for project goals, objectives, structure, and rules.  
- Deployment instructions are kept **separately** and should be run manually.  

---
(End of PROJECT_GUIDE.md – Do not edit)
