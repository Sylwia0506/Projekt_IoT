FROM alpine:3.16.0

WORKDIR /app

RUN set -xe;

COPY . .

RUN apk add --no-cache python3 py3-pip tini; \
    pip install --upgrade pip setuptools-scm; \
    pip install django;\
    pip install psycopg2-binary;\
    pip install -r requirements.txt;\
    python3 setup.py install; \
    python3 taxi_backend/manage.py makemigrations; \
    python3 taxi_backend/manage.py migrate; \
    addgroup -g 1000 appuser; \
    adduser -u 1000 -G appuser -D -h /app appuser; \
    chown -R appuser:appuser /app

USER appuser
EXPOSE 8000/tcp
ENTRYPOINT [ "tini", "--" ]
CMD [ "python3", "/app/manage.py", "runserver", "0.0.0.0:8000" ]