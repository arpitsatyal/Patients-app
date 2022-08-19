FROM node:16

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4200

CMD ["npm", "run", "serve"]