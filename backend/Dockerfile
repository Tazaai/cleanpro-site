# 🧩 CleanPro Backend – Final Cloud Run Dockerfile
# -------------------------------------------------
# ✅ Uses Node.js 20 LTS for security and compatibility
# ✅ Works with Google Cloud Run and listens on PORT=8080
# ✅ Includes health check and optimized caching
# -------------------------------------------------

# Use latest stable Node.js 20 LTS
FROM node:20

# Set working directory inside container
WORKDIR /app

# Copy all backend source files
COPY . .

# Install only production dependencies (skip devDependencies)
RUN npm install --omit=dev

# Cloud Run requires the container to listen on this port
ENV PORT=8080
ENV HOST=0.0.0.0

# Expose the Cloud Run port
EXPOSE 8080

# Add a lightweight health check
HEALTHCHECK CMD curl -f http://localhost:8080/ || exit 1

# Start the backend application
CMD ["node", "backend/index.js"]
