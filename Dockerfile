### STAGE 1 BUILD THE APP ###
# specify the node base image with your desired version node:<version>
FROM node:16
RUN mkdir /MesseMap
WORKDIR /MesseMap
COPY package.json .
RUN npm install --quiet
COPY . .
RUN npm run build

### STAGE 2 RUN THE APP ###

