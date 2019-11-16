FROM node:alpine as build 

ADD . /app/src

WORKDIR /app/src
RUN npm install && npm build

FROM nginx:alpine

COPY --from=build /app/src/public /usr/share/nginx/html

EXPOSE 80
