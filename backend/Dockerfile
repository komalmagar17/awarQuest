FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .

FROM node:20-alpine AS runner
WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev
COPY --from=builder /app ./
EXPOSE 5000
CMD ["node", "server.js"]
