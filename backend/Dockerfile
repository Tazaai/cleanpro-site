# =============================================================
# 🧩 CleanPro Backend — Cloud Run Safe Version (Final Verified)
# =============================================================

FROM node:20
WORKDIR /app

# Copy all backend source
COPY . .

# Install production dependencies only
RUN npm install --omit=dev

# Environment + exposed port
ENV PORT=8080
EXPOSE 8080

# ✅ Healthcheck to help Cloud Run know it’s healthy
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:${PORT}/ || exit 1

# ✅ Start the backend (entrypoint)
CMD ["node", "index.js"]
