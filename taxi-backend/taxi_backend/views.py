# views.py
from django.http import JsonResponse
from .models import TaxiData  # Importuj model


def save_taxi_data(request):
    # Odbieranie danych MQTT i zapisywanie ich do bazy danych
    payload = json.loads(request.body.decode('utf-8'))
    taxi_data = TaxiData(
        lokalizacja=payload.get("Lokalizacja", "N/A"),
        stan=payload.get("Stan", "N/A"),
        id=payload.get("ID", "N/A"),
        timestamp=payload.get("Timestamp", "N/A"),
        spalanie=payload.get("Spalanie", "N/A"),
        id_kursu=payload.get("ID Kursu", "N/A"),
        predkosc=payload.get("Predkosc", "N/A"),
        id_kierowcy=payload.get("ID Kierowcy", "N/A"),
    )
    taxi_data.save()

    return JsonResponse({"message": "Dane zapisane poprawnie."})


# Odbieranie danych MQTT
def on_message(client, userdata, message):
    payload = json.loads(message.payload.decode())

    # Przekształć dane na potrzeby zapisu w bazie danych
    taxi_data = {
        "lokalizacja": payload.get("Lokalizacja", "N/A"),
        "stan": payload.get("Stan", "N/A"),
        "id": payload.get("ID", "N/A"),
        "timestamp": payload.get("Timestamp", "N/A"),
        "spalanie": payload.get("Spalanie", "N/A"),
        "id_kursu": payload.get("ID Kursu", "N/A"),
        "predkosc": payload.get("Predkosc", "N/A"),
        "id_kierowcy": payload.get("ID Kierowcy", "N/A"),
    }

    # Przykład zapisu danych do bazy danych w modelu Django
    taxi_data_model = TaxiData(**taxi_data)
    taxi_data_model.save()

mqtt_client = mqtt.Client()
mqtt_client.on_message = on_message

# Połącz się z brokerem MQTT
mqtt_client.connect("mqtt", 1883)  # Użyj odpowiednich parametrów

# Subskrybuj odpowiednią ścieżkę MQTT
topic = "uber/coords"  # Użyj odpowiedniej ścieżki
mqtt_client.subscribe(topic)

# Rozpocznij pętlę zdarzeń MQTT
mqtt_client.loop_start()
