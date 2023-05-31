# Use an official Node runtime as a parent image
FROM node:16-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies with a clean install
RUN npm ci  --only=production

# Copy the rest of the application files to the container
COPY . .

# Build the application
RUN npm run build

# Set environment variable for production mode
ENV NODE_ENV=production

# Set environment variable for port
ENV PORT=3000

# Expose port 3000 to the host
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:prod"]