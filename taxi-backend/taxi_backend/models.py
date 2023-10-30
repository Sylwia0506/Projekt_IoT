import uuid

from django.db import models
from django.db.models import Model
from timescale.db.models.models import TimescaleModel


class Taxi(Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )
    brand = models.CharField(max_length=50)
    model = models.CharField(max_length=50)
    registration = models.CharField(max_length=50)
    vinNumber = models.CharField(max_length=50)
    seatCount = models.IntegerField()
    isAvailable = models.BooleanField()


class Driver(Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )
    name = models.CharField(max_length=50)
    surname = models.CharField(max_length=50)
    email = models.EmailField()
    phone = models.CharField(max_length=50)


class Track(Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )
    startLatitude = models.FloatField()
    startLongitude = models.FloatField()
    endLatitude = models.FloatField()
    endLongitude = models.FloatField()
    passengerCount = models.IntegerField()
    taxiId = models.ForeignKey(Taxi, on_delete=models.CASCADE)
    fare = models.FloatField()


class TaxiTimestamp(TimescaleModel):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )
    latitude = models.FloatField()
    longitude = models.FloatField()
    fuelUsage = models.FloatField()
    trackId = models.ForeignKey(Track, on_delete=models.CASCADE)
    velocity = models.FloatField()
    driverId = models.ForeignKey(Driver, on_delete=models.CASCADE)


class TaxiData(models.Model):
    lokalizacja = models.CharField(max_length=255)
    stan = models.CharField(max_length=255)
    id = models.CharField(max_length=255)
    timestamp = models.IntegerField()
    spalanie = models.CharField(max_length=255)
    id_kursu = models.CharField(max_length=255)
    predkosc = models.CharField(max_length=255)
    id_kierowcy = models.CharField(max_length=255)