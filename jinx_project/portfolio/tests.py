import string
import random

from hypothesis import given, settings, strategies as st
from hypothesis.extra.django import TestCase, from_model

from django.urls import reverse
from django.contrib.auth.models import User

from unittest import skip

from rest_framework.test import APIClient, APIRequestFactory, force_authenticate, APITestCase

from account.models import Account

from . import models
from . import views


class UserMixin():
    def setUpUser(self):
        self.user = User.objects.create_user(
            username='bertrand',
            password='elaboratestillness',
            email='bertrand@example.com',
        )
        self.client.force_authenticate(user=self.user)


class PortfolioMixin():
    def setUpPortfolio(self):
        self.portfolio = models.Portfolio.objects.create(
            owner=self.user, name='cuttlefish')
        for i in range(10):
            page = models.Page.objects.create(
                portfolio=self.portfolio,
                name='page number {}'.format(i),
                number=i
            )
            if i == 0:
                self.page = page
        for i in range(10):
            section = models.TextSection.objects.create(
                page=self.page,
                name='section number {}'.format(i),
                number=i,
                content='lorem ipsum'
            )
            if i == 0:
                self.section = section


class PortfolioTest(UserMixin, PortfolioMixin, APITestCase):
    def setUp(self):
        """Code run before each test. Setup API access simulation."""
        self.setUpUser()
        self.setUpPortfolio()

    def test_porfolio_create(self):
        name = 'fasting pumice'
        data = {'name': name}
        response = self.client.post(
            reverse('portfolio_list'),
            data
        )
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data.get('name'), name)

        portfolio = models.Portfolio.objects.get(id=response.data.get('id'))
        self.assertEqual(portfolio.owner, self.user)
        self.assertEqual(portfolio.name, name)
        self.assertEqual(portfolio.pages.count(), 0)

    def test_porfolio_validation(self):
        name = 'a' * 101
        data = {'name': name}
        response = self.client.post(
            reverse('portfolio_list'),
            data
        )
        self.assertEqual(response.status_code, 400)

    def test_portfolio_retrieve(self):
        response = self.client.get(
            reverse(
                'portfolio_detail',
                kwargs={
                    'portfolio_id': self.portfolio.id
                }
            )
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, {
            'id': self.portfolio.id,
            'owner': self.portfolio.owner.id,
            'name': self.portfolio.name,
            'pages': list(map(lambda p: p.id, self.portfolio.pages.all())),
        })

    def test_portfolio_update(self):
        name = 'incontrovertible bisections'
        response = self.client.patch(
            reverse(
                'portfolio_detail',
                kwargs={
                    'portfolio_id': self.portfolio.id,
                }
            ),
            {'name': name}
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data.get('name'), name)

        # clear out cached data
        self.portfolio.refresh_from_db()

        self.assertEqual(self.portfolio.owner, self.user)
        self.assertEqual(self.portfolio.name, name)
        self.assertEqual(self.portfolio.pages.count(), 10)

    def test_portfolio_delete(self):
        response = self.client.delete(
            reverse(
                'portfolio_detail',
                kwargs={
                    'portfolio_id': self.portfolio.id,
                }
            )
        )
        self.assertEqual(response.status_code, 204)
        self.assertEqual(
            len(models.Portfolio.objects.filter(id=self.portfolio.id)),
            0
        )
