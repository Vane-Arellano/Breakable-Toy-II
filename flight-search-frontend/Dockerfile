# Use Bun official image
FROM oven/bun:latest AS builder

# Set working directory
WORKDIR /app

# Copy package files first (for better caching)
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN bun run build

# ---- Production Image ----
FROM oven/bun:latest AS runner

WORKDIR /app

# Copy only necessary files from the builder stage
COPY --from=builder /app/package.json /app/bun.lock ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Set environment variables
ENV PORT=3000
EXPOSE 3000
