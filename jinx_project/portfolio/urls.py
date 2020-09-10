from django.contrib import admin
from django.urls import path
from django.conf.urls import include

from .views import (PortfolioList, PortfolioDetail, PageList,
                    PageDetail, SectionList, SectionDetail)

urlpatterns = [
    path('portfolios/',
         PortfolioList.as_view()),
    path('portfolios/<portfolio_id>/',
         PortfolioDetail.as_view()),
    path('portfolios/<portfolio_id>/pages/',
         PageList.as_view()),
    path('portfolios/<portfolio_id>/pages/<page_id>/',
         PageDetail.as_view()),
    path('portfolios/<portfolio_id>/pages/<page_id>/sections',
         SectionList.as_view()),
    path('portfolios/<portfolio_id>/pages/<page_id>/sections/<section_id>',
         SectionDetail.as_view()),
]
