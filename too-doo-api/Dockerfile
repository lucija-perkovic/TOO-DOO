# Check out https://hub.docker.com/_/node to select a new base image
FROM node:16-slim
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
EXPOSE 80
CMD ["npm", "start"]