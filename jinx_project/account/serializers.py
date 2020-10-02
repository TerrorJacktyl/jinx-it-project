from rest_framework import serializers
from django.contrib.auth.models import User
from djoser.serializers import UserSerializer

from .models import Account


class AccountSerializer(serializers.ModelSerializer):
    # Serialize the associated user (rather than just returning the primary key for the account's user)
    user = UserSerializer(read_only=True)
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')

    class Meta:
        model = Account
        fields = ['user', 'first_name', 'last_name', 'primary_portfolio']

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
        # remove user key as we have already updated the user
        validated_data.pop('user')
        # update the rest of the fields
        super().update(instance, validated_data)
        return instance

    def validate_primary_portfolio(self, value):
        if value is not None and value.owner != self.instance.user:
            raise serializers.ValidationError('You do not own this portfolio')
        return value
