FROM node:16-alpine

WORKDIR /app
COPY . .
RUN npm install
RUN apk add --no-cache ffmpeg

CMD ["node", "index.js"]