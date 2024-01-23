from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Course, Taxi
from .serializers import CourseSerializer, TaxiSerializer


class CourseListApiViewTestCase(TestCase):
    def setUp(self):
        self.course_list_url = reverse("course-list")
        self.taxi = Taxi.objects.create(
            brand="TestBrand",
            model="TestModel",
            registration="TestRegistration",
            vinNumber="TestVin",
            seatCount=4,
            isAvailable=True,
        )

    def test_get_course_list(self):
        response = self.client.get(self.course_list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_course(self):
        data = {
            "startLatitude": 0,
            "startLongitude": 0,
            "endLatitude": 1,
            "endLongitude": 1,
            "passengerCount": 2,
            "taxi": self.taxi.id,
            "fare": 10.0,
        }
        response = self.client.post(self.course_list_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_invalid_course(self):
        invalid_data = {
            "startLatitude": 0,
            "startLongitude": 0,
            "endLongitude": 1,
            "passengerCount": 2,
            "taxi": self.taxi.id,
            "fare": 10.0,
        }
        response = self.client.post(self.course_list_url, invalid_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class CourseDetailApiViewTestCase(TestCase):
    def setUp(self):
        self.taxi = Taxi.objects.create(
            brand="TestBrand",
            model="TestModel",
            registration="TestRegistration",
            vinNumber="TestVin",
            seatCount=4,
            isAvailable=True,
        )
        self.course = Course.objects.create(
            startLatitude=0,
            startLongitude=0,
            endLatitude=1,
            endLongitude=1,
            passengerCount=2,
            taxi=self.taxi,
            fare=10.0,
        )
        self.course_detail_url = reverse("course-detail", args=[self.course.id])

    def test_get_course_detail(self):
        response = self.client.get(self.course_detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_nonexistent_course_detail(self):
        nonexistent_course_detail_url = reverse("course-detail", args=[999])
        response = self.client.get(nonexistent_course_detail_url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_course(self):
        data = {
            "startLatitude": 0,
            "startLongitude": 0,
            "endLatitude": 1,
            "endLongitude": 1,
            "passengerCount": 3,
            "taxi": self.taxi.id,
            "fare": 15.0,
        }
        response = self.client.put(self.course_detail_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_nonexistent_course(self):
        nonexistent_course_detail_url = reverse("course-detail", args=[999])
        data = {
            "startLatitude": 0,
            "startLongitude": 0,
            "endLatitude": 1,
            "endLongitude": 1,
            "passengerCount": 3,
            "taxi": self.taxi.id,
            "fare": 15.0,
        }
        response = self.client.put(nonexistent_course_detail_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_delete_course(self):
        response = self.client.delete(self.course_detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_nonexistent_course(self):
        nonexistent_course_detail_url = reverse("course-detail", args=[999])
        response = self.client.delete(nonexistent_course_detail_url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
