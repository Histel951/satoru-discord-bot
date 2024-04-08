#!/bin/sh

sh "$DOCKER_PROJECT_DIR/docker/node/$NODE_DOCKER_ENV/wait-for.sh" mongodb:"$MONGO_PORT"
npm run dev --prefix "$DOCKER_PROJECT_DIR"