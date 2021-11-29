FROM strapi/base:14-alpine

WORKDIR /

COPY ./package.json ./yarn.lock ./

RUN yarn install

COPY . .

ENV NODE_ENV=production
ENV DATABASE_URL=postgresdb

RUN yarn build

EXPOSE 1337

CMD ["yarn", "start"]
