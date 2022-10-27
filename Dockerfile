FROM node:12-alpine as build
WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY . .
RUN npm run build

FROM nginx:1.16.0-alpine as final

COPY /nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]

EXPOSE 80