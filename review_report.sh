#!/bin/bash
# 🧠 Codox Master Review & Self-Healing Runner
set +e
exec > >(tee agent.md) 2>&1

echo "## 🧭 Reading PROJECT_GUIDE.md context..."
if [ -f PROJECT_GUIDE.md ]; then
  CONTEXT=$(cat PROJECT_GUIDE.md)
  echo "✅ Project guide loaded."
else
  echo "⚠️ PROJECT_GUIDE.md missing — limited mode."
fi

echo "## 🔍 Validating base structure..."
mkdir -p backend/routes frontend/src logs .github/workflows

# --- Backend essentials ---
if ! grep -q "app.listen" backend/index.js 2>/dev/null; then
  echo "🩹 Recreating backend/index.js"
  cat > backend/index.js <<'EOF'
import express from "express";
const app = express();
app.get("/", (_req, res) => res.send("✅ CleanPro Backend is running"));
app.listen(process.env.PORT || 8080, "0.0.0.0", () =>
  console.log(`✅ Server on port ${process.env.PORT || 8080}`)
);
EOF
fi

[[ ! -f backend/package.json ]] && echo '{"type":"module"}' > backend/package.json

if [ ! -f backend/Dockerfile ]; then
  echo "🩹 Creating backend/Dockerfile"
  cat > backend/Dockerfile <<'EOF'
FROM node:20
WORKDIR /app/backend
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
ENV PORT=8080
ENV HOST=0.0.0.0
EXPOSE 8080
CMD ["node","index.js"]
EOF
fi

# --- Auto-generate common routes ---
for r in services_api bookings_api pricing_api calendar_api config_api coordination_points_api; do
  f=backend/routes/${r}.mjs
  [[ ! -f $f ]] && echo -e 'import e from "express";const r=e.Router();r.get("/",(_q,s)=>s.json({ok:true,route:"'$r'"}));export default r;' > $f
done

# --- Secrets check ---
echo "## 🔑 Checking required secrets..."
ERR=0
for key in GOOGLE_MAPS_API_KEY GCP_PROJECT GCP_SA_KEY FIREBASE_KEY; do
  [[ -z "${!key}" ]] && echo "❌ Missing $key" && ERR=1 || echo "✅ $key OK"
done
[[ $ERR -eq 1 ]] && exit 1

# --- Authenticate Google Cloud ---
echo "## 🔐 Authenticating to Google Cloud..."
echo "$GCP_SA_KEY" > key.json
ACCOUNT=$(jq -r .client_email key.json)
gcloud auth activate-service-account "$ACCOUNT" --key-file=key.json --project="$GCP_PROJECT"
gcloud config set account "$ACCOUNT"
gcloud config set project "$GCP_PROJECT"
gcloud config set run/region europe-west1

# --- Docker sanity ---
echo "## 🐳 Verifying Dockerfile..."
grep -q "EXPOSE 8080" backend/Dockerfile || echo "EXPOSE 8080" >> backend/Dockerfile
grep -q 'CMD ["node","index.js"]' backend/Dockerfile || echo 'CMD ["node","index.js"]' >> backend/Dockerfile

# --- Frontend check ---
echo "## 🎨 Checking frontend..."
if [ -d frontend ]; then
  cd frontend
  npm install --legacy-peer-deps || echo "⚠️ npm install failed"
  npm run build || echo "⚠️ build failed"
  cd ..
fi

# --- Deploy backend ---
echo "## ☁️ Deploying backend..."
if [ -f deploy_backend.sh ]; then
  bash deploy_backend.sh || echo "⚠️ Deploy failed, check Cloud Run logs"
else
  echo "🩹 Creating deploy_backend.sh"
  cat > deploy_backend.sh <<'EOF'
#!/bin/bash
echo "🚀 Deploying CleanPro backend..."
gcloud run deploy cleanpro-backend \
  --source . \
  --region europe-west1 \
  --project "$GCP_PROJECT" \
  --quiet
EOF
  chmod +x deploy_backend.sh
  bash deploy_backend.sh
fi

# --- Deploy frontend ---
echo "## ☁️ Deploying frontend..."
if [ -f deploy_frontend.sh ]; then
  bash deploy_frontend.sh || echo "⚠️ Frontend deploy failed"
else
  echo "🩹 Creating deploy_frontend.sh"
  cat > deploy_frontend.sh <<'EOF'
#!/bin/bash
echo "🚀 Deploying CleanPro frontend..."
gcloud run deploy cleanpro-frontend \
  --source ./frontend \
  --region europe-west1 \
  --project "$GCP_PROJECT" \
  --quiet
EOF
  chmod +x deploy_frontend.sh
  bash deploy_frontend.sh
fi

# --- Health test ---
echo "## 🩺 Health test..."
curl -fsSL "https://cleanpro-backend-5539254765.europe-west1.run.app/" \
  && echo "✅ Backend healthy" || echo "❌ Backend not responding"

# --- Auto commit log ---
echo "## 📦 Commit diagnostic report..."
git config --global user.email "bot@codox.system"
git config --global user.name "Codox Auto"
git add agent.md || true
git commit -m "chore(codox): automated review & deploy report" || echo "ℹ️ Nothing to commit"
git push origin main || echo "⚠️ Push skipped"

# --- Final error check ---
if grep -q "⚠️" agent.md || grep -q "❌" agent.md; then
  echo "❌ Codox run detected issues — review agent.md"
  exit 1
else
  echo "✅ Codox run clean — no errors found"
fi

echo "## ✅ Codox review, build & deploy completed using PROJECT_GUIDE.md context."
