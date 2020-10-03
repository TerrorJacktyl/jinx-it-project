import string
import random
import copy

from hypothesis import given, settings, strategies as st, Verbosity
from hypothesis.extra.django import TestCase, from_model
from hypothesis import stateful

from django.urls import reverse
from django.contrib.auth.models import User

from unittest import skip

from rest_framework.test import APIClient, APIRequestFactory, force_authenticate, APITestCase

from account.models import Account

from . import models
from . import views
from . import serializers


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
            data,
            format='json',
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
            data,
            format='json',
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
            {'name': name},
            format='json',
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


class PageTest(UserMixin, PortfolioMixin, APITestCase):
    def setUp(self):
        """Code run before each test. Setup API access simulation."""
        self.setUpUser()
        self.setUpPortfolio()

    def test_page_create(self):
        name = 'deteriorating tubes'
        data = {
            'name': name,
            'number': 0
        }
        response = self.client.post(
            reverse('page_list', kwargs={'portfolio_id': self.portfolio.id}),
            data,
            format='json',
        )
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data.get('name'), name)

        page = models.Page.objects.get(id=response.data.get('id'))
        self.assertEqual(page.portfolio, self.portfolio)
        self.assertEqual(page.name, name)
        self.assertEqual(page.sections.count(), 0)

    def test_page_validation(self):
        name = 'a' * 101
        data = {'name': name}
        response = self.client.post(
            reverse('page_list', kwargs={'portfolio_id': self.portfolio.id}),
            data,
            format='json',
        )
        self.assertEqual(response.status_code, 400)

    def test_page_retrieve(self):
        response = self.client.get(
            reverse(
                'page_detail',
                kwargs={
                    'portfolio_id': self.portfolio.id,
                    'page_id': self.page.id
                }
            )
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, {
            'id': self.page.id,
            'name': self.page.name,
            'number': 0,
            'sections': list(map(lambda s: s.id, self.page.sections.all())),
        })

    def test_page_update(self):
        name = 'soggiest contrivances'
        response = self.client.patch(
            reverse(
                'page_detail',
                kwargs={
                    'portfolio_id': self.portfolio.id,
                    'page_id': self.page.id,
                }
            ),
            {'name': name},
            format='json',
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data.get('name'), name)

        # clear out cached data
        self.page.refresh_from_db()

        self.assertEqual(self.page.portfolio, self.portfolio)
        self.assertEqual(self.page.name, name)
        self.assertEqual(self.page.sections.count(), 10)

    def test_page_delete(self):
        response = self.client.delete(
            reverse(
                'page_detail',
                kwargs={
                    'portfolio_id': self.portfolio.id,
                    'page_id': self.page.id
                }
            )
        )
        self.assertEqual(response.status_code, 204)
        self.assertEqual(
            len(models.Page.objects.filter(id=self.page.id)),
            0
        )


class TextSectionTest(UserMixin, PortfolioMixin, APITestCase):
    def setUp(self):
        """Code run before each test. Setup API access simulation."""
        self.setUpUser()
        self.setUpPortfolio()

    def test_text_section_create(self):
        data = {
            'name': 'nervous pillowcase',
            'number': 0,
            'type': 'text',
            'content': 'lorem ipsum'
        }
        response = self.client.post(
            reverse(
                'section_list',
                kwargs={
                    'portfolio_id': self.portfolio.id,
                    'page_id': self.page.id,
                }
            ),
            data,
            format='json',
        )
        self.assertEqual(response.status_code, 201)
        for key, val in data.items():
            self.assertEqual(response.data.get(key), val)

        section = models.TextSection.objects.get(id=response.data.get('id'))
        for key, val in data.items():
            self.assertEqual(getattr(section, key), val)

    def test_text_section_validation(self):
        data = {
            'name': 'a' * 251,
            'number': 0,
            'type': 'text',
            'content': 'lorem ipsum'
        }
        response = self.client.post(
            reverse(
                'section_list',
                kwargs={
                    'portfolio_id': self.portfolio.id,
                    'page_id': self.page.id,
                }
            ),
            data,
            format='json',
        )
        self.assertEqual(response.status_code, 400)

    def test_text_section_retrieve(self):
        response = self.client.get(
            reverse(
                'section_detail',
                kwargs={
                    'portfolio_id': self.portfolio.id,
                    'page_id': self.page.id,
                    'section_id': self.section.id,
                }
            )
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, {
            'id': self.section.id,
            'name': self.section.name,
            'number': self.section.number,
            'type': self.section.type,
            'content': self.section.content,
        })

    def test_text_section_update(self):
        name = 'spunky horticulturists'
        initial_data = copy.deepcopy(serializers.TextSectionSerializer(self.section).data)
        response = self.client.patch(
            reverse(
                'section_detail',
                kwargs={
                    'portfolio_id': self.portfolio.id,
                    'page_id': self.page.id,
                    'section_id': self.section.id,
                }
            ),
            {'name': name},
            format='json',
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data.get('name'), name)

        # clear out cached data
        self.section.refresh_from_db()

        self.assertEqual(self.section.name, name)
        self.assertEqual(self.section.page, self.page)
        self.assertEqual(self.section.type, 'text')
        self.assertEqual(self.section.number, initial_data.get('number'))
        self.assertEqual(self.section.content, initial_data.get('content'))

    def test_text_section_delete(self):
        response = self.client.delete(
            reverse(
                'section_detail',
                kwargs={
                    'portfolio_id': self.portfolio.id,
                    'page_id': self.page.id,
                    'section_id': self.section.id,
                }
            )
        )
        self.assertEqual(response.status_code, 204)
        self.assertEqual(
            len(models.Section.objects.filter(id=self.section.id)),
            0
        )


class PageOrderingMachine(stateful.RuleBasedStateMachine, UserMixin):
    def __init__(self):
        super().__init__()
        self.model = []

        self.client = APIClient()
        self.setUpUser()
        self.portfolio = models.Portfolio.objects.create(
            owner=self.user, name='wolfhound')

    @stateful.rule(data=st.data())
    def add(self, data):
        pos = data.draw(st.integers(min_value=0, max_value=len(self.model)))

        # add a new page to database
        data = {
            'name': 'test page',
            'number': pos
        }
        response = self.client.post(
            reverse('page_list', kwargs={'portfolio_id': self.portfolio.id}),
            data,
            format='json',
        )

        # also add the id to a array to compare with later
        self.model.insert(pos, response.data.get('id'))

    @stateful.rule(data=st.data())
    @stateful.precondition(lambda self: len(self.model) > 0)
    def remove(self, data):
        pos = data.draw(
            st.integers(min_value=0, max_value=len(self.model) - 1)
        )

        page_id = self.model[pos]

        # database
        response = self.client.delete(
            reverse(
                'page_detail',
                kwargs={
                    'portfolio_id': self.portfolio.id,
                    'page_id': page_id,
                }
            )
        )

        # model
        self.model.remove(page_id)

    @stateful.rule(data=st.data())
    @stateful.precondition(lambda self: len(self.model) > 0)
    def move(self, data):
        pos_strat = st.integers(min_value=0, max_value=len(self.model) - 1)

        pos = data.draw(pos_strat)
        new_pos = data.draw(pos_strat)

        page_id = self.model[pos]

        # database
        response = self.client.patch(
            reverse(
                'page_detail',
                kwargs={
                    'portfolio_id': self.portfolio.id,
                    'page_id': page_id,
                }
            ),
            {'number': new_pos},
            format='json',
        )

        # model
        self.model.insert(new_pos, self.model.pop(pos))

    @stateful.invariant()
    def invariant(self):
        response = self.client.get(
            reverse('page_list', kwargs={'portfolio_id': self.portfolio.id})
        )
        response_ids = list(map(lambda p: p.get('id'), response.data))
        response_numbers = list(map(lambda p: p.get('number'), response.data))
        assert(self.model == response_ids)
        assert(response_numbers == list(range(len(response_numbers))))

    def teardown(self):
        for page in self.portfolio.pages.all():
            page.delete()
        self.portfolio.delete()
        self.user.delete()


class PageOrderingTest(TestCase):
    def runTest(self):
        stateful.run_state_machine_as_test(
            PageOrderingMachine,
            settings=settings(
                max_examples=10,
                stateful_step_count=50,
                deadline=2000,
            ),
        )

    runTest.is_hypothesis_test = True


class SectionOrderingMachine(stateful.RuleBasedStateMachine, UserMixin):
    def __init__(self):
        super().__init__()
        self.model = []

        self.client = APIClient()
        self.setUpUser()
        self.portfolio = models.Portfolio.objects.create(
            owner=self.user, name='trellises')
        self.page = models.Page.objects.create(
            portfolio=self.portfolio,
            name='phlegmatic',
            number=0,
        )

    @stateful.rule(data=st.data())
    def add(self, data):
        pos = data.draw(st.integers(min_value=0, max_value=len(self.model)))

        # add a new page to database
        data = {
            'name': 'test section',
            'number': pos,
            'type': 'text',
            'content': 'this is very good content'
        }
        response = self.client.post(
            reverse(
                'section_list', 
                kwargs={
                    'portfolio_id': self.portfolio.id,
                    'page_id': self.page.id,
                }
            ),
            data,
            format='json',
        )

        # also add the id to a array to compare with later
        self.model.insert(pos, response.data.get('id'))

    @stateful.rule(data=st.data())
    @stateful.precondition(lambda self: len(self.model) > 0)
    def remove(self, data):
        pos = data.draw(
            st.integers(min_value=0, max_value=len(self.model) - 1)
        )

        section_id = self.model[pos]

        # database
        response = self.client.delete(
            reverse(
                'section_detail',
                kwargs={
                    'portfolio_id': self.portfolio.id,
                    'page_id': self.page.id,
                    'section_id': section_id,
                }
            )
        )

        # model
        self.model.remove(section_id)

    @stateful.rule(data=st.data())
    @stateful.precondition(lambda self: len(self.model) > 0)
    def move(self, data):
        pos_strat = st.integers(min_value=0, max_value=len(self.model) - 1)

        pos = data.draw(pos_strat)
        new_pos = data.draw(pos_strat)

        section_id = self.model[pos]

        # database
        response = self.client.patch(
            reverse(
                'section_detail',
                kwargs={
                    'portfolio_id': self.portfolio.id,
                    'page_id': self.page.id,
                    'section_id': section_id,
                }
            ),
            {'number': new_pos},
            format='json',
        )

        # model
        self.model.insert(new_pos, self.model.pop(pos))

    @stateful.invariant()
    def invariant(self):
        response = self.client.get(
            reverse(
                'section_list', 
                kwargs={
                    'portfolio_id': self.portfolio.id,
                    'page_id': self.page.id,
                }
            )
        )
        response_ids = list(map(lambda s: s.get('id'), response.data))
        response_numbers = list(map(lambda s: s.get('number'), response.data))
        assert(self.model == response_ids)
        assert(response_numbers == list(range(len(response_numbers))))

    def teardown(self):
        for section in self.page.sections.all():
            section.delete()
        self.page.delete()
        self.portfolio.delete()
        self.user.delete()


class SectionOrderingTest(TestCase):
    def runTest(self):
        stateful.run_state_machine_as_test(
            SectionOrderingMachine,
            settings=settings(
                max_examples=10,
                stateful_step_count=50,
                deadline=2000,
            ),
        )

    runTest.is_hypothesis_test = True
