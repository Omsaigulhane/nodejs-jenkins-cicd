# ---- Build stage ----
FROM node:18-alpine AS builder

WORKDIR /app

# Copy dependency manifests first for better layer caching
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# ---- Runtime stage ----
FROM node:18-alpine

WORKDIR /app

# Copy installed modules from builder
COPY --from=builder /app/node_modules ./node_modules

# Copy application source
COPY app.js ./

# Expose the default port (overridable via PORT env var)
EXPOSE 3000

# Run as non-root for security
USER node

# Start the application
CMD ["node", "app.js"]
