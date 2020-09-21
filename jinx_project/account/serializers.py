from rest_framework import serializers
from django.contrib.auth.models import User
from djoser.serializers import UserSerializer

from .models import Account


class AccountSerializer(serializers.HyperlinkedModelSerializer):
    # Serialize the associated user (rather than just returning the primary key for the account's user)
    user = UserSerializer(read_only=True)
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')

    class Meta:
        model = Account
        fields = ['user', 'first_name', 'last_name']
        depth = 1

    def update(self, instance, validated_data):
        instance.user.first_name = (
            validated_data
            .get('user', {})
            .get('first_name', instance.user.first_name)
        )
        instance.user.last_name = (
            validated_data
            .get('user', {})
            .get('last_name', instance.user.last_name)
        )
        instance.user.save()
        return instance
