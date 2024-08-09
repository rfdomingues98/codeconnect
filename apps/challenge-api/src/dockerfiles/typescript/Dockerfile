# Dockerfile
FROM node:20-alpine

# Set the working directory
WORKDIR /usr/src/app

# Install typescript and other dependencies
RUN corepack enable
RUN pnpm init
RUN pnpm add -D typescript tsx vitest

# Command to run the script
# CMD /bin/sh -c 'echo "$CODE" > index.ts && echo "$TESTS" > index.test.ts && \ pnpm vitest run