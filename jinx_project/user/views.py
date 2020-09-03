from django.shortcuts import render
from rest_framework import viewsets
from .serializers import UserSerializer
from .models import User

# The viewsets base class provides the implementation for CRUD operations
class UserView(viewsets.ModelViewSet):
  serializer_class = UserSerializer
  queryset = User.objects.all()
