import uuid
from django.test import TestCase
from django.core.validators import (
    MaxValueValidator,
    MinValueValidator,
    MinLengthValidator,
    MaxLengthValidator,
)
from taxi_backend.models import Taxi, Driver, Course, TaxiTimestamp, MapTaxi
from django.db import models
from unittest.mock import patch


@patch("taxi_backend.models.TimescaleModel", autospec=True)
class TaxiModelTests(TestCase):
    def test_taxi_model(self, mock_timescale_model):
        taxi = Taxi(
            brand="Test Brand",
            model="Test Model",
            registration="Test Registration",
            vinNumber="Test VinNumber",
            seatCount=4,
            isAvailable=True,
        )
        taxi.save()

        saved_taxi = Taxi.objects.get(pk=taxi.id)
        self.assertEqual(saved_taxi.brand, "Test Brand")
        self.assertEqual(saved_taxi.model, "Test Model")
        self.assertEqual(saved_taxi.registration, "Test Registration")
        self.assertEqual(saved_taxi.vinNumber, "Test VinNumber")
        self.assertEqual(saved_taxi.seatCount, 4)
        self.assertTrue(saved_taxi.isAvailable)
