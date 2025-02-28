#builds the application
FROM node:16-alpine AS builder

WORKDIR /app
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
RUN yarn
COPY . /app

RUN REACT_APP_ENVIRONMENT='production' REACT_APP_HTTP_API_URL='https://apigw.seclab.inf.br' REACT_APP_TOKEN_KEY_NAME='@seclab_token' REACT_APP_WIDGETS_CONFIG_NAME='@seclab_widgets_config' yarn build


FROM nginx:1.24
COPY --from=builder /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
RUN mkdir /etc/nginx/certs
COPY nginx/seclab.inf.br.key /etc/nginx/certs
COPY nginx/seclab.inf.br.cer /etc/nginx/certs
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
