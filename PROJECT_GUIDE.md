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
1. **Pre-Deployment**: MUST run local testing via `./test_backend_local.sh` before any deployment
2. **Post-Deployment**: MUST run `./copilot_mandatory_review.sh` after every deployment
3. **Pre-Task**: MUST review this PROJECT_GUIDE.md before starting new development tasks  
4. **Post-Task**: MUST update documentation and validate all changes
5. **NO EXCEPTIONS**: Full validation cycle required for every development iteration
6. **LOCAL FIRST**: Test locally with curl/bash before deploying to prevent Cloud Run failures

### 🔍 **Review Automation Script**
```bash
# MANDATORY: Test locally before deployment
./test_backend_local.sh           # Local backend testing with curl

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

### 🎯 First-Time Customer Messaging
- **Weekly Service Selection**: "First-time customer - No discount today. Starting from your 2nd booking: 15% weekly discount!"
- **Monthly Service Selection**: "First-time customer - No discount today. Starting from your 2nd booking: 8% monthly discount!"
- **Discount Promise**: Clear messaging about future savings to encourage repeat bookings
- **Eligibility**: Discounts only available from 2nd booking onwards (proper repeat customer logic)

### �️ Coordination Point Availability & Registration
- **Distance Check**: If no coordination points within 50km (≈31 miles) of client location
- **Encouragement Message**: "Thanks for your interest! Unfortunately, we don't have coordination points near your location yet. Would you like to register as a coordination point and serve your local area?"
- **Registration Opportunity**: Convert no-service situations into business expansion opportunities
- **Distance Validation**: Automatically check CP availability before showing booking form

### 📱 Digital Marketing & Share Links
- **Individual CP Share Links**: Each coordination point gets unique shareable marketing link
- **Privacy Protection**: Share links show CP services and coverage area WITHOUT contact details
- **Platform-Only Booking**: Clients can only book through platform - no direct contact until payment confirmed
- **Marketing Features**: 
  - CP name and service area display
  - Quality ratings and reviews
  - Service descriptions and pricing
  - "Book Now" button that routes through platform
- **SEO Optimization**: Each CP gets their own landing page for local marketing  

### 🏢 Coordination Point Registration System
- **Public Registration Portal**: `/register-cp` - Public-facing CP registration form
- **Application Process**: Multi-step registration with identity verification
- **Required Information**:
  - Business/individual details and tax ID
  - Service coverage area (address + radius)
  - Insurance documentation
  - Stripe identity verification
  - Professional references
- **Admin Approval Workflow**: All CP applications require admin review and approval
- **Quality Standards Agreement**: CPs must accept service quality standards and conduct policies
- **Onboarding Process**: Training materials and platform orientation for approved CPs

---

## 🌍 Clean Departure Marketplace + AI-Powered AdminSheet System

> **Clean Departure — your trusted platform for safe, verified, and transparent cleaning services, powered by smart automation.**

### 🛡️ Platform Role & Trust
- Clean Departure is a **trusted platform** that connects clients with verified cleaning professionals
- Every service partner is **identity-checked and reviewed for quality**
- The platform ensures **secure payments, transparent pricing, and fair resolution** for all bookings
- **Client satisfaction is central** — issues are reviewed and resolved quickly by our support team
- **Complete admin management** interface for global coordination points with AI assistance

### 🔐 Privacy & Safety System:
- Client and CP contact details remain hidden **until payment is confirmed** to ensure privacy and prevent off-platform transactions
- **After payment confirmation**, both parties gain access to verified contact information (phone / email / address) for safety, coordination, and service verification
- All communication is still logged through the in-app messaging system for transparency and dispute protection
- AI moderation continues to monitor messages for spam or policy violations while preserving client-CP communication freedom
- **AI Communication Monitoring**: Advanced tone analysis and red flag detection system
  - **Review Tone Analysis**: AI monitors review language for inappropriate content, fake reviews, or manipulative patterns
  - **Communication Red Flags**: Detects insulting language, harassment, threats, discriminatory content, or unprofessional behavior
  - **Automated Reporting**: Red flag incidents automatically reported to AdminSheet with severity levels and email alerts
  - **Pattern Recognition**: AI identifies repeat offenders and escalating communication issues
- **Stripe Identity verification** for EU + DK + US compliance with privacy protection
- **Dynamic escrow payment system** with configurable hold periods ensuring secure transactions

### 🤖 AI-Powered AdminSheet Intelligence:
#### **Intelligent Reporting**
- **Weekly AI reports** on platform performance, ratings, and dispute trends
- **Monthly/yearly financial summaries** for accounting and tax documentation
- **Real-time analytics** for admin decision-making and business insights

#### **Smart Adjustments**
- **AI suggests fee or policy updates** by country, currency, or performance trends
- **Detects anomalies** (fraud, repeated no-shows, refund spikes)
- **Communication Quality Monitoring**: AI analyzes tone, professionalism, and red flag behaviors
  - **Insulting Language Detection**: Automatic flagging of inappropriate, offensive, or abusive communication
  - **Red Flag Reporting**: Instant alerts to AdminSheet and email notifications for serious violations
  - **Tone Scoring**: Professional communication scores for CPs and clients with trend analysis
  - **Escalation Protocols**: Automatic escalation for repeated violations or threatening behavior
- **Predictive matching** recommends the most suitable CPs for each job
- **Auto-balance feature** distributes bookings evenly among active CPs

#### **Dynamic Rules Management**
- **Country rules, payout holds, and subscription fees** managed centrally
- **Auto-adjusted by AI or Admin** based on performance data
- **Real-time approval/deactivation** of coordination points with AI recommendations

### 💰 Financial Control & Transparency:
- **Registration or subscription fee** (configurable in AdminSheet) paid during signup via Stripe
- **Platform and CP revenues handled transparently** with AI ledger for easy reporting and compliance
- Client pays full amount → funds held in **secure escrow**
- **Payout Rules**: Funds held until client approval OR **48h auto-release after scheduled cleaning date** (not booking date)
- **Client Rejection**: If client rejects within 48h → payout paused; admin reviews issue before release or refund
- **No-Show Protocol**: If CP fails to show up → client reports "no-show" → admin cancels job and **100% refund to client** (Stripe reverses full payment)
- **Dynamic Fee Management**: AdminSheet can adjust fees for targeted CPs while maintaining auto common fee for all others
- Transparent payment tracking and dispute resolution with AI assistance

### 🏆 Growth & Quality Assurance:
- **AI quality score** combines ratings, completion rates, and client feedback
- **Predictive matching** recommends the most suitable CPs for each job
- **Optional "auto-balance" feature** distributes bookings evenly among active CPs
- **Identity verification and quality review** for all service partners
- **Smart naming system**: CP chooses public name (e.g., *Tiger Clean*, *Isax Group*) or auto-assigned: **Clean Departure 1, 2, 3...**

### 🌟 Client-Driven Workflow (Trust-Focused):
1. **Client books service** → system lists nearby verified CPs (<100 km)
2. **Client selects preferred CP** → job pending with secure communication through platform messaging
3. **Client completes payment** → funds held securely in escrow
4. **CP accepts/rejects through platform** → if accepted, **client immediately receives CP contact details (name, email, phone) via secure email**
5. **Direct communication enabled** → client can contact CP directly for scheduling and coordination
6. **Service completion** → payment released after client approval or 48h auto-release
7. **AI-powered quality tracking** ensures continuous service improvement
8. **Safety backup** → CP contact information stored in client's email for reference and emergency contact

### 🌐 Dynamic Global Settings & Compliance:
- **Country, currency, unit** (m² / sq ft), **language** = auto-detected by geo with AI optimization
- **Regional Tax Requirements**: Country/state-specific tax ID requirements auto-configured
- **Registration Compliance**: CPs must accept terms including quality standards, client satisfaction requirements, tax compliance, and professional conduct
- Stored in AdminSheet (not hard-coded) with AI-suggested regional adjustments
- **Regional compliance** and localization support with automated updates
- **Multi-currency** payment processing with AI fraud detection

### AdminSheet Tables Structure:
1. **CoordinationPoints**: id, name, address, tax_id, stripe_identity_status, active, admin_approved, custom_fee_percentage, ai_quality_score, communication_score, contact_email, contact_phone, identity_required, verification_provider, verified_date, verification_status, insurance_provided, insurance_details
2. **EscrowSettings**: hold_period_hours, auto_release_enabled, region_settings, release_trigger_date_type, ai_optimization_enabled  
3. **RegionalSettings**: country, currency, unit_system, language, tax_requirements, tax_id_mandatory, ai_suggested_adjustments
4. **PaymentHolds**: booking_id, amount, hold_start, scheduled_cleaning_date, release_conditions, status, ai_fraud_score
5. **RegistrationTerms**: quality_standards, satisfaction_requirements, conduct_policies, tax_compliance_text, insurance_requirements
6. **FeeStructure**: base_platform_fee, cp_custom_fees, regional_adjustments, subscription_fees
7. **AIReports**: report_type, generated_date, performance_metrics, trends_analysis, recommendations
8. **CommunicationLogs**: message_id, sender_type, content_filtered, ai_moderation_flags, timestamp, tone_score
9. **RedFlags**: incident_id, user_id, incident_type, severity_level, detected_content, ai_analysis, admin_status, created_at, resolved_at
10. **ReviewAnalysis**: review_id, booking_id, reviewer_type, authenticity_score, tone_analysis, red_flag_indicators, ai_confidence
11. **ContactSharing**: booking_id, client_email, cp_contact_shared, shared_timestamp, email_sent_status, contact_details_backup

### API Endpoints:
- `GET /api/adminsheet/coordination-points` - List all CPs with status, custom fees, AI quality scores, and communication scores
- `POST /api/adminsheet/cp/approve/:id` - Approve/activate CP with AI recommendation review
- `POST /api/adminsheet/cp/deactivate/:id` - Deactivate CP with AI analysis
- `POST /api/adminsheet/cp/set-fee/:id` - Set custom fee percentage for specific CP
- `POST /api/adminsheet/cp/set-identity-requirement/:id` - Admin control for identity verification requirement
- `POST /api/adminsheet/cp/manual-verify/:id` - Complete manual verification for CP
- `GET /api/adminsheet/cp/nearby/:location` - Find CPs within 50km radius, show registration opportunity if none
- `POST /api/adminsheet/cp/register` - Public CP registration form submission
- `GET /api/adminsheet/cp/share-link/:id` - Get shareable marketing link for specific CP
- `GET /api/adminsheet/cp/public/:id` - Public CP landing page (no contact details)
- `GET /api/adminsheet/escrow/settings` - Get escrow configuration with AI optimization status
- `POST /api/adminsheet/escrow/settings` - Update hold periods and release rules
- `POST /api/adminsheet/stripe/verify/:id` - Trigger Stripe Identity verification
- `GET /api/adminsheet/regional/settings` - Get regional configuration with AI-suggested adjustments
- `POST /api/adminsheet/regional/tax-requirements` - Update regional tax ID requirements
- `GET /api/adminsheet/registration/terms` - Get registration terms and declarations
- `POST /api/adminsheet/registration/terms` - Update registration requirements
- `POST /api/adminsheet/payment/no-show/:booking_id` - Process no-show refund with AI analysis
- `POST /api/adminsheet/payment/dispute/:booking_id` - Handle payment disputes with AI assistance
- `GET /api/adminsheet/ai/reports` - Get AI-generated performance and trend reports
- `POST /api/adminsheet/ai/optimize` - Trigger AI optimization recommendations
- `GET /api/adminsheet/communication/moderate` - AI content moderation for messaging
- `POST /api/adminsheet/communication/analyze-tone` - Real-time tone analysis for messages
- `GET /api/adminsheet/red-flags` - Get all red flag incidents with severity levels
- `POST /api/adminsheet/red-flags/resolve/:id` - Mark red flag incident as resolved
- `GET /api/adminsheet/red-flags/user/:user_id` - Get red flag history for specific user
- `POST /api/adminsheet/reviews/analyze` - AI analysis of review authenticity and tone
- `GET /api/adminsheet/communication/scores` - Get communication quality scores for users
- `POST /api/adminsheet/booking/share-contact/:booking_id` - Share CP contact details with client after payment
- `GET /api/adminsheet/contact-sharing/history` - Get contact sharing audit trail
- `POST /api/adminsheet/contact-sharing/resend/:booking_id` - Resend CP contact details to client
- `POST /api/adminsheet/matching/predict` - AI-powered CP matching for bookings
- `POST /api/adminsheet/init/schema` - Initialize AdminSheet database schema

### 🆔 CP Identification Control

**Manual Management via AdminSheet**: Identification and background checks are **manually managed** through the AdminSheet system, giving administrators full control over verification requirements on a case-by-case basis.

#### **Control Features:**
- **Admin Decision Authority**: Admin can **activate or deactivate** verification requirements at any time for any CP
- **Flexible Verification Options**: Support for **Stripe Identity**, **Checkr**, **Veriff**, or **manual review** processes
- **Case-by-Case Basis**: Admin decides verification needs individually (e.g., trusted or known CPs can be approved without ID checks)
- **No Automatic Enforcement**: No thresholds or automatic triggers - purely admin-controlled

#### **CP Registration Fields:**
- `identity_required` (boolean) - Admin-controlled flag for verification requirement
- `verification_provider` (string) - Selected verification service (stripe_identity/checkr/veriff/manual)
- `verified_date` (timestamp) - Date of completed verification (if applicable)
- `verification_status` (string) - pending/verified/exempt/failed
- `insurance_provided` (boolean) - **Optional** insurance coverage (not required)
- `insurance_details` (object) - Insurance provider and policy information (optional)

#### **Verification Workflow:**
1. **CP Registration**: All CPs register normally via public form
2. **Admin Review**: Admin reviews application in AdminSheet dashboard  
3. **Verification Decision**: Admin decides if identity verification is needed
4. **Flexible Approval**: Admin can approve with or without verification based on trust level
5. **Optional Insurance**: Insurance coverage is recommended but not mandatory

#### **Admin Controls:**
- **Toggle verification requirement** per CP instantly
- **Override verification** for trusted providers
- **Manual approval** option bypassing all automated checks
- **Insurance tracking** without enforcement (optional field)

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
