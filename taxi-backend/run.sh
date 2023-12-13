#!/bin/sh

python3 manage.py makemigrations taxi_backend
python3 manage.py makemigrations
python3 /app/manage.py migrate
python3 /app/manage.py loaddata /app/taxi_backend/seed/*.json
python3 /app/manage.py runserver 0.0.0.0:8000