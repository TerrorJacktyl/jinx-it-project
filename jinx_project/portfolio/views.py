from django.shortcuts import render
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
        return models.Page.objects.filter(portfolio=self.kwargs['portfolio_id'])

    def perform_create(self, serializer):
        portfolio = models.Portfolio.objects.get(
            pk=self.kwargs['portfolio_id'])
        serializer.save(portfolio=portfolio)


class PageDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.PageSerializer
    lookup_url_kwarg = 'page_id'
    permission_classes = [permissions.IsAuthenticated, IsOwner]
    queryset = models.Page.objects.all()


class SectionList(generics.ListCreateAPIView):
    serializer_class = serializers.SectionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return models.Section.objects.filter(page=self.kwargs['page_id'])

    def perform_create(self, serializer):
        page = models.Page.objects.get(pk=self.kwargs['page_id'])
        serializer.save(page=page)


class SectionDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.SectionSerializer
    lookup_url_kwarg = 'section_id'
    permission_classes = [permissions.IsAuthenticated, IsOwner]
    queryset = models.Section.objects.all()
