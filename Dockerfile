FROM node:18.16.0-alpine AS build

ARG BUILD_MODE

WORKDIR /visphere

COPY visphere-base/.env visphere-base/

COPY visphere-mail-parser/.webpack visphere-mail-parser/.webpack/
COPY visphere-mail-parser/src visphere-mail-parser/src/
COPY visphere-mail-parser/entrypoint.sh visphere-mail-parser/
COPY visphere-mail-parser/package.json visphere-mail-parser/
COPY visphere-mail-parser/tsconfig.json visphere-mail-parser/
COPY visphere-mail-parser/yarn.lock visphere-mail-parser/

WORKDIR /visphere/visphere-mail-parser

RUN mkdir dist

RUN yarn install
RUN yarn run docker:$BUILD_MODE

WORKDIR /visphere

RUN rm -rf visphere-base

FROM build AS prod-deps

WORKDIR /visphere/visphere-mail-parser

RUN yarn install --prod

FROM node:18.16.0-alpine

LABEL maintainer="Visphere <info@visphere.pl>"

RUN mkdir -p vsph/dist
RUN mkdir -p vsph/node_modules

WORKDIR /vsph

COPY --from=prod-deps /visphere/visphere-mail-parser/node_modules /vsph/node_modules
COPY --from=build /visphere/visphere-mail-parser/dist/ /vsph/dist

COPY visphere-mail-parser/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

ENV HOST=0.0.0.0
ENV PORT=80

EXPOSE 80
ENTRYPOINT [ "/usr/local/bin/entrypoint.sh" ]
