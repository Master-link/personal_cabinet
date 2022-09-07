FROM node:14-alpine

RUN apk update && apk add bind-tools

WORKDIR /app
COPY . .
#COPY env.sh ./env.sh
#RUN sh env.sh

CMD yarn start