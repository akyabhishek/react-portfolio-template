export type DockerCommand = {
  command: string;
  description: string;
  danger?: boolean;
};

export type DockerCategory = {
  category: string;
  commands: DockerCommand[];
};

export const dockerCheatsheet: DockerCategory[] = [
  {
    category: "General",
    commands: [
      {
        command: "docker --help",
        description: "Show Docker CLI help and available commands.",
      },
      {
        command: "docker version",
        description: "Display Docker client and server version details.",
      },
      {
        command: "docker info",
        description: "Display system-wide information about the Docker engine.",
      },
      {
        command: "docker system df",
        description: "Show disk space used by Docker images, containers, and volumes.",
      },
      {
        command: "docker system prune",
        description: "Remove unused Docker resources.",
        danger: true,
      },
      {
        command: "docker events",
        description: "Display real-time events from the Docker daemon.",
      },
      {
        command: "docker context ls",
        description: "List available Docker contexts.",
      },
      {
        command: "docker context show",
        description: "Show the currently selected Docker context.",
      },
    ],
  },
  {
    category: "Images",
    commands: [
      {
        command: "docker build -t <image_name> .",
        description: "Build an image from the Dockerfile in the current directory.",
      },
      {
        command: "docker build --no-cache -t <image_name> .",
        description: "Build an image without using cached layers.",
      },
      {
        command: "docker build -f <Dockerfile> -t <image_name> .",
        description: "Build an image using a specified Dockerfile.",
      },
      {
        command: "docker build --pull -t <image_name> .",
        description: "Attempt to pull newer base images before building.",
      },
      {
        command: "docker build --target <stage> -t <image_name> .",
        description: "Build a specific stage of a multi-stage Dockerfile.",
      },
      {
        command: "docker buildx build -t <image_name> .",
        description: "Build an image using Docker Buildx.",
      },
      {
        command: "docker builder prune",
        description: "Remove unused build cache.",
        danger: true,
      },
      {
        command: "docker images",
        description: "List images stored locally.",
      },
      {
        command: "docker image ls",
        description: "List images stored locally.",
      },
      {
        command: "docker tag <image> <username>/<image>:<tag>",
        description: "Tag an image, for example to prepare it for publishing.",
      },
      {
        command: "docker history <image_name>",
        description: "Show the layer history of an image.",
      },
      {
        command: "docker image inspect <image_name>",
        description: "Display detailed metadata for an image.",
      },
      {
        command: "docker save -o image.tar <image_name>",
        description: "Export an image to a tar archive.",
      },
      {
        command: "docker load -i image.tar",
        description: "Load an image from a tar archive.",
      },
      {
        command: "docker pull <image>:<tag>",
        description: "Pull a specific image version from a registry.",
      },
      {
        command: "docker rmi <image_name>",
        description: "Remove a local image.",
        danger: true,
      },
      {
        command: "docker image prune",
        description: "Remove unused images that are not referenced by a container.",
        danger: true,
      },
    ],
  },
  {
    category: "Containers",
    commands: [
      {
        command: "docker run --name <container_name> <image_name>",
        description: "Create and run a container with a custom name.",
      },
      {
        command: "docker run -it <image_name> sh",
        description: "Start a container with an interactive shell.",
      },
      {
        command: "docker run --rm <image_name>",
        description: "Automatically remove the container when it exits.",
      },
      {
        command: "docker run --name <name> -e KEY=value <image_name>",
        description: "Pass an environment variable to a container.",
      },
      {
        command: "docker run -v <host_path>:<container_path> <image_name>",
        description: "Mount a host directory or file into a container.",
      },
      {
        command: "docker run --restart unless-stopped <image_name>",
        description: "Configure the container to restart unless it is stopped.",
      },
      {
        command: "docker run -v <volume_name>:/data <image_name>",
        description: "Mount a named volume into a container.",
      },
      {
        command: "docker run -p <host_port>:<container_port> <image_name>",
        description: "Publish a container port on a port of the host.",
      },
      {
        command: "docker run -d <image_name>",
        description: "Run a container in the background.",
      },
      {
        command: "docker start <container_name>",
        description: "Start an existing stopped container.",
      },
      {
        command: "docker stop <container_name>",
        description: "Stop a running container.",
      },
      {
        command: "docker restart <container_name>",
        description: "Restart a container.",
      },
      {
        command: "docker kill <container_name>",
        description: "Forcefully stop a running container.",
        danger: true,
      },
      {
        command: "docker rename <old_name> <new_name>",
        description: "Rename a container.",
      },
      {
        command: "docker cp <container_name>:<path> <host_path>",
        description: "Copy a file or directory from a container to the host.",
      },
      {
        command: "docker top <container_name>",
        description: "Show processes running inside a container.",
      },
      {
        command: "docker port <container_name>",
        description: "Display a container's published port mappings.",
      },
      {
        command: "docker stats --no-stream",
        description: "Show a one-time resource usage snapshot for containers.",
      },
      {
        command: "docker rm <container_name>",
        description: "Remove a stopped container.",
        danger: true,
      },
      {
        command: "docker exec -it <container_name> sh",
        description: "Open an interactive shell inside a running container.",
      },
      {
        command: "docker logs -f <container_name>",
        description: "Display and follow a container's logs.",
      },
      {
        command: "docker inspect <container_name>",
        description: "Display detailed information about a container.",
      },
      {
        command: "docker inspect <container> --format '{{.State.Status}}'",
        description: "Display a container's current state.",
      },
      {
        command: "docker diff <container>",
        description: "Show filesystem changes made inside a container.",
      },
      {
        command: "docker wait <container>",
        description: "Wait for a container to stop and return its exit code.",
      },
      {
        command: "docker attach <container>",
        description: "Attach to a running container's standard streams.",
      },
      {
        command: "docker logs --tail 100 <container>",
        description: "Show the last 100 lines of a container's logs.",
      },
      {
        command: "docker logs --since 10m <container>",
        description: "Show container logs from the last 10 minutes.",
      },
      {
        command: "docker ps",
        description: "List currently running containers.",
      },
      {
        command: "docker ps --all",
        description: "List all containers, including stopped containers.",
      },
      {
        command: "docker container stats",
        description: "Show live resource usage statistics for containers.",
      },
      {
        command: "docker rm -f <container>",
        description: "Force-remove a container, stopping it first if necessary.",
        danger: true,
      },
    ],
  },
  {
    category: "Networking",
    commands: [
      {
        command: "docker network ls",
        description: "List Docker networks.",
      },
      {
        command: "docker network create <network_name>",
        description: "Create a Docker network.",
      },
      {
        command: "docker network inspect <network_name>",
        description: "Inspect a network and its configuration.",
      },
      {
        command: "docker network connect <network_name> <container>",
        description: "Connect a container to a network.",
      },
      {
        command: "docker network disconnect <network_name> <container>",
        description: "Disconnect a container from a network.",
      },
      {
        command: "docker network rm <network_name>",
        description: "Remove a Docker network.",
        danger: true,
      },
    ],
  },
  {
    category: "Volumes",
    commands: [
      {
        command: "docker volume ls",
        description: "List Docker volumes.",
      },
      {
        command: "docker volume create <volume_name>",
        description: "Create a Docker volume.",
      },
      {
        command: "docker volume inspect <volume_name>",
        description: "Inspect a volume.",
      },
      {
        command: "docker volume rm <volume_name>",
        description: "Remove a volume.",
        danger: true,
      },
      {
        command: "docker volume prune",
        description: "Remove unused volumes.",
        danger: true,
      },
      {
        command: "docker volume prune -a",
        description:
          "Remove unused anonymous and named volumes, subject to Docker's volume-pruning rules.",
        danger: true,
      },
    ],
  },
  {
    category: "Docker Compose",
    commands: [
      {
        command: "docker compose up",
        description: "Create and start services defined in the Compose file.",
      },
      {
        command: "docker compose up -d",
        description: "Start Compose services in the background.",
      },
      {
        command: "docker compose down",
        description: "Stop and remove Compose-managed containers and networks.",
      },
      {
        command: "docker compose down -v",
        description: "Also remove Compose-managed named and anonymous volumes.",
        danger: true,
      },
      {
        command: "docker compose ps",
        description: "List Compose services and their status.",
      },
      {
        command: "docker compose logs -f",
        description: "Follow logs from Compose services.",
      },
      {
        command: "docker compose exec <service> sh",
        description: "Open a shell in a running service container.",
      },
      {
        command: "docker compose build",
        description: "Build or rebuild service images.",
      },
      {
        command: "docker compose pull",
        description: "Pull service images.",
      },
      {
        command: "docker compose restart",
        description: "Restart Compose services.",
      },
      {
        command: "docker compose config",
        description: "Validate and render the Compose configuration.",
      },
    ],
  },
  {
    category: "Cleanup",
    commands: [
      {
        command: "docker image prune -a",
        description:
          "Remove all images not referenced by existing containers.",
        danger: true,
      },
      {
        command: "docker system prune -a",
        description:
          "Remove unused containers, networks, images, and build cache.",
        danger: true,
      },
    ],
  },
  {
    category: "Docker Hub",
    commands: [
      {
        command: "docker login -u <username>",
        description: "Sign in to a Docker registry.",
      },
      {
        command: "docker push <username>/<image_name>",
        description: "Push a local image to Docker Hub.",
      },
      {
        command: "docker search <image_name>",
        description: "Search Docker Hub for images.",
      },
      {
        command: "docker pull <image_name>",
        description: "Download an image from a registry.",
      },
    ],
  },
];
