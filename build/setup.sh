#!/usr/bin/env bash
set -e

dockerize -wait tcp://db:3306 -wait tcp://redis:6379 -timeout 30s

rails db:migrate
