#!/bin/bash
# ~/cleanpro-site/deploy_frontend.sh
set -e

PROJECT_ID="cleanpro-site"
SERVICE_NAME="cleanpro-frontend"
REGION="europe-west1"
IMAGE="europe-west1-docker.pkg.dev/$PROJECT_ID/cloud-run-source-deploy/$SERVICE_NAME"

API_BASE_URL="https://cleanpro-backend-5539254765.europe-west1.run.app"

# 🔑 Check for Google Maps API key
if [ -z "$GOOGLE_MAPS_API_KEY" ]; then
  echo "⚠️  GOOGLE_MAPS_API_KEY is not set!"
  read -p "👉 Please enter your Google Maps API key: " USER_KEY
  export GOOGLE_MAPS_API_KEY=$USER_KEY
fi

echo "🔑 Using project: $PROJECT_ID"
gcloud config set project $PROJECT_ID
gcloud config set run/region $REGION

cd ~/cleanpro-site/frontend

echo "📦 Installing dependencies..."
npm install

echo "⚡ Building frontend with Vite..."
cat > .env <<EOF
VITE_API_BASE=$API_BASE_URL
VITE_GOOGLE_MAPS_API_KEY=$GOOGLE_MAPS_API_KEY
EOF

npm run build

echo "🚀 Submitting frontend build to Google Cloud Build..."
gcloud builds submit --tag $IMAGE .

echo "🌍 Deploying to Cloud Run..."
gcloud run deploy $SERVICE_NAME \
  --image $IMAGE \
  --region $REGION \
  --allow-unauthenticated

echo "✅ Frontend deployment complete!"
gcloud run services describe $SERVICE_NAME \
  --region $REGION \
  --format='value(status.url)'
