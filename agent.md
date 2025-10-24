## 🧭 Reading PROJECT_GUIDE.md context...
# 🧭 CleanPro Site + Codox System – Project Guide
⚠️ SYSTEM CONTEXT FILE — **READ-ONLY (Auto-edit disabled)**  
Used by **Codox GPT** to understand project goals, structure, and workflow for **automation, diagnostics, and self-healing**.  
⛔️ This file may only be *read*, not modified automatically.

**Last Updated**: October 23, 2025 - Deployment workflow optimized ✅

---

## 🎯 Goal
Create a **self-maintaining cleaning platform** with dynamic services, Google Maps/Calendar integration, and AppSheet-based admin control — supported by an **autonomous Codox pipeline** that detects and repairs build, deploy, and environment issues automatically.

---

## ✅ Objectives

### 🧱 Backend (Node.js / Express)
- REST APIs for: services, pricing, bookings, maps, and calendar  
- Firestore data layer  
- Cloud Run ready (`process.env.PORT || 8080`)  
✅ Project guide loaded.

## 🔍 Validating project structure...
✅ Found backend/
✅ Found frontend/
✅ Found logs/

## 🔑 Checking required secrets...
✅ GOOGLE_MAPS_API_KEY available
❌ Missing GCP_PROJECT
❌ Missing GCP_SA_KEY
❌ Missing FIREBASE_KEY

## 🧱 Backend diagnostic...
📄 backend/index.js found
✅ app.listen present
✅ CORS middleware present

## 🧩 Backend routes overview...
backend/routes/booking_api.mjs
backend/routes/bookings_api.mjs
backend/routes/calendar_api.mjs
backend/routes/config_api.mjs
backend/routes/coordination_points_api.mjs
backend/routes/createBooking_api.mjs
backend/routes/gcalendar_api.mjs
backend/routes/maps_api.mjs
backend/routes/pricing_api.mjs
backend/routes/quotes_api.mjs
backend/routes/services_api.mjs

## 🎨 Frontend diagnostic...
✅ vite.config.js exists
✅ .env file detected
✅ Google Maps key found in .env

## 🌐 Connectivity check (Google Maps APIs)...
Distance Matrix API status: REQUEST_DENIED
❌ Maps API request failed or key invalid

## 🧪 Frontend build simulation...
✅ npm available (build dry run passed)

## ☁️ Cloud Run connection test...
⚠️ Cloud Run list failed (not authenticated or missing project)

## 📦 Firebase sanity check...
✅ Firebase file found

## 🧾 Diagnostic summary...
All diagnostics are read-only. No code changes, deletions, or deployments performed.
✅ Safe diagnostic run completed.
