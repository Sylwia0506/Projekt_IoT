from django.contrib import admin
from django.urls import path, include
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from .views import TaxiListCreateView, TaxiDetailView, CourseListCreateView, CourseDetailView, save_taxi_data

schema_view = get_schema_view(
   openapi.Info(
      title="Taxi Backend API",
      default_version='v1',
   )
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("save-taxi-data/", save_taxi_data, name='save_taxi_data'),
    path('api/', include('rest_framework.urls')),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('taxi/', TaxiListCreateView.as_view(), name='taxi-list-create'),
    path('api/taxi/<uuid:pk>/', TaxiDetailView.as_view(), name='taxi-detail'),
    path('api/course/', CourseListCreateView.as_view(), name='course-list-create'),
    path('api/course/<uuid:pk>/', CourseDetailView.as_view(), name='course-detail'),
]
