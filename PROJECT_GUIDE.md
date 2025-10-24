# 🧭 CleanPro MVP + GitHub Copilot System – Project Guide
⚠️ SYSTEM CONTEXT FILE — **GitHub Copilot Managed**  
Used by **GitHub Copilot** to understand project goals, structure, and workflow for **MVP features, diagnostics, and deployment**.  
✅ MVP Features: Authentication, Admin Dashboard, Payments, Legal Compliance

**Last Updated**: October 24, 2025 - MVP Deployment with Artifact Registry ✅

---

## 🎯 Goal
Create a **complete cleaning platform MVP** with dynamic services, Google Maps/Calendar integration, user authentication, admin dashboard, payment processing, and legal compliance — supported by **GitHub Copilot** for automation, diagnostics, and deployment with modern Artifact Registry approach.

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

### 🎨 Frontend (React / Vite)
- Tailwind / MUI styling  
- **User Authentication**: Login, registration, profile management with JWT tokens
- **Admin Dashboard**: Business management interface for authenticated admin users
- **Payment Integration**: Stripe payment forms and transaction handling
- Booking form with dynamic pricing, distance, discounts, and Google Maps  
- Coordination point validation (<100 miles)
- Real-time price updates via backend API
- Role-based UI components and protected routes---

## 🧼 Service Logic

### Categories
1. Commercial Cleaning  
2. Residential Cleaning → Standard, Deep, Move-In/Out  

### Pricing
- Base price per sq ft  
- Free ≤ 40 miles → extra per-mile charge beyond  
- Discounts via AppSheet (frequency / loyalty)  

Formula:  
`total = (base_rate * sqft) + (extra_mile_rate * miles_over_40) - discount`

### Frequency Discounts
- One-time = 0 %  
- Weekly = 10–20 %  
- Monthly = 5–10 %  
- First booking = no discount  
- Repeat = auto-discount applied by backend  

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
`index.js`, `firebase.js`, `Dockerfile`, `routes/auth_api.mjs`, `routes/admin_api.mjs`, `routes/payment_api.mjs`, `routes/legal_api.mjs`, `routes/bookings_api.mjs`, `deploy_backend.sh`

**Frontend:**  
`Dockerfile`, `vite.config.js`, `src/main.jsx`, `App.jsx`, `components/...`

**Automation:**  
`.github/workflows/deploy.yml`, `review_report.sh`, `deploy_frontend.sh`, `deploy_backend.sh`

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
- [x] Core routes  
- [x] Dynamic pricing  
- [x] GitHub Copilot Auto-Repair Trigger  
- [x] **JWT Authentication System** ✅
- [x] **Admin Dashboard APIs** ✅
- [x] **Stripe Payment Integration** ✅
- [x] **Legal Compliance APIs** ✅
- [x] **Enhanced Booking System** ✅
- [x] **Artifact Registry Deployment** ✅
- [ ] Frontend admin dashboard UI
- [ ] AppSheet Dashboard  
- [ ] Customer login frontend
- [ ] Auto HQ assign  
- [ ] Cloud logging & analytics  
- [ ] Discount automation  

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
Preserve existing sections while adding MVP features.  
Updates allowed with developer authorization.  
After any change, run:  
`bash review_report.sh`

**MVP Status**: Authentication ✅ | Admin Dashboard ✅ | Payments ✅ | Legal ✅ | Deployment ✅

**(End of PROJECT_GUIDE.md – MVP Implementation Complete)**
