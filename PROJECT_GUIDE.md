# 🧭 CleanPro Site + Codox System – Project Guide
⚠️ SYSTEM CONTEXT FILE — **READ-ONLY (Auto-edit disabled)**  
Used by **Codox GPT** to understand project goals, structure, and workflow for **automation, diagnostics, and self-healing**.  
⛔️ This file may only be *read*, not modified automatically.

---

## 🎯 Goal
Create a **self-maintaining cleaning platform** with dynamic services, Google Maps/Calendar integration, and AppSheet-based admin control — supported by an **autonomous Codox pipeline** that detects and repairs build, deploy, and environment issues automatically.

---

## ✅ Objectives

### 🧱 Backend (Node.js / Express)
- REST APIs for: services, pricing, bookings, maps, and calendar  
- Firestore data layer  
- Cloud Run ready (`process.env.PORT || 8080`)  
- Health check: `GET /` → “✅ CleanPro Backend is running”  
- Auto-patched routes: `/api/services`, `/api/bookings`, `/api/calendar`  
- **Auto-fix rule:** ensure `app.listen(process.env.PORT || 8080, "0.0.0.0")` is present in `index.js`

### 🎨 Frontend (React / Vite)
- Tailwind / MUI styling  
- Booking form with dynamic pricing, distance, discounts, and Google Maps  
- Coordination point validation (<100 miles)  
- Real-time price updates via backend API  

---

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
- Stripe / PayPal integration (planned)  
- Reviews and ratings per coordination point  
- “Work With Us” form → email + SMS notification  

---

## 🤖 Codox Diagnostics & Self-Healing

### 1️⃣ Smart Diagnostics
- Runs `review_report.sh` for backend + frontend checks  
- Detects CORS, build errors, route loss, Docker misconfig, YAML issues  

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

### 5️⃣ Secrets Check
Validates presence and syntax of:  
`GOOGLE_MAPS_API_KEY`, `GCP_PROJECT`, `GCP_SA_KEY`, `FIREBASE_KEY`, `OPENAI_API_KEY`, `GITHUB_TOKEN`

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
- Codox may modify this script automatically.  
- Allowed edits: diagnostics, self-healing logic, route validation, deployment commands.  
- Protected sections: Cloud auth, secret validation, and GCP deploy syntax.  
- **PROJECT_GUIDE.md itself is locked** — Codox can only *read*, never write.

---

## 🗂 Structure

**Backend:**  
`index.js`, `firebase.js`, `Dockerfile`, `routes/...`, `deploy_backend.sh`

**Frontend:**  
`Dockerfile`, `vite.config.js`, `src/main.jsx`, `App.jsx`, `components/...`

**Automation:**  
`.github/workflows/codox.yaml`, `review_report.sh`, `deploy_frontend.sh`, `deploy_backend.sh`

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

---

## 🗺️ Roadmap
- [x] Core routes  
- [x] Dynamic pricing  
- [x] Codox Auto-Repair Trigger  
- [ ] Stripe / PayPal  
- [ ] AppSheet Dashboard  
- [ ] Customer login  
- [ ] Auto HQ assign  
- [ ] Cloud logging & analytics  
- [ ] Discount automation  

---

## 🧩 CI/CD Flow
- Trigger: GitHub Action → `review_report.sh`  
- Validation order: **secrets → backend → frontend → deploy → health test → report**  
- On failure: auto-repair + redeploy  

---

## 🧰 AI Integration
- Codox GPT reads `PROJECT_GUIDE.md` and `agent.md`  
- Suggests or commits code fixes through GitHub PR  
- Auto-editing of this file is **strictly prohibited**

---

## 📦 Data / Firestore Collections
- `services`, `bookings`, `pricing`, `coordination_points`, `reviews`  
- Auto-create missing collections if empty  
- Sync daily with AppSheet  

---

## 🛡️ Notes
Codox GPT reads this file for logic and structure.  
Do **not rename sections or edit automatically**.  
Only manual updates allowed by authorized developer.  
After any manual change, run:  
`bash review_report.sh`

**(End of PROJECT_GUIDE.md – Auto-editing permanently disabled)**  
