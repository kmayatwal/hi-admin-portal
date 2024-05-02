ARG NODE_TAG="20.11.0-slim"

FROM node:${NODE_TAG} as builder
ARG NODE_ENV_ARG=dev
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm i --legacy-peer-deps
COPY . ./
# RUN npm run lint
# RUN npm run test
ENV NODE_OPTIONS --max_old_space_size=8192
RUN npm run build:${NODE_ENV_ARG}

FROM node:${NODE_TAG} as server
WORKDIR /hi-web/
COPY --from=builder /usr/src/app/dist/ .

RUN npm install -g serve

CMD ["/bin/bash", "-c", "cd hi-admin-portal && serve -c serve.json -s -l 80"]
EXPOSE 80
# FROM nginx:stable-alpine as production-stage
# WORKDIR /hi-web/
# COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
# COPY /nginx.conf  /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

