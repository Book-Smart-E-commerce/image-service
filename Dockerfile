FROM node:18.1-alpine

WORKDIR /usr/src/

COPY package*.json ./
RUN npm install

CMD ['npm', 'build']

COPY . .

CMD ["npm", "start"]

EXPOSE 4700