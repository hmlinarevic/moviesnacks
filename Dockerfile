FROM node:18-alpine as build

WORKDIR /app

COPY . .

RUN npm ci && npm run build

# NGINX - Web Server

FROM nginx:latest

COPY --from=build /app/dist /usr/share/nginx/html
