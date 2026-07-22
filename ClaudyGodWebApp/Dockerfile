# ─── Stage 1: Dependencies ───────────────────────────────────────────────────
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps && npm cache clean --force

# ─── Stage 2: Builder ────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Public env vars baked in at build time (Next.js static optimisation).
# Passed as --build-arg from CI → docker build.
# Note: API_BASE_URL (the var lib/data/backendProxy.ts actually reads) is
# deliberately NOT here — it's a server-only secret, supplied at container
# *runtime* via docker-compose's environment/env_file, not baked into the
# build. A NEXT_PUBLIC_API_URL build arg used to live here too; removed —
# no code reads it, and its presence was masking the fact that the real
# variable was never being set anywhere.
ARG NEXT_PUBLIC_SITE_URL=https://claudygod.org
ARG NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=$NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY \
    NEXT_TELEMETRY_DISABLED=1 \
    NODE_ENV=production

RUN npm run build

# ─── Stage 3: Runner ─────────────────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

LABEL org.opencontainers.image.title="ClaudyGod Web Application"
LABEL org.opencontainers.image.description="Official website for ClaudyGod Music Ministries"
LABEL org.opencontainers.image.vendor="ClaudyGod Music Ministries"
LABEL org.opencontainers.image.source="https://github.com/ClaudyGod-MusicMinistries/website2.0"

RUN apk add --no-cache wget && rm -rf /var/cache/apk/*

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME="0.0.0.0"

# Non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser  --system --uid 1001 nextjs

# next.config.mjs sets output:"standalone" — copy the standalone bundle
COPY --from=builder /app/public                                  ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone  ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static      ./.next/static

USER nextjs

EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD wget -qO- http://localhost:3000/ >/dev/null 2>&1 || exit 1

# Start Next.js server
CMD ["node", "server.js"]
