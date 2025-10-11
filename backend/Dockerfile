# ~/cleanpro-site/backend/Dockerfile
FROM node:20-slim

WORKDIR /app/backend

# Copy package files and install only production deps
COPY package*.json ./
RUN npm install --production

# Copy backend source code
COPY . .

# Ensure firebase config is inside image

# Set environment
ENV PORT=8080
ENV CLOUD_RUN_TIMEOUT=900
ENV CLOUD_RUN_TIMEOUT=900
ENV CLOUD_RUN_CPU_THROTTLING=FALSE
ENV CLOUD_RUN_TIMEOUT=900
EXPOSE 8080

# Start backend directly
CMD ["npm","start"]
# firebase_config optional marker only
