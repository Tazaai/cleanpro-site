FROM node:20 AS build
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend ./
RUN npm run build || npm run build:prod

FROM nginx:1.25-alpine
# Copy whichever folder exists
COPY --from=build /app/frontend/build /usr/share/nginx/html/
COPY --from=build /app/frontend/dist /usr/share/nginx/html/
EXPOSE 8080
HEALTHCHECK CMD curl -f http://localhost:8080/ || exit 1
CMD ["nginx", "-g", "daemon off;"]
