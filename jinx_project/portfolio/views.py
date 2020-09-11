from django.shortcuts import render
from rest_framework import generics
from rest_framework import permissions

from .models import Portfolio, Page, Section, TextSection, MediaSection
from .serializers import (PortfolioSerializer, PageSerializer,
                          TextSectionSerializer, MediaSectionSerializer, SectionSerializer)

from .permissions import IsOwner


class PortfolioList(generics.ListCreateAPIView):
    serializer_class = PortfolioSerializer

    # only allow signed in users to see their portfolios
    permission_classes = [permissions.IsAuthenticated]

    # Only show the portfolios that a user owns.
    # It's a function as we want it to be called on each request.
    # If it was a variable, it would only be set one time and won't change
    # depending on current user.
    def get_queryset(self):
        return Portfolio.objects.filter(owner=self.request.user)

    # when creating a portfolio, autoset the owner to be current user
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class PortfolioDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PortfolioSerializer

    # key to use in url configuration
    lookup_url_kwarg = 'portfolio_id'

    # only allow the owner of a portfolio to see it
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    queryset = Portfolio.objects.all()


class PageList(generics.ListCreateAPIView):
    serializer_class = PageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Page.objects.filter(portfolio=self.kwargs['portfolio_id'])

    def perform_create(self, serializer):
        portfolio = Portfolio.objects.get(pk=self.kwargs['portfolio_id'])
        serializer.save(portfolio=portfolio)


class PageDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PageSerializer
    lookup_url_kwarg = 'page_id'
    permission_classes = [permissions.IsAuthenticated, IsOwner]
    queryset = Page.objects.all()


class SectionList(generics.ListCreateAPIView):
    serializer_class = SectionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Section.objects.filter(page=self.kwargs['page_id'])
    
    def perform_create(self, serializer):
        page = Page.objects.get(pk=self.kwargs['page_id'])
        serializer.save(page=page)


class SectionDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = SectionSerializer
    lookup_url_kwarg = 'section_id'
    permission_classes = [permissions.IsAuthenticated, IsOwner]
    queryset = Section.objects.all()
