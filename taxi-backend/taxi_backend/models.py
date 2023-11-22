import uuid

from django.db import models
from django.db.models import Model
from timescale.db.models.models import TimescaleModel
from django.core.validators import MaxValueValidator, MinValueValidator, MinLengthValidator, MaxLengthValidator

class Taxi(Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )
    brand = models.CharField(validators=[MaxLengthValidator(50)])
    model = models.CharField(validators=[MaxLengthValidator(50)])
    registration = models.CharField(validators=[MinLengthValidator(4), MaxLengthValidator(8)], unique=True)
    vinNumber = models.CharField(validators=[MinLengthValidator(17), MaxLengthValidator(17)], unique=True, db_column='vin_number')
    seatCount = models.IntegerField(db_column='seat_count', validators=[MinValueValidator(1)])
    isAvailable = models.BooleanField(db_column='is_available')
    class Meta:
        app_label = 'taxi_backend'


class Driver(Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )
    name = models.CharField(validators=[MaxLengthValidator(50)])
    surname = models.CharField(validators=[MaxLengthValidator(50)])
    email = models.EmailField()
    phone = models.CharField(validators=[MaxLengthValidator(50)])
    class Meta:
        app_label = 'taxi_backend'


class Course(Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )
    startLatitude = models.FloatField(db_column='start_latitude', validators=[MinValueValidator(-90.0), MaxValueValidator(90.0)])
    startLongitude = models.FloatField(db_column='start_longitude', validators=[MinValueValidator(-180.0), MaxValueValidator(180.0)])
    endLatitude = models.FloatField(db_column='end_latitude', validators=[MinValueValidator(-90.0), MaxValueValidator(90.0)])
    endLongitude = models.FloatField(db_column='end_longitude', validators=[MinValueValidator(-180.0), MaxValueValidator(180.0)])
    passengerCount = models.IntegerField(db_column='passenger_count', validators=[MinValueValidator(1)])
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
    location = models.CharField(validators=[MaxLengthValidator(50)])
    status = models.CharField(validators=[MaxLengthValidator(50)])
    timestamp = models.DateTimeField()
    fuelConsumption = models.FloatField(db_column='fuel_consumption', validators=[MinValueValidator(0.0)])
    speed = models.FloatField(validators=[MinValueValidator(0.0)])
    latitude = models.FloatField(validators=[MinValueValidator(-90.0), MaxValueValidator(90.0)])
    longitude = models.FloatField(validators=[MinValueValidator(-180.0), MaxValueValidator(180.0)])
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    driver = models.ForeignKey(Driver, on_delete=models.CASCADE)
    class Meta:
        app_label = 'taxi_backend'

