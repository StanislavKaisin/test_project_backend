FROM node:14-alpine as build

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:14-alpine
# RUN apk add --no-cache --virtual .build-deps .gyp make gcc g++  \
RUN npm install -g node-gyp
WORKDIR /app
COPY package.json .
RUN npm install --only=production

# && apk del .gyp
# apk add --no-cache --virtual .build-deps .gyp make gcc g++ python3 \
COPY --from=build /app/dist ./dist
CMD npm run start:prod


# RUN  apk --no-cache add --virtual builds-deps build-base python3 && npm install -g npm@8.1.3 && npm install sqlite3 && npm install --force --only=production
