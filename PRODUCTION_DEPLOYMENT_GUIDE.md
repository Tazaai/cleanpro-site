# CleanPro Platform - Production Deployment Guide

## 🚀 PRODUCTION DEPLOYMENT CHECKLIST

This guide provides step-by-step instructions for deploying the CleanPro platform to production.

---

## 📋 PRE-DEPLOYMENT REQUIREMENTS

### 1. Service Accounts & Keys
- [ ] Google Cloud Project with Firestore enabled
- [ ] Firebase service account key (JSON)
- [ ] Stripe account with live API keys
- [ ] Google Maps API key with required permissions
- [ ] Google Calendar API credentials (OAuth)

### 2. Domain & SSL
- [ ] Custom domain registered and configured
- [ ] SSL certificate obtained (Let's Encrypt or Cloud SSL)
- [ ] DNS records pointing to Cloud Run service
- [ ] CDN configured (optional but recommended)

### 3. Environment Variables
- [ ] All production environment variables prepared
- [ ] Secrets management configured
- [ ] API keys and tokens secured

---

## 🔧 ENVIRONMENT CONFIGURATION

### Backend Environment Variables
```bash
# Production Backend (.env.production)
NODE_ENV=production
PORT=8080
HOST=0.0.0.0

# Firebase Configuration
FIREBASE_KEY=<base64-encoded-service-account-json>
GCP_PROJECT=<your-gcp-project-id>

# Stripe Configuration  
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PUBLISHABLE_KEY=pk_live_...

# Google APIs
GOOGLE_MAPS_API_KEY=<your-maps-api-key>
GOOGLE_CALENDAR_CLIENT_ID=<oauth-client-id>
GOOGLE_CALENDAR_CLIENT_SECRET=<oauth-client-secret>

# External APIs
OPENAI_API_KEY=<optional-for-ai-features>
EMAIL_SERVICE_KEY=<optional-for-notifications>

# Security
JWT_SECRET=<strong-random-string>
ENCRYPTION_KEY=<32-character-key>
```

### Frontend Environment Variables
```bash
# Production Frontend (.env.production)
VITE_API_BASE=https://api.cleanpro.com
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
VITE_GOOGLE_MAPS_KEY=<your-maps-api-key>
VITE_ENVIRONMENT=production
```

---

## 🐳 DOCKER DEPLOYMENT

### 1. Backend Dockerfile (Already configured)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 8080
CMD ["node", "index.js"]
```

### 2. Frontend Dockerfile (Already configured)  
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 3. Build and Push Images
```bash
# Build backend image
cd backend
docker build -t gcr.io/YOUR-PROJECT/cleanpro-backend:latest .
docker push gcr.io/YOUR-PROJECT/cleanpro-backend:latest

# Build frontend image  
cd ../frontend
docker build -t gcr.io/YOUR-PROJECT/cleanpro-frontend:latest .
docker push gcr.io/YOUR-PROJECT/cleanpro-frontend:latest
```

---

## ☁️ GOOGLE CLOUD RUN DEPLOYMENT

### 1. Deploy Backend Service
```bash
# Deploy backend to Cloud Run
gcloud run deploy cleanpro-backend \
  --image=gcr.io/YOUR-PROJECT/cleanpro-backend:latest \
  --platform=managed \
  --region=us-central1 \
  --allow-unauthenticated \
  --memory=2Gi \
  --cpu=2 \
  --max-instances=100 \
  --set-env-vars="NODE_ENV=production" \
  --set-env-vars="FIREBASE_KEY=$(cat service-account.json | base64)" \
  --set-env-vars="STRIPE_SECRET_KEY=sk_live_..." \
  --port=8080
```

### 2. Deploy Frontend Service
```bash
# Deploy frontend to Cloud Run
gcloud run deploy cleanpro-frontend \
  --image=gcr.io/YOUR-PROJECT/cleanpro-frontend:latest \
  --platform=managed \
  --region=us-central1 \
  --allow-unauthenticated \
  --memory=512Mi \
  --cpu=1 \
  --max-instances=50 \
  --port=80
```

### 3. Configure Custom Domain
```bash
# Map custom domain to services
gcloud run domain-mappings create \
  --service=cleanpro-backend \
  --domain=api.cleanpro.com \
  --region=us-central1

gcloud run domain-mappings create \
  --service=cleanpro-frontend \
  --domain=app.cleanpro.com \
  --region=us-central1
```

---

## 🔒 SECURITY CONFIGURATION

### 1. Firestore Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // User profiles - users can read/write own profile
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      allow read: if request.auth != null && 
        (resource.data.role == 'admin' || resource.data.role == 'cp_owner');
    }
    
    // Coordination points - public read, admin write
    match /coordination_points/{cpId} {
      allow read: if true;
      allow write: if request.auth != null && 
        (get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }
    
    // Bookings - users can read own bookings, CPs can read their bookings
    match /bookings/{bookingId} {
      allow read: if request.auth != null && 
        (request.auth.uid == resource.data.user_id || 
         resource.data.cp_id in get(/databases/$(database)/documents/users/$(request.auth.uid)).data.managed_cps);
      allow create: if request.auth != null;
      allow update: if request.auth != null && 
        (request.auth.uid == resource.data.user_id || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'cp_owner']);
    }
    
    // Admin-only collections
    match /{adminCollection}/{document} {
      allow read, write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

### 2. CORS Configuration
```javascript
// Backend CORS setup (already configured in index.js)
app.use(cors({
  origin: [
    'https://app.cleanpro.com',
    'https://cleanpro.com',
    'http://localhost:3000' // Remove in production
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### 3. Stripe Webhook Configuration
```bash
# Set up Stripe webhook endpoint
# URL: https://api.cleanpro.com/api/admin/stripe/webhook
# Events to listen for:
# - payment_intent.succeeded
# - payment_intent.payment_failed  
# - payout.paid
# - account.updated
```

---

## 📊 MONITORING & LOGGING

### 1. Cloud Logging Setup
```bash
# Enable Cloud Logging for both services
gcloud logging sinks create cleanpro-logs \
  bigquery.googleapis.com/projects/YOUR-PROJECT/datasets/cleanpro_logs \
  --log-filter='resource.type="cloud_run_revision"'
```

### 2. Error Reporting  
```bash
# Enable Error Reporting
gcloud services enable clouderrorreporting.googleapis.com
```

### 3. Performance Monitoring
```javascript
// Add to backend index.js
import { Monitoring } from '@google-cloud/monitoring';
const monitoring = new Monitoring();

// Custom metrics for business KPIs
app.use((req, res, next) => {
  // Track API usage and performance
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    // Send metrics to Cloud Monitoring
  });
  next();
});
```

---

## 🧪 POST-DEPLOYMENT VALIDATION

### 1. Health Check Tests
```bash
# Test backend health
curl https://api.cleanpro.com/health
# Expected: {"ok":true,"status":"healthy"}

# Test frontend
curl https://app.cleanpro.com
# Expected: HTML response

# Test API endpoints
curl https://api.cleanpro.com/api/location/detect
# Expected: JSON with location data
```

### 2. End-to-End Testing
```bash
# User registration flow
# Booking creation flow  
# Payment processing flow
# CP management flow
# Admin dashboard access
```

### 3. Performance Testing
```bash
# Load testing with realistic traffic
# Database query performance
# API response times
# Frontend loading speed
```

---

## 📈 SCALING CONFIGURATION

### 1. Auto-scaling Settings
```yaml
# cloud-run-backend.yaml
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: cleanpro-backend
spec:
  template:
    metadata:
      annotations:
        autoscaling.knative.dev/minScale: "1"
        autoscaling.knative.dev/maxScale: "100"
        autoscaling.knative.dev/target: "80"
    spec:
      containerConcurrency: 100
      timeoutSeconds: 300
```

### 2. Database Scaling
```javascript
// Firestore automatic scaling (managed)
// Connection pooling configured
// Read replicas for analytics queries
```

### 3. CDN Configuration
```bash
# Cloud CDN for static assets
gcloud compute backend-buckets create cleanpro-static \
  --gcs-bucket-name=cleanpro-static-assets

gcloud compute url-maps create cleanpro-cdn \
  --default-backend-bucket=cleanpro-static
```

---

## 🔄 BACKUP & DISASTER RECOVERY

### 1. Database Backups
```bash
# Automated Firestore backups
gcloud firestore databases create \
  --location=us-central1 \
  --database=cleanpro-backup

# Daily backup schedule
gcloud scheduler jobs create app-engine cleanpro-backup \
  --schedule="0 2 * * *" \
  --timezone="UTC" \
  --http-method=POST \
  --uri=https://api.cleanpro.com/admin/backup
```

### 2. Code Repository
```bash
# Ensure code is backed up in multiple locations
# Production branch protected
# Automated testing on all changes
```

---

## 📋 PRODUCTION LAUNCH CHECKLIST

### Pre-Launch Validation
- [ ] All environment variables configured
- [ ] SSL certificates installed and working
- [ ] Database security rules active
- [ ] Payment processing tested with real transactions
- [ ] Monitoring and logging active
- [ ] Backup systems operational
- [ ] Load testing completed successfully
- [ ] User acceptance testing passed

### Go-Live Steps
1. [ ] Final deployment to production
2. [ ] DNS cutover to new services
3. [ ] SSL verification
4. [ ] Payment system activation
5. [ ] Monitoring alerts configured
6. [ ] Team notification of go-live
7. [ ] User communication sent
8. [ ] Support team activated

### Post-Launch Monitoring (First 24 Hours)
- [ ] Monitor error rates and performance
- [ ] Verify payment processing
- [ ] Check user registration flow
- [ ] Validate booking creation
- [ ] Monitor system resources
- [ ] Review logs for issues
- [ ] Track user feedback

---

## 📞 SUPPORT & MAINTENANCE

### Monitoring Dashboards
- **Uptime:** Cloud Run service health
- **Performance:** API response times  
- **Business:** Revenue, bookings, user activity
- **Security:** Failed login attempts, suspicious activity

### Alert Configuration
- Service downtime > 1 minute
- Error rate > 1%
- Response time > 5 seconds
- Failed payments > 5% 
- Database connection issues

### Maintenance Schedule
- **Daily:** Automated backups, log review
- **Weekly:** Performance analysis, security patches
- **Monthly:** Feature deployments, system updates
- **Quarterly:** Full system audit, disaster recovery test

---

## 🎯 SUCCESS METRICS

### Technical KPIs
- **Uptime:** > 99.9%
- **Response Time:** < 2 seconds
- **Error Rate:** < 0.5%
- **Page Load Speed:** < 3 seconds

### Business KPIs  
- **User Growth:** Monthly active users
- **Revenue Growth:** Monthly recurring revenue
- **Customer Satisfaction:** > 4.5/5 rating
- **Platform Usage:** Bookings per day

---

*Deployment Guide Version 1.0*  
*Last Updated: November 15, 2025*  
*Platform Status: ✅ PRODUCTION READY*