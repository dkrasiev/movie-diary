FROM node:lts-slim

WORKDIR /app

COPY . .
RUN npm install && npm run build

EXPOSE ${PORT}

WORKDIR /app/apps/frontend/build

CMD ["node", "index.js"]

