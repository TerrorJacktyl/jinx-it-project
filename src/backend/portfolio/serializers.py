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
        return LinkAssociationUpdate(self.child, validated_data, link_mapping)


class SectionLinkSerializer(serializers.ListSerializer):
    link = LinkSerializer()

    class Meta:
        model = models.SectionLink
        fields = ['section', 'link']

    def update(self, instance, validated_data):
        link_mapping = {page_link.link.id: page_link for page_link in instance}
        return LinkAssociationUpdate(self.child, validated_data, link_mapping)


class PortfolioLinkSerializer(serializers.ListSerializer):
    link = LinkSerializer()

    class Meta:
        model = models.PortfolioLink
        fields = ['portfolio', 'link']
    
    def update(self, instance, validated_data):
        link_mapping = {portfolio_link.link.id: portfolio_link for portfolio_link in instance}
        return LinkAssociationUpdate(self.child, validated_data, link_mapping)

def LinkAssociationUpdate(child_serializer, validated_data, instance_mapping):
    ret = []
    for data in validated_data:
        this_link = data['link']
        this_id = this_link['id']
        existing_link = instance_mapping.get(this_id, None)
        if existing_link is None:
            ret.append(child_serializer.create(data))
        else:
            ret.append(child_serializer.update(existing_link, data))

    # Perform deletions
    updated_ids = [x.link.id for x in ret]
    for link_id, link in instance_mapping.items():
        if link_id not in updated_ids:
            link.link.delete()
            link.delete()
    return ret


class PageLinkDetailSerializer(serializers.ModelSerializer):
    link = LinkSerializer()

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


class SectionSerializer(serializers.ModelSerializer):
    
    links = SectionLinkDetailSerializer(many=True)


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
        # # skip number validation if the section is in a list
        # if self.context.get('in_list', False):
        #     return attrs

        # if 'page' in attrs:
        #     page = attrs.get('page')
        # else:
        #     page = self.instance.page
        # if 'number' in attrs:
        #     number = attrs.get('number')
        # else:
        #     number = self.instance.number
        # siblings = len(models.Section.objects.filter(page=page))
        # validators.number_in_range(number, siblings)


        # Page number sorting now done on client side.
        return attrs

    def to_internal_value(self, data: dict):
        if 'page' not in data:
            data['page'] = self.context['page']

        return data


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

        return sectionListUpdate(self.child, section_mapping, validated_data)


class PolymorphSectionSerializer(SectionSerializer):
    """
    Used to allow for serialization of both text and media sections in one view
    """
    # polymorphic section serializer based on this stack overflow question:
    # https://stackoverflow.com/q/19976202
    # https://www.django-rest-framework.org/api-guide/serializers/#overriding-serialization-and-deserialization-behavior

    links = SectionLinkDetailSerializer(many=True)

    def get_serializer_map(self):
        return {
            'text': TextSectionSerializer,
            'media': MediaSectionSerializer,
            'image': ImageSectionSerializer,
            'image_text' : ImageTextSectionSerializer,
        }

    def to_representation(self, instance):
        section_type = ''
        try:
            section_type = instance.type
        except KeyError:
            pass
        if section_type == '':
            try:
                section_type = self.context['type']
            except KeyError as ex:
                raise serializers.ValidationError(
                    {'type': 'this type does not exist'}
                ) from ex
        serializer = self.get_serializer_map()[section_type]
        return serializer(instance, context=self.context).to_representation(instance)

    def to_internal_value(self, data):
        # val = super().to_internal_value(data)

        section_type = ''
        if self.instance:
            try: 
                section_type = self.instance.type
            except KeyError:
                pass
        if section_type == '':
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
        
        if data['id'] > 0:
            self.context['page'] = data['id']

        serialized = serializer(
            context = self.context,
            partial = self.partial,
        )
        
        validated_data = serialized.to_internal_value(data)

        # validators strip keys that are not in the model, so add the type key back
        validated_data['type'] = section_type
        return validated_data

    def create(self, validated_data):
        # remove type as it is not a real fields on the model
        # trying to set the type will cause an error
        serializer = self.get_serializer_map()[validated_data.pop('type')]
        return serializer(context=self.context).create(validated_data)

    def update(self, instance, validated_data):
        self.context['type'] = validated_data.pop('type', None)
        # update the ordering later
        number = validated_data.pop('number', None)

        # update links seperately
        links = validated_data.pop('links', None)
        links_dict = [{
            'owner': instance.owner,
            'section': instance, 
            'link': dict(link)
            } for link in links]

        # page not needed for super update
        validated_data.pop('page', None)

        temp_super = super()

        # update the other fields
        super().update(instance, validated_data)

        # move the item
        if number is not None:
            models.Section.objects.move(instance, number)

        # get the existing link objects
        sectionObj = models.Section.objects.get(id=instance.id)
        sectionLinkInstances = sectionObj.links.all()

        # set up appropriate elements for LinkAssociationUpdate
        link_mapping = {sectionLink.link.id: sectionLink for sectionLink in sectionLinkInstances}
        child_serializer = SectionLinkDetailSerializer()

        link_instances = LinkAssociationUpdate(child_serializer, links_dict, link_mapping)

        for link_instance in link_instances:
            instance.links.add(link_instance)

        # instance.type = type
        return instance


class ImageInputSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Image
        fields = ['id', 'name', 'path']


class ImageOutputSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Image
        fields = ['id', 'owner', 'name', 'path']

class TextSectionSerializer(SectionSerializer):
    links = SectionLinkDetailSerializer(many=True)
    class Meta(SectionSerializer.Meta):
        model = models.TextSection
        fields = SectionSerializer.Meta.fields + ['content']

    def create(self, validated_data):
        return create_section(
            self.context,
            validated_data,
            self.fields.fields.keys(),
            models.TextSection
        )

class MediaSectionSerializer(SectionSerializer):
    links = SectionLinkDetailSerializer(many=True)
    class Meta(SectionSerializer.Meta):
        model = models.MediaSection
        fields = SectionSerializer.Meta.fields + ['media']
    
    def create(self, validated_data):
        return create_section(
            self.context,
            validated_data,
            self.fields.fields.keys(),
            models.MediaSection
        )

class ImageSectionSerializer(SectionSerializer):
    path = serializers.ImageField(source='image.path', read_only = True)
    image = ImageOutputSerializer(many=False, read_only=True)
    class Meta(SectionSerializer.Meta):
        model = models.ImageSection
        fields = SectionSerializer.Meta.fields + ['image', 'path']
    
    def create(self, validated_data):
        image_id = validated_data.pop('image')
        image_obj = models.Image.objects.get(id=image_id)
        validated_data['image'] = image_obj
        fields = list(self.fields.fields.keys())
        fields.remove('path')
        return create_section(
            self.context,
            validated_data,
            fields,
            models.ImageSection
        )

    def update(self, instance, validated_data):
        super.update(instance, validated_data)

        
class ImageTextSectionSerializer(SectionSerializer):
    path = serializers.ImageField(source='image.path', read_only = True)
    class Meta(SectionSerializer.Meta):
        model = models.ImageTextSection
        fields = SectionSerializer.Meta.fields + ['image', 'content', 'path']
    
    def create(self, validated_data):
        image_id = validated_data.pop('image')
        image_obj = models.Image.objects.get(id=image_id)
        validated_data['image'] = image_obj
        fields = list(self.fields.fields.keys())
        fields.remove('path')
        return create_section(
            self.context,
            validated_data,
            fields,
            models.ImageTextSection,
        )


def create_section(context, validated_data, fields, section_model):
    links = validated_data.pop('links', None)
    page_id = validated_data.pop('page', None)
    page_obj = models.Page.objects.get(id=page_id)

    # Get just the data required for creation of section
    section_data = {}
    for item in validated_data:
        if item in fields:
            section_data[item] = validated_data[item]

    # Create the section object
    section = section_model.objects.create(
        page=page_obj,
        **section_data
    )

    # Gather links information
    links_data = []
    for link in links:
        links_data.append(
            {
                'owner': context['owner'],
                'section': section,
                'link': link,
            }
        )

    # Create section link
    SectionLinkSerializer(
        context=context,
        child=SectionLinkDetailSerializer(),
    ).create(links_data)

    return section

class PageListInputSerializer(serializers.ListSerializer):
    sections = SectionListSerializer()

    class Meta:
        model = models.Page
        fields = ['id', 'name', 'number', 'sections']
    
    def update(self, instance, validated_data):
        number = validated_data.pop('number', None)

        super().update(instance, validated_data)

        # !!! Up to, haven't tried page list update yet
        
        page_mapping = {page.id: page for page in instance}
        return sectionListUpdate(self.child, page_mapping, validated_data)

        # return instance


class PageInputSerializer(serializers.ModelSerializer):
# class PageInputSerializer(WritableNestedModelSerializer):
    sections = PolymorphSectionSerializer(many=True)

    class Meta:
        model = models.Page
        fields = ['id', 'name', 'number', 'sections']

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

    def delete_unused_images(self, owner):
        user_images = models.Image.objects.filter(owner=owner)
        for user_image in user_images:
            image_id = user_image.id
            image_is_for_deletion = True
            try:
                models.ImageSection.objects.get(image_id=image_id)
                image_is_for_deletion = False
            except models.ImageSection.DoesNotExist:
                pass
            try:
                models.ImageTextSection.objects.get(image_id=image_id)
            except models.ImageTextSection.DoesNotExist:
                pass
            if image_is_for_deletion:
                user_image.delete()
    
    def create(self, validated_data):
        sections = validated_data.pop('sections')
        page = models.Page.objects.create(**validated_data)
        for section in sections:
            models.Section.objects.create(**section)
        return page

    def update(self, instance, validated_data):
        # update the ordering later
        number = validated_data.pop('number', None)
        # update sections seperately
        sections = validated_data.pop('sections', None)

        # # update the other fields
        super().update(instance, validated_data)

        # move the item
        if number is not None:
            models.Page.objects.move(instance, number)
        
        # get the existing section objects
        pageObj = models.Page.objects.get(id=instance.id)
        sectionInstances = pageObj.sections.all()


        if sections:
            # set up appropriate elements for sectionListUpdate function
            sections_dict = [dict(section) for section in sections]
            section_mapping = {section.id: section for section in sectionInstances}
            context = self.context
            context['in_list'] = True
            context['owner'] = instance.owner
            child_serializer = PolymorphSectionSerializer(context=context)

            # update sections
            updatedSectionInstances = sectionListUpdate(
                child_serializer, 
                sections_dict, 
                section_mapping,
                )

            # add updated section to return instance
            for updatedSectionInstance in updatedSectionInstances:
                instance.sections.add(updatedSectionInstance)
    
        self.delete_unused_images(instance.owner)

        return instance





class PageOutputSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Page
        fields = ['id', 'name', 'number', 'sections', 'links']

def sectionListUpdate(child_serializer, validated_data, section_mapping, ):
    # Perform creations and updates.
    ret = []
    for data in validated_data:
        section = section_mapping.get(data.pop('id', None), None)
        if section is None:
            ret.append(child_serializer.create(data))
        else:
            ret.append(child_serializer.update(section, data))

    # Perform deletions.
    for section_id, section in section_mapping.items():
        if section_id not in map(lambda s: s.id, ret):
            section.delete()

    return ret
