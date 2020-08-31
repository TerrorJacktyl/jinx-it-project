"""jinx_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from sign_up import views

# Defines the URL for the resources that our frontend may want to access.
# By contacting this URL, the frontend can make calls to the RESTful API

router = routers.DefaultRouter(trailing_slash=False)
router.register(r'sign_up', views.SignUpView, 'sign_up')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
