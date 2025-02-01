# Use official Node.js image as base
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install 

# Copy all other project files
COPY . .

# Expose the service port
EXPOSE 4000

# Start the application
CMD ["npm", "start"]
