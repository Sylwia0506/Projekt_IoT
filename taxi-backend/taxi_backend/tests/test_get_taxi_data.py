from django.test import TestCase
from django.urls import reverse


class TaxiEndpointTest(TestCase):
    def test_taxi_endpoint_response(self):
        url = reverse("get_taxi_data_from_simulator")

        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)

        expected_data = {
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
        self.assertJSONEqual(str(response.content, encoding="utf-8"), expected_data)
