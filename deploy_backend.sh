#!/bin/bash
set -e

PROJECT_ID="cleanpro-site"
SERVICE_NAME="cleanpro-backend"
REGION="europe-west1"
REPOSITORY="cleanpro-repo"
IMAGE="$REGION-docker.pkg.dev/$PROJECT_ID/$REPOSITORY/$SERVICE_NAME"

# Environment variables
export GOOGLE_MAPS_API_KEY="AIzaSyB3Vnd8bNboZrBFHWRcPfW64AVDBaVWHz8"
export FIREBASE_KEY_BASE64="$(cat backend/serviceAccountKey.json | base64 -w 0)"
export JWT_SECRET="your_jwt_secret_here"
export STRIPE_SECRET_KEY="your_stripe_secret_key_here"
export STRIPE_WEBHOOK_SECRET="your_stripe_webhook_secret_here"
export OPENAI_API_KEY="your_openai_api_key_here"

echo "▶️ Deploying Backend with MVP features..."
echo "🚀 Building and deploying $SERVICE_NAME with Artifact Registry..."

# ✅ Check for required MVP environment variables
for var in GOOGLE_MAPS_API_KEY JWT_SECRET STRIPE_SECRET_KEY STRIPE_WEBHOOK_SECRET FIREBASE_KEY_BASE64; do
  if [ -z "${!var}" ]; then
    echo "❌ $var missing"
    exit 1
  fi
done

# ✅ Create Artifact Registry repository if it doesn't exist
gcloud artifacts repositories create $REPOSITORY \
  --repository-format=docker \
  --location=$REGION \
  --project=$PROJECT_ID || echo "Repository already exists"

# ✅ Configure Docker authentication
gcloud auth configure-docker $REGION-docker.pkg.dev

# ✅ Build Docker image with Artifact Registry
cd backend
gcloud builds submit --tag $IMAGE --project=$PROJECT_ID
cd ..

# ✅ Deploy to Cloud Run with MVP environment variables
gcloud run deploy $SERVICE_NAME \
  --image $IMAGE \
  --region $REGION \
  --allow-unauthenticated \
  --port 8080 \
  --set-env-vars "FIREBASE_KEY=$FIREBASE_KEY_BASE64,GOOGLE_MAPS_API_KEY=$GOOGLE_MAPS_API_KEY,NODE_ENV=production,JWT_SECRET=$JWT_SECRET,STRIPE_SECRET_KEY=$STRIPE_SECRET_KEY,STRIPE_WEBHOOK_SECRET=$STRIPE_WEBHOOK_SECRET,OPENAI_API_KEY=$OPENAI_API_KEY,GCP_PROJECT=$PROJECT_ID" \
  --platform=managed

echo "✅ Backend MVP deployed successfully with authentication, admin, and payments!"
