# ─── Stage 1: Dependencies ───────────────────────────────────────────────────
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat git
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (ignore scripts for security in Docker)
RUN npm ci --legacy-peer-deps --ignore-scripts && \
    npm cache clean --force

# ─── Stage 2: Builder ────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build-time environment variables
ARG NEXT_PUBLIC_SITE_URL=https://claudygod.org
ARG NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY

ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=$NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY \
    NEXT_TELEMETRY_DISABLED=1 \
    NODE_ENV=production

# Rebuild native modules and build Next.js
RUN npm rebuild --legacy-peer-deps && \
    npm run build

# ─── Stage 3: Runner ─────────────────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

# Labels
LABEL org.opencontainers.image.title="ClaudyGod Web Application"
LABEL org.opencontainers.image.description="Official website for ClaudyGod Music Ministries"
LABEL org.opencontainers.image.vendor="ClaudyGod Music Ministries"
LABEL org.opencontainers.image.source="https://github.com/ClaudyGod-MusicMinistries/website2.0"

# Install wget for healthcheck
RUN apk add --no-cache wget curl && \
    rm -rf /var/cache/apk/*

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME="0.0.0.0"

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy standalone build output
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# next.config.mjs is NOT copied here on purpose: with output:"standalone",
# Next.js resolves the config at build time and inlines what server.js needs
# into the standalone bundle itself. A previous version of this Dockerfile
# tried to COPY it anyway with `2>/dev/null || true` tacked on — COPY is a
# Dockerfile instruction, not a shell command, so that redirect/fallback
# syntax doesn't apply and broke the build outright (and would have failed
# again for next.config.js, which doesn't exist in this repo).

USER nextjs

EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD wget -qO- http://localhost:3000/ >/dev/null 2>&1 || exit 1

# Start Next.js server
CMD ["node", "server.js"]