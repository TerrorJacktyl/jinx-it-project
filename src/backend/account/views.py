from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

from rest_framework import generics
from rest_framework import permissions
from rest_framework import exceptions

from common.permissions import IsReadOnly

from .serializers import AccountSerializer
from .models import Account
from .permissions import IsAccountOwner
from .swagger import AccountAutoSchema


class AccountList(generics.ListAPIView):
    serializer_class = AccountSerializer
    permission_classes = [permissions.AllowAny]
    swagger_schema = AccountAutoSchema

    def get_queryset(self):
        queryset = Account.objects.all()
        username = self.request.query_params.get('username', None)
        if username:
            queryset = queryset.filter(user__username=username)
        return queryset


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
            try:
                account_id = int(account_id)
            except ValueError as ve:
                raise exceptions.NotFound from ve

            obj = get_object_or_404(self.queryset, id=account_id)

        self.check_object_permissions(self.request, obj)
        return obj

    swagger_schema = AccountAutoSchema
