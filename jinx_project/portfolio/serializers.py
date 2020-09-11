from rest_framework import serializers

from . import models

# What is a serializer?
# They allows complex data such as querysets and model instances to
# be converted to native python datatypes. From there, the data can be
# easily rendered into JSON, XML, etc. to suit our needs


class PortfolioSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Portfolio
        fields = ['id', 'owner', 'name', 'pages']


class PageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Page
        fields = ['id', 'name', 'number', 'sections']


class TextSectionSerializer(serializers.ModelSerializer):
    type = serializers.ReadOnlyField()

    class Meta:
        model = models.TextSection
        fields = ['id', 'name', 'number', 'content', 'type']


class MediaSectionSerializer(serializers.ModelSerializer):
    type = serializers.ReadOnlyField()

    class Meta:
        model = models.MediaSection
        fields = ['id', 'name', 'number', 'media', 'type']


class SectionSerializer(serializers.ModelSerializer):
    """
    Used to allow for serialization of both text and media sections in one view
    """

    type = serializers.ReadOnlyField()

    class Meta:
        model = models.Section
        fields = ['id', 'name', 'number', 'type']

    # polymorphic section serializer based on this stack overflow question:
    # https://stackoverflow.com/q/19976202
    # https://www.django-rest-framework.org/api-guide/serializers/#overriding-serialization-and-deserialization-behavior

    def get_serializer_map(self):
        return {
            'text': TextSectionSerializer,
            'media': MediaSectionSerializer,
        }

    def to_representation(self, instance):
        try:
            serializer = self.get_serializer_map()[instance.type]
            return serializer(instance, context=self.context).to_representation(instance)
        except KeyError:
            return super().to_representation(instance)

    def to_internal_value(self, data):
        try:
            section_type = data['type']
        except KeyError as ex:
            raise serializers.ValidationError(
                'type is missing from section') from ex
        try:
            serializer = self.get_serializer_map()[section_type]
            validated_data = serializer(
                context=self.context).to_internal_value(data)
        except KeyError:
            validated_data = super().to_internal_value(data)

        # validators strip keys that are not in the model, so add the type key back
        # TODO: validate the type key
        validated_data['type'] = section_type
        return validated_data

    def create(self, validated_data):
        serializer = self.get_serializer_map()[validated_data.pop('type')]
        return serializer(context=self.context).create(validated_data)
