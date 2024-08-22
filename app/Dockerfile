FROM node:22-alpine3.19

COPY package.json /home/app/package.json

WORKDIR /home/app
RUN npm install

COPY . /home/app