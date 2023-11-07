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
    location = models.CharField(max_length=50)
    status = models.CharField(max_length=50)
    timestamp = models.DateTimeField()
    fuel_consumption = models.FloatField()
    course_id = models.UUIDField()
    speed = models.FloatField()
    driver_id = models.UUIDField()
    latitude = models.FloatField()
    longitude = models.FloatField()
    track = models.ForeignKey(Track, on_delete=models.CASCADE)
    velocity = models.FloatField()
    driver = models.ForeignKey(Driver, on_delete=models.CASCADE)

