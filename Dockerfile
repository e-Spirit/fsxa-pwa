FROM node:14.17.1-alpine3.13 AS build

WORKDIR /usr/src/nuxt-app
ARG FSXA_API_KEY
ARG FSXA_PROJECT_ID
ARG FSXA_TENANT_ID
ARG FSXA_CAAS
ARG FSXA_NAVIGATION_SERVICE

ENV FSXA_API_KEY=${FSXA_API_KEY}
ENV FSXA_PROJECT_ID=${FSXA_PROJECT_ID}
ENV FSXA_TENANT_ID=${FSXA_TENANT_ID}
ENV FSXA_CAAS=${FSXA_CAAS}
ENV FSXA_NAVIGATION_SERVICE=${FSXA_NAVIGATION_SERVICE}
ENV FSXA_MODE=preview

COPY package*.json ./
RUN npm ci --no-optional
COPY . .
RUN npx nuxt build --config-file nuxt.config.ts --standalone \
  && rm -rf node_modules && \
  NODE_ENV=production npm ci --production --silent --no-optional \
  && NODE_ENV=production npm install --no-optional nuxt-start@2.15.7

FROM node:14.17.1-alpine3.13 AS runtime

ARG FSXA_API_KEY
ARG FSXA_PROJECT_ID
ARG FSXA_TENANT_ID
ARG FSXA_CAAS
ARG FSXA_NAVIGATION_SERVICE

WORKDIR /usr/src/nuxt-app
RUN apk add --no-cache dumb-init=1.2.5-r0
COPY --chown=node:node --from=build /usr/src/nuxt-app /usr/src/nuxt-app
USER node
EXPOSE 3000
ENV FSXA_API_KEY=${FSXA_API_KEY}
ENV FSXA_PROJECT_ID=${FSXA_PROJECT_ID}
ENV FSXA_TENANT_ID=${FSXA_TENANT_ID}
ENV FSXA_CAAS=${FSXA_CAAS}
ENV FSXA_NAVIGATION_SERVICE=${FSXA_NAVIGATION_SERVICE}
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000
ENV FSXA_MODE=preview
ENV NODE_ENV=production
ENTRYPOINT ["dumb-init", "--"]
CMD [ "node", "--max-old-space-size=200", "/usr/src/nuxt-app/node_modules/.bin/nuxt-start" ]

