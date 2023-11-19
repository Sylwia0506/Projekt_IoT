from rest_framework import serializers
from .models import Taxi, Course

class TaxiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Taxi
        fields = ["id", "brand", "model", "registration", "vinNumber", "seatCount", "isAvailable"]

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ["id", "startLatitude", "startLongitude", "endLatitude", "endLongitude", "passengerCount", "taxi", "fare"]