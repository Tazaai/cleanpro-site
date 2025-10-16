# 🧩 CleanPro Backend – Cloud Run Working Fix

FROM node:20

WORKDIR /workspace/backend
COPY backend ./
RUN npm install --omit=dev

ENV PORT=8080
EXPOSE 8080

HEALTHCHECK CMD curl -f http://localhost:8080/ || exit 1

# ✅ Start from relative path (matches WORKDIR)
CMD ["node", "index.js"]
