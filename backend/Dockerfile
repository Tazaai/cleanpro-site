# ~/cleanpro-site/backend/Dockerfile
FROM node:20-slim

WORKDIR /app/backend

# Copy package files and install only production deps
COPY package*.json ./
RUN npm install --production

# Copy backend source code
COPY . .

# ✅ Optional firebase config (skip if missing)
RUN if [ -f firebase_config.json ]; then \
      cp firebase_config.json /app/firebase_config.json && \
      echo "✅ firebase_config.json copied"; \
    else \
      echo "ℹ️ firebase_config.json not found, skipping copy"; \
    fi

# Set environment
ENV PORT=8080
EXPOSE 8080

# Start backend
CMD ["npm","start"]
