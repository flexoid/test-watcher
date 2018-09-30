FROM node:carbon-stretch as build-deps
WORKDIR /usr/src/app
COPY client/package.json client/yarn.lock ./
RUN yarn
COPY client/ ./
RUN yarn build

FROM ruby:2.5-stretch
WORKDIR /usr/src/app
ENV RAILS_ENV=production
COPY Gemfile Gemfile.lock ./
RUN bundle install

ENV DOCKERIZE_VERSION v0.6.1
RUN wget -q https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

COPY . ./
COPY --from=build-deps /usr/src/app/build /usr/src/app/public
