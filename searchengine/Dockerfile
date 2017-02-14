FROM node:alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./package.json ./
RUN npm install
COPY ./app/ ./

CMD ["node", "index.js"]
