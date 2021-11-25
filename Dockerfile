FROM strapi/base

WORKDIR /

COPY ./package.json ./

RUN npm install

COPY . .

ENV NODE_ENV production

RUN npm build

EXPOSE 1337

CMD ["npm", "start"]