# 🧩 CleanPro Frontend – Correct Build Context

FROM node:20 AS build
WORKDIR /app
COPY . .
RUN cd frontend && npm install && npm run build

FROM nginx:1.25-alpine
COPY --from=build /app/frontend/build /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
