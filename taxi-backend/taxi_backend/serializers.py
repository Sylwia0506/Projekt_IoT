from rest_framework import serializers
from .models import Taxi

class TaxiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Taxi
        fields = ["id", "brand", "model", "registration", "vinNumber", "seatCount", "isAvailable"]