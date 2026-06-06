# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./
COPY next.config.js ./
COPY tailwind.config.ts ./
COPY postcss.config.js ./

# Install dependencies
RUN npm ci

# Copy source code
COPY app ./app
COPY components ./components
COPY lib ./lib
COPY public ./public

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install Python for transcript fetcher
RUN apk add --no-cache python3 py3-pip

# Copy Python requirements and install dependencies
COPY requirements.txt ./
RUN pip3 install --no-cache-dir -r requirements.txt

# Copy necessary files from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/next.config.js ./

# Copy Python scripts
COPY transcript_fetcher.py ./
COPY batch_processor.py ./

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
