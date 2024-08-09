# Dockerfile
FROM node:20-alpine

# Set the working directory
WORKDIR /usr/src/app

# Install typescript and other dependencies
RUN corepack enable
RUN pnpm init
RUN pnpm add -D typescript tsx vitest
