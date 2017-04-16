FROM node:latest

# RUN apk add --update ca-certificates
# RUN apk add --update alpine-sdk

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./package.json ./
RUN npm install
COPY ./app/ ./

CMD ["node", "index.js"]
