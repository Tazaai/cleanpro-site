# 🧩 CleanPro Backend – Absolute Path Fix (Final)

FROM node:20

WORKDIR /workspace

COPY backend ./backend
RUN cd backend && npm install --omit=dev

ENV PORT=8080
EXPOSE 8080

HEALTHCHECK CMD curl -f http://localhost:8080/ || exit 1

# ✅ Explicit absolute path start
CMD ["node", "/workspace/backend/index.js"]
