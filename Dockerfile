# syntax=docker/dockerfile:1
FROM node:24

RUN groupadd -r jina
RUN useradd -g jina  -G audio,video -m jina
USER jina

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY build ./build
COPY public ./public
COPY fe/dist ./fe/dist


ENV PORT=8080

EXPOSE 3000 3001 8080 8081
ENTRYPOINT ["node"]
CMD [ "build/server.js" ]
