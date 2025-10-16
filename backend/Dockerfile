# 🧩 CleanPro Backend – Cloud Run Root Start (Final)

FROM node:20

# Work inside default Cloud Run root
WORKDIR /workspace

# Copy backend
COPY backend ./backend

# Install dependencies
WORKDIR /workspace/backend
RUN npm install --omit=dev

# Env + port
ENV PORT=8080
EXPOSE 8080

# Health check
HEALTHCHECK CMD curl -f http://localhost:8080/ || exit 1

# ✅ Start backend
CMD ["node", "index.js"]
