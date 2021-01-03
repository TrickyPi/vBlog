FROM node:lts
RUN npm install -g http-server
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run docs:build
EXPOSE 8080
CMD [ "http-server", "docs/.vuepress/dist" ]