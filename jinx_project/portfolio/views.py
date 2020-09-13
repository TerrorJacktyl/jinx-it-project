from django.shortcuts import render
from django.http import Http404
from rest_framework import generics
from rest_framework import permissions

from . import models
from . import serializers

from .permissions import IsOwner


class PortfolioList(generics.ListCreateAPIView):
    serializer_class = serializers.PortfolioSerializer

    # only allow signed in users to see their portfolios
    permission_classes = [permissions.IsAuthenticated]

    # Only show the portfolios that a user owns.
    # It's a function as we want it to be called on each request.
    # If it was a variable, it would only be set one time and won't change
    # depending on current user.
    def get_queryset(self):
        return models.Portfolio.objects.filter(owner=self.request.user)

    # when creating a portfolio, autoset the owner to be current user
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class PortfolioDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.PortfolioSerializer

    # key to use in url configuration
    lookup_url_kwarg = 'portfolio_id'

    # only allow the owner of a portfolio to see it
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    queryset = models.Portfolio.objects.all()


class PageList(generics.ListCreateAPIView):
    serializer_class = serializers.PageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return models.Page.objects.filter(
            portfolio__owner=self.request.user,
            portfolio=self.kwargs['portfolio_id']
        )

    def perform_create(self, serializer):
        portfolio = models.Portfolio.objects.get(
            pk=self.kwargs['portfolio_id']
        )
        # TODO: portfolio gets set after the data validation occurs to for new
        # pages, valdiation on portfolio won't work
        serializer.save(portfolio=portfolio)


class PageDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.PageSerializer
    lookup_url_kwarg = 'page_id'
    permission_classes = [permissions.IsAuthenticated, IsOwner]
    queryset = models.Page.objects.all()


class SectionList(generics.ListCreateAPIView):
    serializer_class = serializers.PolymorphSectionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # double underscore is equivalent to a database join
        # https://docs.djangoproject.com/en/3.1/topics/db/queries/#lookups-that-span-relationships
        filter_param = {
            'page__portfolio__owner': self.request.user,
            'page__portfolio': self.kwargs['portfolio_id'],
            'page': self.kwargs['page_id'],
        }
        text_sections = models.TextSection.objects.filter(**filter_param)
        media_sections = models.MediaSection.objects.filter(**filter_param)
        return list(text_sections) + list(media_sections)

    def perform_create(self, serializer):
        page = models.Page.objects.get(pk=self.kwargs['page_id'])
        serializer.save(page=page)


class SectionDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.PolymorphSectionSerializer
    lookup_url_kwarg = 'section_id'
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get_queryset(self):
        text_sections = models.TextSection.objects.all()
        media_sections = models.MediaSection.objects.all()
        return list(text_sections) + list(media_sections)

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
            if str(getattr(item, key)) == val:
                obj = item
                break
        else:
            raise Http404

        # May raise a permission denied
        self.check_object_permissions(self.request, obj)

        return obj
