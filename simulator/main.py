import requests

url = 'http://localhost:8080/ping'
body = {'somekey': 'somevalue'}

x = requests.post(url, json = body)

print(x.text)