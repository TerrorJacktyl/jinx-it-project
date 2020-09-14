from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .serializers import AccountSerializer
from .models import Account
from .permissions import AccountOwner
from .swagger import AccountAutoSchema


class AccountDetail(generics.RetrieveUpdateAPIView):
    serializer_class = AccountSerializer
    permission_classes = [IsAuthenticated, AccountOwner]
    queryset = Account.objects.all()

    # can only see own account for now
    def get_object(self):
        obj = get_object_or_404(self.queryset, user=self.request.user)
        self.check_object_permissions(self.request, obj)
        return obj

    swagger_schema = AccountAutoSchema
