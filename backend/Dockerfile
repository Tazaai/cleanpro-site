# ~/cleanpro-site/backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files and install deps
COPY package*.json ./
RUN npm install --production --force

# Copy backend source code
COPY . .

ENV PORT=8080
EXPOSE 8080

# Start the backend
CMD ["node", "index.js"]
