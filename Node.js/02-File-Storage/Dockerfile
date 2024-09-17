FROM  node:alpine

WORKDIR /big

COPY package.json .

RUN npm install

COPY . .

RUN mkdir -p /big/filestorage

EXPOSE 3000

CMD ["node", "app.js"]
