# =============================================================
# 🧩 CleanPro Backend — Cloud Run Safe Version (Final)
# =============================================================

FROM node:20
WORKDIR /app

# Copy source
COPY . .

# Install only production deps
RUN npm install --omit=dev

# Env + health
ENV PORT=8080
EXPOSE 8080

# Healthcheck (optional)
HEALTHCHECK CMD curl -f http://localhost:$PORT/ || exit 1

# ✅ Run backend entrypoint
CMD ["node", "index.js"]
