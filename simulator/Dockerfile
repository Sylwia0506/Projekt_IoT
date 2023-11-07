FROM python:3.11-alpine

COPY . .

RUN apk add python3
RUN pip3 install -r requirements.txt

ENTRYPOINT ["python3", "main.py"]