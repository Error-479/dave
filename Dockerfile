FROM node:16-alpine as dev
WORKDIR /app

COPY src src
COPY package.json .
COPY tsconfig.json .

RUN apk add --upgrade sqlite

RUN yarn
RUN yarn build

CMD [ "yarn", "start" ]