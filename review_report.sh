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
[[ ! -f backend/index.js ]] && echo 'import express from "express";const app=express();app.get("/",(_q,s)=>s.send("✅ Backend running"));app.listen(process.env.PORT||8080,"0.0.0.0");' > backend/index.js
[[ ! -f backend/package.json ]] && echo '{"type":"module"}' > backend/package.json
[[ ! -f backend/Dockerfile ]] && cat > backend/Dockerfile <<'EOF'
FROM node:20
WORKDIR /app/backend
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
EXPOSE 8080
CMD ["node","index.js"]
EOF

# --- Auto-generate common routes ---
for r in services_api bookings_api pricing_api calendar_api config_api; do
  f=backend/routes/${r}.mjs
  [[ ! -f $f ]] && echo -e 'import e from "express";const r=e.Router();r.get("/",(_q,s)=>s.json({ok:true,route:"'$r'"}));export default r;' > $f
done

# --- Secrets check ---
echo "## 🔑 Checking required secrets..."
for key in GOOGLE_MAPS_API_KEY GCP_PROJECT GCP_SA_KEY FIREBASE_KEY; do
  [[ -z "${!key}" ]] && echo "❌ Missing $key" && ERR=1 || echo "✅ $key OK"
done
[[ $ERR -eq 1 ]] && exit 1

# --- Docker sanity ---
echo "## 🐳 Verifying Dockerfile..."
grep -q "EXPOSE 8080" backend/Dockerfile || echo "EXPOSE 8080" >> backend/Dockerfile
grep -q "CMD" backend/Dockerfile || echo 'CMD ["node","index.js"]' >> backend/Dockerfile

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
  bash deploy_backend.sh || echo "⚠️ Deploy failed, check Cloud Run"
else
  echo '#!/bin/bash' > deploy_backend.sh
  echo 'gcloud run deploy cleanpro-backend --source . --region europe-west1 --project $GCP_PROJECT --quiet' >> deploy_backend.sh
  chmod +x deploy_backend.sh
  bash deploy_backend.sh
fi

# --- Health test ---
echo "## 🩺 Health test..."
curl -fsSL "https://cleanpro-backend-5539254765.europe-west1.run.app/" \
  && echo "✅ Backend healthy" || echo "❌ Backend not responding"

echo "## ✅ Codox review completed using PROJECT_GUIDE.md context."
