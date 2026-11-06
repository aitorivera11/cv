# syntax=docker/dockerfile:1

# Build (única instal·lació de dependències: la de producció es reutilitza al runtime)
FROM node:24-bookworm-slim AS builder
WORKDIR /app
# Limita la memòria de Node perquè el build no ofegui servidors petits
ENV NODE_OPTIONS=--max-old-space-size=1536 \
    ASTRO_TELEMETRY_DISABLED=1 \
    NPM_CONFIG_UPDATE_NOTIFIER=false
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm npm ci --no-audit --no-fund
COPY . .
RUN npm run build && npm prune --omit=dev --no-audit --no-fund

# Runtime (Node server + Chromium per generar PDFs)
FROM mcr.microsoft.com/playwright:v1.60.0-jammy
WORKDIR /app
ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=4321 \
    CV_STORAGE_DIR=/app/storage/cv \
    ASTRO_TELEMETRY_DISABLED=1

# Mateixa versió de Node que al build (Astro 7 exigeix Node >= 22.23.4)
COPY --from=builder /usr/local/bin/node /usr/local/bin/node

COPY package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY docker-entrypoint.mjs ./

# Carpeta persistente recomanada per als CVs (munta-hi un volum)
RUN mkdir -p /app/storage/cv

EXPOSE 4321

# /robots.txt no toca Directus: serveix per saber si el procés Node respon.
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||4321)+'/robots.txt').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "./docker-entrypoint.mjs"]
