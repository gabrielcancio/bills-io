FROM node:20.11.1-alpine

USER node
WORKDIR /usr/app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm ci