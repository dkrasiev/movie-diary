FROM node:lts-slim

WORKDIR /app

COPY . .
RUN npm install
RUN npm run build

ENV ORIGIN=dkrasiev.fvds.ru
ENV PORT=3000

ENV REDIS_URL=redis://default:18201016K@dkrasiev.fvds.ru:6379
ENV KINOPOISK_API_TOKEN=bfd2b25b-c27f-4292-8dee-fb94d6e6f420

ENV POCKETBASE_URL=https://dkrasiev.fvds.ru
ENV POCKETBASE_EMAIL=dmitrykrasiev@gmail.com
ENV POCKETBASE_PASSWORD=piUS9VA7ZgXbGfb

ENV BODY_SIZE_LIMIT=0

EXPOSE ${PORT}

WORKDIR /app/apps/frontend/build

CMD node index.js
