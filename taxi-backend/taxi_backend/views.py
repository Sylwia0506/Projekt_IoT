from django.http import JsonResponse


def get_taxi_data_from_simulator(request):
    # TODO: replacement with data from the simulator
    data = {
        "taxi1": {
            "model": "ABC123",
            "driver": "John Doe",
            "location": "City Center",
        },
        "taxi2": {
            "model": "XYZ789",
            "driver": "Jane Smith",
            "location": "Airport",
        },
    }
    return JsonResponse(data)
