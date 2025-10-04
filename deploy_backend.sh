#!/bin/bash
set -e

PROJECT_ID="cleanpro-site"
SERVICE_NAME="cleanpro-backend"
REGION="europe-west1"
IMAGE="gcr.io/$PROJECT_ID/$SERVICE_NAME"

echo "🚀 Building and deploying $SERVICE_NAME..."

if [ -z "$GOOGLE_MAPS_API_KEY" ]; then
  echo "❌ GOOGLE_MAPS_API_KEY missing"; exit 1;
fi

cd backend
# ✅ correct command — no -f flag needed
gcloud builds submit --tag $IMAGE --project=$PROJECT_ID
cd ..

gcloud run deploy $SERVICE_NAME \
  --image $IMAGE \
  --region $REGION \
  --allow-unauthenticated \
  --set-env-vars GOOGLE_MAPS_API_KEY=$GOOGLE_MAPS_API_KEY,NODE_ENV=production \
  --platform=managed

echo "✅ Backend deployed successfully!"
