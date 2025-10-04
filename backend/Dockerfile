# ~/cleanpro-site/backend/Dockerfile
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy dependency manifests first (better layer caching)
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production || npm install --production --force

# Copy source code
COPY . .

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8080

# Expose the Cloud Run port
EXPOSE 8080

# Health check (optional but recommended)
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:8080/ || exit 1

# Start the backend
CMD ["node", "index.js"]
