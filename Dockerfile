FROM node:16
RUN mkdir /MesseMap
WORKDIR /MesseMap
COPY package.json .
RUN npm install --quiet
COPY . .
RUN npm run build
