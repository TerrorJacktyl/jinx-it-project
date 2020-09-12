from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from django.conf import settings


urlpatterns = [
    path('accounts/', include('account.urls')),
    path('', include('portfolio.urls')),
]

if settings.DEBUG:
    urlpatterns += [
        path('dev-login/', include('rest_framework.urls')),
    ]