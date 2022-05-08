FROM node:16.13.1
LABEL org.opencontainers.image.source https://github.com/Arquisoft/dede_es4b
COPY . /app
WORKDIR /app
#Install the dependencies
RUN npm install

# Variables for deploy in Azure
ARG API_URI="http://localhost:5000/api"
ENV REACT_APP_API_URI=$API_URI

# Certificados SSL
ARG SECRET_PRIVATEKEY
ENV HTTPS_PRIVATEKEY=$SECRET_PRIVATEKEY

ARG SECRET_CERTIFICATE
ENV HTTPS_CERTIFICATE=$SECRET_CERTIFICATE

#Create an optimized version of the webapp
RUN npm run build

#Ver como podemos llamar npm run prod aquí
CMD [ "npm", "run", "prod" ]