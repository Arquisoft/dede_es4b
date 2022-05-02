FROM node:16.13.1
LABEL org.opencontainers.image.source https://github.com/Arquisoft/dede_es4b
COPY . /app
WORKDIR /app
#Install the dependencies
RUN npm install

ENV MONGO_DB_URI=$MONGO_DB_URI
ENV SECRET_SALT=$SECRET_SALT
ENV SECRET=$SECRET

CMD [ "npm", "start" ]