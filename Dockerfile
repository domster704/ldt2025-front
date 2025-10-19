FROM node:22-alpine3.19 AS builder

LABEL developer="domster704"

WORKDIR /var/www/ntv

COPY package*.json ./
RUN npm i --force

COPY build/ build/
COPY src/ src/
COPY .babelrc tsconfig.json webpack.config.js ./

RUN npm run build

FROM nginx:1.27.1-alpine3.20 AS nginx

LABEL developer="domster704"

COPY --from=builder /var/www/ntv/build/ ./var/www/ntv/build/

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]

EXPOSE 80

