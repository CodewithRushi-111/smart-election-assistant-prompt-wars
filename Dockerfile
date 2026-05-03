# Build stage for the React frontend
FROM node:18-slim AS client-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Final stage for the Node.js server
FROM node:18-slim
WORKDIR /app

# Copy server package files and install production dependencies
COPY server/package*.json ./server/
RUN cd server && npm install --production

# Copy server source code
COPY server/ ./server/

# Copy built frontend from the previous stage
COPY --from=client-build /app/client/dist ./client/dist

# Expose the port
EXPOSE 5000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Start the server
CMD ["node", "server/server.js"]
