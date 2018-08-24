FROM node:latest

RUN mkdir -p /cme
WORKDIR /cme

COPY .eslint* package.json yarn.lock /cme/
RUN yarn

COPY config /cme/config
COPY public /cme/public
COPY scripts /cme/scripts
COPY src /cme/src

RUN yarn build
RUN yarn global add serve

EXPOSE 80
CMD npx serve -s build -l 80
