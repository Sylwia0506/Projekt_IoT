#!/bin/bash
sudo docker compose \
-f ../taxi-backend/docker-compose.yaml \
-f ../simulator/docker-compose.yaml \
-f ../taxi-frontend/docker-compose.yaml \
config --no-path-resolution --no-interpolate \
> docker-compose.yaml