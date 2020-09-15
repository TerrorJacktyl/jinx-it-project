from hypothesis import given, settings, strategies as st
from hypothesis.extra.django import TestCase, from_model

from django.urls import reverse
from django.contrib.auth.models import User

from rest_framework.test import APIClient, APIRequestFactory, force_authenticate

from account.models import Account

from .models import Portfolio, Page, TextSection
from . import views


def generate_portfolio() -> st.SearchStrategy:
    return from_model(Portfolio, owner=from_model(User))


def add_pages_to_portfolio(portfolio: Portfolio) -> Portfolio:
    return st.lists(from_model(Page, portfolio=st.just(portfolio))).map(lambda _: portfolio)


def add_sections_to_page(page: Page) -> Page:
    return st.lists(from_model(TextSection, page=st.just(page))).map(lambda _: page)


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
        if len(name) == 0 or len(name) > 100:
            self.assertEqual(response.status_code, 400)
        else:
            self.assertEqual(response.status_code, 201)
            self.assertEqual(response.data['name'], name)

    @settings(deadline=2000, max_examples=10)
    @given(portfolio=generate_portfolio().flatmap(add_pages_to_portfolio))
    def test_retrieve(self, portfolio: Portfolio):
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
            'pages': list(map(lambda p: p.pk, portfolio.pages.all())),
        })


class PageTest(TestCase):
    @settings(deadline=2000, max_examples=10)
    @given(portfolio=generate_portfolio(), name=st.text())
    def test_create(self, portfolio, name):
        client = APIClient()
        client.force_authenticate(portfolio.owner)

        # TODO, generate random numbers for the number within the valid range
        data = {'name': name, 'number': 0}
        response = client.post(
            reverse('page_list', kwargs={'portfolio_id': portfolio.pk}),
            data
        )
        if len(name) == 0 or len(name) > 100:
            self.assertEqual(response.status_code, 400)
        else:
            self.assertEqual(response.status_code, 201)
            self.assertEqual(response.data['name'], name)
            self.assertEqual(response.data['number'], 0)

    @settings(deadline=2000, max_examples=10)
    @given(page=from_model(Page, portfolio=generate_portfolio(), name=st.text(), number=st.just(0))
           .flatmap(add_sections_to_page))
    def test_retrieve(self, page: Page):
        client = APIClient()
        client.force_authenticate(page.owner)
        response = client.get(
            reverse(
                'page_detail',
                kwargs={
                    'portfolio_id': page.portfolio.pk,
                    'page_id': page.pk,
                }
            )
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, {
            'id': page.pk,
            'name': page.name,
            'number': page.number,
            'sections': list(map(lambda p: p.pk, page.sections.all())),
        })
