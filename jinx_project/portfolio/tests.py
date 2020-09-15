from hypothesis import given, settings, strategies as st
from hypothesis.extra.django import TestCase, from_model

from django.urls import reverse
from django.contrib.auth.models import User

from rest_framework.test import APIClient, APIRequestFactory, force_authenticate

from account.models import Account

from .models import Portfolio, Page, TextSection
from . import views


def generate_with_pages(portfolio: Portfolio) -> Portfolio:
    return st.lists(from_model(Page, portfolio=st.just(portfolio))).map(lambda _: portfolio)


class PortfolioTest(TestCase):
    def setUp(self):
        """Code run before each test. Setup API access simulation."""
        pass

    # test for max of 2 seconds with 10 random examples
    @settings(deadline=2000, max_examples=10)
    # generate a random user and random portfolio name
    @given(user=from_model(User), name=st.text())
    def test_create(self, user: User, name: str):
        client = APIClient()
        # generate a random name
        data = {'name': name}
        # we'll assume that djoser has no authentication bugs and just bypass the login system
        # https://www.django-rest-framework.org/api-guide/testing/#forcing-authentication
        client.force_authenticate(user=user)
        response = client.post(
            reverse('portfolio_list'),
            data
        )
        self.assertEqual(response.status_code, 201)
        self.assertEqual(
            response.data, {'owner': user.pk, 'name': name, 'pages': []})


    @settings(deadline=2000, max_examples=10)
    @given(portfolio=from_model(Portfolio, owner=from_model(User)).flatmap(generate_with_pages))
    def test_retrieve(self, portfolio):
        client = APIClient()
        # autenticate as portfolio owner
        client.force_authenticate(user=portfolio.owner)
        # try to get the portfolio
        response = client.get(
            reverse(
                'portfolio_detail',
                kwargs={
                    'portfolio_id': portfolio.pk
                }
            )
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, {
            'id': portfolio.pk,
            'owner': portfolio.owner.pk,
            'name': portfolio.name,
            'pages': list(map(lambda p: p.pk,portfolio.pages.all())),
        })
