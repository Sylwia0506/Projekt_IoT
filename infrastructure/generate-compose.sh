#!/bin/bash
sudo docker compose -f ../taxi-backend/docker-compose.yaml -f ../simulator/docker-compose.yml config > docker-compose.yaml