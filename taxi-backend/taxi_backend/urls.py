from django.contrib import admin
from django.urls import path, include
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
    path("save-taxi-data/", views.save_taxi_data, name='save_taxi_data'),
    path('api/', include('rest_framework.urls')),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('taxi', views.TaxiListApiView.as_view()),
    path('taxi/<int:taxi_id>', views.TaxiDetailApiView.as_view()),
]
