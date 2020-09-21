from django.contrib import admin
from django.urls import path
from django.conf.urls import include

from . import views


urlpatterns = [
    path(
        'portfolios',
        views.PortfolioList.as_view(),
        name='portfolio_list',
    ),
    path(
        'portfolios/<portfolio_id>',
        views.PortfolioDetail.as_view(),
        name='portfolio_detail',
    ),
    path(
        'portfolios/<portfolio_id>/pages',
        views.PageList.as_view(),
        name='page_list',
    ),
    path(
        'portfolios/<portfolio_id>/pages/<page_id>',
        views.PageDetail.as_view(),
        name='page_detail',
    ),
    path(
        'portfolios/<portfolio_id>/pages/<page_id>/sections',
        views.SectionList.as_view(),
        name='section_list',
    ),
    path(
        'portfolios/<portfolio_id>/pages/<page_id>/sections/<section_id>',
        views.SectionDetail.as_view(),
        name='section_detail',
    ),
]
