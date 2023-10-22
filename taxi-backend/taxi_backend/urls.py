from django.contrib import admin
from django.urls import path

from . import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path(
        "get-taxi-data/",
        views.get_taxi_data_from_simulator,
        name="get_taxi_data_from_simulator",
    ),
]
