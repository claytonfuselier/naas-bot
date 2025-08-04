# Use Node.js LTS base image
FROM node:22-slim

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci --production

# Copy app source code
COPY . .

# Run the app
CMD [ "node", "bot.js" ]
