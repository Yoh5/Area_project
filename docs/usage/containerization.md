# Documentation for Docker Compose File

This section explains the Docker Compose file, which is used to define and run multi-container Docker applications. Here, we have a setup with four services: `mysql`, `myserver`, `myapp`, and `myweb`. Below is a detailed explanation of each part and the commands to test and potentially install necessary components.

## Services

### 1. MySQL Service

- **Image:** The service uses the official MySQL image version 8.0.
- **Command:** It's configured to use `mysql_native_password` for authentication.
- **Restart Policy:** Set to always restart the container if it stops.
- **Ports:** Maps port 3306 of the container to port 3306 on the host.
- **Exposed Ports:** Exposes port 3306 inside the Docker network.
- **Environment Variables:**
  - `MYSQL_ROOT_PASSWORD`: Sets the root password to 'gaius155'.
  - `MYSQL_DATABASE`: Creates a database named 'area'.
  - `MYSQL_USER`: Sets the default user to 'root'.

But it's considered as bad habits to let alls creds in clear text inside any kind of config files, so you should add them in .env to have safe practice

#### Testing MySQL Service
To test the MySQL service, you would typically connect to the MySQL server using a MySQL client.

```bash
mysql -h 127.0.0.1 -u root -pgaius155
```

### 2. MyServer Service

- **Build Context:** Specifies the build context as `./server` with a Dockerfile.
- **Dependency:** Depends on the MySQL service.
- **Volumes:**
  - Maps `node_modules` folder.
  - Maps the local `./server` directory to `/app` in the container.
- **Ports:** Maps port 8080 of the container to port 8080 on the host.
- **Exposed Ports:** Exposes port 8080 inside the Docker network.

#### Testing MyServer Service
Testing this service involves making requests to the server, assuming it's a web server running on port 8080.

```bash
curl http://localhost:8080
```

### 3. MyApp Service

- **Build Context:** Uses `./mobile` as the build context with a Dockerfile.
- **Dependency:** Depends on the MyServer service.
- **Volumes:**
  - Maps `node_modules` folder.
  - Maps the local `./mobile` directory to `/app` in the container.
  - Maps a volume named `apk` to `/usr/src/app/apk/` with read-write access.
- **Exposed Ports:** None specifically mentioned.

#### Testing MyApp Service
Testing would depend on the nature of the application. If it’s a web app, accessing it via a browser might be appropriate.

### 4. MyWeb Service

- **Build Context:** Uses `./web` as the build context with a Dockerfile.
- **Ports:** Maps port 8081 of the container to port 8081 on the host.
- **Exposed Ports:** Exposes port 8081 inside the Docker network.
- **Dependency:** Depends on the MyServer service.
- **Volumes:**
  - Maps `node_modules` folder.
  - Maps the local `./web` directory to `/app` in the container.

#### Testing MyWeb Service
Similar to MyServer, you can test this by making HTTP requests:

```bash
curl http://localhost:8081
```

## Volumes

- **apk:** A named volume for storing APK files, used by the `myapp` service.

## Potential Installations

Before running this Docker Compose file, ensure that you have the following installed:

- Docker: To run containers.
- Docker Compose: To manage multi-container applications.

## Running the Docker Compose File

To start the services defined in this file, use the following command:

```bash
docker-compose up
```

This command builds, (re)creates, starts, and attaches to containers for a service. To stop and remove the containers, networks, and volumes, use:

```bash
docker-compose down
```

This Docker Compose file sets up a robust environment with a MySQL database, a server, a mobile application, and a web interface, each running in its own container, interconnected and configured to work together.