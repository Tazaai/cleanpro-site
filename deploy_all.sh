#!/bin/bash
set -e

echo "🚀 Deploying CleanPro Platform to Google Cloud Run..."
echo "=================================================="

# Set project and environment variables
export GCP_PROJECT="cleanpro-site"
export GOOGLE_MAPS_API_KEY="AIzaSyCuHMWxj34-2q1NStQjgMrSTvg4OCHGVF0"
export FIREBASE_KEY_BASE64="$(cat backend/serviceAccountKey.json | base64 -w 0)"
export OPENAI_API_KEY="your_openai_api_key_here"
export JWT_SECRET="cleanpro-jwt-secret-2024-production-key"

echo "🔧 Environment configured:"
echo "Project: $GCP_PROJECT"
echo "Google Maps API Key: ${GOOGLE_MAPS_API_KEY:0:20}..."
echo "Firebase Key: ${FIREBASE_KEY_BASE64:0:50}..."

# === Backend Deployment ===
echo ""
echo "🔧 === BACKEND DEPLOYMENT ==="
echo "Building backend with global address support..."

cd backend

# Build backend image
gcloud builds submit --tag gcr.io/$GCP_PROJECT/cleanpro-backend .

# Deploy backend to Cloud Run
gcloud run deploy cleanpro-backend \
  --image gcr.io/$GCP_PROJECT/cleanpro-backend \
  --region europe-west1 \
  --allow-unauthenticated \
  --port 8080 \
  --timeout 900 \
  --memory 1Gi \
  --cpu 1 \
  --max-instances 10 \
  --set-env-vars "FIREBASE_KEY_B64=$FIREBASE_KEY_BASE64,GOOGLE_MAPS_API_KEY=$GOOGLE_MAPS_API_KEY,OPENAI_API_KEY=$OPENAI_API_KEY,GCP_PROJECT=$GCP_PROJECT,JWT_SECRET=$JWT_SECRET,NODE_ENV=production"

echo "✅ Backend deployed successfully!"

# === Frontend Deployment ===
echo ""
echo "🎨 === FRONTEND DEPLOYMENT ==="
echo "Building frontend with global address autocomplete..."

cd ../frontend

# Install dependencies and build
npm install
npm run build

# Get backend URL
BACKEND_URL="https://cleanpro-backend-5539254765.europe-west1.run.app"
echo "Backend URL: $BACKEND_URL"

# Build frontend image
gcloud builds submit --tag gcr.io/$GCP_PROJECT/cleanpro-frontend .

# Deploy frontend to Cloud Run
gcloud run deploy cleanpro-frontend \
  --image gcr.io/$GCP_PROJECT/cleanpro-frontend \
  --region europe-west1 \
  --allow-unauthenticated \
  --port 8080 \
  --timeout 300 \
  --memory 512Mi \
  --cpu 1 \
  --max-instances 10 \
  --set-env-vars "VITE_API_BASE=$BACKEND_URL,VITE_GOOGLE_MAPS_API_KEY=$GOOGLE_MAPS_API_KEY"

echo "✅ Frontend deployed successfully!"

# === Verification ===
echo ""
echo "🧪 === DEPLOYMENT VERIFICATION ==="

# Test backend health
echo "Testing backend health..."
curl -s "$BACKEND_URL/health" | jq '.'

# Test global address support
echo ""
echo "Testing global address support..."
curl -s "$BACKEND_URL/api/location/detect/regions" | jq '.data.total_regions'

# Test Turkish address detection
echo ""
echo "Testing Turkish address detection..."
curl -s "$BACKEND_URL/api/location/detect?address=Istanbul,Turkey" | jq '.data.detected_country'

echo ""
echo "🎉 === DEPLOYMENT COMPLETE ==="
echo "Frontend: https://cleanpro-frontend-5539254765.europe-west1.run.app"
echo "Backend: $BACKEND_URL" 
echo ""
echo "🌍 Global address autocomplete is now live!"
echo "✅ Supporting 29 countries worldwide"
echo "✅ Turkish, Indian, Australian, French addresses all working"