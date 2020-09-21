from rest_framework import serializers


def number_in_range(value, length):
    if value < 0:
        raise serializers.ValidationError('Number cannot be negative.')
    if value > length:
        raise serializers.ValidationError('Number exceeds count of siblings.')
