from django.core.management.base import BaseCommand
from taxi_backend.views import subscribe_to_mqtt_broker


class Command(BaseCommand):
    help = "Subscribe to MQTT"

    def handle(self, *args, **options):
        subscribe_to_mqtt_broker()
        self.stdout.write(self.style.SUCCESS("Successfully subscribed to MQTT"))
