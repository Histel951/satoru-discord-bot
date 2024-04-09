#!/bin/sh

if [ ! -d "$DOCKER_PROJECT_DIR/node_modules" ]; then
    npm install --prefix "$DOCKER_PROJECT_DIR"
fi

npm run dev --prefix "$DOCKER_PROJECT_DIR"
sh "/usr/local/bin/wait-for.sh" mongodb:"$MONGO_PORT"