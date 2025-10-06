# ~/cleanpro-site/backend/Dockerfile
FROM node:20-slim

WORKDIR /app/backend

# Copy package files and install only production deps
COPY package*.json ./
RUN npm install --production

# Copy backend source code
COPY . .

# Ensure firebase config is inside image
COPY firebase_config.json /app/firebase_config.json

# Set environment
ENV PORT=8080
EXPOSE 8080

# Start backend directly
CMD ["npm","start"]
