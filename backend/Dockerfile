# 🧩 CleanPro Backend – Final Cloud Run Dockerfile

# Use latest stable Node.js 20 LTS
FROM node:20

# Set working directory
WORKDIR /app/backend
# Set working directory inside container
WORKDIR /app/backend

# Copy package files first (better build cache)
COPY package*.json ./

# Install production dependencies
RUN npm install --omit=dev

# Copy backend source code into container
COPY . .

# ✅ Environment for Cloud Run
ENV PORT=8080
ENV HOST=0.0.0.0
ENV CLOUD_RUN_TIMEOUT=1200
ENV CLOUD_RUN_CPU_THROTTLING=FALSE

# ✅ Expose Cloud Run port
EXPOSE 8080

# ✅ Health check
HEALTHCHECK CMD curl -f http://localhost:8080/ || exit 1

# Start backend
# ✅ Start backend
CMD ["node", "index.js"]
CMD ["node","index.js"]
