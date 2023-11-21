from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from taxi_backend.models import Taxi
from unittest.mock import patch

class TaxiListApiViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.taxi_data = {
            'brand': 'Test Brand',
            'model': 'Test Model',
            'registration': 'Test Registration',
            'vinNumber': 'Test VinNumber',
            'seatCount': 4,
            'isAvailable': True,
        }

    @patch('taxi_backend.views.Taxi.objects.all')
    def test_get_taxi_list(self, mock_all):
        mock_all.return_value = []
        response = self.client.get('/api/taxi/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    @patch('taxi_backend.views.Taxi.objects.create')
    def test_create_taxi(self, mock_create):
        mock_create.return_value = Taxi(**self.taxi_data)
        response = self.client.post('/api/taxi/', data=self.taxi_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

class TaxiDetailApiViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.taxi = Taxi.objects.create(
            brand='Test Brand',
            model='Test Model',
            registration='Test Registration',
            vinNumber='Test VinNumber',
            seatCount=4,
            isAvailable=True,
        )
        self.taxi_data = {
            'brand': 'Updated Brand',
            'model': 'Updated Model',
            'registration': 'Updated Registration',
            'vinNumber': 'Updated VinNumber',
            'seatCount': 3,
            'isAvailable': False,
        }

    @patch('taxi_backend.views.Taxi.objects.get')
    def test_get_taxi_detail(self, mock_get):
        mock_get.return_value = self.taxi
        response = self.client.get(f'/api/taxi/{self.taxi.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    @patch('taxi_backend.views.Taxi.objects.get')
    @patch('taxi_backend.views.Taxi.objects.update')
    def test_update_taxi(self, mock_update, mock_get):
        mock_get.return_value = self.taxi
        response = self.client.put(f'/api/taxi/{self.taxi.id}/', data=self.taxi_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    @patch('taxi_backend.views.Taxi.objects.get')
    @patch('taxi_backend.views.Taxi.objects.delete')
    def test_delete_taxi(self, mock_delete, mock_get):
        mock_get.return_value = self.taxi
        response = self.client.delete(f'/api/taxi/{self.taxi.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
