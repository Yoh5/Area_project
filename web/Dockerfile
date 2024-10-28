FROM node:20.10.0

USER root

SHELL ["/bin/bash", "-c"]

WORKDIR /app

COPY . /app/

EXPOSE 8081

RUN ls src/*

RUN yarn

#RUN npm install

CMD ["npm", "start"]
