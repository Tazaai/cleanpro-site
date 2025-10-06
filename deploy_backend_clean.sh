#!/bin/bash
set -e

# 🔧 Config
PROJECT_ID="cleanpro-site"
SERVICE_NAME="cleanpro-backend"
REGION="europe-west1"

# Paths
KEY_FILE="backend/serviceAccountKey.json"
ENV_FILE="env.yaml"

if [ ! -f "$KEY_FILE" ]; then
  echo "❌ Missing $KEY_FILE"
  exit 1
fi

echo "🔑 Generating env.yaml with raw JSON FIREBASE_CONFIG..."

cat > "$ENV_FILE" <<YAML
FIREBASE_CONFIG: |
$(cat "$KEY_FILE" | sed 's/^/  /')
YAML

# Build image name
IMAGE="gcr.io/$PROJECT_ID/$SERVICE_NAME"

echo "🛠️ Building Docker image: $IMAGE ..."
gcloud builds submit --tag "$IMAGE" ./backend --project "$PROJECT_ID"

echo "�� Deploying to Cloud Run..."
gcloud run deploy "$SERVICE_NAME" \
  --image "$IMAGE" \
  --region "$REGION" \
  --allow-unauthenticated \
  --env-vars-file "$ENV_FILE" \
  --project "$PROJECT_ID"

URL=$(gcloud run services describe "$SERVICE_NAME" --region "$REGION" --project "$PROJECT_ID" --format 'value(status.url)')
echo "✅ Deployed: $URL"

echo "🔍 Testing /api/services ..."
curl -i "$URL/api/services" || true

echo "📜 Fetching last 50 log lines (post-deploy)..."
gcloud run services logs read "$SERVICE_NAME" \
  --region "$REGION" \
  --project "$PROJECT_ID" \
  --limit 50
