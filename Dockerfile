FROM node:22.14.0 as builder

USER root

WORKDIR /build

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:22.14.0

ARG PORT=$PORT

WORKDIR /usr/src/app

USER root

RUN apt-get update -y && \
    apt-get -y install tini

COPY --from=builder --chown=1000:1000 /build/package.json ./
COPY --from=builder --chown=1000:1000 /build/package-lock.json ./
COPY --from=builder --chown=1000:1000 /build/dist ./dist/

RUN npm ci --omit=dev --ignore-scripts

RUN chown 1000:1000 /usr/src/app/node_modules/

ENV NODE_ENV=production

USER 1000
EXPOSE ${PORT}

ENTRYPOINT ["/usr/bin/tini", "--"]

CMD ["npm", "run", "start"]
