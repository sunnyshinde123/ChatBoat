# OS with Env (BASE IMAGE)
FROM node:latest

# Working Directory 
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json /app/

# Install libraries and dependencies
RUN npm install

# Copy the code
COPY . .

# Expose the port
EXPOSE 7080

# Env Varible
ENV DB_HOST=mongodb-container
ENV DB_USER=root
ENV DB_PASSWORD=admin
ENV DB_DATABASE=Chats

# Run the server
CMD ["node", "index.js"]
