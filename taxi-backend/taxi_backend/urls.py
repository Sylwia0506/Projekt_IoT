from django.contrib import admin
from django.urls import path

from . import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path('save-taxi-data/', views.save_taxi_data, name='save_taxi_data'),
]
