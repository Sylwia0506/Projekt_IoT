FROM python:3.11-alpine

COPY . .

RUN pip install -r requirements.txt

RUN crontab crontab

RUN chmod +x script.sh

CMD ["crond", "-f"]