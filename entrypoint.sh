#!/bin/sh

# Start the Docker daemon in the background
dockerd &

# Wait for Docker to start (optional: use a more sophisticated wait mechanism if needed)
sleep 3

# Start the Node.js application
node apps/challenge-api/dist/index.js