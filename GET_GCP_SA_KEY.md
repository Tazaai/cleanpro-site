# 🔑 How to Get GCP Service Account Key

## Quick Steps:

1. **Go to Google Cloud Console**: https://console.cloud.google.com
2. **Navigate**: IAM & Admin → Service Accounts
3. **Find your service account**: `github-deployer@cleanpro-site.iam.gserviceaccount.com`
4. **Click**: Actions menu (3 dots) → Manage Keys
5. **Click**: Add Key → Create New Key
6. **Select**: JSON format
7. **Download**: The JSON file
8. **Copy content** to GitHub Secrets

## GitHub Secret Update:

1. Go to: https://github.com/Tazaai/cleanpro-site/settings/secrets/actions
2. Edit `GCP_SA_KEY`
3. Paste the **exact JSON content** from downloaded file
4. Save

## Expected JSON Format:
```json
{
  "type": "service_account",
  "project_id": "cleanpro-site",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "github-deployer@cleanpro-site.iam.gserviceaccount.com",
  "client_id": "...",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "..."
}
```

⚠️ **Critical**: Use the exact JSON - no modifications, escaping, or formatting changes!