FROM node:20.17.0 AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npx prisma generate
RUN npm run build
RUN npm ci --only=production && npm cache clean --force

FROM node:20.17.0-alpine3.20 AS production

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules

EXPOSE 3001

CMD ["npm", "run", "start"]