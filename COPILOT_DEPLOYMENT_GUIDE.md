# 🧠 GitHub Copilot Deployment Guide for Clean Departure

## 🎯 Context
You are GitHub Copilot maintaining the **Clean Departure** cleaning platform with:
- **Backend**: Node.js/Express with Firebase, Stripe, Google Maps, AppSheet integration
- **Frontend**: React/Vite with Tailwind CSS, authentication, admin dashboard
- **Deployment**: Google Cloud Run via Artifact Registry (europe-west1)
- **Features**: Campaign discounts, square feet pricing, professional booking workflow
- **Security**: Comprehensive secret validation before deployment

## 🔐 Required GitHub Secrets (10 total)
```
GCP_PROJECT=cleanpro-site
GCP_SA_KEY={service account JSON from backend/serviceAccountKey.json}
GOOGLE_MAPS_API_KEY={Google Maps API with Places, Distance Matrix}
FIREBASE_KEY={Firebase service account JSON}
OPENAI_API_KEY={OpenAI API key for AI features}
JWT_SECRET={32+ char secure string for authentication}
STRIPE_SECRET_KEY={Stripe secret key sk_...}
STRIPE_WEBHOOK_SECRET={Stripe webhook endpoint secret}
APPSHEET_API_KEY={AppSheet API key}
APPSHEET_APP_ID={AppSheet Application ID}
```

## 🚀 Your Deployment Responsibilities

### 1. **Secret Validation First**
Before any deployment, ensure the secret-validation job passes:
```bash
# Check deployment readiness locally
bash review_report.sh
# Must show: "Deployment Readiness: 10/10 (100%) - READY ✅"
```

### 2. **Workflow Structure** (`.github/workflows/deploy.yml`)
The workflow MUST follow this sequence:
```yaml
jobs:
  secret-validation:    # Validates all 10 GitHub Secrets
    # Blocks deployment if any secret is missing/invalid
  
  test:                 # Runs Playwright tests
    needs: secret-validation
    if: needs.secret-validation.outputs.secrets_valid == 'true'
  
  deploy:               # Deploys to Cloud Run
    needs: [secret-validation, test]
    if: needs.secret-validation.outputs.secrets_valid == 'true'
```

### 3. **Deployment Commands**
Cloud Run deployment uses these exact patterns:
```bash
# Backend
gcloud builds submit --tag "europe-west1-docker.pkg.dev/cleanpro-site/cloud-run-source-deploy/cleanpro-backend" .
gcloud run deploy cleanpro-backend \
  --image "europe-west1-docker.pkg.dev/cleanpro-site/cloud-run-source-deploy/cleanpro-backend" \
  --region europe-west1 \
  --allow-unauthenticated \
  --port 8080 \
  --project cleanpro-site \
  --set-env-vars "FIREBASE_KEY=$FIREBASE_KEY,GOOGLE_MAPS_API_KEY=$GOOGLE_MAPS_API_KEY,...all_secrets"

# Frontend  
gcloud run deploy cleanpro-frontend \
  --image "europe-west1-docker.pkg.dev/cleanpro-site/cloud-run-source-deploy/cleanpro-frontend" \
  --region europe-west1 \
  --allow-unauthenticated \
  --port 8080 \
  --project cleanpro-site \
  --set-env-vars "VITE_API_BASE=${BACKEND_URL},VITE_GOOGLE_MAPS_API_KEY=$GOOGLE_MAPS_API_KEY"
```

### 4. **Troubleshooting Failed Deployments**
```bash
# Check recent runs
gh run list --limit 5

# View detailed logs
gh run view {run-id} --log

# Common fixes:
# - Missing secrets → Configure via GitHub web UI
# - Invalid YAML → Check indentation and syntax
# - Cloud Run auth → Verify GCP_SA_KEY format
# - Test failures → Check Playwright configuration
```

### 5. **Expected Live URLs After Success**
```
🔧 Backend: https://cleanpro-backend-5539254765.europe-west1.run.app
🎨 Frontend: https://cleanpro-frontend-5539254765.europe-west1.run.app
```

## ⚡ Quick Commands for Copilot

### Deploy
```bash
git add .
git commit -m "feat: [your feature description]"
git push origin main  # Triggers deployment automatically
```

### Manual Trigger
```bash
gh workflow run "Deploy Backend & Frontend to Google Cloud"
```

### Fix Failed Deployment
```bash
# 1. Check what failed
gh run list --limit 1
gh run view --log

# 2. Fix the issue (usually secrets or YAML)
# 3. Commit and push
git add .github/workflows/deploy.yml
git commit -m "fix: Resolve deployment pipeline issue"
git push origin main
```

### Verify Secret Status
```bash
bash review_report.sh | tail -10
# Look for: "Deployment Readiness: X/10 (Y%) - STATUS"
```

## 🎯 Success Indicators
- ✅ Secret validation job passes (all 10 secrets present)
- ✅ Playwright tests pass
- ✅ Backend builds and deploys to Cloud Run
- ✅ Frontend builds and deploys to Cloud Run  
- ✅ Deployment summary shows live URLs
- ✅ Campaign discounts and square feet pricing functional

## 🔧 Critical Maintenance Rules
1. **Never modify secret validation logic** without understanding impact
2. **Always validate locally** before pushing changes
3. **Keep Artifact Registry region** as `europe-west1`
4. **Maintain port 8080** for both services
5. **Preserve environment variable names** exactly as shown
6. **Use `--allow-unauthenticated`** for public access

## 🚨 Emergency Recovery
If deployment completely breaks:
```bash
# Reset to last working commit
git log --oneline -5
git reset --hard {working-commit-hash}
git push --force-with-lease origin main
```

---
**Goal**: Maintain stable CI/CD where every `main` push validates secrets → runs tests → deploys both services to Cloud Run with campaign discounts and square feet pricing ready for customers.