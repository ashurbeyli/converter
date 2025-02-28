FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . ./

RUN npm install -g typescript
RUN apt-get update && apt-get install -y ffmpeg

RUN tsc --project /app/src/workers/converter/tsconfig.json

EXPOSE 3001
ENV NODE_ENV=production

CMD ["node", "src/workers/converter/dist/converter.js"]
