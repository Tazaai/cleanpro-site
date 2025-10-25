# 🚀 One-Line Copilot Deployment Prompts

## For Copilot Inline Chat (⌘+I or Ctrl+I):

### General Deployment
```
Maintain Clean Departure CI/CD: validate 10 GitHub Secrets (GCP_PROJECT, GCP_SA_KEY, GOOGLE_MAPS_API_KEY, FIREBASE_KEY, OPENAI_API_KEY, JWT_SECRET, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, APPSHEET_API_KEY, APPSHEET_APP_ID) → run tests → deploy backend/frontend to Cloud Run europe-west1 with campaign discounts and square feet pricing
```

### Fix Failed Deployment
```
Fix Clean Departure deployment failure: check gh run logs, validate secrets via review_report.sh, ensure secret-validation job passes, fix YAML/Docker issues, maintain Cloud Run port 8080 and Artifact Registry europe-west1
```

### Secret Configuration
```
Configure Clean Departure GitHub Secrets: need 10 secrets for deployment readiness (GCP, Firebase, Stripe, Maps, JWT, OpenAI, AppSheet) - validate with review_report.sh showing 10/10 (100%) READY before deploy
```

### Emergency Recovery
```
Emergency Clean Departure deployment recovery: reset to last working commit, verify secret-validation job structure, ensure workflow follows secret-validation → test → deploy sequence with proper Cloud Run deployment
```

## For Copilot Chat Sidebar:

```
I'm working on Clean Departure deployment pipeline. Help me maintain:
- Secret validation (10 GitHub Secrets required)
- Playwright tests 
- Cloud Run deployment (europe-west1)
- Campaign discounts & square feet pricing
- Backend: Node.js/Express with Firebase/Stripe
- Frontend: React/Vite with authentication
Check review_report.sh for deployment readiness before any changes.
```