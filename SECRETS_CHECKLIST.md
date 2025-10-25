# 🔐 Clean Departure - Secrets Setup Checklist

**Required for Deployment:** Configure these 10 GitHub Secrets via **Repository → Settings → Secrets and variables → Actions**

## ✅ Core Infrastructure (2/10)
- [ ] `GCP_PROJECT` = `cleanpro-site`
- [ ] `GCP_SA_KEY` = (Full service account JSON from backend/serviceAccountKey.json)

## ✅ API Keys (3/10)  
- [ ] `GOOGLE_MAPS_API_KEY` = (Google Maps API key with Places, Distance Matrix enabled)
- [ ] `FIREBASE_KEY` = (Firebase service account JSON)
- [ ] `OPENAI_API_KEY` = (OpenAI API key for AI features)

## ✅ Security & Auth (1/10)
- [ ] `JWT_SECRET` = (Generate 32+ char secure string)

## ✅ Payments (2/10)
- [ ] `STRIPE_SECRET_KEY` = (Stripe secret key sk_...)  
- [ ] `STRIPE_WEBHOOK_SECRET` = (Stripe webhook endpoint secret)

## ✅ AppSheet Integration (2/10)
- [ ] `APPSHEET_API_KEY` = (AppSheet API key)
- [ ] `APPSHEET_APP_ID` = (AppSheet Application ID)

---

## 🚀 Deployment Commands

**After configuring all secrets:**

```bash
# Verify readiness  
bash review_report.sh

# Should show: "Deployment Readiness: 10/10 (100%) - READY ✅"

# Deploy
git push origin main
# OR manually trigger: gh workflow run "Deploy Backend & Frontend to Google Cloud"
```

## 🎯 Success Indicators
- ✅ Secret validation job passes
- ✅ Tests pass  
- ✅ Backend deploys to Cloud Run
- ✅ Frontend deploys to Cloud Run
- ✅ Live URLs displayed in workflow summary

**Live URLs after successful deployment:**
- Frontend: `https://cleanpro-frontend-[project-hash].europe-west1.run.app`
- Backend: `https://cleanpro-backend-[project-hash].europe-west1.run.app`