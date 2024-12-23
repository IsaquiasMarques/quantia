FROM node:18.17.0
WORKDIR /app
COPY . .
RUN npm install
RUN npm install @angular/cli@17.1.1 -g
EXPOSE 4200
CMD [ "ng", "serve", "--host", "0.0.0.0" ]