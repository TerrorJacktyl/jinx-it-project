from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

from rest_framework import generics
from rest_framework import permissions

from common.permissions import IsReadOnly

from .serializers import AccountSerializer
from .models import Account
from .permissions import IsAccountOwner
from .swagger import AccountAutoSchema


class AccountList(generics.ListAPIView):
    serializer_class = AccountSerializer
    permission_classes = [permissions.AllowAny]
    queryset = Account.objects.all()
    swagger_schema = AccountAutoSchema


class AccountDetail(generics.RetrieveUpdateAPIView):
    serializer_class = AccountSerializer
    # anyone can see account details, but only the owner can update them
    permission_classes = [IsAccountOwner | IsReadOnly]
    queryset = Account.objects.all()

    def get_object(self):
        account_id = self.kwargs.get('account_id')
        if account_id == 'me':
            obj = get_object_or_404(self.queryset, user=self.request.user)
        else:
            obj = get_object_or_404(self.queryset, id=account_id)

        self.check_object_permissions(self.request, obj)
        return obj

    swagger_schema = AccountAutoSchema
