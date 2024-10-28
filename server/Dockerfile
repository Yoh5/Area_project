FROM node:20.10.0

USER root

SHELL ["/bin/bash", "-c"]

WORKDIR /app

COPY . /app/

COPY .env .env

EXPOSE 8080

RUN ls src/*

RUN npm install

RUN npm install -g nodemon

CMD ["nodemon", "src/index.js"]
