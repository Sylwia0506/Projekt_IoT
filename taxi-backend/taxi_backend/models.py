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
    registration = models.CharField(max_length=8, unique=True)
    vinNumber = models.CharField(max_length=17, unique=True, db_column='vin_number')
    seatCount = models.IntegerField(db_column='seat_count')
    isAvailable = models.BooleanField(db_column='is_available')
    class Meta:
        app_label = 'taxi_backend'


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
    class Meta:
        app_label = 'taxi_backend'


class Course(Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )
    startLatitude = models.FloatField(db_column='start_latitude')
    startLongitude = models.FloatField(db_column='start_longitude')
    endLatitude = models.FloatField(db_column='end_latitude')
    endLongitude = models.FloatField(db_column='end_longitude')
    passengerCount = models.IntegerField(db_column='passenger_count')
    taxi = models.ForeignKey(Taxi, on_delete=models.CASCADE)
    fare = models.FloatField()
    class Meta:
        app_label = 'taxi_backend'


class TaxiTimestamp(TimescaleModel):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )
    location = models.CharField(max_length=50)
    status = models.CharField(max_length=50)
    timestamp = models.DateTimeField()
    fuelConsumption = models.FloatField(db_column='fuel_consumption')
    speed = models.FloatField()
    latitude = models.FloatField()
    longitude = models.FloatField()
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    driver = models.ForeignKey(Driver, on_delete=models.CASCADE)
    class Meta:
        app_label = 'taxi_backend'

