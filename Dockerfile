FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . ./
RUN npm run build --prod

EXPOSE 4200
ENV NODE_ENV=production

CMD ["npm", "run", "serve:ssr:converter"]
