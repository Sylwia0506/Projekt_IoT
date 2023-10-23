# import requests
# 
# url = 'http://localhost:8080/ping'
# body = {'somekey': 'somevalue'}
# 
# x = requests.post(url, json = body)
# 
# print(x.text)

#!/usr/bin/python
# -*- coding: UTF-16 -*-

import signal
import sys
import time
import random
import json
from paho.mqtt import client as mqtt_client

"""
    SIGNAL Handler
"""
def signal_handler(sig, frame):
    print('You pressed Ctrl+C!')
    sys.exit(0)

# Handle SIGINT ( Ctrl^C )
signal.signal(signal.SIGINT, signal_handler)

broker = 'mqtt'
port = 1883
topic = "uber/coords"
client_id = f'Fake-Taxi-{random.randint(0, 69)}' # will change later

FIRST_RECONNECT_DELAY = 1
RECONNECT_RATE = 2
MAX_RECONNECT_COUNT = 12
MAX_RECONNECT_DELAY = 60

"""
    Handles auto reconnect
"""
def on_disconnect(client, userdata, rc):
    logging.info("Disconnected with result code: %s", rc)
    reconnect_count, reconnect_delay = 0, FIRST_RECONNECT_DELAY
    while reconnect_count < MAX_RECONNECT_COUNT:
        logging.info("Reconnecting in %d seconds...", reconnect_delay)
        time.sleep(reconnect_delay)

        try:
            client.reconnect()
            logging.info("Reconnected successfully!")
            return
        except Exception as err:
            logging.error("%s. Reconnect failed. Retrying...", err)

        reconnect_delay *= RECONNECT_RATE
        reconnect_delay = min(reconnect_delay, MAX_RECONNECT_DELAY)
        reconnect_count += 1
    logging.info("Reconnect failed after %s attempts. Exiting...", reconnect_count)

def connect_mqtt():
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            print("Connected to MQTT Broker!")
        else:
            print("Failed to connect, return code %d\n", rc)
    # Set Connecting Client ID
    client = mqtt_client.Client(client_id)
    
    client.on_connect = on_connect
    client.on_disconnect = on_disconnect
    client.connect(broker, port)

    # Disable Two-way authentication with Cert/Key for now
    # client.tls_set(
    #     ca_certs='./server-ca.crt',
    #     certfile='./client.crt',
    #     keyfile='./client.key'
    # )

    return client

def publish(client):
    time.sleep(1)

    payload = {
        "Lokalizacja": "New Bialystok City",
        "Stan": "Wolny",
        "ID": client_id,
        "Timestamp": int(time.time()), # UNIX Timestamp in seconds
        "Spalanie": "2 razy w tygodniu VAPE smak malina",
        "ID Kursu": "420",
        "Predkosc": "128 km/h",
        "ID Kierowcy": "Imigrant007"
    }

    msg = json.dumps(payload)
    result = client.publish(topic, msg)
    # result: [0, 1]
    status = result[0]
    if status == 0:
        print(f"Send `{msg}` to topic `{topic}`")
    else:
        print(f"Failed to send message to topic {topic}")


def subscribe(client: mqtt_client):
    def on_message(client, userdata, msg):
        print(f"Received `{msg.payload.decode()}` from `{msg.topic}` topic")

    client.subscribe(topic)
    client.on_message = on_message

def run():
    client = connect_mqtt()
    subscribe(client)
    client.loop_start()

    while True:
        publish(client)
        
    client.loop_stop()
    client.loop_forever() # JAWA SZJEDZIULER


if __name__ == '__main__':
    run()