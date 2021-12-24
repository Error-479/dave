FROM node:16-alpine as dev
WORKDIR /app

COPY src src
COPY package.json .
COPY tsconfig.json .
RUN npm install
RUN npm run build

CMD [ "npm", "start" ]