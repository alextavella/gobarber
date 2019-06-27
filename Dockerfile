# Images
FROM node:10-alpine

# Config directories
WORKDIR /app
COPY . ./

# Install dependencies
RUN npm install

# Expose service
EXPOSE 3333

# Execute application
CMD ["npm", "start"]