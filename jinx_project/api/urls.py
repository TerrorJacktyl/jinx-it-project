from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from rest_framework import routers

urlpatterns = [
    path('user/', include('account.urls')),
    path('portfolio/', include('portfolio.urls')),
]
