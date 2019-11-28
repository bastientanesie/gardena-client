# development stage
FROM node:lts as development
RUN npm install -g @vue/cli
ARG UID=1000
ARG GID=1000
RUN \
  usermod --uid ${UID} node && groupmod --gid ${GID} node \
  && mkdir /srv/app && chown node:node /srv/app
USER node
WORKDIR /srv/app
COPY --chown=node:node package*.json ./
RUN npm install --quiet --silent

# build stage
FROM node:lts-slim AS build
ARG UID=1000
ARG GID=1000
RUN \
  usermod --uid ${UID} node && groupmod --gid ${GID} node \
  && mkdir /srv/app && chown node:node /srv/app
USER node
WORKDIR /srv/app
COPY --from=development --chown=root:root /srv/app/node_modules ./node_modules
COPY . .
RUN npm run build --modern

# production stage
FROM nginx:stable-alpine
RUN mkdir /app
COPY --from=build --chown=root:root /srv/app/dist /app
COPY install/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]