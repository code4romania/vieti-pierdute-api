FROM strapi/base

WORKDIR /

COPY ./package.json ./

RUN npm install

COPY . .

ENV NODE_ENV production
ENV DATABASE_URL "postgres-db"

RUN npm run build --cache

EXPOSE 1337

CMD ["npm", "run start"]
