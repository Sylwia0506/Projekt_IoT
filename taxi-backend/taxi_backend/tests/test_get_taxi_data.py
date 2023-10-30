import requests

# Replace this URL with the actual URL of your Django API endpoint
api_url = "http://localhost:8000/get-taxi-data/"


def test_get_taxi_data():
    response = requests.get(api_url)

    if response.status_code == 200:
        data = response.json()
        print("Taxi Data:")
        print("Model:", data.get("model"))
        print("Driver:", data.get("driver"))
        print("Location:", data.get("location"))
        breakpoint()
    else:
        print("Failed to retrieve taxi data. Status code:", response.status_code)


if __name__ == "__main__":
    test_get_taxi_data()
