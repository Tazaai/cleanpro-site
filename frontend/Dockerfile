FROM node:20 AS build
WORKDIR /app

# Add build arguments for environment variables
ARG VITE_API_BASE
ARG VITE_GOOGLE_MAPS_API_KEY

COPY package*.json ./
RUN npm install

# Copy source code including .env file created during CI
COPY . .

# Debug: List files and check for .env
RUN echo "📁 Files after COPY:" && ls -la

# Debug: Show build arguments
RUN echo "🔍 Build ARGs received:" && echo "VITE_API_BASE=${VITE_API_BASE}" && echo "VITE_GOOGLE_MAPS_API_KEY=${VITE_GOOGLE_MAPS_API_KEY}"

# Create .env file from build arguments
RUN echo "VITE_API_BASE=${VITE_API_BASE}" > .env && \
    echo "VITE_GOOGLE_MAPS_API_KEY=${VITE_GOOGLE_MAPS_API_KEY}" >> .env

# Debug: Check generated .env file
RUN echo "📋 Generated .env file:" && cat .env

RUN npm run build

FROM nginx:1.25-alpine
COPY --from=build /app/dist /usr/share/nginx/html/
RUN sed -i 's/listen       80;/listen       8080;/' /etc/nginx/conf.d/default.conf
EXPOSE 8080
HEALTHCHECK CMD curl -f http://localhost:8080/ || exit 1
CMD ["nginx", "-g", "daemon off;"]
