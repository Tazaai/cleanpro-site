#!/bin/bash
# 🧠 Codox Master Review & Self-Healing Runner (v5 – Full Auto Redeploy with Loop Limit)
set +e
exec > >(tee agent.md) 2>&1

MAX_CYCLES=5
CYCLE=1

run_cycle() {
echo "=============================="
echo "🚀 Codox Cycle $CYCLE / $MAX_CYCLES"
echo "=============================="

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
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
app.use(cors({ origin: "*", methods: "GET,POST,OPTIONS" }));
app.use(express.json());

// Ensure firebase_config.json exists
const CONFIG_PATH = path.resolve("./firebase_config.json");
if (!fs.existsSync(CONFIG_PATH)) {
  console.error("⚠️ Missing firebase_config.json — creating fallback");
  fs.writeFileSync(CONFIG_PATH, JSON.stringify({ projectId: process.env.GCP_PROJECT || "local-test" }));
}

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

# --- Auto-generate minimal route stubs ---
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
[[ $ERR -eq 1 ]] && return 1

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

# --- Frontend build ---
echo "## 🎨 Checking frontend..."
if [ -d frontend ]; then
  cd frontend
  npm install --legacy-peer-deps || echo "⚠️ npm install failed"
  npm run build || echo "⚠️ build failed"
  cd ..
fi

# --- Deploy backend ---
echo "## ☁️ Deploying backend..."
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
bash deploy_backend.sh || echo "⚠️ Backend deploy failed"

# --- Deploy frontend ---
echo "## ☁️ Deploying frontend..."
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
bash deploy_frontend.sh || echo "⚠️ Frontend deploy failed"

# --- Health check ---
echo "## 🩺 Health test..."
curl -fsSL "https://cleanpro-backend-5539254765.europe-west1.run.app/" \
  && echo "✅ Backend healthy" || echo "❌ Backend not responding"

# --- Parse Cloud Run logs ---
echo "## 🔍 Parsing Cloud Run logs..."
LOGS=$(gcloud logs read cleanpro-backend --limit=20 --format="value(textPayload)" 2>/dev/null)
if echo "$LOGS" | grep -q "ENOENT"; then
  echo "⚠️ Missing firebase_config.json — creating fallback"
  echo '{}' > backend/firebase_config.json
fi
if echo "$LOGS" | grep -q "CORS"; then
  echo "⚠️ CORS problem detected — enforcing global CORS"
  grep -q "app.use(cors" backend/index.js || \
  sed -i '/const app = express()/a\
import cors from "cors";\
app.use(cors({ origin: "*", methods: "GET,POST,OPTIONS" }));' backend/index.js
fi

# --- Run tests ---
echo "## 🧪 Running backend & frontend tests..."
[ -f test_backend.sh ] && bash test_backend.sh | tee logs/test_backend.log
[ -f test_frontend.sh ] && bash test_frontend.sh | tee logs/test_frontend.log

# --- Auto commit & redeploy ---
echo "## 📦 Auto commit & redeploy..."
git config --global user.email "bot@codox.system"
git config --global user.name "Codox Auto"
git add backend frontend logs agent.md || true
git commit -m "chore(codox): self-healing cycle $CYCLE" || echo "ℹ️ Nothing to commit"
git pull --rebase || echo "⚠️ Rebase conflict ignored"
git push origin main || echo "⚠️ Push skipped"

echo "## ♻️ Redeploying after cycle $CYCLE..."
bash deploy_backend.sh
bash deploy_frontend.sh

# --- Evaluate if we should stop ---
if grep -q "❌" agent.md || grep -q "⚠️" agent.md; then
  echo "⚠️ Still detecting issues after cycle $CYCLE"
  return 1
else
  echo "✅ System stable after cycle $CYCLE"
  return 0
fi
}

# --- Loop logic with max 5 cycles ---
while [ $CYCLE -le $MAX_CYCLES ]; do
  run_cycle && break
  ((CYCLE++))
done

if [ $CYCLE -gt $MAX_CYCLES ]; then
  echo "❌ Reached max auto-healing cycles ($MAX_CYCLES) — see agent.md for details."
  exit 1
else
  echo "✅ Codox fully stabilized in $CYCLE cycles."
fi
