# specify the node base image with your desired version node:<version>
FROM node:16

WORKDIR /MesseMap
COPY ./ /MesseMap
RUN npm install
