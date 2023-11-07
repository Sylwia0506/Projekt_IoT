from django.http import JsonResponse

from .models import TaxiTimestamp


def save_taxi_data(request):
    payload = json.loads(request.body.decode("utf-8"))
    taxi_data = TaxiTimestamp(
        location=payload.get("Lokalizacja", "N/A"),
        status=payload.get("Stan", "N/A"),
        timestamp=payload.get("Timestamp", "N/A"),
        fuel_consumption=payload.get("Spalanie", "N/A"),
        course_id=payload.get("ID Kursu", "N/A"),
        speed=payload.get("Predkosc", "N/A"),
        driver_id=payload.get("ID Kierowcy", "N/A"),
    )
    taxi_data.save()
    return JsonResponse({"message": "Data saved successfully."})


def on_message(client, userdata, message):
    payload = json.loads(message.payload.decode())

    taxi_data = {
        "location": payload.get("Lokalizacja", "N/A"),
        "status": payload.get("Stan", "N/A"),
        "timestamp": payload.get("Timestamp", "N/A"),
        "fuel_consumption": payload.get("Spalanie", "N/A"),
        "course_id": payload.get("ID Kursu", "N/A"),
        "speed": payload.get("Predkosc", "N/A"),
        "driver_id": payload.get("ID Kierowcy", "N/A"),
    }
    taxi_data_model = TaxiTimestamp(**taxi_data)
    taxi_data_model.save()
