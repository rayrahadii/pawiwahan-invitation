# Dev-only Dockerfile — runs the Vite dev server with hot reload.
# This is NOT a production image (no build step, no nginx/static serving).

FROM node:20-alpine

WORKDIR /app

# Install dependencies first so this layer is cached until package*.json changes
COPY package*.json ./
RUN npm install

# Copy the rest of the source. In dev this gets overridden by the bind mount
# in docker-compose.yml so file edits on the host show up instantly.
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
