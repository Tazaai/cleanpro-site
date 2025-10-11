# 🧭 CleanPro Site – Project Guide
⚠️ SYSTEM CONTEXT FILE — DO NOT EDIT MANUALLY  
Used by Codox GPT to understand project goals, structure, and workflow for automation and self-healing.

## 🎯 Goal
Build a full cleaning service platform with dynamic services, transparent pricing, Google Maps/Calendar integration, and AppSheet admin control. Future: Stripe/PayPal payments and analytics.

## ✅ Objectives
### Backend (Node.js / Express)
- REST APIs for services, pricing, bookings, maps, and calendar  
- Firestore data layer  
- Cloud Run ready (binds to process.env.PORT || 8080)  
- Health check: GET / → “✅ CleanPro Backend is running”
### Frontend (React / Vite)
- Tailwind or MUI  
- Booking form: Full Name, Address, Email, Phone, Property Type, Bedrooms, Bathrooms, Date of last cleaning, Frequency (One-time / Weekly / Monthly), Dropdown services, Dynamic price preview, Distance & discount info, Warning if >100 miles from coordination point.

## 🧼 Service Logic
### Services
1. Commercial Cleaning  
2. Residential Cleaning: Standard, Deep, Move-In/Out  
→ All priced by total sq ft (not m²).
### Pricing
- Base price per sq ft  
- Free ≤ 40 miles, extra charge per mile after  
- Discounts managed dynamically via AppSheet  
Formula:  
`total = (base_rate * sqft) + (extra_mile_rate * miles_over_40) - discount`
### Frequency & Discounts
- One-time: no discount  
- Weekly: dynamic 10–20% via AppSheet  
- Monthly: dynamic 5–10% via AppSheet  
- First booking (by address): no discount  
- Repeat address: auto-discount applied by backend

## 🧭 Coordination Points
- Managed via AppSheet: address, active, phone, email  
- Used for distance and availability  
- No point within 100 miles → show “No available coordination point nearby”

## 🧾 Admin / AppSheet
- Admins (non-tech) can edit pricing, discounts, coordination points  
- Auto-syncs to backend Firestore

## 💳 Payments & Feedback
- Stripe / PayPal + manual check  
- Star ratings + reviews per coordination point  
- “Work With Us” → sends email + phone notification to HQ

## 🗂 Structure
Backend: index.js, firebase.js, Dockerfile, deploy_backend.sh, routes/...  
Frontend: Dockerfile, package.json, vite.config.js, src/main.jsx, App.jsx, components (Services, BookingForm, BookingMap, WorkWithUs)

## ⚙️ Workflow
- npm install locally (never commit node_modules)  
- Deploy via:  
`bash deploy_backend.sh`  
`bash deploy_frontend.sh`  
- Env vars:  
`GOOGLE_APPLICATION_CREDENTIALS=/app/firebase_config.json`  
`CALENDAR_ID=rahpodcast2022@gmail.com`  
`GOOGLE_MAPS_API_KEY=<key>`

## 🚀 Roadmap
- [x] Base routes  
- [x] Dynamic pricing  
- [ ] Fix Calendar JWT  
- [ ] Stripe/PayPal  
- [ ] AppSheet dashboard  
- [ ] Customer login  
- [ ] Auto HQ assign  
- [ ] Cloud logging  
- [ ] Discount automation

## 🛡️ Notes
Codox GPT reads this file for logic and structure. Do not rename sections. After any manual change, run `bash review_report.sh`.  
projectguide.md = system blueprint  
readme.md = public overview  
agent.md = runtime logs  

**(End of PROJECT_GUIDE.md – Do not edit manually)**
