FROM node:16-alpine as dev
WORKDIR /app

RUN apk --no-cache add sqlite

COPY src src
COPY package.json .
COPY tsconfig.json .
RUN --env-file .env
RUN npm install
RUN npm run build

CMD [ "npm", "start" ]