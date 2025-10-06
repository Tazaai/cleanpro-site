#!/bin/bash
set -e

# === CleanPro Frontend Deployment ===
PROJECT_ID="cleanpro-site"
SERVICE_NAME="cleanpro-frontend"
REGION="europe-west1"
IMAGE="gcr.io/$PROJECT_ID/$SERVICE_NAME"

echo "🔑 Using project: $PROJECT_ID"
gcloud config set project "$PROJECT_ID"
gcloud config set run/region "$REGION"

# Move into frontend directory
cd "$(dirname "$0")/frontend" || { echo "❌ Frontend folder missing."; exit 1; }

echo "🚀 Building and deploying $SERVICE_NAME..."

# Build container image from Dockerfile in frontend/
gcloud builds submit --tag "$IMAGE" --project="$PROJECT_ID"

# Deploy to Cloud Run
gcloud run deploy "$SERVICE_NAME" \
  --image "$IMAGE" \
  --region "$REGION" \
  --allow-unauthenticated \
  --platform=managed

echo "✅ Frontend deployed successfully!"
