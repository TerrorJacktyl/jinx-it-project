from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from .serializers import UserSerializer, AccountSerializer
from .models import Account

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

# from django.shortcuts import render
# from rest_framework import viewsets
# from .serializers import UserSerializer
# from .models import User

# # The viewsets base class provides the implementation for CRUD operations
# class UserView(viewsets.ModelViewSet):
#   serializer_class = UserSerializer
#   queryset = User.objects.all()
