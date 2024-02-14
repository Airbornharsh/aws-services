FROM node:18.16.0-alpine3.17 AS builder

WORKDIR /app

COPY package.json ./

COPY tsconfig.json ./

RUN npm install

COPY src/ ./src/

RUN npm run build

FROM node:18.16.0-alpine3.17

WORKDIR /app

COPY --from=builder /app/package.json ./

RUN npm install

COPY --from=builder /app/out ./out

EXPOSE 4001

CMD ["npm", "start"]