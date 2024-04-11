#!/bin/sh

npm run dev --prefix "$DOCKER_PROJECT_DIR"
sh "/usr/local/bin/wait-for.sh" mongodb:"$MONGO_PORT"