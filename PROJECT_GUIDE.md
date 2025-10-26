# 🧭 Clean Departure MVP + GitHub Copilot System – Project Guide
⚠️ SYSTEM CONTEXT FILE — **GitHub Copilot Managed**  
Used by **GitHub Copilot** to understand project goals, structure, and workflow for **MVP features, diagnostics, and deployment**.  
✅ MVP Features: Authentication, Admin Dashboard, Payments, Legal Compliance, Google Maps Integration

🔒 **EDIT PROTECTION**: This file should NOT be automatically modified. Changes require explicit developer authorization only.
🔐 GitHub Copilot Policy: This file is read-only by default.  
Any edits must follow the 2-step developer authorization process (manual confirmation in Codespaces + signed commit).

📋 **MANDATORY REVIEW PROCESS**: 
- **After each deployment**: GitHub Copilot MUST run `./review_report.sh` to validate system state
- **Before new tasks**: GitHub Copilot MUST review this PROJECT_GUIDE.md for current context
- **Post-task completion**: Update documentation and run comprehensive validation
- **NO EXCEPTIONS**: Every deployment cycle requires full review and validation


**Last Updated**: October 26, 2025 - MVP COMPLETE with Full Authentication, Admin Dashboard, Payments & Maps ✅  
**Secret Management**: Enhanced with local vs CI/CD environment differentiation  
**Review Process**: Mandatory validation after each deployment and before new tasks

---

## 🎯 Goal
Create a **complete cleaning platform MVP** with dynamic services, Google Maps/Calendar integration, user authentication, admin dashboard, payment processing, and legal compliance — **FULLY IMPLEMENTED** and supported by **GitHub Copilot** for automation, diagnostics, and deployment with modern Artifact Registry approach.

**STATUS**: 🎉 **MVP COMPLETE & DEPLOYED** - All core features functional and live!

---

## 🤖 MANDATORY GITHUB COPILOT REVIEW PROCESS

### 📋 **CRITICAL WORKFLOW REQUIREMENTS**
1. **Post-Deployment**: MUST run `./copilot_mandatory_review.sh` after every deployment
2. **Pre-Task**: MUST review this PROJECT_GUIDE.md before starting new development tasks  
3. **Post-Task**: MUST update documentation and validate all changes
4. **NO EXCEPTIONS**: Full validation cycle required for every development iteration

### 🔍 **Review Automation Script**
```bash
# Run comprehensive review system
./copilot_mandatory_review.sh

# Individual components
./review_report.sh              # System health & secrets
./test_coordination_api.sh      # API endpoint validation  
./setup_local_secrets.sh        # Local development setup
```

### 🚫 **NO BYPASS POLICY ENFORCEMENT**
- Every deployment must pass comprehensive validation
- All temporary fixes forbidden - permanent solutions only
- Documentation must be current and complete
- Secret management must follow established patterns

---

## 🔐 Secret Management & Environment Differentiation

### 📊 Environment Types
- **🏠 Local Development**: `.env` files, no GitHub Secrets access (normal behavior)
- **🔧 GitHub Actions CI/CD**: GitHub repository secrets, strict validation
- **☁️ Cloud Run Production**: Environment variables injected from GitHub Secrets

### 🔑 Secret Categories
- **🏗️ Core Infrastructure**: `GCP_PROJECT`, `GCP_SA_KEY` (service account JSON)
- **🔐 Authentication & Security**: `JWT_SECRET`, `FIREBASE_KEY`
- **🗺️ External APIs**: `GOOGLE_MAPS_API_KEY`, `OPENAI_API_KEY`
- **💳 Payment Processing**: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
- **📊 Integration**: `APPSHEET_API_KEY`, `APPSHEET_APP_ID`

### 🔧 Local Development Secret Management
- **Setup Script**: `./setup_local_secrets.sh` (automated configuration)
- **Local File**: `.env.local` (git-ignored, development credentials only)
- **Protection**: Enhanced `.gitignore` with comprehensive secret patterns
- **Separation**: Development vs Production credentials (never mix)
- **Security**: Zero risk of public exposure, automatic loading

### ⚠️ Common Issues & Diagnostics
1. **GCP_SA_KEY JSON Format**:
   - Issue: Multi-line private keys breaking shell parsing in GitHub Actions
   - Fix: Use temp file approach in validation scripts
   - Validation: Requires `project_id`, `private_key`, `client_email` fields

2. **Local vs CI/CD Environment**:
   - Local: Use `.env.local` with development credentials
   - CI/CD: ✅/❌ Strict validation with deployment blocking
   - Production: Auto-injection from validated GitHub Secrets

3. **Secret Validation Levels**:
   - Basic: Presence check (`-z` test)
   - Advanced: JSON structure validation with required fields
   - Deployment: Runtime functionality verification

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
- If no point < 100 miles → "No available coordination point nearby"  

---

## 📊 AppSheet Integration
- **Complete two-way data sync** between Clean Departure and AppSheet
- **Admin-friendly interface** for managing pricing and coordination points
- **Real-time synchronization** with Firestore database

### AppSheet Tables Structure:
1. **CoordinationPoints**: name, address, contact, phone, email, active, latitude, longitude
2. **Pricing**: service_id, price_per_m2, weekly_discount, monthly_discount, distance_fee, free_distance
3. **Bookings**: Booking data can be pushed to AppSheet for external management

### API Endpoints:
- `POST /api/appsheet/sync/coordination-points` - Sync coordination points from AppSheet
- `POST /api/appsheet/sync/pricing` - Sync pricing data from AppSheet
- `POST /api/appsheet/sync/all` - Sync all data from AppSheet
- `POST /api/appsheet/push/booking/:id` - Push booking to AppSheet
- `GET /api/appsheet/config` - Check AppSheet configuration
- `POST /api/appsheet/test` - Test AppSheet connection

### Admin Dashboard Features:
- ✅ **Connection Testing**: Verify AppSheet API connectivity
- ✅ **One-click Sync**: Sync coordination points and pricing data
- ✅ **Configuration Status**: Visual indicators for setup completion
- ✅ **Error Handling**: Clear feedback for sync operations

---

## 🧾 Admin / AppSheet
- Non-technical admins manage prices, discounts, and points through AppSheet interface
- **Automated synchronization** with Clean Departure application
- **Version control** and audit trail through AppSheet
- **Role-based access** for different admin functions

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

## 🔧 review_report.sh & deploy.yml Master Documentation
- **Master Reference**: All scripts must reference `PROJECT_GUIDE.md` as the authoritative documentation
- **review_report.sh**: Validates deployment readiness according to this guide's standards
- **deploy.yml**: Implements deployment architecture documented in this guide
- **Consistency Rule**: Any changes to deployment approach must be documented here first
- GitHub Copilot may modify these scripts for MVP feature diagnostics following this guide
- Allowed edits: MVP diagnostics, authentication checks, admin validation, payment verification, deployment commands
- Protected sections: Cloud auth, secret validation, and GCP deploy syntax per this guide
- **PROJECT_GUIDE.md updates** — GitHub Copilot can update with developer authorization

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
  - `APPSHEET_API_KEY=<key>` (for AppSheet integration)
  - `APPSHEET_APP_ID=<id>` (for AppSheet integration)

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
- [x] **Booking Approval Workflow** ✅
- [x] **Email Notification System** ✅
- [x] **AppSheet Integration** ✅
- [ ] Advanced Booking Management (rescheduling)
- [ ] Cloud logging & analytics  
- [ ] SEO Optimization
- [ ] Custom Domain & SSL  

---

## 🧩 CI/CD Flow & Deployment Architecture

### 🏗️ Modern Deployment Stack
- **GitHub Secrets**: All sensitive data (API keys, credentials) stored securely in GitHub repository secrets
- **Artifact Registry**: Modern container registry (europe-west1-docker.pkg.dev) for Docker images
- **Direct Environment Variables**: Clean `--set-env-vars` approach without complex environment files
- **No Local Environment Files**: No `.env` files or manual credential management needed

### 🔄 Deployment Flow
- Trigger: GitHub Action → Secret validation → Playwright tests → `review_report.sh`
- **Clean Deployment**: Artifact Registry (europe-west1-docker.pkg.dev) approach
- Validation order: **secret-validation → tests → backend build → frontend build → deploy → health test → report**
- **MVP Validation**: Authentication, admin, payments, legal APIs tested
- On failure: GitHub Copilot analysis + redeploy

### 🔐 Secret Management (GitHub Secrets Only)
```yaml
# All secrets managed via GitHub UI: Repository → Settings → Secrets and variables → Actions
GCP_PROJECT: cleanpro-site
GCP_SA_KEY: {...}  # Full service account JSON for deployment
FIREBASE_KEY: {...}  # Firebase service account for app runtime
GOOGLE_MAPS_API_KEY: AIza...
OPENAI_API_KEY: sk-...
JWT_SECRET: secure-random-string
STRIPE_SECRET_KEY: sk_test_...
STRIPE_WEBHOOK_SECRET: whsec_...
APPSHEET_API_KEY: ...
APPSHEET_APP_ID: ...
```

### 🚀 Cloud Run Deployment
```bash
# Clean approach - no environment files needed
gcloud run deploy cleanpro-backend \
  --image "europe-west1-docker.pkg.dev/$GCP_PROJECT/cloud-run-source-deploy/cleanpro-backend" \
  --region europe-west1 \
  --set-env-vars "FIREBASE_KEY=${{ secrets.FIREBASE_KEY }}" \
  --set-env-vars "GOOGLE_MAPS_API_KEY=${{ secrets.GOOGLE_MAPS_API_KEY }}" \
  --set-env-vars "OPENAI_API_KEY=${{ secrets.OPENAI_API_KEY }}"
```

### ✅ Benefits of This Architecture
- **Security**: All secrets in GitHub Secrets, never in code or files
- **Simplicity**: No environment file complexity or credential management
- **Reliability**: Direct secret injection to Cloud Run containers
- **Maintainability**: Single source of truth for all configuration  

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
