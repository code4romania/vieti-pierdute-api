FROM strapi/base

WORKDIR /

COPY ./package.json ./

RUN yarn install

COPY . .

ENV NODE_ENV production
ENV DATABASE_URL postgresdb

RUN yarn build

EXPOSE 1337

CMD ["yarn", "start"]
