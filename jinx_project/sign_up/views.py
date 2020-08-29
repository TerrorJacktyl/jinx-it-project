from django.shortcuts import render
from rest_framework import viewsets
from .serializers import SignUpSerializer
from .models import SignUp

# The viewsets base class provides the implementation for CRUD operations
class SignUpView(viewsets.ModelViewSet):
  serializer_class = SignUpSerializer
  queryset = SignUp.objects.all()
