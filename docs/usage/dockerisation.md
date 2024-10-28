# Dockerisation: Understanding Dockerfile Configurations

This documentation explains the Dockerfile configurations for our three components of AREA : `mobile`, `web`, and `server`. Each Dockerfile is set up to build a Docker image for its respective component. Below is a detailed explanation of each Dockerfile.

## 1. Mobile Dockerfile

Located in `mobile/Dockerfile`, this file defines the setup for a mobile application environment.

### Configuration

- **Base Image:** `node:20.10.0`. Uses Node.js version 20.10.0.
- **User:** `root`. Sets the user to root.
- **Shell:** Specifies the Bash shell for running commands.
- **Working Directory:** `/app`. Sets the working directory inside the container.
- **Copy Command:** Copies everything from the current directory into `/app/` inside the container.
- **Expose:** Exposes port 8081.
- **Run Commands:**
  - Lists contents of the `pages` directory.
  - Installs dependencies with `npm install`.
  - Installs `nodemon` globally.
- **CMD:** Sets the default command to `npm start`.

### Building the Image

To build the Docker image for the mobile app, run:

```bash
docker build -t mobile-app ./mobile
```

## 2. Web Dockerfile

Located in `web/Dockerfile`, this file sets up the environment for a web application.

### Configuration

- **Base Image:** `node:20.10.0`.
- **User:** `root`.
- **Shell:** Uses Bash shell.
- **Working Directory:** `/app`.
- **Copy Command:** Copies files into `/app/`.
- **Expose:** Exposes port 8081.
- **Run Commands:**
  - Lists contents of the `src` directory.
  - Installs dependencies with `yarn`.
- **CMD:** Runs `npm start` to start the application.

### Building the Image

To build the Docker image for the web app, use:

```bash
docker build -t web-app ./web
```

## 3. Server Dockerfile

Located in `server/Dockerfile`, this Dockerfile is for setting up the server environment.

### Configuration

- **Base Image:** `node:20.10.0`.
- **User:** `root`.
- **Shell:** Bash shell.
- **Working Directory:** `/app`.
- **Copy Commands:**
  - Copies all files into `/app/`.
  - Copies `.env` file.
- **Expose:** Exposes port 8080.
- **Run Commands:**
  - Lists contents of the `src` directory.
  - Installs dependencies.
  - Installs `nodemon` globally.
- **CMD:** Uses `nodemon` to start the server with `src/index.js`.

### Building the Image

To create the Docker image for the server, execute:

```bash
docker build -t server-app ./server
```

## Conclusion

Each Dockerfile is tailored to the specific needs of the mobile, web, and server components of an application. They provide a consistent and reproducible environment for development and deployment. By isolating each part of the application in its own container, Docker helps us in managing dependencies and ensuring that the application runs the same way in any environment.