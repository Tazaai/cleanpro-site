#!/bin/bash
set -e

# === CleanPro Frontend MVP Deployment ===
PROJECT_ID="cleanpro-site"
SERVICE_NAME="cleanpro-frontend"
REGION="europe-west1"
REPOSITORY="cleanpro-repo"
IMAGE="$REGION-docker.pkg.dev/$PROJECT_ID/$REPOSITORY/$SERVICE_NAME"

# Environment variables
export GOOGLE_MAPS_API_KEY="AIzaSyB3Vnd8bNboZrBFHWRcPfW64AVDBaVWHz8"

echo "🔑 Using project: $PROJECT_ID"
gcloud config set project "$PROJECT_ID"
gcloud config set run/region "$REGION"

# ✅ Create Artifact Registry repository if it doesn't exist
gcloud artifacts repositories create $REPOSITORY \
  --repository-format=docker \
  --location=$REGION \
  --project=$PROJECT_ID || echo "Repository already exists"

# ✅ Configure Docker authentication
gcloud auth configure-docker $REGION-docker.pkg.dev

# Move into frontend directory
cd "$(dirname "$0")/frontend" || { echo "❌ Frontend folder missing."; exit 1; }

echo "💻 Installing dependencies and building..."
npm install
npm run build

echo "🚀 Building and deploying $SERVICE_NAME with Artifact Registry..."

# Build container image with Artifact Registry
gcloud builds submit --tag "$IMAGE" --project="$PROJECT_ID"

# Deploy to Cloud Run with proper frontend environment variables
gcloud run deploy "$SERVICE_NAME" \
  --image "$IMAGE" \
  --region "$REGION" \
  --allow-unauthenticated \
  --port 8080 \
  --set-env-vars "VITE_API_BASE=https://cleanpro-backend-5539254765.europe-west1.run.app,VITE_GOOGLE_MAPS_API_KEY=$GOOGLE_MAPS_API_KEY" \
  --platform=managed

echo "✅ Frontend MVP deployed successfully!"
