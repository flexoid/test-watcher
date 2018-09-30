#!/usr/bin/env bash
set -e

export COMPOSE_PROJECT_NAME=test_watcher
export COMPOSE_FILE=build/docker-compose.yml

docker-compose build
docker-compose up -d db redis
docker-compose run --rm web build/setup.sh
docker-compose up -d
