from django.contrib import admin
from django.urls import path
from django.conf.urls import include

from . import views


urlpatterns = [
    path('portfolios/',
         views.PortfolioList.as_view()),
    path('portfolios/<portfolio_id>/',
         views.PortfolioDetail.as_view()),
    path('portfolios/<portfolio_id>/pages/',
         views.PageList.as_view()),
    path('portfolios/<portfolio_id>/pages/<page_id>/',
         views.PageDetail.as_view()),
    path('portfolios/<portfolio_id>/pages/<page_id>/sections',
         views.SectionList.as_view()),
    path('portfolios/<portfolio_id>/pages/<page_id>/sections/<section_id>',
         views.SectionDetail.as_view()),
]
