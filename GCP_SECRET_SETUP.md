# 🔐 GitHub Secrets Configuration Guide

## ✅ RESOLVED: GCP_SA_KEY Secret Added!

**Status**: The `GCP_SA_KEY` secret has been successfully added to the GitHub repository.

## 🚀 Testing Deployment

## 🛠️ Permanent Solution

### Step 1: Get the Service Account Key

You need to get the service account key JSON from Google Cloud Console:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **IAM & Admin** → **Service Accounts**
3. Find the service account for your project (likely named `github-deployer` or similar)
4. Click on the service account
5. Go to **Keys** tab
6. Click **Add Key** → **Create New Key** → **JSON**
7. Download the JSON file

### Step 2: Add Secret to GitHub

1. Go to your GitHub repository: https://github.com/Tazaai/cleanpro-site
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `GCP_SA_KEY`
5. Value: Copy and paste the **entire contents** of the downloaded JSON file
6. Click **Add secret**

### Step 3: Verify Other Required Secrets

Make sure these secrets are also configured:

| Secret Name | Description | Status |
|-------------|-------------|---------|
| `GCP_PROJECT` | Google Cloud project ID | ✅ Present |
| `GCP_SA_KEY` | Service account JSON key | ❌ **MISSING** |
| `FIREBASE_KEY` | Firebase service account key | ⚠️ Optional (can use GCP_SA_KEY) |
| `GOOGLE_MAPS_API_KEY` | Google Maps API key | ✅ Present |
| `JWT_SECRET` | JWT signing secret | ✅ Present |

## 🔧 Alternative Solution (if you can't access GCP Console)

If you don't have access to the Google Cloud Console, you can:

1. **Create a new service account** with these permissions:
   - Cloud Run Admin
   - Storage Admin
   - Artifact Registry Writer
   - Firebase Admin
   - Cloud Build Editor

2. **Download the JSON key** for the new service account

3. **Add it as GCP_SA_KEY secret** in GitHub

## 📋 Service Account JSON Format

The service account key should look like this:

```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "key-id",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "service-account@project.iam.gserviceaccount.com",
  "client_id": "client-id",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/..."
}
```

## ⚡ Quick Fix Commands

Once you have the service account key:

```bash
# If you have the JSON file locally, you can add it via GitHub CLI:
gh secret set GCP_SA_KEY < path/to/service-account-key.json

# Or copy the content and add it manually via GitHub UI
```

## 🚨 Security Notes

- **Never commit** service account keys to your repository
- **Keep the JSON file secure** - it provides access to your GCP resources
- **Rotate keys regularly** for security best practices
- **Use least privilege** - only grant necessary permissions

## ✅ Once Fixed

After adding the `GCP_SA_KEY` secret:

1. The secret validation will pass ✅
2. The deployment will proceed ✅
3. Firebase will have proper credentials ✅
4. The coordination points API will work ✅

## 🔍 Verification

You can verify the secret is properly added by:

1. Going to repository **Settings** → **Secrets**
2. Checking that `GCP_SA_KEY` appears in the list
3. Running the deployment again
4. Watching for "✅ GCP_SA_KEY: PRESENT" in the workflow logs

This is the **root cause** of the Firebase connection issues. Once this secret is properly configured, the entire system will work as expected.