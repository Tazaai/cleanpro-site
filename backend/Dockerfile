# 🧩 CleanPro Backend – Cloud Run Dockerfile

# Use stable Node LTS
FROM node:18

# Create and set working directory
WORKDIR /app

# Copy package files first for better caching
COPY backend/package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy the rest of the backend code
COPY backend/ ./

# Expose Cloud Run port
EXPOSE 8080

# Ensure environment variables for Cloud Run
ENV PORT=8080
ENV HOST=0.0.0.0

# Start the backend server
CMD ["node", "index.js"]
