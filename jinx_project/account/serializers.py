from rest_framework import serializers
from django.contrib.auth.models import User
from djoser.serializers import UserSerializer

from .models import Account


class AccountSerializer(serializers.HyperlinkedModelSerializer):
    # Serialize the associated user (rather than just returning the primary key for the account's user)
    user = UserSerializer()

    class Meta:
        model = Account
        fields = ['user']
        read_only_fields = ['user']
        depth = 1
