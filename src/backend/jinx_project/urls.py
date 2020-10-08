"""jinx_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/

"""

from pathlib import Path

from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from django.conf.urls.static import static
from django.conf import settings

import djoser.views
from rest_framework.routers import DefaultRouter

# For Swagger:
from django.conf.urls import url
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

# For Swagger:
swagger_desc = Path(__file__).resolve(strict=True).parent / 'swagger_desc.md'

schema_view = get_schema_view(
    openapi.Info(
        title="Jinx API",
        default_version='v1',
        description=open(swagger_desc).read()
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)


djoser_routes = DefaultRouter(trailing_slash=False)
djoser_routes.register('users', djoser.views.UserViewSet)


urlpatterns = [
    # Main site
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('auth/', include(djoser_routes.urls)),
    path('auth/token/login', djoser.views.TokenCreateView.as_view(), name='login'),
    path('auth/token/logout', djoser.views.TokenDestroyView.as_view(), name='logout'),
    # Swagger
    url(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    url(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    url(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]

if settings.DEBUG:
    urlpatterns += [
        path('api/dev-auth/', include('rest_framework.urls')),
    ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
