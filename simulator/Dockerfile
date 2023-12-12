FROM python:3.11

COPY . .

#RUN apk add python3
RUN pip3 install --prefer-binary --no-cache-dir --upgrade -r requirements.txt

ENTRYPOINT ["python3", "main.py"]