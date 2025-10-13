# 🧩 CleanPro Backend – Final Cloud Run Dockerfile

# Use a stable Node.js LTS image
FROM node:18

# Set working directory
WORKDIR /app

# Copy backend package files first (for better build cache)
COPY package*.json ./

# Install production dependencies
RUN npm install --omit=dev

# Copy backend source code into the container
COPY . .

# Ensure environment variables for Cloud Run
ENV PORT=8080
ENV HOST=0.0.0.0

# Expose Cloud Run port
EXPOSE 8080

# Start the backend from backend/index.js explicitly
CMD ["node", "backend/index.js"]
