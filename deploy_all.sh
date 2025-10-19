#!/bin/bash
# 🚀 CleanPro Full Deploy Script (Backend + Frontend)

set -e
export GCP_PROJECT="cleanpro-site"

echo "🧱 Deploying Backend..."
gcloud builds submit --tag gcr.io/$GCP_PROJECT/cleanpro-backend .
gcloud run deploy cleanpro-backend \
  --image gcr.io/$GCP_PROJECT/cleanpro-backend \
  --region europe-west1 \
  --allow-unauthenticated \
  --port 8080 \
  --set-env-vars "FIREBASE_KEY=$FIREBASE_KEY,GOOGLE_MAPS_API_KEY=$GOOGLE_MAPS_API_KEY,OPENAI_API_KEY=$OPENAI_API_KEY,GCP_PROJECT=$GCP_PROJECT"

echo "🌐 Deploying Frontend..."
cd frontend
gcloud builds submit --tag gcr.io/$GCP_PROJECT/cleanpro-frontend .
gcloud run deploy cleanpro-frontend \
  --image gcr.io/$GCP_PROJECT/cleanpro-frontend \
  --region europe-west1 \
  --allow-unauthenticated \
  --port 8080 \
  --set-env-vars "GOOGLE_MAPS_API_KEY=$GOOGLE_MAPS_API_KEY"

echo "✅ CleanPro full deployment completed!"
