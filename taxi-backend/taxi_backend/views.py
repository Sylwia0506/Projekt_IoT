from django.http import JsonResponse
from django.db.models import Max
from django.db.models import F
import json
import pytz
from datetime import datetime
import django

django.setup()
from drf_yasg.utils import swagger_auto_schema
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Taxi, TaxiTimestamp, Course, Driver, MapTaxi
from .serializers import TaxiSerializer, CourseSerializer, MapTaxiSerializer


def on_message(client, userdata, message):
    payload = json.loads(message.payload.decode())
    taxi_data = {
        "latitude": payload.get("latitude", "N/A"),
        "longitude": payload.get("longitude", "N/A"),
        "status": payload.get("Stan", "N/A"),
        "time": datetime.fromtimestamp(payload.get("Timestamp", "N/A"), tz=pytz.UTC),
        "fuelConsumption": payload.get("Spalanie", "N/A"),
        "course_id": payload.get("ID Kursu", "N/A"),
        "speed": payload.get("Predkosc", "N/A"),
        "driver_id": payload.get("ID Kierowcy", "N/A"),
    }
    taxi_data_model = TaxiTimestamp(**taxi_data)
    taxi_data_model.save()


class TaxiListApiView(APIView):
    def get(self, request, *args, **kwargs):
        taxiList = Taxi.objects
        serializer = TaxiSerializer(taxiList, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(request_body=TaxiSerializer)
    def post(self, request, *args, **kwargs):
        data = {
            "id": request.data.get("id"),
            "brand": request.data.get("brand"),
            "model": request.data.get("model"),
            "registration": request.data.get("registration"),
            "vinNumber": request.data.get("vinNumber"),
            "seatCount": request.data.get("seatCount"),
            "isAvailable": request.data.get("isAvailable"),
        }
        serializer = TaxiSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TaxiDetailApiView(APIView):
    def get_object(self, taxi_id):
        try:
            return Taxi.objects.get(id=taxi_id)
        except Taxi.DoesNotExist:
            return None

    def get(self, request, taxi_id, *args, **kwargs):
        taxi_instance = self.get_object(taxi_id)
        if not taxi_instance:
            return Response(
                {"res": "Object with taxi id does not exists"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = TaxiSerializer(taxi_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(request_body=TaxiSerializer)
    def put(self, request, taxi_id, *args, **kwargs):
        taxi_instance = self.get_object(taxi_id)
        if not taxi_instance:
            return Response(
                {"res": "Object with taxi id does not exists"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        data = {
            "id": request.data.get("id"),
            "brand": request.data.get("brand"),
            "model": request.data.get("model"),
            "registration": request.data.get("registration"),
            "vinNumber": request.data.get("vinNumber"),
            "seatCount": request.data.get("seatCount"),
            "isAvailable": request.data.get("isAvailable"),
        }
        serializer = TaxiSerializer(instance=taxi_instance, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, taxi_id, *args, **kwargs):
        taxi_instance = self.get_object(taxi_id)
        if not taxi_instance:
            return Response(
                {"res": "Object with taxi id does not exists"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        taxi_instance.delete()
        return Response({"res": "Object deleted!"}, status=status.HTTP_200_OK)


class CourseListApiView(APIView):
    def get(self, request, *args, **kwargs):
        courseList = Course.objects
        serializer = CourseSerializer(courseList, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(request_body=CourseSerializer)
    def post(self, request, *args, **kwargs):
        data = {
            "id": request.data.get("id"),
            "startLatitude": request.data.get("startLatitude"),
            "startLongitude": request.data.get("startLongitude"),
            "endLatitude": request.data.get("endLatitude"),
            "endLongitude": request.data.get("endLongitude"),
            "passengerCount": request.data.get("passengerCount"),
            "taxi": request.data.get("taxi"),
            "fare": request.data.get("fare"),
        }
        serializer = CourseSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CourseDetailApiView(APIView):
    def get_object(self, course_id):
        try:
            return Course.objects.get(id=course_id)
        except Course.DoesNotExist:
            return None

    def get(self, request, course_id, *args, **kwargs):
        course_instance = self.get_object(course_id)
        if not course_instance:
            return Response(
                {"res": "Object with course id does not exists"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = CourseSerializer(course_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(request_body=CourseSerializer)
    def put(self, request, course_id, *args, **kwargs):
        course_instance = self.get_object(course_id)
        if not course_instance:
            return Response(
                {"res": "Object with course id does not exists"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        data = {
            "id": request.data.get("id"),
            "startLatitude": request.data.get("startLatitude"),
            "startLongitude": request.data.get("startLongitude"),
            "endLatitude": request.data.get("endLatitude"),
            "endLongitude": request.data.get("endLongitude"),
            "passengerCount": request.data.get("passengerCount"),
            "taxi": request.data.get("taxi"),
            "fare": request.data.get("fare"),
        }
        serializer = CourseSerializer(instance=course_instance, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, course_id, *args, **kwargs):
        course_instance = self.get_object(course_id)
        if not course_instance:
            return Response(
                {"res": "Object with course id does not exists"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        course_instance.delete()
        return Response({"res": "Object deleted!"}, status=status.HTTP_200_OK)


class MapTaxiListApiView(APIView):
    def get(self, request, *args, **kwargs):
        timestamps = (
            TaxiTimestamp.objects.values_list("course", "driver")
            .annotate(maxTime=Max("time"))
            .all()
        )
        mapTaxiList = []
        for ts in timestamps:
            timestamp = (
                TaxiTimestamp.objects.filter(course=ts[0]).filter(time=ts[2]).first()
            )
            course = Course.objects.filter(id=ts[0]).select_related("taxi").first()
            driver = Driver.objects.filter(id=ts[1]).first()
            mapTaxiList.append(MapTaxi(course, driver, timestamp))

        serializer = MapTaxiSerializer(mapTaxiList, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
