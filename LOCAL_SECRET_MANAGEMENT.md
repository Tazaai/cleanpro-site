# 🔐 Local Secret Management - Secure Solutions

## 🎯 Safe Methods to Use Secrets Locally

### 1. **`.env` Files with `.gitignore` Protection** ⭐ **RECOMMENDED**

```bash
# Create .env file (LOCAL ONLY - NEVER COMMIT)
echo "GCP_SA_KEY=$(cat path/to/service-account.json | base64 -w 0)" >> .env
echo "FIREBASE_KEY=$(cat path/to/service-account.json | base64 -w 0)" >> .env
echo "JWT_SECRET=your-super-secret-jwt-key-32-chars-min" >> .env
echo "STRIPE_SECRET_KEY=sk_test_..." >> .env
echo "GOOGLE_MAPS_API_KEY=AIza..." >> .env
```

**Protection**: Ensure `.env` is in `.gitignore`:
```gitignore
# Environment variables
.env
.env.local
.env.*.local
*.env
```

### 2. **Separate Config Directory (Git-ignored)**

```bash
# Create config directory
mkdir -p config/local
echo "config/local/" >> .gitignore

# Store secrets
echo '{"type":"service_account",...}' > config/local/gcp-sa-key.json
echo "your-jwt-secret" > config/local/jwt-secret.txt
```

**Load in application**:
```javascript
// Load from files
const gcpKey = fs.readFileSync('config/local/gcp-sa-key.json', 'utf8');
const jwtSecret = fs.readFileSync('config/local/jwt-secret.txt', 'utf8').trim();
```

### 3. **OS Environment Variables**

```bash
# Add to ~/.bashrc or ~/.zshrc
export GCP_SA_KEY="$(cat path/to/service-account.json | base64 -w 0)"
export JWT_SECRET="your-super-secret-key"
export STRIPE_SECRET_KEY="sk_test_..."

# Reload shell
source ~/.bashrc
```

### 4. **Development Container Secrets** ⭐ **BEST FOR CODESPACES**

**Codespaces Secrets** (Repository level):
1. GitHub → Repository → Settings → Codespaces → Secrets
2. Add development secrets separate from production
3. Prefix with `DEV_` or `LOCAL_`

```bash
# Codespaces automatically injects these
echo $DEV_GCP_SA_KEY
echo $DEV_JWT_SECRET
```

## 🛡️ Security Best Practices

### ✅ **DO's**

1. **Use Different Keys for Dev/Prod**:
   ```bash
   # Development
   GCP_SA_KEY_DEV="{...dev-service-account...}"
   STRIPE_SECRET_KEY_DEV="sk_test_..."
   
   # Production (GitHub Secrets)
   GCP_SA_KEY="{...prod-service-account...}"
   STRIPE_SECRET_KEY="sk_live_..."
   ```

2. **Validate .gitignore Protection**:
   ```bash
   # Check if secrets would be committed
   git check-ignore .env
   git check-ignore config/local/
   
   # Should return the file paths (means they're ignored)
   ```

3. **Use Development-Only APIs**:
   ```bash
   # Google Maps - restrict by domain/IP
   GOOGLE_MAPS_API_KEY_DEV="AIza...restricted-to-localhost"
   
   # Stripe - use test mode
   STRIPE_SECRET_KEY_DEV="sk_test_..."
   ```

### ❌ **DON'Ts**

1. **Never commit secrets to git**
2. **Don't use production keys in development**
3. **Don't share .env files via email/chat**
4. **Don't put secrets in code comments**

## 🔧 Implementation for CleanPro

### Current Setup Enhancement:

```bash
# 1. Create local environment file
cat > .env.local << 'EOF'
# 🔐 LOCAL DEVELOPMENT SECRETS
# NEVER COMMIT THIS FILE

# Core Infrastructure (Development)
GCP_PROJECT=cleanpro-site-dev
GCP_SA_KEY=base64-encoded-dev-service-account-json

# APIs (Development/Test Keys)
GOOGLE_MAPS_API_KEY=your-maps-api-key
STRIPE_SECRET_KEY=sk_test_your-test-key
JWT_SECRET=development-jwt-secret-32-chars-minimum

# Firebase (Development)
FIREBASE_KEY=base64-encoded-dev-firebase-credentials
EOF

# 2. Ensure gitignore protection
echo ".env.local" >> .gitignore
echo "*.env" >> .gitignore
echo "config/local/" >> .gitignore
```

### Environment Detection in Code:

```javascript
// backend/firebase.js enhancement
const isDevelopment = process.env.NODE_ENV === 'development';
const firebaseKey = process.env.FIREBASE_KEY || process.env.FIREBASE_KEY_DEV;

if (isDevelopment) {
  console.log("🔧 Development mode: Using local/test credentials");
} else {
  console.log("🚀 Production mode: Using GitHub Secrets");
}
```

## 📊 Security Layers

| Method | Security Level | Convenience | Risk if Exposed |
|--------|---------------|-------------|-----------------|
| `.env` + `.gitignore` | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Low (dev keys only) |
| Config Directory | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Low (git-ignored) |
| OS Environment | ⭐⭐⭐ | ⭐⭐ | Medium (shell history) |
| Codespaces Secrets | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Very Low (encrypted) |

## 🚨 Emergency Response

**If secrets accidentally committed**:

1. **Immediately rotate/revoke the exposed keys**
2. **Remove from git history**:
   ```bash
   # Remove file from git history
   git filter-branch --index-filter 'git rm --cached --ignore-unmatch .env' HEAD
   
   # Force push (DANGER - only if necessary)
   git push origin --force --all
   ```
3. **Update .gitignore and recommit**

## 🎯 Recommended Solution for CleanPro

**Use `.env.local` with development-only credentials**:
- ✅ Secure (never committed)
- ✅ Convenient (automatic loading)
- ✅ Separate from production
- ✅ Works with existing codebase
- ✅ Compatible with Codespaces