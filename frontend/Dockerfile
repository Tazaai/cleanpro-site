# Stage 1: build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: serve with nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Cloud Run requires listening on $PORT
EXPOSE 8080
CMD ["sh", "-c", "sed -i \"s/listen       80;/listen ${PORT};/\" /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]
