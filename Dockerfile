# Images
FROM node:alpine

# Config directories
WORKDIR /app

# Copy packages
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy sources
COPY . ./

# Expose service
EXPOSE 3333

# Execute application
ENTRYPOINT ["npm", "start"]
