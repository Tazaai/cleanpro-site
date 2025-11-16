#!/bin/bash
echo "🚀 Quick Deploy - CleanPro Backend with Global Address Support"

cd /workspaces/cleanpro-site/backend

# Set environment variables
export GCP_PROJECT="cleanpro-site"
export GOOGLE_MAPS_API_KEY="AIzaSyCuHMWxj34-2q1NStQjgMrSTvg4OCHGVF0"
export FIREBASE_KEY_BASE64="$(cat serviceAccountKey.json | base64 -w 0)"
export JWT_SECRET="cleanpro-jwt-secret-2024-production"

echo "🔧 Deploying backend directly to Cloud Run..."

# Deploy using source-based deployment (faster than Docker builds)
gcloud run deploy cleanpro-backend \
  --source . \
  --region europe-west1 \
  --allow-unauthenticated \
  --port 8080 \
  --timeout 900 \
  --memory 1Gi \
  --cpu 1 \
  --max-instances 10 \
  --project $GCP_PROJECT \
  --set-env-vars "FIREBASE_KEY_B64=$FIREBASE_KEY_BASE64,GOOGLE_MAPS_API_KEY=$GOOGLE_MAPS_API_KEY,GCP_PROJECT=$GCP_PROJECT,JWT_SECRET=$JWT_SECRET,NODE_ENV=production"

echo "✅ Backend deployment initiated!"

# Test the deployment
sleep 30
echo "🧪 Testing deployed backend..."

BACKEND_URL="https://cleanpro-backend-5539254765.europe-west1.run.app"
curl -s "$BACKEND_URL/health" | jq '.'

echo "🌍 Testing global address support..."
curl -s "$BACKEND_URL/api/location/detect/regions" | jq '.data.total_regions'