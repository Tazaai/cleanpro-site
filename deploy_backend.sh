#!/bin/bash
# ~/cleanpro-site/deploy_backend.sh
set -e

PROJECT_ID="cleanpro-site"
SERVICE_NAME="cleanpro-backend"
REGION="europe-west1"
IMAGE="gcr.io/$PROJECT_ID/$SERVICE_NAME"

echo "🚀 Building and deploying $SERVICE_NAME..."

# 🔑 Ensure GOOGLE_MAPS_API_KEY is set
if [ -z "$GOOGLE_MAPS_API_KEY" ]; then
  echo "❌ ERROR: GOOGLE_MAPS_API_KEY is not set in your environment."
  echo "👉 Run: export GOOGLE_MAPS_API_KEY=your_api_key_here"
  exit 1
fi

gcloud builds submit ./backend --tag $IMAGE

gcloud run deploy $SERVICE_NAME \
  --image $IMAGE \
  --region $REGION \
  --allow-unauthenticated \
  --set-env-vars GOOGLE_MAPS_API_KEY=$GOOGLE_MAPS_API_KEY,NODE_ENV=production \
  --platform=managed

echo "✅ Deployment complete!"
