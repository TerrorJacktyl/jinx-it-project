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
        # Python is stupid and will try to calculate the value for self.instance.number
        # if it is used as the default value in dict.get. However, it may sometimes fail!
        # This is why we need to use a if else statement.
        if 'number' in attrs:
            number = attrs.get('number')
        else:
            number = self.instance.number
        validators.number_in_range(number, siblings)
        return attrs

    def to_internal_value(self, data: dict):
        val = super().to_internal_value(data)
        val['portfolio'] = models.Portfolio.objects.get(
            pk=self.context['portfolio_id'])
        return val

    def update(self, instance, validated_data):
        # update the ordering later
        number = validated_data.pop('number', None)

        # update the other fields
        super().update(instance, validated_data)

        # move the item
        if number:
            models.Page.objects.move(instance, number)

        return instance


class PageOutputSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Page
        fields = ['id', 'name', 'number', 'sections']


class SectionSerializer(serializers.ModelSerializer):
    type = serializers.ReadOnlyField()

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
        if 'page' in attrs:
            page = attrs.get('page')
        else:
            page = self.instance.page
        if 'number' in attrs:
            number = attrs.get('number')
        else:
            number = self.instance.number
        siblings = len(models.Section.objects.filter(page=page))
        validators.number_in_range(number, siblings)
        return attrs

    def to_internal_value(self, data: dict):
        if 'page' not in data:
            data['page'] = self.context['page_id']
        return super().to_internal_value(data)


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
                {'type': 'this type does not exist'}
            ) from ex

    def to_internal_value(self, data):
        try:
            section_type = data['type']
        except KeyError as ex:
            raise serializers.ValidationError(
                {'type': 'this field is missing'}
            ) from ex
        try:
            serializer = self.get_serializer_map()[section_type]
            validated_data = serializer(
                context=self.context,
                partial=self.partial,
            ).to_internal_value(data)
        except KeyError as ex:
            raise serializers.ValidationError(
                {'type': 'this type does not exist'}
            ) from ex

        # validators strip keys that are not in the model, so add the type key back
        validated_data['type'] = section_type
        return validated_data

    def create(self, validated_data):
        # remove type as it is not a real fields on the model
        # trying to set the type will cause an error
        serializer = self.get_serializer_map()[validated_data.pop('type')]
        return serializer(context=self.context).create(validated_data)

    def update(self, instance, validated_data):
        validated_data.pop('type', None)
        # update the ordering later
        number = validated_data.pop('number', None)

        # update the other fields
        super().update(instance, validated_data)

        # move the item
        if number:
            models.Section.objects.move(instance, number)

        return instance


class TextSectionSerializer(SectionSerializer):
    class Meta(SectionSerializer.Meta):
        model = models.TextSection
        fields = SectionSerializer.Meta.fields + ['content']


class MediaSectionSerializer(SectionSerializer):
    class Meta(SectionSerializer.Meta):
        model = models.MediaSection
        fields = SectionSerializer.Meta.fields + ['media']
