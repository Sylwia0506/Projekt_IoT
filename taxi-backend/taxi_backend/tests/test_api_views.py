from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Taxi
from .serializers import TaxiSerializer


class TaxiListApiViewTestCase(TestCase):
    def setUp(self):
        self.taxi_list_url = reverse("taxi-list")

    def test_get_taxi_list(self):
        response = self.client.get(self.taxi_list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_taxi(self):
        data = {
            "brand": "NewBrand",
            "model": "NewModel",
            "registration": "NewRegistration",
            "vinNumber": "NewVin",
            "seatCount": 3,
            "isAvailable": True,
        }
        response = self.client.post(self.taxi_list_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_invalid_taxi(self):
        invalid_data = {
            "brand": "InvalidBrand",
        }
        response = self.client.post(self.taxi_list_url, invalid_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
