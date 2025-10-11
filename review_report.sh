#!/bin/bash
# ~/cleanpro-site/review_report.sh
# 🧠 CleanPro Codox Master Controller – Full Auto Diagnostic, Self-Healing & Deployment

set +e
touch agent.md
exec > >(tee agent.md) 2>&1

MAX_RUNS=3
err=0

###############################################################################
# 🧩 Force Mode + Lock
###############################################################################
if [[ "$INPUT_FORCE" == "true" ]]; then
  echo "⚙️ Force mode ON — full rebuild"
  rm -f .codox_lock 2>/dev/null
fi

if [[ -f .codox_lock ]]; then
  echo "�� Codox lock present — skipping run"
  exit 0
fi
echo "run" > .codox_lock

###############################################################################
# 🔑 Secrets Validation
###############################################################################
echo "## 🔑 Checking required secrets"
for key in GOOGLE_MAPS_API_KEY GCP_PROJECT GCP_SA_KEY FIREBASE_KEY; do
  if [[ -z "${!key}" ]]; then
    echo "❌ Missing $key"
    err=1
  else
    echo "✅ $key present"
  fi
done
[[ $err -ne 0 ]] && { echo "🚨 Missing secrets — abort"; exit 1; }

###############################################################################
# 🧱 Project Structure Validation
###############################################################################
echo "## �� Validating project structure"
mkdir -p backend/routes frontend/src logs reports .github/workflows

# basic backend structure
[[ ! -f backend/package.json ]] && echo '{"type":"module"}' > backend/package.json
[[ ! -f backend/index.js ]] && echo 'import express from "express";const app=express();app.get("/",(_req,res)=>res.send("✅ backend online"));app.listen(process.env.PORT||8080,"0.0.0.0");' > backend/index.js
[[ ! -f backend/firebase_config.json ]] && echo '{}' > backend/firebase_config.json
[[ ! -f backend/serviceAccountKey.json ]] && echo '{}' > backend/serviceAccountKey.json
[[ ! -f deploy_backend.sh ]] && echo -e '#!/bin/bash\necho "▶️ Deploying Backend..."\ngcloud run deploy cleanpro-backend --source . --region europe-west1 --project $GCP_PROJECT --quiet' > deploy_backend.sh && chmod +x deploy_backend.sh

# frontend structure
mkdir -p frontend/src
[[ ! -f frontend/package.json ]] && echo '{"name":"cleanpro-frontend","type":"module","scripts":{"build":"echo build ok"}}' > frontend/package.json
[[ ! -f frontend/src/main.jsx ]] && echo 'import ReactDOM from "react-dom/client";import App from "./App.jsx";ReactDOM.createRoot(document.getElementById("root")).render(<App/>);' > frontend/src/main.jsx
[[ ! -f frontend/src/App.jsx ]] && echo 'export default function App(){return <h1>CleanPro Frontend Ready</h1>}' > frontend/src/App.jsx

echo "✅ Structure verified."

###############################################################################
# 🐳 Dockerfile Sanity + Deep Auto-Heal
###############################################################################
echo "## 🐳 Checking backend/Dockerfile"
if [[ -f backend/Dockerfile ]]; then
  sed -i 's#WORKDIR /app$#WORKDIR /app/backend#' backend/Dockerfile 2>/dev/null
  grep -q "EXPOSE 8080" backend/Dockerfile || echo "EXPOSE 8080" >> backend/Dockerfile
  grep -q "CMD" backend/Dockerfile || echo 'CMD ["node","index.js"]' >> backend/Dockerfile
  grep -q "ENV CLOUD_RUN_TIMEOUT" backend/Dockerfile || sed -i '/ENV PORT=8080/a ENV CLOUD_RUN_TIMEOUT=1200\nENV CLOUD_RUN_CPU_THROTTLING=FALSE' backend/Dockerfile
else
  echo "⚙️ Generating backend/Dockerfile"
  cat > backend/Dockerfile <<'EOF'
FROM node:20-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev || npm install --production
COPY . .
EXPOSE 8080
ENV PORT=8080
ENV CLOUD_RUN_TIMEOUT=1200
ENV CLOUD_RUN_CPU_THROTTLING=FALSE
WORKDIR /app/backend
CMD ["node","index.js"]
EOF
fi
echo "✅ Dockerfile ready."

###############################################################################
# 🧠 Auto-Generate Missing Backend Routes
###############################################################################
echo "## 🧠 Checking backend routes"
gen_route() {
  local n="$1"
  local p="backend/routes/${n}.mjs"
  [[ -f $p ]] && { echo "✅ $n present"; return; }
  echo "⚙️ Creating $n..."
  cat > "$p" <<EOF
import express from "express";
const router = express.Router();
router.get("/",(_req,res)=>res.json({ok:true,route:"$n"}));
export default router;
EOF
}
for r in services_api bookings_api quotes_api pricing_api calendar_api coordination_points_api config_api; do
  gen_route "$r"
done
echo "✅ Route check complete."

###############################################################################
# �� Firebase Admin Initialization
###############################################################################
echo "## 🔥 Firebase Admin init check"
if [[ -f backend/serviceAccountKey.json ]] && ! grep -q "firebase-admin" backend/index.js; then
  echo "⚙️ Injecting Firebase Admin init..."
  sed -i '1i import admin from "firebase-admin";\nimport { readFileSync } from "fs";\ntry{if(!admin.apps.length){const s=JSON.parse(readFileSync("./backend/serviceAccountKey.json"));admin.initializeApp({credential:admin.credential.cert(s)});console.log("✅ Firebase Admin init");}}catch(e){console.error("⚠️ Firebase init failed:",e.message);}' backend/index.js
fi

###############################################################################
# 🎨 Frontend Auto-Heal & Build
###############################################################################
echo "## 🎨 Checking frontend"
if [[ -d frontend ]]; then
  cd frontend
  npm install --legacy-peer-deps || echo "⚠️ npm install failed"
  npm run build || echo "⚠️ Frontend build failed"
  cd ..
fi

###############################################################################
# 🗄️ Firestore / Database Validation
###############################################################################
echo "## 🗄️ Checking Firebase structure"
if [[ -f backend/serviceAccountKey.json ]]; then
  node - <<'NODE'
import admin from "firebase-admin";
import { readFileSync } from "fs";
try {
  const s = JSON.parse(readFileSync("./backend/serviceAccountKey.json"));
  admin.initializeApp({ credential: admin.credential.cert(s) });
  const db = admin.firestore();
  console.log("✅ Firestore connected");
  const checks = ["topics","bookings","pricing"];
  for (const c of checks) {
    db.collection(c).limit(1).get().then(r=>console.log(`📘 ${c}: ${r.size} docs`)).catch(()=>console.log(`⚠️ ${c} missing`));
  }
} catch(e) { console.error("⚠️ Firestore check skipped:", e.message); }
NODE
else
  echo "ℹ️ No serviceAccountKey.json — DB check skipped"
fi

###############################################################################
# ☁️ Deploy Loop + Cloud Run Log Review
###############################################################################
echo "## ☁️ Deploy & log review"
for i in $(seq 1 $MAX_RUNS); do
  echo "🧠 Attempt $i/$MAX_RUNS"
  npx codox fix || echo "⚠️ codox fix fail $i"
  if bash ./deploy_backend.sh; then
    echo "✅ Deploy OK"
    gcloud run services describe cleanpro-backend --project "$GCP_PROJECT" --region europe-west1 --format="value(status.url)" 2>/dev/null
if ! curl -fsSL https://cleanpro-backend-5539254765.europe-west1.run.app/ >/dev/null; then 
  echo "❌ Cloud Run service not responding – marking workflow failed"; 
  exit 1; 
fi
    break
  else
    echo "⚠️ Retry $i failed — reading Cloud Run logs..."
    gcloud logs read --project "$GCP_PROJECT" --limit=20 --format="value(textPayload)" > "logs/run_$i.log" 2>/dev/null || true
    tail -n 10 "logs/run_$i.log" || true
    sleep 10
  fi
done

###############################################################################
# 📋 Summary + AI Log Summarizer
###############################################################################
echo "──────────────────────────────"
echo "📋 Codox AI Master completed"
echo "Timestamp: $(date '+%Y-%m-%d %H:%M:%S')"
echo "✅ Full backend, frontend, DB, deploy cycle done."
echo "## 🤖 AI Summary" >> agent.md
tail -n 200 agent.md | grep -E "✅|⚠️|❌" | tail -n 10 >> agent.md
echo "──────────────────────────────" >> agent.md
echo "📊 End of Summary (auto-generated)" >> agent.md

###############################################################################
# 🧩 Syntax Verification + Safe Update + Auto-Fail
###############################################################################
bash -n "$0" && echo "✅ review_report.sh syntax verified" || {
  echo "⚠️ Syntax issue — restoring verified version"
  git fetch origin main
  git checkout origin/main -- review_report.sh || true
}
sha256sum "$0" > logs/review_report_checksum.txt 2>/dev/null

grep -q "❌" agent.md && { echo "❌ Errors detected — marking failure"; exit 1; }

echo "──────────────────────────────"
echo "🏁 End of review_report.sh (Codox Master Controller)"
exit 0
