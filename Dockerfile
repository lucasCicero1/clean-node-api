FROM node:16
WORKDIR /usr/src/clean-node-api
COPY package.json .
RUN npm install husky -g
RUN npm install --only=prod