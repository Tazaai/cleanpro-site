# 🧩 CleanPro Frontend – Final Cloud Run Dockerfile

# Use official Node.js 20 image
FROM node:20 AS build

# Set working directory inside container
WORKDIR /app

# Copy only frontend files first
COPY frontend/package*.json ./
RUN npm install

# Copy frontend source code
COPY frontend ./

# Build static files for production
RUN npm run build

# --- Serve with lightweight Nginx ---
FROM nginx:1.25-alpine

# Copy built static files to Nginx HTML directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose default port for Cloud Run
EXPOSE 8080

# Health check
HEALTHCHECK CMD curl -f http://localhost:8080/ || exit 1

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
