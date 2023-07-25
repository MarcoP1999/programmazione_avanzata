FROM node:lts-stretch-slim
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm install express
RUN npm install --save pg pg-hstore
RUN npm install --save bull 
RUN npm install jsonwebtoken
RUN npm install -g typescript
RUN npm install multer
RUN npm install python3.10
RUN pip install -r ./python/requirements.txt
RUN tsc
CMD ["node", "index.js"]