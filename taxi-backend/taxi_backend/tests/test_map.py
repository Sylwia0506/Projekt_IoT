from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import TaxiTimestamp, Course, Driver, Taxi
from .serializers import MapTaxiSerializer
from django.db.models import Max
from datetime import datetime, timedelta
import pytz


class MapTaxiListApiViewTestCase(TestCase):
    def setUp(self):
        self.map_taxi_list_url = reverse("map-taxi-list")
        self.taxi = Taxi.objects.create(
            brand="TestBrand",
            model="TestModel",
            registration="TestRegistration",
            vinNumber="TestVin",
            seatCount=4,
            isAvailable=True,
        )
        self.driver = Driver.objects.create(name="TestDriver")
        self.course = Course.objects.create(
            startLatitude=0,
            startLongitude=0,
            endLatitude=1,
            endLongitude=1,
            passengerCount=2,
            taxi=self.taxi,
            fare=10.0,
        )
        self.timestamp = TaxiTimestamp.objects.create(
            latitude=0,
            longitude=0,
            status="Available",
            time=datetime.now(pytz.UTC),
            fuelConsumption=10.0,
            course=self.course,
            speed=50,
            driver=self.driver,
        )

    def test_get_map_taxi_list(self):
        response = self.client.get(self.map_taxi_list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
