#!/bin/bash
# 🚀 CleanPro MVP Full Deploy Script (Backend + Frontend with Artifact Registry)

set -e
export GCP_PROJECT="cleanpro-site"
export REGION="europe-west1"
export REPOSITORY="cleanpro-repo"
export GOOGLE_MAPS_API_KEY="AIzaSyB3Vnd8bNboZrBFHWRcPfW64AVDBaVWHz8"
export FIREBASE_KEY_BASE64="$(cat backend/serviceAccountKey.json | base64 -w 0)"
export JWT_SECRET="your_jwt_secret_here"
export STRIPE_SECRET_KEY="your_stripe_secret_key_here"
export STRIPE_WEBHOOK_SECRET="your_stripe_webhook_secret_here"
export OPENAI_API_KEY="your_openai_api_key_here"

echo "🔧 Setting up Artifact Registry..."
gcloud artifacts repositories create $REPOSITORY \
  --repository-format=docker \
  --location=$REGION \
  --project=$GCP_PROJECT || echo "Repository already exists"

gcloud auth configure-docker $REGION-docker.pkg.dev

echo "🧱 Deploying Backend MVP..."
gcloud builds submit --tag $REGION-docker.pkg.dev/$GCP_PROJECT/$REPOSITORY/cleanpro-backend ./backend --project=$GCP_PROJECT
gcloud run deploy cleanpro-backend \
  --image $REGION-docker.pkg.dev/$GCP_PROJECT/$REPOSITORY/cleanpro-backend \
  --region $REGION \
  --allow-unauthenticated \
  --port 8080 \
  --set-env-vars "FIREBASE_KEY=$FIREBASE_KEY_BASE64,GOOGLE_MAPS_API_KEY=$GOOGLE_MAPS_API_KEY,JWT_SECRET=$JWT_SECRET,STRIPE_SECRET_KEY=$STRIPE_SECRET_KEY,STRIPE_WEBHOOK_SECRET=$STRIPE_WEBHOOK_SECRET,OPENAI_API_KEY=$OPENAI_API_KEY,GCP_PROJECT=$GCP_PROJECT,NODE_ENV=production" \
  --project=$GCP_PROJECT

echo "🌐 Deploying Frontend MVP..."
cd frontend
npm install
npm run build

gcloud builds submit --tag $REGION-docker.pkg.dev/$GCP_PROJECT/$REPOSITORY/cleanpro-frontend . --project=$GCP_PROJECT
gcloud run deploy cleanpro-frontend \
  --image $REGION-docker.pkg.dev/$GCP_PROJECT/$REPOSITORY/cleanpro-frontend \
  --region $REGION \
  --allow-unauthenticated \
  --port 8080 \
  --set-env-vars "VITE_API_BASE=https://cleanpro-backend-5539254765.europe-west1.run.app,VITE_GOOGLE_MAPS_API_KEY=$GOOGLE_MAPS_API_KEY" \
  --project=$GCP_PROJECT

echo "✅ CleanPro MVP full deployment completed with authentication, admin dashboard, and payments!"
