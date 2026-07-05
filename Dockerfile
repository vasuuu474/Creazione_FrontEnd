# syntax=docker/dockerfile:1

# ---- base: shared setup for every stage below ----
FROM node:22-alpine AS base
WORKDIR /app
COPY package.json package-lock.json ./


# ---- deps: install once, reused by dev and build stages ----
FROM base AS deps
RUN npm ci


# ---- dev: hot-reloading Vite dev server, source mounted as a volume ----
FROM deps AS dev
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]


# ---- build: produce the static production bundle ----
FROM deps AS build
COPY . .
RUN npm run build


# ---- production: the built app served by nginx ----
FROM nginx:1.27-alpine AS production
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
