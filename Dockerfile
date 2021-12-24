FROM node:16-alpine as dev
WORKDIR /app

COPY src src
COPY package.json .
COPY tsconfig.json .
RUN --env-file .env
RUN yarn install
RUN yarn run build

CMD [ "yarn", "start" ]