# 🧩 CleanPro Backend – Final Cloud Run Dockerfile



FROM node:20

WORKDIR /app



# Copy backend files

COPY . .



# Install dependencies inside backend

WORKDIR /app/backend

RUN npm install --omit=dev



# Cloud Run environment

ENV PORT=8080

EXPOSE 8080



HEALTHCHECK CMD curl -f http://localhost:8080/ || exit 1



# ✅ Correct entry point

CMD ["node", "index.js"]
