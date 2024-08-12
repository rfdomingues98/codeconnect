# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=20
FROM node:${NODE_VERSION}-alpine AS base

LABEL fly_launch_runtime="NodeJS"

RUN apk update
RUN apk add --no-cache libc6-compat gcompat
RUN apk add --no-cache \
  docker \
  openrc \
  bash \
  git

RUN rc-update add docker boot

RUN corepack enable && corepack prepare pnpm@latest --activate
ENV PNPM_HOME=/usr/local/bin
RUN pnpm add -g turbo

FROM base AS builder

# NodeJS app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Copy application code
COPY --link . .

# Generate a partial monorepo with pruned lockfile for target workspace
RUN turbo prune @codeconnect/challenge-api --docker

# Throw-away build stage to reduce size of final image
FROM base AS installer

RUN apk update
RUN apk add --no-cache libc6-compat gcompat

WORKDIR /app

# First install dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
RUN pnpm install

# Build the application
COPY --from=builder /app/out/full/ .
RUN pnpm build:api

# Final stage for app image
FROM base AS runner
WORKDIR /app

# Copy built application
# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 hono

# COPY --from=builder --chown=hono:nodejs /app/entrypoint.sh /
COPY --from=builder /app/entrypoint.sh /
RUN chmod +x /entrypoint.sh
# COPY --from=installer --chown=hono:nodejs /app .
COPY --from=installer /app .

USER root
EXPOSE 3000

# Start the server by default, this can be overwritten at runtime
ENTRYPOINT ["/entrypoint.sh"]
