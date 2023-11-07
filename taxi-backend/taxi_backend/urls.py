from django.contrib import admin
from django.urls import path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from . import views

schema_view = get_schema_view(
   openapi.Info(
      title="Taxi Backend API",
      default_version='v1',
   )
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path(
        "get-taxi-data/",
        views.get_taxi_data_from_simulator,
        name="get_taxi_data_from_simulator",
    ),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui')
]
