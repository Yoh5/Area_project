# Documentation for custom Deployment : Docker Container Management

This Bash script provides a convenient way to manage Docker containers through various command-line options. It's designed to simplify common Docker tasks such as deploying, stopping, and removing containers. Below is a detailed explanation of each part of the script and the associated commands.

## Script Overview

The script starts by defining color codes for different types of output messages. It then declares several functions, each corresponding to a specific Docker management task. The script ends with a `while` loop to parse command-line arguments and execute the appropriate functions.

## Color Definitions

- **Colors:** Various colors like GREEN, BLUE, PURPLE, WHITE, RED, ORANGE, and YELLOW are defined for formatting the output.

## Functions

### 1. `delete_containers`
- **Purpose:** Removes all Docker containers.
- **Command:** `docker rm $(docker ps -aq)`
- **Output:** Red color text indicating the deletion of containers.

### 2. `deploy_containers`
- **Purpose:** Deploys all Docker containers using Docker Compose.
- **Command:** `docker-compose up -d`
- **Output:** Green color text indicating the deployment of containers.

### 3. `stop_containers`
- **Purpose:** Stops all running Docker containers.
- **Command:** `docker stop $(docker ps -aq)`
- **Output:** Blue color text indicating the stopping of containers.

### 4. `prune_containers`
- **Purpose:** Stops and removes all Docker containers.
- **Command:** Combines the commands from `stop_containers` and `delete_containers`.
- **Output:** Purple color text indicating the pruning of containers.

### 5. `shell_containers`
- **Purpose:** Opens a Bash shell in a specified container.
- **Command:** `docker exec -it $1 /bin/bash`
- **Output:** Orange color text indicating the spawning of a shell in a container.

### 6. `list_containers`
- **Purpose:** Lists all Docker containers.
- **Command:** `docker ps -a`
- **Output:** Yellow color text showing all available containers.

### 7. `show_help`
- **Purpose:** Displays usage instructions for the script.
- **Output:** Descriptions of all available script options.

## Command-Line Options

- `--delete`: Executes `delete_containers`.
- `--deploy`: Executes `deploy_containers`.
- `--stop`: Executes `stop_containers`.
- `--prune`: Executes `prune_containers`.
- `--shell`: Executes `shell_containers` with a specified container.
- `--list`: Executes `list_containers`.
- `--help`: Displays help information with `show_help`.

## Using the Script

To use the script, you can invoke it with one of the defined options. For example:

```bash
./script.sh --list
```

This command will list all running Docker containers.

## Prerequisites

Before using this script, ensure that Docker and Docker Compose are installed on your system.

## Conclusion

This script is a handy tool for managing Docker containers, offering a simplified interface for common Docker commands. It enhances user experience by providing easy-to-understand, color-coded outputs and a straightforward command-line interface.