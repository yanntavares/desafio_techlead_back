FROM node:24-alpine

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

RUN prisma generate

EXPOSE 3000

CMD [ "sh","-c", "npx prisma migrate deploy && npm run dev" ]