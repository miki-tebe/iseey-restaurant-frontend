FROM oven/bun:alpine AS base

# Stage 1: Install dependencies
FROM base AS deps
WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Create a separate directory for static files
RUN mkdir -p /app/static-files

# Stage 2: Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run build

# Stage 3: Production server
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT 9003
ENV HOSTNAME "0.0.0.0"

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static /app/static-files

# Create .next/static directory for the volume mount
RUN mkdir -p .next/static

# Add an entrypoint script to copy files
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

EXPOSE 9003

ENTRYPOINT ["./entrypoint.sh"]
CMD ["bun", "server.js", "--port", "9003", "--hostname", "0.0.0.0"]
