import copy

from rest_framework import serializers

from . import models
from . import validators

# What is a serializer?
# They allows complex data such as querysets and model instances to
# be converted to native python datatypes. From there, the data can be
# easily rendered into JSON, XML, etc. to suit our needs


class PortfolioInputSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Portfolio
        fields = ['id', 'name']


class PortfolioOutputSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Portfolio
        fields = ['id', 'owner', 'name', 'pages']


class PageInputSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Page
        fields = ['id', 'name', 'number']

    def validate(self, attrs):
        siblings = len(models.Page.objects.filter(
            portfolio=attrs['portfolio']))
        validators.number_in_range(attrs['number'], siblings)
        return attrs

    def to_internal_value(self, data: dict):
        val = super().to_internal_value(data)
        val['portfolio'] = models.Portfolio.objects.get(
            pk=self.context['portfolio_id'])
        return val


class PageOutputSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Page
        fields = ['id', 'name', 'number', 'sections']


class SectionSerializer(serializers.ModelSerializer):
    type = serializers.ReadOnlyField()
    # add id explicitly for it to be avaliable in the list serialiser
    id = serializers.IntegerField(required=False)

    class Meta:
        model = models.Section
        fields = ['id', 'name', 'type', 'number', 'page']
        extra_kwargs = {
            # don't need to show the page as that can be inferred from the url
            'page': {'write_only': True},
        }

    def validate_page(self, value):
        # make sure the new page is owned by the user
        owner = value.owner
        if self.context['request'].user != owner:
            raise serializers.ValidationError('You do not own this page')
        return value

    def validate(self, attrs):
        siblings = len(models.Section.objects.filter(page=attrs['page']))
        validators.number_in_range(attrs['number'], siblings)
        return attrs

    def to_internal_value(self, data: dict):
        if 'page' not in data:
            data['page'] = self.context['page_id']
        return super().to_internal_value(data)


class SectionListSerializer(serializers.ListSerializer):

    def __init__(self, *args, **kwargs):
        self.child = kwargs.pop('child', copy.deepcopy(self.child))
        self.allow_empty = kwargs.pop('allow_empty', True)
        super(serializers.ListSerializer, self).__init__(*args, **kwargs)

    def create(self, validated_data):
        ret = []
        for i, attrs in enumerate(validated_data):
            ret.append(self.child.create(attrs))
        return ret

    # based on example from docs
    # https://www.django-rest-framework.org/api-guide/serializers/#listserializer
    def update(self, instance, validated_data):
        # Maps for id->instance and id->data item.
        section_mapping = {section.id: section for section in instance}

        # Perform creations and updates.
        ret = []
        for data in validated_data:
            section = section_mapping.get(data.pop('id', None), None)
            if section is None:
                ret.append(self.child.create(data))
            else:
                data.pop('type', None)
                ret.append(self.child.update(section, data))

        # Perform deletions.
        for section_id, section in section_mapping.items():
            if section_id not in map(lambda s: s.id, ret):
                section.delete()

        return ret


class PolymorphSectionSerializer(SectionSerializer):
    """
    Used to allow for serialization of both text and media sections in one view
    """
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
        except KeyError as ex:
            raise serializers.ValidationError(
                'Invalid type of section'
            ) from ex

    def to_internal_value(self, data):
        try:
            section_type = data['type']
        except KeyError as ex:
            raise serializers.ValidationError(
                'Type is missing from section'
            ) from ex
        try:
            serializer = self.get_serializer_map()[section_type]
        except KeyError as ex:
            raise serializers.ValidationError(
                'Invalid type of section'
            ) from ex
        validated_data = serializer(
            context=self.context).to_internal_value(data)

        # validators strip keys that are not in the model, so add the type key back
        validated_data['type'] = section_type
        return validated_data

    def create(self, validated_data):
        serializer = self.get_serializer_map()[validated_data.pop('type')]
        return serializer(context=self.context).create(validated_data)


class TextSectionSerializer(SectionSerializer):
    class Meta(SectionSerializer.Meta):
        model = models.TextSection
        fields = SectionSerializer.Meta.fields + ['content']


class MediaSectionSerializer(SectionSerializer):
    class Meta(SectionSerializer.Meta):
        model = models.MediaSection
        fields = SectionSerializer.Meta.fields + ['media']
