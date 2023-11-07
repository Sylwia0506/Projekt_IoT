import paho.mqtt.client as mqtt
from taxi_backend.views import on_message

mqtt_client = mqtt.Client()
mqtt_client.on_message = on_message


mqtt_client.connect("mqtt", 1883)

topic = "uber/coords"
mqtt_client.subscribe(topic)

mqtt_client.loop_start()
