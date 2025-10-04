#!/bin/bash
set -e

# === Configuration ===
PROJECT_ID="cleanpro-site"
SERVICE_NAME="cleanpro-backend"
REGION="europe-west1"
IMAGE="gcr.io/$PROJECT_ID/$SERVICE_NAME"

echo "▶️ Deploying Backend..."
echo "🚀 Building and deploying $SERVICE_NAME..."

# === Auth check ===
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q "@"; then
  echo "❌ gcloud not authenticated. Exiting."
  exit 1
fi

# === Env var check ===
if [ -z "$GOOGLE_MAPS_API_KEY" ]; then
  echo "❌ GOOGLE_MAPS_API_KEY missing"
  exit 1
fi

# === Build container ===
cd backend
gcloud builds submit --tag $IMAGE --project=$PROJECT_ID .
cd ..

# === Deploy to Cloud Run ===
gcloud run deploy $SERVICE_NAME \
  --image $IMAGE \
  --region $REGION \
  --allow-unauthenticated \
  --set-env-vars GOOGLE_MAPS_API_KEY=$GOOGLE_MAPS_API_KEY,NODE_ENV=production \
  --platform=managed

echo "✅ Backend deployed successfully!"
