# 🧩 CleanPro Backend – Cloud Run Final Fix

FROM node:20



WORKDIR /app

COPY . .

RUN npm install --omit=dev



ENV PORT=8080

EXPOSE 8080



HEALTHCHECK CMD curl -f http://localhost:$PORT/ || exit 1



CMD ["node", "index.js"]
