FROM node:lts-stretch-slim
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm install -g typescript
RUN npm install bull --save
RUN tsc
CMD ["node", "index.ts"]