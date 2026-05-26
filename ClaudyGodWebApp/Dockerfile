################################################################################
#                      CLAUDYGODWEBAPP - PRODUCTION BUILD                       #
#                         Multi-stage optimized build                           #
################################################################################

# Build stage
FROM node:18-alpine AS builder

WORKDIR /build

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDeps needed for Next.js build)
# The runtime stage will only copy production files
RUN npm ci --frozen-lockfile --ignore-scripts && \
    npm cache clean --force

# Copy source code
COPY . .

# Build application
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY
ARG NODE_ENV=production

ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL} \
    NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL} \
    NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=${NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY} \
    NODE_ENV=${NODE_ENV} \
    NEXT_TELEMETRY_DISABLED=1

RUN npm run build

################################################################################
#                           Runtime stage                                       #
################################################################################

FROM node:18-alpine

LABEL org.opencontainers.image.title="ClaudyGod Web Application"
LABEL org.opencontainers.image.description="Official website for ClaudyGod Music Ministries"
LABEL org.opencontainers.image.vendor="ClaudyGod Music Ministries"
LABEL org.opencontainers.image.source="https://github.com/claudygod-musicministries/ClaudyGodWebApp"

WORKDIR /app

# Install runtime dependencies only
RUN apk add --no-cache \
    dumb-init \
    wget \
    && rm -rf /var/cache/apk/*

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Copy built application from builder
COPY --from=builder --chown=nextjs:nodejs /build/public ./public
COPY --from=builder --chown=nextjs:nodejs /build/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /build/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /build/package.json ./package.json

# Switch to non-root user
USER nextjs

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD wget -qO- http://localhost:${PORT:-3000}/ >/dev/null 2>&1 || exit 1

# Environment variables (can be overridden at runtime)
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000

EXPOSE 3000

# Use dumb-init to properly handle signals
ENTRYPOINT ["/sbin/dumb-init", "--"]

# Start Next.js server
CMD ["node_modules/.bin/next", "start", "-p", "3000"]
