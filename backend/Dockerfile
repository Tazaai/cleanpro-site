# 🧩 CleanPro Backend – Final Cloud Run Dockerfile

FROM node:20

# Set working directory inside container
WORKDIR /app

# Copy package files first for better caching
COPY backend/package*.json ./backend/

# Install dependencies
RUN cd backend && npm install --omit=dev

# Copy entire project (backend + routes)
COPY . .

# Cloud Run default port
ENV PORT=8080
EXPOSE 8080

# Health check
HEALTHCHECK CMD curl -f http://localhost:8080/ || exit 1

# ✅ Start backend
CMD ["node", "backend/index.js"]
