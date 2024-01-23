
from configuration import Configuration
import logging
import signal
import sys
import time
import random
import json
import road_generator
from paho.mqtt import client as mqtt_client

"""
    SIGNAL Handler
"""
def signal_handler(sig, frame):
    print('You pressed Ctrl+C!')
    sys.exit(0)

signal.signal(signal.SIGINT, signal_handler)

broker = 'mqtt'
port = 8443
topic = "uber/coords"
client_id = "fffbbb26-9462-4ce4-be03-7b1aa135547c" #TODO - replace with ID obtained from BE
fuel_consumption = 8
last_speed = 0

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

    client.tls_set(
        ca_certs='/certs/ca.pem',
        certfile='/certs/client.pem',
        keyfile='/certs/client.key')

    return client


def get_fuel_consumption(speed):
    global fuel_consumption, last_speed
    if speed > last_speed:
        accelerating_factor = 4
    else:
        accelerating_factor = 2
    fuel_consumption = min(random.uniform(6, fuel_consumption), 10) * speed / 100 * accelerating_factor
    return fuel_consumption


def publish(client):
    (long, lat, speed) = road_generator.get_next_point()
    fuel_consumption = get_fuel_consumption(speed)
    payload = {
        "latitude": lat,
        "longitude": long,
        "Stan": "Wolny",
        "ID": client_id,
        "Timestamp": int(time.time()),
        "Spalanie": "6",
        "ID Kursu": "d8fe1fe4-95d5-4408-8c74-a31843cfef5a", #TODO - replace with ID obtained from BE
        "Predkosc": "128",
        "ID Kierowcy": "b9fafb2a-678c-4ec0-ae69-487b871b27a4" #TODO - replace with ID obtained from BE
    }

    msg = json.dumps(payload)
    result = client.publish(topic, msg)
    status = result[0]
    if status == 0:
        print(f"Send `{msg}` to topic `{topic}`")
    else:
        print(f"Failed to send message to topic {topic}")
    return msg


def subscribe(client: mqtt_client):
    def on_message(client, userdata, msg):
        print(f"Received `{msg.payload.decode()}` from `{msg.topic}` topic")

    client.subscribe(topic)
    client.on_message = on_message


def run():
    client = connect_mqtt()
    subscribe(client)
    client.loop_start()
    Configuration("simulator.log", logging.DEBUG, 1, publish, client)


if __name__ == '__main__':
    run()
