FROM node:lts-stretch-slim
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm install express
RUN npm install sequelize
RUN npm install -g typescript
RUN npm install bull --save
RUN npm install jsonwebtoken
RUN tsc
CMD ["node", "index.ts"]