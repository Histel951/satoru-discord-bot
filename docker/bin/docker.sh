#!/bin/sh

npm run dev --prefix "$DOCKER_PROJECT_DIR"
sh "/usr/local/lib/node/$NODE_DOCKER_ENV/wait-for.sh" mongodb:"$MONGO_PORT"