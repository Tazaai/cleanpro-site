# 🧭 Clean Departure MVP + GitHub Copilot System – Project Guide
⚠️ SYSTEM CONTEXT FILE — **GitHub Copilot Managed**  
Used by **GitHub Copilot** to understand project goals, structure, and workflow for **MVP features, diagnostics, and deployment**.  
✅ MVP Features: Authentication, Admin Dashboard, Payments, Legal Compliance, Google Maps Integration

🔒 **EDIT PROTECTION**: This file should NOT be automatically modified. Changes require explicit developer authorization only.

**Last Updated**: October 24, 2025 - MVP COMPLETE with Full Authentication, Admin Dashboard, Payments & Maps ✅

---

## 🎯 Goal
Create a **complete cleaning platform MVP** with dynamic services, Google Maps/Calendar integration, user authentication, admin dashboard, payment processing, and legal compliance — **FULLY IMPLEMENTED** and supported by **GitHub Copilot** for automation, diagnostics, and deployment with modern Artifact Registry approach.

**STATUS**: 🎉 **MVP COMPLETE & DEPLOYED** - All core features functional and live!

---

## ✅ Objectives

### 🧱 Backend (Node.js / Express)
- REST APIs for: services, pricing, bookings, maps, calendar, auth, admin, payments, legal  
- **Authentication System**: JWT tokens, bcrypt password hashing, role-based access control
- **Admin Dashboard**: User management, booking oversight, revenue reporting, system stats
- **Payment Processing**: Stripe integration with payment intents and webhook handling
- **Legal Compliance**: Terms of service, privacy policy, contact information APIs
- Firestore data layer with user collections and admin analytics
- Cloud Run ready (`process.env.PORT || 8080`)  
- Health check: `GET /` → "✅ CleanPro Backend is running"  
- MVP routes: `/api/auth/*`, `/api/admin/*`, `/api/payments/*`, `/api/legal/*`, `/api/bookings/*`
- **Auto-fix rule:** ensure `app.listen(process.env.PORT || 8080, "0.0.0.0")` is present in `index.js`

### 🎨 Frontend (React / Vite) ✅ COMPLETE
- Tailwind / MUI styling ✅ 
- **User Authentication**: Login, registration, profile management with JWT tokens ✅
- **Admin Dashboard**: Business management interface for authenticated admin users ✅
- **Payment Integration**: Stripe payment forms and transaction handling ✅
- **Google Maps Integration**: Address autocomplete, distance calculation, coordination points ✅
- **Detailed Price Preview**: Base rate, distance fees, discount breakdown, final total ✅
- **Professional Cleaning History**: Last cleaning date tracking for discount eligibility ✅
- **Smart Discount System**: First-time vs repeat customer logic ✅
- Booking form with dynamic pricing, distance, discounts, and Google Maps ✅ 
- Coordination point validation (<100 miles) ✅
- Real-time price updates via backend API ✅
- Role-based UI components and protected routes ✅
- **Clean Departure Branding**: Consistent throughout application ✅

## 🧼 Service Logic & Pricing System

### Categories
1. **Commercial Cleaning**  
2. **Residential Cleaning** → Standard, Deep, Move-In/Out  

### 💰 Detailed Pricing Structure
- **Base Rate**: Price per square foot (varies by service type)
- **Distance Pricing**: FREE ≤ 40 miles → $X.XX per mile charge beyond 40 miles
- **Professional Cleaning History**: Tracks last professional cleaning date
- **First-Time vs. Repeat Customer**: Different discount eligibility

#### 📊 Price Calculation Formula:
```
Subtotal = (base_rate_per_sqft × square_feet) + (miles_over_40 × price_per_mile)
Discount = (frequency_discount_percentage × subtotal) [only if NOT first-time]
Final Total = Subtotal - Discount
```

### 🎁 Frequency Discounts (Apply from 2nd booking onwards)
- **One-time**: 0% discount
- **Weekly**: 10–20% discount  
- **Monthly**: 5–10% discount  
- **First booking**: NO discount (establishes customer relationship)
- **Repeat bookings**: Auto-discount applied by backend based on history

### 📋 Price Preview Components
1. **Base Cost Breakdown**: sq ft × rate per sq ft
2. **Distance Fee Breakdown**: miles over 40 × rate per mile (or "FREE" if ≤40)
3. **Subtotal Calculation**: Base + Distance fees
4. **Discount Application**: Percentage and dollar amount (if eligible)
5. **Final Total**: Clear, prominent display
6. **Service Summary**: Service type, area, distance, frequency, cleaning history  

---

## 🧭 Coordination Points
- Stored in AppSheet (address, contact, active flag)  
- Used for matching and distance validation  
- If no point < 100 miles → “No available coordination point nearby”  

---

## 🧾 Admin / AppSheet
- Non-technical admins manage prices, discounts, and points  
- Auto-syncs with Firestore  

---

## 💳 Payments & Feedback
- **Stripe Integration**: Payment intents, secure card processing, webhook handling ✅
- **Payment Flow**: Create payment intent → process card → confirm payment → update booking status
- **Security**: PCI-compliant payment processing with Stripe Elements
- Reviews and ratings per coordination point  
- "Work With Us" form → email + SMS notification
- **Admin Revenue Tracking**: Payment analytics and reporting in admin dashboard

---

## 🤖 GitHub Copilot Diagnostics & MVP Validation

### 1️⃣ Smart MVP Diagnostics
- Runs `review_report.sh` for comprehensive MVP feature validation
- **Authentication Checks**: JWT configuration, bcrypt setup, middleware validation
- **Admin Dashboard**: API endpoints, role-based access, stats functionality
- **Payment System**: Stripe integration, webhook configuration, security validation
- **Legal Compliance**: Terms, privacy policy, contact information endpoints
- Detects CORS, build errors, route loss, Docker misconfig, deployment issues  

### 2️⃣ Auto-Repair
- Rebuilds backend Dockerfile (`Node 20 LTS`, `WORKDIR /app/backend`, `EXPOSE 8080`, `CMD ["node","index.js"]`)  
- Ensures presence of `ENV PORT=8080` and `ENV HOST=0.0.0.0`  
- Restores missing routes or modules  
- Fixes Cloud Run startup and port binding automatically  

### 3️⃣ Frontend Validation
- Verifies `frontend/package.json`  
- Runs safe `npm install` → `npm run build`  
- Captures React build logs  

### 4️⃣ Cloud Run Healing
- Auto-retries deployment if container fails health check  
- Re-authenticates and re-deploys with `gcloud`  

### 5️⃣ MVP Secrets Check
Validates presence and syntax of:  
`GOOGLE_MAPS_API_KEY`, `GCP_PROJECT`, `GCP_SA_KEY`, `FIREBASE_KEY`, `JWT_SECRET`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `GITHUB_TOKEN`

### 6️⃣ Feedback Loop
- Commits fixes automatically (`auto-heal: …`)  
- Pushes to `main` and re-runs workflow  
- Final report states:  
  - ✅ No critical errors  
  - ❌ Errors found → Auto-repair triggered  

### 7️⃣ YAML Integrity
- Runs `yamllint` + `python -c "import yaml; yaml.safe_load(open('codox.yaml'))"`  
- Prevents malformed workflow commits  

---

## 🔧 review_report.sh Control
- GitHub Copilot may modify this script for MVP feature diagnostics.  
- Allowed edits: MVP diagnostics, authentication checks, admin validation, payment verification, deployment commands.  
- Protected sections: Cloud auth, secret validation, and GCP deploy syntax.  
- **PROJECT_GUIDE.md updates** — GitHub Copilot can update with developer authorization.

---

## 🗂 Structure

**Backend:**  
`index.js`, `firebase.js`, `Dockerfile`, `routes/auth_api.mjs`, `routes/admin_api.mjs`, `routes/payment_api.mjs`, `routes/legal_api.mjs`, `routes/bookings_api.mjs`

**Frontend:**  
`Dockerfile`, `vite.config.js`, `src/main.jsx`, `App.jsx`, `components/BookingForm.jsx`, `components/LoginForm.jsx`, `components/RegisterForm.jsx`, `components/AdminDashboard.jsx`, `components/PaymentModal.jsx`, `contexts/AuthContext.jsx`

**Automation:**  
`.github/workflows/deploy.yml`, `review_report.sh`

---

## ⚙️ Workflow
- Local install: `npm install` (never commit `node_modules`)  
- Deploy via:  
  - `bash deploy_backend.sh`  
  - `bash deploy_frontend.sh`  
- Environment variables:  
  - `GOOGLE_APPLICATION_CREDENTIALS=/app/firebase_config.json`  
  - `CALENDAR_ID=rahpodcast2022@gmail.com`  
  - `GOOGLE_MAPS_API_KEY=<key>`
  - `JWT_SECRET=<secret>` (for authentication)
  - `STRIPE_SECRET_KEY=<key>` (for payments)
  - `STRIPE_WEBHOOK_SECRET=<secret>` (for webhooks)

---

## 🗺️ Roadmap
- [x] Core routes ✅ 
- [x] Dynamic pricing ✅
- [x] GitHub Copilot Auto-Repair Trigger ✅ 
- [x] **JWT Authentication System** ✅
- [x] **Admin Dashboard APIs** ✅
- [x] **Stripe Payment Integration** ✅
- [x] **Legal Compliance APIs** ✅
- [x] **Enhanced Booking System** ✅
- [x] **Professional Cleaning History Tracking** ✅
- [x] **Detailed Price Preview System** ✅
- [x] **Smart Discount Logic (First-time vs Repeat)** ✅
- [x] **Artifact Registry Deployment** ✅
- [x] **Frontend Authentication UI** ✅
- [x] **Admin Dashboard Frontend** ✅
- [x] **Payment Processing Frontend** ✅
- [x] **Google Maps Integration** ✅
- [x] **User Session Management** ✅
- [ ] AppSheet Dashboard Integration  
- [ ] Email Notifications (booking confirmations)
- [ ] Advanced Booking Management (rescheduling)
- [ ] Cloud logging & analytics  
- [ ] SEO Optimization
- [ ] Custom Domain & SSL  

---

## 🧩 CI/CD Flow
- Trigger: GitHub Action → Playwright tests → `review_report.sh`  
- **Modern Deployment**: Artifact Registry (europe-west1-docker.pkg.dev) approach
- Validation order: **tests → secrets → backend build → frontend build → deploy → health test → report**  
- **MVP Validation**: Authentication, admin, payments, legal APIs tested
- On failure: GitHub Copilot analysis + redeploy  

---

## 🧰 AI Integration
- **GitHub Copilot** reads `PROJECT_GUIDE.md` and `agent.md`  
- Implements MVP features: authentication, admin dashboard, payments, legal compliance
- Suggests or commits code fixes through direct implementation
- Updates this file with developer authorization for MVP progress tracking

---

## 📦 Data / Firestore Collections
- **Core Collections**: `services`, `bookings`, `pricing`, `coordination_points`, `reviews`
- **Authentication**: `users` collection with hashed passwords, roles, profiles
- **Admin Analytics**: User stats, booking metrics, revenue tracking
- **Payment Records**: Transaction history, payment status tracking
- Auto-create missing collections if empty  
- Sync daily with AppSheet  

---

## 🛡️ Notes
**GitHub Copilot** reads this file for MVP logic and structure.  
🔒 **CRITICAL**: This PROJECT_GUIDE.md file is PROTECTED from automatic edits.  
**Manual Authorization Required**: Any changes to this guide must be explicitly authorized by the developer.  
**Read-Only for AI**: GitHub Copilot should reference this file for context but NOT modify it automatically.  
After any authorized change, run:  
`bash review_report.sh`

**MVP Status**: Authentication ✅ | Admin Dashboard ✅ | Payments ✅ | Legal ✅ | Deployment ✅ | Frontend UI ✅ | Google Maps ✅

## 🔧 Critical Fixes & Improvements (October 24, 2025)

### 💰 Price Preview System Fixes
- **FIXED**: Backend missing `/api/bookings/preview` endpoint that was causing 404 errors
- **ADDED**: Complete price calculation endpoint with service-based rates, distance fees, and discount logic
- **ENHANCED**: Real-time price updates when users change area, service type, or frequency

### 🎯 First-Time Customer Discount Logic (CRITICAL FIX)
- **ISSUE RESOLVED**: First-time customers were incorrectly receiving frequency discounts
- **NEW LOGIC**: 
  - ❌ **NO discounts for first-time customers** regardless of frequency selection
  - ✅ **Discounts only apply from 2nd booking onwards** (proper repeat customer logic)
  - 🎁 **Future discount promises shown** to first-time customers (e.g., "Starting from your 2nd booking: 15% discount!")

### 📊 Discount Structure (Corrected)
- **Weekly Frequency**: 15% discount (returning customers only)
- **Monthly Frequency**: 8% discount (returning customers only)  
- **One-time**: No discount available
- **First-time customers**: See pricing promise for future bookings

### 🎨 UI/UX Improvements
- **Calendar Styling**: Enhanced readability with better contrast, larger text, professional appearance
- **Price Preview Display**: 
  - Clear "Calculating Price..." state while loading
  - Detailed breakdown shows base rate, distance fees, discounts, and final total
  - First-time customer messaging with future discount promises
  - Error handling for missing address or calculation failures

### 🔧 Technical Implementation
- **Backend**: Added `futureDiscountPercent` field to preview responses
- **Frontend**: Conditional rendering based on `isFirstTime` status
- **Validation**: Proper error handling and fallback messages for price preview
- **Pricing Logic**: Service-based rates ($0.15-$0.30 per sq ft depending on service type)

### 📱 Customer Experience Enhancements
- **Transparency**: Clear explanation of why first-time customers don't get discounts
- **Future Value**: Prominent display of discount benefits for repeat bookings  
- **Professional Messaging**: "First-Time Customer - No Discount Today" with green promise box
- **Loading States**: Better visual feedback during price calculations

### 🧪 Testing Results
- **First-time weekly booking**: $225 total (no discount) + future 15% promise ✅
- **Returning weekly customer**: $191.25 total (15% discount applied) ✅
- **Distance calculations**: Free up to 40 miles, $1.50/mile beyond ✅
- **Price preview**: Instant display when area + service selected ✅

## 🎉 Live Application
- **Frontend**: https://cleanpro-frontend-5539254765.europe-west1.run.app
- **Backend**: https://cleanpro-backend-5539254765.europe-west1.run.app
- **Demo Admin**: admin@cleandeparture.com / admin123

## 📊 Feature Completion Status
- **User Authentication**: 100% ✅ (Login, Register, JWT, Protected Routes)
- **Admin Dashboard**: 100% ✅ (Bookings, Users, Analytics, Management)
- **Payment Processing**: 95% ✅ (Stripe Integration, needs production keys)
- **Booking System**: 100% ✅ (Dynamic pricing, Google Maps, Calendar)
- **Price Preview System**: 100% ✅ (Base rate, distance, discounts, breakdown) - **FIXED 404 errors**
- **Professional Cleaning History**: 100% ✅ (Last cleaning tracking, first-time logic)
- **Smart Discount System**: 100% ✅ (Frequency discounts, repeat customer logic) - **CRITICAL FIX: No first-time discounts**
- **Google Maps**: 100% ✅ (Address autocomplete, distance calculation)
- **User Experience**: 100% ✅ (Loading states, error handling, responsive, calendar styling)
- **Business Logic**: 100% ✅ (Pricing, discounts, coordination points) - **CORRECTED discount eligibility**

## 🎯 Pricing Logic Validation (Post-Fix)
- **Test 1**: First-time customer, 1500 sq ft, weekly → **$225.00** (NO discount) + 15% future promise ✅
- **Test 2**: Returning customer, 1500 sq ft, weekly → **$191.25** (15% discount applied) ✅  
- **Test 3**: Distance >40 miles → Proper distance fee calculation ✅
- **Test 4**: Price preview loads instantly when area + service entered ✅

**(End of PROJECT_GUIDE.md – MVP Implementation COMPLETE & DEPLOYED with CRITICAL FIXES)**
