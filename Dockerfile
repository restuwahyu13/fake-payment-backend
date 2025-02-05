FROM node:22-alpine
COPY package*.json ./
COPY . ./

RUN apk update \
    && apk -u list \
    && apk upgrade

RUN rm -rf node_modules \
    && npm cache clean -f \
    && npm config delete proxy \
    && npm config delete https-proxy \
    && npm config set fetch-retry-mintimeout 3600 \
    && npm config set fetch-retry-maxtimeout 3600 \
    && npm config set fetch-timeout 3600 \
    && npm i pm2 -g --loglevel verbose \
    && npm i --loglevel verbose \
    && npm run build

EXPOSE 3000
CMD npm start