# syntax=docker/dockerfile:1.7

ARG NODE_VERSION=24.15.0
ARG METEOR_VERSION=3.5

FROM node:${NODE_VERSION}-bookworm-slim AS builder

ARG METEOR_VERSION

ENV METEOR_ALLOW_SUPERUSER=true

WORKDIR /app

RUN apt-get update \
	&& apt-get install -y --no-install-recommends ca-certificates curl git python3 make g++ \
	&& rm -rf /var/lib/apt/lists/*

RUN curl "https://install.meteor.com/?release=${METEOR_VERSION}" | sh

COPY package.json package-lock.json ./
COPY .meteor .meteor

RUN meteor npm ci

COPY . .

RUN meteor build /opt/build --directory

WORKDIR /opt/build/bundle/programs/server

RUN npm install --omit=dev

FROM node:${NODE_VERSION}-bookworm-slim AS runtime

ENV NODE_ENV=production \
	PORT=3000 \
	METEOR_SETTINGS_FILE=/app/settings.json

WORKDIR /app

RUN apt-get update \
	&& apt-get install -y --no-install-recommends ca-certificates tini \
	&& rm -rf /var/lib/apt/lists/*

COPY --from=builder /opt/build/bundle /app
COPY docker/entrypoint.sh /usr/local/bin/docker-entrypoint

RUN mkdir -p /app/uploads \
	&& chmod +x /usr/local/bin/docker-entrypoint \
	&& chown -R node:node /app

USER node

EXPOSE 3000

ENTRYPOINT ["/usr/bin/tini", "--", "/usr/local/bin/docker-entrypoint"]
CMD ["node", "main.js"]
