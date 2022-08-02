FROM 875988342918.dkr.ecr.us-east-1.amazonaws.com/webscale-node:14.17.1-alpine3.13 AS build

WORKDIR /usr/src/nuxt-app
ENV FSXA_NAVIGATION_SERVICE=https://enterprise-dev-navigationservice.e-spirit.cloud/navigation
ENV FSXA_MODE=release
RUN cat .env
COPY package*.json ./
RUN npm ci --no-optional
COPY . .
RUN npx nuxt build --config-file nuxt.config.ts --standalone \
  && rm -rf node_modules && \
  NODE_ENV=production npm ci --production --silent --no-optional \
  && NODE_ENV=production npm install --no-optional nuxt-start@2.15.7

FROM 875988342918.dkr.ecr.us-east-1.amazonaws.com/webscale-node:14.17.1-alpine3.13 AS runtime

WORKDIR /usr/src/nuxt-app
RUN apk add --no-cache dumb-init=1.2.5-r0
COPY --chown=node:node --from=build /usr/src/nuxt-app /usr/src/nuxt-app
USER node
EXPOSE 3000
ENV FSXA_CAAS=https://enterprise-dev-caas-api.e-spirit.cloud
ENV FSXA_NAVIGATION_SERVICE=https://enterprise-dev-navigationservice.e-spirit.cloud/navigation
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000
ENV FSXA_MODE=release
ENV NODE_ENV=production
ENTRYPOINT ["dumb-init", "--"]
CMD [ "node", "--max-old-space-size=200", "/usr/src/nuxt-app/node_modules/.bin/nuxt-start" ]

