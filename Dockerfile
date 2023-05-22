FROM node:16
RUN mkdir /MesseMap
WORKDIR /MesseMap
RUN mkdir /MesseMap/saved
COPY package.json .
RUN npm install --quiet
COPY . .
RUN npm run build
