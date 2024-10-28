![Image about AREA app.](./assets/services_map.png)

# AREA

## Developer Documentation

[Documentation-Dev](https://yoh5.github.io/Documentation/)


## Description

The goal of this project is to discover, as a whole, the software platform that you have chosen through the creation of a business application. To do this, AREA is a software suite that functions similar to that of IFTTT and/or Zapier.
It is broken into three parts :
    - An application server to implement all the features listed below (see Features)
    - A web client to use the application from your browser by querying the application server
    - A mobile client to use the application from your phone by querying the application server

## Features

The application will offer the following funtionalities:
    - The user registers on the application in order to obtain an account
    - The registered user then confirms their enrollment on the application before being able to use it
    - The application then asks the authenticated user to subscribe to Services
    - Each service offers the following components:
        * type Action
        * type REAction
    - The authenticated user composes AREA by interconnecting an Action to a REAction previously configured
    - The application triggers AREA automatically thanks to triggers


## Installation

First, you need to clone the repository and access on it by your terminal..

```bash
git clone git@github.com:EpitechPromo2026/B-DEV-500-COT-5-2-area-aurel.azon.git
cd B-DEV-500-COT-5-2-area-aurel.azon
```

### Web app

```bash
cd web
docker start systemctl
npm -i
npm start
```

### Mobile app

```bash
cd mobile
npm -i
npm start
```

### Server

```bash
cd server
docker start systemctl
npm -i
npm start
```

## Contributing

[Omer ADJALLALA](https://github.com/omeradjallala):
full-stack developper, working as React Web Frontend Master

[Nicaise GBENOU](https://github.com/kevin22000):
Frontend developper, working on web interface with React JS

[Axel AHO](https://github.com/Yoh5):
Frontend developper, working on mobile interface with React native

[Best HOUNSA](https://github.com/besthounsa):
DEVOPS administrator, write documentation, workflow, etc

[Kades KOUKPONOU](https://github.com/omeradjallala):
Cybersec enthousist, working as server Master with NodeJS

[Aurel AZON](https://github.com/omeradjallala):
Cybersec enthousist, working on server


## Visual

Visuals will be available as soon as project will be started.

## License

The [MIT](https://choosealicense.com/licenses/mit/) License is a permissive free software license originating at the Massachusetts Institute of Technology in the late 1980s. As a permissive license, it puts only very limited restriction on reuse and has, therefore, high license compatibility. 
