from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import Taxi, Course, MapTaxi, Driver, TaxiTimestamp
from .serializers import TaxiSerializer, CourseSerializer, MapTaxiSerializer
from django.urls import reverse
import json
from datetime import datetime
import pytz


class TaxiListApiViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.taxi_url = reverse('taxi-list')

    def test_get_taxi_list(self):
        response = self.client.get(self.taxi_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_taxi(self):
        taxi_data = {
            "brand": "TestBrand",
            "model": "TestModel",
            "registration": "TestRegistration",
            "vinNumber": "TestVin",
            "seatCount": 4,
            "isAvailable": True
        }
        response = self.client.post(self.taxi_url, data=json.dumps(taxi_data), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

class TaxiDetailApiViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.taxi = Taxi.objects.create(
            brand="TestBrand",
            model="TestModel",
            registration="TestRegistration",
            vinNumber="TestVin",
            seatCount=4,
            isAvailable=True
        )
        self.taxi_url = reverse('taxi-detail', args=[self.taxi.id])

    def test_get_taxi_detail(self):
        response = self.client.get(self.taxi_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_taxi(self):
        updated_data = {
            "brand": "UpdatedBrand",
            "model": "UpdatedModel",
            "registration": "UpdatedRegistration",
            "vinNumber": "UpdatedVin",
            "seatCount": 5,
            "isAvailable": False
        }
        response = self.client.put(self.taxi_url, data=json.dumps(updated_data), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_taxi(self):
        response = self.client.delete(self.taxi_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
