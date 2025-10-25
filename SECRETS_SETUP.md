# 🔐 GitHub Secrets Configuration Guide

## Required Secrets for Deployment

Configure these secrets via **GitHub Web Interface ONLY**:

**Repository → Settings → Secrets and variables → Actions → New repository secret**

### 🏗️ Core GCP Infrastructure
1. **`GCP_PROJECT`** = `cleanpro-site`
2. **`GCP_SA_KEY`** = (Complete JSON from `/workspaces/cleanpro-site/backend/serviceAccountKey.json`)

### 🔑 API Keys  
3. **`GOOGLE_MAPS_API_KEY`** = `AIzaSyB3Vnd8bNboZrBFHWRcPfW64AVDBaVWHz8`
4. **`FIREBASE_KEY`** = (Firebase service account JSON - needs to be configured)
5. **`OPENAI_API_KEY`** = (OpenAI API key for AI features)

### 🔐 Authentication & Security
6. **`JWT_SECRET`** = (Generate 32+ character random string)

### 💳 Payment Processing  
7. **`STRIPE_SECRET_KEY`** = (Stripe secret key from Stripe dashboard)
8. **`STRIPE_WEBHOOK_SECRET`** = (Stripe webhook endpoint secret)

### 📊 AppSheet Integration
9. **`APPSHEET_API_KEY`** = (AppSheet API key)
10. **`APPSHEET_APP_ID`** = (AppSheet application ID)

## 🛡️ Security Guidelines

- ⚠️ **NEVER set secrets via CLI** - Always use GitHub web interface
- 🔍 **Never print secret values** in logs or console
- ✅ **Validate presence only** - diagnostics confirm secrets exist without exposing values
- 🔄 **Regenerate secrets** if accidentally exposed

## 🚀 Deployment Process

1. **Configure all 10 secrets** via GitHub web interface
2. **Run diagnostics**: `bash review_report.sh`
3. **Verify readiness**: Should show 10/10 (100%) 
4. **Commit & push**: Deployment will proceed automatically
5. **Monitor deployment**: GitHub Actions will validate secrets before proceeding

## 🔍 Validation

The deployment workflow includes:
- **Secret presence validation** (never exposes values)
- **JSON format validation** for GCP service account
- **JWT secret strength validation**
- **API key format validation**

Deployment is **BLOCKED** until all secrets are properly configured.