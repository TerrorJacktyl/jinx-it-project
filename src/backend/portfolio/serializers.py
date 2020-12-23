import copy

from rest_framework import serializers

from . import models
from . import validators

# What is a serializer?
# They allows complex data such as querysets and model instances to
# be converted to native python datatypes. From there, the data can be
# easily rendered into JSON, XML, etc. to suit our needs


class LinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Link
        fields = ['id', 'icon', 'address', 'title', 'number']
        extra_kwargs = {
            'id': {'validators': []},
        }


class PageLinkSerializer(serializers.ListSerializer):
    link = LinkSerializer()

    class Meta:
        model = models.PageLink
        fields = ['page', 'link']

    def update(self, instance, validated_data):
        link_mapping = {page_link.link.id: page_link for page_link in instance}
        return LinkAssociationUpdate(self, validated_data, link_mapping)


class SectionLinkSerializer(serializers.ListSerializer):
    link = LinkSerializer()

    class Meta:
        model = models.SectionLink
        fields = ['section', 'link']

    def update(self, instance, validated_data):
        link_mapping = {page_link.link.id: page_link for page_link in instance}
        return LinkAssociationUpdate(self, validated_data, link_mapping)


class PortfolioLinkSerializer(serializers.ListSerializer):
    link = LinkSerializer()

    class Meta:
        model = models.PortfolioLink
        fields = ['portfolio', 'link']
    
    def update(self, instance, validated_data):
        link_mapping = {portfolio_link.link.id: portfolio_link for portfolio_link in instance}
        return LinkAssociationUpdate(self, validated_data, link_mapping)

def LinkAssociationUpdate(serializer, validated_data, instance_mapping):
    ret = []
    for data in validated_data:
        this_link = data['link']
        this_id = this_link['id']
        existing_link = instance_mapping.get(this_id, None)
        if existing_link is None:
            ret.append(serializer.child.create(data))
        else:
            ret.append(serializer.child.update(existing_link, data))

    # Perform deletions
    updated_ids = [x.link.id for x in ret]
    for link_id, link in instance_mapping.items():
        if link_id not in updated_ids:
            link.link.delete()
            link.delete()
    return ret


class PageLinkDetailSerializer(serializers.ModelSerializer):
    link = LinkSerializer()
    # link = serializers.CharField()

    class Meta:
        list_serializer_class = PageLinkSerializer
        model = models.PageLink
        fields = ['page', 'link']

    def create(self, validated_data):
        # Store the data for the link seperately
        owner = validated_data.pop('owner')
        links_data = validated_data.pop('link')
        if links_data:
            link = models.Link.objects.create(owner=owner, **links_data)
        # Create a new PageLink model that connects to the
        # newly created Link model
        page_link = models.PageLink.objects.create(
            link=link,
            **validated_data
        )
        # Return the nested JSON data
        return page_link

    def update(self, instance, validated_data):
        return association_link_detail_update(instance, validated_data)


class SectionLinkDetailSerializer(serializers.ModelSerializer):
    link = LinkSerializer()

    class Meta:
        list_serializer_class = SectionLinkSerializer
        model = models.SectionLink
        fields = ['section', 'link']

    def create(self, validated_data):
        owner = validated_data.pop('owner')
        links_data = validated_data.pop('link')

        if links_data:
            link = models.Link.objects.create(owner=owner, **links_data)

        section_link = models.SectionLink.objects.create(
            link=link,
            **validated_data
        )

        return section_link

    def update(self, instance, validated_data):
        return association_link_detail_update(instance, validated_data)


class PortfolioLinkDetailSerializer(serializers.ModelSerializer):
    link = LinkSerializer()

    class Meta:
        list_serializer_class = PortfolioLinkSerializer
        model = models.PortfolioLink
        fields = ['portfolio', 'link']

    def create(self, validated_data):
        owner = validated_data.pop('owner')
        links_data = validated_data.pop('link')

        if links_data:
            link = models.Link.objects.create(owner=owner, **links_data)

        portfolio_link = models.PortfolioLink.objects.create(
            link=link,
            **validated_data
        )

        return portfolio_link

    def update(self, instance, validated_data):
        return association_link_detail_update(instance, validated_data)


def association_link_detail_update(instance, validated_data):
    new_link = validated_data.pop('link')
    for key, value in new_link.items():
        setattr(instance.link, key, value)

    instance.link.save()
    return instance


class PortfolioInputSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Portfolio
        fields = ['id', 'name', 'private', 'theme', 'background']


class PortfolioOutputSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Portfolio
        fields = ['id', 'owner', 'name', 'pages', 'private', 'theme', 'background']


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
        # This causes problems for asynchronous updates
        # validators.number_in_range(number, siblings)
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
        if number is not None:
            models.Page.objects.move(instance, number)

        return instance


class PageOutputSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Page
        fields = ['id', 'name', 'number', 'sections', 'links']


class SectionSerializer(serializers.ModelSerializer):
    
    links = SectionLinkDetailSerializer(many=True, read_only=True)


    type = serializers.ReadOnlyField()
    # add id explicitly for it to be avaliable in the list serialiser
    id = serializers.IntegerField(required=False)

    
    class Meta:
        model = models.Section
        fields = ['id', 'name', 'type', 'number', 'page', 'links']
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
        # skip number validation if the section is in a list
        if self.context.get('in_list', False):
            return attrs

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
            data['page'] = self.context['page']
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
            'image': ImageSectionSerializer,
            'image_text' : ImageTextSectionSerializer,
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
        if self.instance:
            section_type = self.instance.type
        else:
            try:
                section_type = data['type']
            except KeyError as ex:
                raise serializers.ValidationError(
                    {'type': 'this field is missing'}
                ) from ex
        try:
            serializer = self.get_serializer_map()[section_type]
        except KeyError as ex:
            raise serializers.ValidationError(
                {'type': 'this type does not exist'}
            ) from ex
        validated_data = serializer(
            context=self.context,
            partial=self.partial,
        ).to_internal_value(data)

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
        if number is not None:
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

class ImageInputSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Image
        fields = ['id', 'name', 'path']

class ImageOutputSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Image
        fields = ['id', 'owner', 'name', 'path']

class ImageSectionSerializer(SectionSerializer):
    path = serializers.ImageField(source='image.path', read_only = True)
    class Meta(SectionSerializer.Meta):
        model = models.ImageSection
        fields = SectionSerializer.Meta.fields + ['image', 'path']
        
class ImageTextSectionSerializer(SectionSerializer):
    path = serializers.ImageField(source='image.path', read_only = True)
    class Meta(SectionSerializer.Meta):
        model = models.ImageTextSection
        fields = SectionSerializer.Meta.fields + ['image', 'content', 'path']

