# Build
FROM node:20-bookworm-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Runtime (Node server)
FROM mcr.microsoft.com/playwright:v1.57.0-jammy
WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

# Carpeta persistente recomendada para CVs
RUN mkdir -p /app/storage/cv
ENV CV_STORAGE_DIR=/app/storage/cv

EXPOSE 4321
CMD ["node", "./dist/server/entry.mjs"]
