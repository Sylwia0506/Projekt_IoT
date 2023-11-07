FROM alpine:3.16.0

WORKDIR /app

RUN set -xe;

COPY . .

RUN apk add --no-cache python3 py3-pip tini; \
    pip install --upgrade pip setuptools-scm; \
    pip install -r /app/requirements.txt;\
    python3 /app/setup.py install; \
    python3 /app/manage.py makemigrations taxi_backend;\
    python3 /app/manage.py makemigrations; \
    addgroup -g 1000 appuser; \
    adduser -u 1000 -G appuser -D -h /app appuser; \
    chown -R appuser:appuser /app

USER appuser
EXPOSE 8000/tcp
ENTRYPOINT [ "tini", "--" ]