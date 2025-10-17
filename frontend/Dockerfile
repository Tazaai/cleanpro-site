FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build || npm run build:prod

FROM nginx:1.25-alpine
COPY --from=build /app/build /usr/share/nginx/html/
COPY --from=build /app/dist /usr/share/nginx/html/
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
