FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
# Copy source code including .env file created during CI
COPY . .
# Debug: List files and check for .env
RUN echo "📁 Files after COPY:" && ls -la
# Debug: List environment variables and .env file
RUN echo "🔍 Environment variables:" && env | grep VITE || echo "No VITE variables found"
RUN echo "📋 .env file contents:" && cat .env || echo "No .env file found"
RUN npm run build

FROM nginx:1.25-alpine
COPY --from=build /app/dist /usr/share/nginx/html/
RUN sed -i 's/listen       80;/listen       8080;/' /etc/nginx/conf.d/default.conf
EXPOSE 8080
HEALTHCHECK CMD curl -f http://localhost:8080/ || exit 1
CMD ["nginx", "-g", "daemon off;"]
