FROM node:slim
#RUN apk add py3-pip  #only in Alpine
RUN apt update
RUN apt-get install -y python3-pip git

WORKDIR /usr/src/app
COPY . .

RUN pip install -r ./python/requirements.txt --break-system-packages
RUN pip install git+https://github.com/facebookresearch/segment-anything.git --break-system-packages
WORKDIR /usr/src/app/python
RUN wget https://dl.fbaipublicfiles.com/segment_anything/sam_vit_b_01ec64.pth

WORKDIR /usr/src/app
RUN npm install
RUN npm install express
RUN npm install pg pg-hstore
RUN npm install bullmq
RUN npm install jsonwebtoken
RUN npm install fs
RUN npm install adm-zip
RUN npm install -g typescript
RUN tsc
CMD ["node", "index.js"]