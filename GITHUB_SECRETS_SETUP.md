# 🔒 GitHub Secrets Configuration Guide

## Overview
After cleaning up API keys from the repository, you need to configure GitHub Secrets for secure deployment.

## Required GitHub Secrets

### 🔥 Critical Secrets (Required for Deployment)

#### **GCP_SA_KEY**
- **Purpose**: Google Cloud Service Account for deployment
- **Format**: Complete JSON service account key
- **How to get**: 
  1. Go to Google Cloud Console → IAM & Admin → Service Accounts
  2. Create or select service account with Cloud Run Admin permissions
  3. Create JSON key and copy entire contents

#### **GCP_PROJECT**
- **Purpose**: Google Cloud Project ID
- **Format**: `your-project-id`
- **Example**: `cleanpro-production-123456`

#### **FIREBASE_KEY**
- **Purpose**: Firebase service account for Firestore
- **Format**: Complete JSON service account key
- **How to get**: Firebase Console → Project Settings → Service Accounts → Generate Key

### 🔑 API Keys

#### **GOOGLE_MAPS_API_KEY**
- **Purpose**: Google Maps integration for address validation
- **Format**: `AIzaSy...`
- **How to get**: Google Cloud Console → APIs & Services → Credentials

#### **OPENAI_API_KEY**
- **Purpose**: AI features (if used)
- **Format**: `sk-...`
- **How to get**: OpenAI Platform → API Keys

#### **APPSHEET_API_KEY**
- **Purpose**: AppSheet integration for admin data management
- **Format**: API key from AppSheet
- **How to get**: AppSheet Developer Console

#### **APPSHEET_APP_ID**
- **Purpose**: AppSheet application identifier
- **Format**: App ID from AppSheet
- **How to get**: AppSheet app settings

### 💳 Payment Processing

#### **STRIPE_SECRET_KEY**
- **Purpose**: Stripe payment processing
- **Format**: `sk_live_...` or `sk_test_...`
- **How to get**: Stripe Dashboard → Developers → API Keys

#### **STRIPE_WEBHOOK_SECRET**
- **Purpose**: Stripe webhook verification
- **Format**: `whsec_...`
- **How to get**: Stripe Dashboard → Webhooks → Endpoint → Signing Secret

### 🔐 Application Security

#### **JWT_SECRET**
- **Purpose**: JWT token signing for authentication
- **Format**: Long random string (64+ characters)
- **How to generate**: Use a secure random generator or `openssl rand -hex 32`

## Setting Up GitHub Secrets

### Via GitHub Web Interface (Recommended)

1. **Navigate to Repository Settings**
   ```
   https://github.com/Tazaai/cleanpro-site/settings/secrets/actions
   ```

2. **Click "New repository secret"**

3. **Add each secret:**
   - Name: Exact name from list above (case-sensitive)
   - Value: The secret value (never shared)

4. **Verify all secrets are added:**
   - GCP_SA_KEY ✅
   - GCP_PROJECT ✅
   - FIREBASE_KEY ✅
   - GOOGLE_MAPS_API_KEY ✅
   - OPENAI_API_KEY ✅
   - APPSHEET_API_KEY ✅
   - APPSHEET_APP_ID ✅
   - STRIPE_SECRET_KEY ✅
   - STRIPE_WEBHOOK_SECRET ✅
   - JWT_SECRET ✅

## Security Best Practices

### ✅ Do's
- Use GitHub Secrets for ALL sensitive data
- Rotate API keys regularly
- Use different keys for different environments
- Monitor secret usage in deployment logs
- Use least-privilege permissions for service accounts

### ❌ Don'ts
- Never commit API keys to code
- Don't share secrets in chat/email
- Don't use production keys in development
- Don't hardcode secrets in configuration files
- Don't log secret values

## Deployment Process

### 1. Clean Repository History
```bash
./security-cleanup.sh
git push --force-with-lease origin main
```

### 2. Configure All GitHub Secrets
Use the GitHub web interface to add all required secrets.

### 3. Trigger Deployment
- **Automatic**: Push any change to main branch
- **Manual**: Use GitHub Actions "Run workflow" button

### 4. Verify Deployment
Check GitHub Actions logs for successful deployment:
```
🔧 Backend URL: https://cleanpro-backend-*.run.app
🎨 Frontend URL: https://cleanpro-frontend-*.run.app
```

## Environment Variables in Code

### Backend (Node.js)
```javascript
const config = {
  firebaseKey: process.env.FIREBASE_KEY,
  googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  openaiApiKey: process.env.OPENAI_API_KEY,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  jwtSecret: process.env.JWT_SECRET,
  appsheetApiKey: process.env.APPSHEET_API_KEY,
  appsheetAppId: process.env.APPSHEET_APP_ID
};
```

### Frontend (Vite)
```javascript
const config = {
  apiBase: import.meta.env.VITE_API_BASE,
  googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
};
```

## Troubleshooting

### Deployment Fails with "Missing Environment Variable"
- Check GitHub Secrets are configured correctly
- Verify secret names match exactly (case-sensitive)
- Ensure all required secrets are present

### API Calls Fail
- Verify API keys have correct permissions
- Check API quotas and billing
- Confirm environment variables are being passed correctly

### Authentication Issues
- Verify JWT_SECRET is configured
- Check service account permissions
- Ensure Firebase key is valid JSON

## Emergency Recovery

If secrets are compromised:

1. **Immediately rotate all API keys**
2. **Update GitHub Secrets with new values**
3. **Redeploy application**
4. **Monitor for unauthorized usage**
5. **Review access logs**

Remember: **Security is not optional** - always use GitHub Secrets for sensitive data! 🔒