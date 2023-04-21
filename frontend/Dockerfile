FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY .env .env
COPY prisma prisma
RUN npx prisma generate

COPY . .
RUN npm run build

CMD node build/index.js
