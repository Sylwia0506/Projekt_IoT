import pytest
import time
import paho.mqtt.client as mqtt


def test_mqtt_connection():
    mqtt_broker = "test.mosquitto.org"
    mqtt_port = 1883
    mqtt_topic = "test_topic"

    connected_flag = False
    disconnected_flag = False

    def on_connect(client, userdata, flags, rc):
        nonlocal connected_flag
        connected_flag = True

    def on_disconnect(client, userdata, rc):
        nonlocal disconnected_flag
        disconnected_flag = True

    client = mqtt.Client()
    client.on_connect = on_connect
    client.on_disconnect = on_disconnect

    client.connect(mqtt_broker, mqtt_port, keepalive=60)

    start_time = time.time()
    while not connected_flag and time.time() - start_time < 5:
        client.loop(timeout=1, max_packets=1)

    assert client.is_connected()

    client.publish(mqtt_topic, "Test message")

    client.disconnect()

    start_time = time.time()
    while not disconnected_flag and time.time() - start_time < 5:
        client.loop(timeout=1, max_packets=1)

    assert not client.is_connected()


def test_mqtt_subscribe_and_receive_message():
    mqtt_broker = "test.mosquitto.org"
    mqtt_port = 1883
    mqtt_topic = "test_topic"

    connected_flag = False
    message_received = None

    def on_connect(client, userdata, flags, rc):
        nonlocal connected_flag
        connected_flag = True
        client.subscribe(mqtt_topic)

    def on_message(client, userdata, msg):
        nonlocal message_received
        message_received = msg.payload.decode()

    client = mqtt.Client()
    client.on_connect = on_connect
    client.on_message = on_message

    client.connect(mqtt_broker, mqtt_port, keepalive=60)

    start_time = time.time()
    while not connected_flag and time.time() - start_time < 5:
        client.loop(timeout=1, max_packets=1)

    assert connected_flag

    client.publish(mqtt_topic, "Test message")

    start_time = time.time()
    while not message_received and time.time() - start_time < 5:
        client.loop(timeout=1, max_packets=1)

    assert message_received == "Test message"

    client.disconnect()


def test_mqtt_unsubscribe():
    mqtt_broker = "test.mosquitto.org"
    mqtt_port = 1883
    mqtt_topic = "test_topic"

    connected_flag = False
    unsubscribed_flag = False

    def on_connect(client, userdata, flags, rc):
        nonlocal connected_flag
        connected_flag = True
        client.subscribe(mqtt_topic)

    def on_unsubscribe(client, userdata, mid):
        nonlocal unsubscribed_flag
        unsubscribed_flag = True

    client = mqtt.Client()
    client.on_connect = on_connect
    client.on_unsubscribe = on_unsubscribe

    client.connect(mqtt_broker, mqtt_port, keepalive=60)

    start_time = time.time()
    while not connected_flag and time.time() - start_time < 5:
        client.loop(timeout=1, max_packets=1)

    assert connected_flag

    client.unsubscribe(mqtt_topic)

    start_time = time.time()
    while not unsubscribed_flag and time.time() - start_time < 5:
        client.loop(timeout=1, max_packets=1)

    assert unsubscribed_flag

    client.disconnect()
