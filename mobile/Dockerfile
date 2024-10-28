FROM node:20.10.0

USER root

SHELL ["/bin/bash", "-c"]

WORKDIR /app

COPY . /app/

EXPOSE 8081

RUN ls pages/*

RUN npm install

RUN npm install -g nodemon

CMD ["npm", "start"]
