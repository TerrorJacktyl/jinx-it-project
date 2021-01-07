from django.shortcuts import render
from django.http import Http404
from django.db.models import Q
from django.db import transaction

from rest_framework import generics
from rest_framework import permissions
from rest_framework import status
from rest_framework.response import Response

from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status, exceptions

from common.permissions import IsReadOnly

from . import models
from . import serializers
from . import swagger

from .permissions import IsOwner, IsNotPrivate


class PortfolioList(generics.ListCreateAPIView):
    def get_serializer_class(self):
        # Allows this url to handle GET and POST with different serializers
        if self.request.method in ['POST']:
            return serializers.PortfolioInputSerializer
        return serializers.PortfolioOutputSerializer

    # allow anyone to see the list of portfolios, but only authenticated users can add portfolios
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    # Anyone can get the list of portfolios, but private portfolios will only
    # be visible for the owner.
    # It's a function as we want it to be called on each request.
    # If it was a variable, it would only be set one time and won't change
    # depending on current user.
    def get_queryset(self):
        # Q to perform OR operation
        # https://docs.djangoproject.com/en/3.1/topics/db/queries/#complex-lookups-with-q-objects
        owner = self.request.user
        filter_query = Q(private=False)
        if owner.is_authenticated:
            filter_query = filter_query | Q(owner=owner)

        return models.Portfolio.objects.filter(filter_query)

    # when creating a portfolio, autoset the owner to be current user
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    swagger_schema = swagger.PortfolioAutoSchema


class PortfolioDetail(generics.RetrieveUpdateDestroyAPIView):
    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return serializers.PortfolioInputSerializer
        return serializers.PortfolioOutputSerializer

    # key to use in url configuration
    lookup_url_kwarg = 'portfolio_id'

    # the owner always has full permissions
    # everyone else only has read permissions if the portfolio is public
    permission_classes = [(IsNotPrivate & IsReadOnly) | IsOwner]

    queryset = models.Portfolio.objects.all()

    swagger_schema = swagger.PortfolioAutoSchema


class PageList(generics.ListCreateAPIView):
    def get_serializer_class(self):
        if self.request.method in ['POST']:
            return serializers.PageInputSerializer
        return serializers.PageOutputSerializer

    # anyone can see pages of a public portfolio
    # only the owner can add new pages
    permission_classes = [(IsNotPrivate & IsReadOnly) | IsOwner]

    def get_queryset(self):
        owner = self.request.user
        try:
            portfolio = models.Portfolio.objects.get(
                id=self.kwargs['portfolio_id'])
        except models.Portfolio.DoesNotExist as exc:
            raise Http404 from exc

        return portfolio.pages.all()

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['portfolio_id'] = self.kwargs['portfolio_id']
        return context

    def put(self, request, *args, **kwargs):
        serializer = serializers.PageListInputSerializer(
            self.get_queryset(),
            data=request.data,
            child=serializers.PageInputSerializer(),
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    swagger_schema = swagger.PortfolioAutoSchema


class PageDetail(generics.RetrieveUpdateDestroyAPIView):
    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return serializers.PageInputSerializer
        return serializers.PageOutputSerializer

    lookup_url_kwarg = 'page_id'
    permission_classes = [(IsNotPrivate & IsReadOnly) | IsOwner]
    queryset = models.Page.objects.all()
    swagger_schema = swagger.PortfolioAutoSchema

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['portfolio_id'] = self.kwargs['portfolio_id']
        if 'id' in context['request'].data:
            context['page'] = context['request'].data['id']
        # context['page'] = context['request']['data']['id']
        return context

    def perform_destroy(self, instance):
        parent_id = instance.portfolio
        # really missing haskell's type system now :(
        # pylint can't figure out that the superclass has the perform_destroy method
        # pylint: disable=no-member
        super().perform_destroy(instance)
        models.Page.objects.normalise(parent_id)

    # def put(self, request, *args, **kwargs):
    #     context = self.get_serializer_context()
    #     context['in_list'] = True
    #     serializer = serializers.PageInputSerializer(
    #         self.get_queryset(),
    #         data=request.data,
    #         child=serializers.PolymorphSectionSerializer(
    #             context=context
    #         )
    #     )
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SectionList(generics.ListCreateAPIView):
    serializer_class = serializers.PolymorphSectionSerializer
    permission_classes = [(IsNotPrivate & IsReadOnly) | IsOwner]

    def get_queryset(self):
        try:
            portfolio = models.Portfolio.objects.get(
                id=self.kwargs['portfolio_id'])
            page = portfolio.pages.get(id=self.kwargs['page_id'])
        except (models.Portfolio.DoesNotExist, models.Page.DoesNotExist) as exc:
            raise Http404 from exc

        filter_param = {
            'page': page,
        }
        # TODO: consolidate all the section data into the section model?
        section_types = [
            models.TextSection,
            models.ImageSection,
            models.ImageTextSection,
            models.MediaSection
        ]
        ret = []
        for section in section_types:
            ret += section.objects.filter(**filter_param)

        return sorted(ret, key=lambda s: s.number)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        # kind of redundant as context['view'] would have the kwargs but just in case
        # the urls change
        context['page'] = self.kwargs['page_id']
        return context

    swagger_schema = swagger.PortfolioAutoSchema

    # bulk section creation/update
    def put(self, request, *args, **kwargs):
        
        request.data.sort(key=(lambda s: s['number']))
        for i, section in enumerate(request.data):
            section['number'] = i
        context = self.get_serializer_context()
        context['in_list'] = True

        serializer = serializers.SectionListSerializer(
            self.get_queryset(),
            data=request.data,
            child=serializers.PolymorphSectionSerializer(
                context=context
            ),
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SectionDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.PolymorphSectionSerializer
    lookup_url_kwarg = 'section_id'
    permission_classes = [(IsNotPrivate & IsReadOnly) | IsOwner]

    def get_queryset(self):
        section_types = [
            models.TextSection,
            models.ImageSection,
            models.ImageTextSection,
            models.MediaSection
        ]
        ret = []
        for section in section_types:
            ret += section.objects.all()
        return ret

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['page'] = self.kwargs['page_id']
        return context

    # modified based on code from GenericAPIView default implementation
    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())

        # Perform the lookup filtering.
        lookup_url_kwarg = self.lookup_url_kwarg or self.lookup_field

        assert lookup_url_kwarg in self.kwargs, (
            'Expected view %s to be called with a URL keyword argument '
            'named "%s". Fix your URL conf, or set the `.lookup_field` '
            'attribute on the view correctly.' %
            (self.__class__.__name__, lookup_url_kwarg)
        )

        # find the object with the right key
        key = self.lookup_field
        val = self.kwargs[lookup_url_kwarg]
        obj = None
        for item in queryset:
            if getattr(item, key) == val:
                obj = item
                break
        else:
            raise Http404

        # May raise a permission denied
        self.check_object_permissions(self.request, obj)

        return obj

    swagger_schema = swagger.PortfolioAutoSchema


class ImageDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.ImageInputSerializer
    # These parses required for receiving over image data
    parser_classes = (MultiPartParser, FormParser)

    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        # Allows this url to handle GET and POST with different serializers
        if self.request.method in ['PUT', 'PATCH']:
            return serializers.ImageInputSerializer
        return serializers.ImageOutputSerializer

    lookup_url_kwarg = 'image_id'

    def get_queryset(self):
        return models.Image.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ImageList(generics.ListCreateAPIView):
    serializer_class = serializers.ImageInputSerializer
    parser_classes = (MultiPartParser, FormParser)

    def get_serializer_class(self):
        # Allows this url to handle GET and POST with different serializers
        if self.request.method in ['POST']:
            return serializers.ImageInputSerializer
        return serializers.ImageOutputSerializer

    def get_queryset(self):
        return models.Image.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    permission_classes = [permissions.IsAuthenticated]

    def perform_destroy(self, instance):
        parent_id = instance.page
        # pylint: disable=no-member
        super().perform_destroy(instance)
        models.Section.objects.normalise(parent_id)


class PortfolioLinkList(generics.ListCreateAPIView):
    serializer_class = serializers.LinkSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        try:
            portfolio_id = self.kwargs['portfolio_id']
            portfolio = models.Portfolio.objects.get(
                id=portfolio_id)
        except (models.Portfolio.DoesNotExist) as exc:
            raise Http404 from exc

        return models.PortfolioLink.objects.filter(portfolio=portfolio)

    def get(self, request, *args, **kwargs):
        links = self.get_queryset()
        portfolio = kwargs['portfolio_id']

        # Serialize them into a string
        serializer = serializers.PortfolioLinkSerializer(
            links,
            child=serializers.PortfolioLinkDetailSerializer(),
        )
        # Return the JSON string
        return Response(serializer.data)

    def set_serializer(self, data_list):
        return serializers.PortfolioLinkSerializer(
            self.get_queryset(),
            data=data_list,
            child=serializers.PortfolioLinkDetailSerializer(),
        )

    def get_keywords(self):
        return "portfolio", "portfolio_id"

    def put(self, request, *args, **kwargs):
        return link_association_put(self, request, **kwargs)

    def post(self, request, *args, **kwargs):
        return link_association_put(self, request, **kwargs)

class PageLinkList(generics.ListCreateAPIView):
    serializer_class = serializers.LinkSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        try:
            portfolio_id = self.kwargs['portfolio_id']
            page = self.kwargs['page_id']
            portfolio = models.Portfolio.objects.get(
                id=portfolio_id)
            page = portfolio.pages.get(id=page)
        except (models.Portfolio.DoesNotExist, models.Page.DoesNotExist) as exc:
            raise Http404 from exc

        return models.PageLink.objects.filter(page=page)

    def get(self, request, *args, **kwargs):
        links = self.get_queryset()
        page = kwargs['page_id']

        # Serialize them into a string
        serializer = serializers.PageLinkSerializer(
            links,
            child=serializers.PageLinkDetailSerializer(),
        )
        # Return the JSON string
        return Response(serializer.data)

    def set_serializer(self, data_list):
        return serializers.PageLinkSerializer(
            self.get_queryset(),
            data=data_list,
            child=serializers.PageLinkDetailSerializer(),
        )

    def get_keywords(self):
        return "page", "page_id"
        
    def put(self, request, *args, **kwargs):
        return link_association_put(self, request, **kwargs)

    def post(self, request, *args, **kwargs):
        return link_association_put(self, request, **kwargs)


class SectionLinkList(generics.ListCreateAPIView):
    serializer_class = serializers.LinkSerializer
    permission_class = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        try:
            portfolio_id = self.kwargs['portfolio_id']
            page = self.kwargs['page_id']
            section = self.kwargs['section_id']
            portfolio = models.Portfolio.objects.get(
                id=portfolio_id)
            page = portfolio.pages.get(id=page)
            section = page.sections.get(id=section)
        except (models.Portfolio.DoesNotExist, models.Page.DoesNotExist) as exc:
            raise Http404 from exc

        return models.SectionLink.objects.filter(section=section)
    
    def get(self, request, *args, **kwargs):
        links = self.get_queryset()
        section = kwargs['section_id']

        # Serialize them into a string
        serializer = serializers.SectionLinkSerializer(
            links,
            child=serializers.SectionLinkDetailSerializer(),
        )
        # Return the JSON string
        return Response(serializer.data)

    def set_serializer(self, data_list):
        return serializers.SectionLinkSerializer(
            self.get_queryset(),
            data=data_list,
            child=serializers.SectionLinkDetailSerializer(),
        )

    def get_keywords(self):
        return "section", "section_id"

    def put(self, request, *args, **kwargs):
        return link_association_put(self, request, **kwargs)

    def post(self, request, *args, **kwargs):
        return link_association_put(self, request, **kwargs)


def link_association_put(view, request, **kwargs):

    data_list = []
    assoc_name, assoc_id_name = view.get_keywords()
    for single_request in request.data:
        data_list.append(
            {assoc_name: kwargs[assoc_id_name], "link": single_request})

    serializer = view.set_serializer(data_list)

    if(serializer.is_valid()):
        serializer.save(owner=view.request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
