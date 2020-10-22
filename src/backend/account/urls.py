from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from . import views

urlpatterns = [
    path(
        'accounts',
        views.AccountList.as_view(),
        name='account_list',
    ),
    path(
        'accounts/<account_id>',
        views.AccountDetail.as_view(),
        name='account_detail',
    ),
]
