from django.http import JsonResponse
import json
from datetime import datetime
import django
django.setup()
from drf_yasg.utils import swagger_auto_schema
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import TaxiTimestamp
from .models import Taxi, Course
from .serializers import TaxiSerializer
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics



@transaction.atomic
def save_taxi_data(request):
    if request.method == 'POST':
        try:
            payload = json.loads(request.body.decode("utf-8"))
            taxi_data = {
                "location": payload.get("Lokalizacja", "N/A"),
                "status": payload.get("Stan", "N/A"),
                "timestamp": datetime.fromtimestamp(payload.get("Timestamp", "N/A")),
                "fuelConsumption": payload.get("Spalanie", "N/A"),
                "course_id": payload.get("ID Kursu", "N/A"),
                "speed": payload.get("Predkosc", "N/A"),
                "driver_id": payload.get("ID Kierowcy", "N/A"),
            }

            with transaction.atomic():
                taxi_data_model = TaxiTimestamp.objects.create(**taxi_data)

            return JsonResponse({"message": "Data saved successfully."})
        except json.JSONDecodeError as e:
            return JsonResponse({"error": f"Invalid JSON data: {str(e)}"}, status=400)
        except Exception as e:
            return JsonResponse({"error": f"An error occurred: {str(e)}"}, status=500)
    else:
        return JsonResponse({"error": "Invalid request method. Use POST."}, status=400)


def on_message(client, userdata, message):
    payload = json.loads(message.payload.decode())

    taxi_data = {
        "location": payload.get("Lokalizacja", "N/A"),
        "status": payload.get("Stan", "N/A"),
        "timestamp": datetime.fromtimestamp(payload.get("Timestamp", "N/A")),
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
            'id': request.data.get('id'),
            'brand': request.data.get('brand'),
            'model': request.data.get('model'),
            'registration': request.data.get('registration'),
            'vinNumber': request.data.get('vinNumber'),
            'seatCount': request.data.get('seatCount'),
            'isAvailable': request.data.get('isAvailable'),
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
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = TaxiSerializer(taxi_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(request_body=TaxiSerializer)
    def put(self, request, taxi_id, *args, **kwargs):
        taxi_instance = self.get_object(taxi_id)
        if not taxi_instance:
            return Response(
                {"res": "Object with taxi id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )
        data = {
            'id': request.data.get('id'),
            'brand': request.data.get('brand'),
            'model': request.data.get('model'),
            'registration': request.data.get('registration'),
            'vinNumber': request.data.get('vinNumber'),
            'seatCount': request.data.get('seatCount'),
            'isAvailable': request.data.get('isAvailable'),
        }
        serializer = TaxiSerializer(instance = taxi_instance, data=data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, taxi_id, *args, **kwargs):
        taxi_instance = self.get_object(taxi_id)
        if not taxi_instance:
            return Response(
                {"res": "Object with taxi id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )
        taxi_instance.delete()
        return Response(
            {"res": "Object deleted!"},
            status=status.HTTP_200_OK
        )


class TaxiListCreateView(generics.ListCreateAPIView):
    queryset = Taxi.objects.all()
    serializer_class = TaxiSerializer

class TaxiDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Taxi.objects.all()
    serializer_class = TaxiSerializer

class CourseListCreateView(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class CourseDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer