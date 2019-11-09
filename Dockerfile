# build stage
FROM node:lts-alpine as build-stage
RUN npm install -g @vue/cli
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY install/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]