# 🧩 CleanPro Backend – Cloud Run Working Fix

FROM node:20

# ✅ Set work directory
WORKDIR /workspace

# ✅ Copy backend source
COPY . .

# ✅ Install only production deps
RUN npm install --omit=dev

# ✅ Expose and run
ENV PORT=8080
EXPOSE 8080

HEALTHCHECK CMD curl -f http://localhost:8080/ || exit 1

CMD ["node", "index.js"]
