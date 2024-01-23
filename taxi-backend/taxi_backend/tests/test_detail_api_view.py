from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Taxi
from .serializers import TaxiSerializer


class TaxiDetailApiViewTestCase(TestCase):
    def setUp(self):
        self.taxi = Taxi.objects.create(
            brand="TestBrand",
            model="TestModel",
            registration="TestRegistration",
            vinNumber="TestVin",
            seatCount=4,
            isAvailable=True,
        )
        self.taxi_detail_url = reverse("taxi-detail", args=[self.taxi.id])

    def test_get_taxi_detail(self):
        response = self.client.get(self.taxi_detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_nonexistent_taxi_detail(self):
        nonexistent_taxi_detail_url = reverse("taxi-detail", args=[999])
        response = self.client.get(nonexistent_taxi_detail_url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_taxi(self):
        data = {
            "brand": "UpdatedBrand",
            "model": "UpdatedModel",
            "registration": "UpdatedRegistration",
            "vinNumber": "UpdatedVin",
            "seatCount": 3,
            "isAvailable": False,
        }
        response = self.client.put(self.taxi_detail_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_nonexistent_taxi(self):
        nonexistent_taxi_detail_url = reverse("taxi-detail", args=[999])
        data = {
            "brand": "UpdatedBrand",
            "model": "UpdatedModel",
            "registration": "UpdatedRegistration",
            "vinNumber": "UpdatedVin",
            "seatCount": 3,
            "isAvailable": False,
        }
        response = self.client.put(nonexistent_taxi_detail_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_delete_taxi(self):
        response = self.client.delete(self.taxi_detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_nonexistent_taxi(self):
        nonexistent_taxi_detail_url = reverse("taxi-detail", args=[999])
        response = self.client.delete(nonexistent_taxi_detail_url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
