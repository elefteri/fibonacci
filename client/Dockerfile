FROM node:13.0-alpine as builder
WORKDIR '/app'
COPY ./package.prod.json ./package.json
RUN npm install
#do not copy package and other files
COPY ./public .
COPY ./src .
RUN npm run build

FROM nginx:1.17-alpine
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html

