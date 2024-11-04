# Stage 1: Build Frontend
FROM node:18-alpine AS frontend-build

WORKDIR /app/frontend

# Copy frontend package.json and install dependencies
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install

# Copy frontend source code and build
COPY frontend/ ./
RUN npm run build

# Stage 2: Build Backend
FROM node:18-alpine AS backend-build

WORKDIR /app/backend

# Copy backend package.json and install dependencies
COPY backend/package.json backend/package-lock.json ./
RUN npm install

# Copy backend source code
COPY backend/ ./

# Run the build command to create the dist directory
RUN npm run build


# Copy backend source code
COPY backend/ ./

# Stage 3: Production
FROM node:18-alpine

WORKDIR /app

# Copy frontend build to the production image
COPY --from=frontend-build /app/frontend/build ./frontend/build

# Copy backend build to the production image
COPY --from=backend-build /app/backend/dist ./backend/dist
COPY --from=backend-build /app/backend/node_modules ./backend/node_modules

# Install serve globally
RUN npm install -g serve

# Expose ports for frontend and backend
EXPOSE 3000 8000

# Start both frontend and backend
CMD ["sh", "-c", "serve -s frontend/build -l 3000 & node backend/dist/server.js"]
