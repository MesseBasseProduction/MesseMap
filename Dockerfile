FROM node:16-alpine

RUN mkdir /MesseMap
WORKDIR /MesseMap
RUN mkdir /MesseMap/saved

RUN apk add --update --virtual .tmp-deps python3 make g++ && \
    rm -rf /var/cache/apk/*

COPY package.json .
RUN npm install --quiet

RUN apk del .tmp-deps

COPY . .

RUN npm run build
