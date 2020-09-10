from rest_framework import serializers
from .models import Portfolio, Page, TextSection, MediaSection, Section

# What is a serializer?
# They allows complex data such as querysets and model instances to
# be converted to native python datatypes. From there, the data can be
# easily rendered into JSON, XML, etc. to suit our needs


class PortfolioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Portfolio
        fields = ['id', 'owner', 'name', 'pages']


class PageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = ['id', 'name', 'number', 'sections']


class TextSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TextSection
        fields = ['id', 'name', 'number', 'content', 'type']


class MediaSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaSection
        fields = ['id', 'name', 'number', 'media', 'type']


class SectionSerializer(serializers.ModelSerializer):
    """
    Used to allow for serialization of both text and media sections in one view
    """
    class Meta:
        model = Section
        fields = ['id', 'name', 'number']

    # polymorphic section serializer based on this stack overflow question:
    # https://stackoverflow.com/q/19976202
    # https://www.django-rest-framework.org/api-guide/serializers/#overriding-serialization-and-deserialization-behavior
    def to_representation(self, instance):
        models = [MediaSection, TextSection]
        for model in models:
            if isinstance(instance, model):
                serializer = locals()[model.__name__ + 'Serializer']
                return serializer(instance, context=self.context).to_representation(instance)
        # use the default serialiser as a last resort
        return super().to_representation(instance)

    def to_internal_value(self, data):
        try:
            section_type = data['type']
        except KeyError as ex:
            raise serializers.ValidationError(
                'type is missing from section') from ex
        try:
            mapping = {'text': TextSectionSerializer,
                       'media': MediaSectionSerializer}
            return mapping[section_type](context=self.context).to_internal_value(data)
        except KeyError:
            return super().to_internal_value(data)
