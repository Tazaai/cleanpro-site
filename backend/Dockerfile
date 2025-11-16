# =============================================================
# 🧩 CleanPro Backend — Cloud Run Safe Version (Final Verified)
# =============================================================

FROM node:20
WORKDIR /app

# Install curl for Cloud Run health checks
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Copy package files first for better build caching
COPY package*.json ./
RUN npm install --omit=dev --legacy-peer-deps

# Copy backend source
COPY . .

# ✅ Environment
ENV PORT=8080
EXPOSE 8080

# ✅ Healthcheck (Cloud Run detects service health)
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:${PORT}/ || exit 1

# ✅ Start backend  
CMD ["node", "index.js"]
