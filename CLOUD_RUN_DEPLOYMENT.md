# CleanPro Cloud Run Deployment Guide

This guide explains how to deploy the CleanPro backend and frontend to Google Cloud Run.

## Prerequisites

1. Google Cloud Project set up (`cleanpro-site`)
2. gcloud CLI installed and authenticated
3. Required environment variables:
   - `GOOGLE_MAPS_API_KEY` - Google Maps API key
   - `FIREBASE_KEY` - Firebase service account key (base64 encoded)
   - `OPENAI_API_KEY` - OpenAI API key

## Environment Variable Setup

### Method 1: Using GitHub Secrets (Recommended for CI/CD)

Store the following secrets in your GitHub repository:
- `GOOGLE_MAPS_API_KEY`
- `FIREBASE_KEY_BASE64`
- `OPENAI_API_KEY`

### Method 2: Using Local Environment Variables

```bash
export GCP_PROJECT="cleanpro-site"
export GOOGLE_MAPS_API_KEY="your_google_maps_api_key"
export FIREBASE_KEY_BASE64="$(cat backend/serviceAccountKey.json | base64 -w 0)"
export OPENAI_API_KEY="your_openai_api_key"
```

## Backend Deployment

### Manual Deployment

```bash
# Navigate to repository root
cd /workspaces/cleanpro-site

# Set environment variables
export GCP_PROJECT="cleanpro-site"
export GOOGLE_MAPS_API_KEY="your_google_maps_api_key"
export FIREBASE_KEY_BASE64="$(cat backend/serviceAccountKey.json | base64 -w 0)"
export OPENAI_API_KEY="your_openai_api_key"

# Build and push Docker image
gcloud builds submit --tag gcr.io/$GCP_PROJECT/cleanpro-backend backend

# Deploy to Cloud Run
gcloud run deploy cleanpro-backend \
  --image gcr.io/$GCP_PROJECT/cleanpro-backend \
  --region europe-west1 \
  --allow-unauthenticated \
  --port 8080 \
  --set-env-vars "FIREBASE_KEY=$FIREBASE_KEY_BASE64,GOOGLE_MAPS_API_KEY=$GOOGLE_MAPS_API_KEY,OPENAI_API_KEY=$OPENAI_API_KEY,GCP_PROJECT=$GCP_PROJECT"
```

### Using Deploy Script

```bash
# Make script executable
chmod +x deploy_backend.sh

# Run deployment
./deploy_backend.sh
```

**Note**: The deploy script requires `GOOGLE_MAPS_API_KEY` environment variable to be set.

## Frontend Deployment

### Manual Deployment

```bash
# Navigate to frontend directory
cd frontend

# Set environment variables
export GCP_PROJECT="cleanpro-site"
export GOOGLE_MAPS_API_KEY="your_google_maps_api_key"

# Build and push Docker image
gcloud builds submit --tag gcr.io/$GCP_PROJECT/cleanpro-frontend .

# Deploy to Cloud Run
gcloud run deploy cleanpro-frontend \
  --image gcr.io/$GCP_PROJECT/cleanpro-frontend \
  --region europe-west1 \
  --allow-unauthenticated \
  --port 8080 \
  --set-env-vars "VITE_API_BASE=https://cleanpro-backend-5539254765.europe-west1.run.app,VITE_GOOGLE_MAPS_API_KEY=$GOOGLE_MAPS_API_KEY"
```

### Using Deploy Script

```bash
# Make script executable
chmod +x deploy_frontend.sh

# Run deployment
./deploy_frontend.sh
```

## Full Deployment (Backend + Frontend)

```bash
# Make script executable
chmod +x deploy_all.sh

# Set required environment variables
export GOOGLE_MAPS_API_KEY="your_google_maps_api_key"
export FIREBASE_KEY="$(cat backend/serviceAccountKey.json | base64 -w 0)"
export OPENAI_API_KEY="your_openai_api_key"

# Run full deployment
./deploy_all.sh
```

## Firebase Key Format

The backend supports two formats for the Firebase service account key:

1. **Base64 encoded JSON** (recommended for Cloud Run):
   ```bash
   export FIREBASE_KEY="$(cat backend/serviceAccountKey.json | base64 -w 0)"
   ```

2. **Plain JSON string**:
   ```bash
   export FIREBASE_KEY='{"type":"service_account",...}'
   ```

3. **Default credentials**: If no `FIREBASE_KEY` is provided, the backend will attempt to use Google Application Default Credentials (works on GCP environments).

## Backend Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | Port to run the server on (default: 8080) |
| `FIREBASE_KEY` | Recommended | Base64-encoded or plain JSON Firebase service account key |
| `GOOGLE_MAPS_API_KEY` | Yes | Google Maps API key for distance calculations |
| `OPENAI_API_KEY` | Optional | OpenAI API key for AI features |
| `GCP_PROJECT` | Optional | Google Cloud Project ID |
| `NODE_ENV` | Optional | Node environment (production/development) |

## Frontend Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_BASE` | Yes | Backend API URL |
| `VITE_GOOGLE_MAPS_API_KEY` | Yes | Google Maps API key for frontend |
| `VITE_HQ_ADDRESS` | Optional | Headquarters address |
| `VITE_FIREBASE_API_KEY` | Optional | Firebase API key for frontend |

## Troubleshooting

### Firebase Initialization Errors

If you see Firebase initialization errors, check:
1. `FIREBASE_KEY` environment variable is set correctly
2. The key is properly base64 encoded
3. The service account has the necessary permissions

### Deployment Failures

If deployment fails:
1. Check that the Docker image builds successfully locally
2. Verify all required environment variables are set
3. Check Cloud Run logs: `gcloud run services logs read cleanpro-backend --region europe-west1`

### CORS Issues

The backend is configured to allow requests from:
- `http://localhost:5173` (local development)
- `https://cleanpro-frontend-5539254765.europe-west1.run.app` (Cloud Run)
- `*.github.dev` (GitHub Codespaces)

If you need to add more origins, update the CORS configuration in `backend/index.js`.

## Health Checks

Both backend and frontend include health check endpoints:
- Backend: `GET /` returns "✅ CleanPro Backend is running on Cloud Run + Local OK"
- Frontend: nginx serves the static site on port 8080

## Security Notes

1. **Never commit** `serviceAccountKey.json` to version control
2. Always use environment variables for sensitive data
3. Use GitHub Secrets for CI/CD deployments
4. Regularly rotate API keys and service account keys
5. Review Cloud Run IAM permissions regularly

## Monitoring

After deployment, monitor your services:
```bash
# View backend logs
gcloud run services logs read cleanpro-backend --region europe-west1

# View frontend logs
gcloud run services logs read cleanpro-frontend --region europe-west1

# Get service details
gcloud run services describe cleanpro-backend --region europe-west1
gcloud run services describe cleanpro-frontend --region europe-west1
```

## Updating Deployments

To update an existing deployment:
1. Make code changes
2. Re-run the deployment commands
3. Cloud Run will automatically perform a rolling update

## Rollback

If you need to rollback to a previous version:
```bash
# List revisions
gcloud run revisions list --service cleanpro-backend --region europe-west1

# Deploy a specific revision
gcloud run services update-traffic cleanpro-backend \
  --to-revisions REVISION_NAME=100 \
  --region europe-west1
```
