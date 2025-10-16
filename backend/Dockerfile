# 🧩 CleanPro Backend – Final Cloud Run Dockerfile

# Use latest stable Node.js 20 LTS
FROM node:20

# Set working directory
WORKDIR /app/backend

# Copy backend package files first (better build cache)
COPY backend/package*.json ./

# Install production dependencies
RUN npm install --omit=dev

# Copy backend source code
COPY backend ./

# ✅ Environment for Cloud Run
ENV PORT=8080
ENV HOST=0.0.0.0
ENV CLOUD_RUN_TIMEOUT=1200
ENV CLOUD_RUN_CPU_THROTTLING=FALSE

# ✅ Expose Cloud Run port
EXPOSE 8080

# ✅ Health check
HEALTHCHECK CMD curl -f http://localhost:8080/ || exit 1

# ✅ Start backend
CMD ["node", "backend/index.js"]
