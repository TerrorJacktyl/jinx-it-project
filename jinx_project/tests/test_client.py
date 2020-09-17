from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework.renderers import JSONRenderer

from django.contrib.auth.models import User
from portfolio.models import Portfolio, Page, Section

from django.urls import reverse


class ClientTest(TestCase):
    def setUp(self):
        # Set up data for the all of the client tests
        self.client = APIClient(enforce_csrf_checks=False)
        # Create an account for the client and log them in
        self.client.post('/auth/users',
                         {'email': 'gavin@thegreat.com',
                          'username': 'gavin', 'password': 'dontJinxIt'},
                         format='json')

        # Apparently .login doesn't authenticate - manually set header
        token = self.client.post(
            '/auth/token/login',
            data={"username": "gavin", "password": "dontJinxIt"},
            format="json").json()['auth_token']

        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token)

        # # Check login successful - this makes the PUT not work below
        # self.assertTrue(self.client.login(
        #     username='gavin', password='dontJinxIt'))
        # Put some extra client details
        self.client.put('/api/accounts/me',
                        {'first_name': 'Gavin', 'last_name': 'The Great'})
        print(self.client.get('/api/accounts/me').json())

    def test_portfolio_creation(self):
        # Create a portfolio for an authenticated user, and add some content
        # Result doesn't save here, but it works over swagger with this curl:
        # curl -X POST "http://localhost:8080/api/portfolios" -H  "accept: application/json" -H  "Authorization: Token 2426e80a17d532a6f6a3d71b1637e4f1ac71218d" -H  "Content-Type: application/json" -H  "X-CSRFToken: 27hn7JEIrmmG6g4RZYeuYOjBX459j7YvxlkI0GemBq6rSZcya5AXSycE1f4pPqBk" -d "{  \"name\": \"Software\"}"

        # reverse('portfolio_list') returns '/api/portfolios'
        # but using the latter string doesn't (always) work
        self.client.post(
            '/api/portfolios',
            data={"name": "Software"},
            format='json'
        )
        portfolio_id = self.client.get('/api/portfolios').json()[0]['id']

        # Create some pages
        self.client.post(
            reverse('page_list', kwargs={'portfolio_id': portfolio_id}),
            {"name": "About me", "number": 0}  # number must start at 0
        )
        self.client.post(
            reverse('page_list', kwargs={'portfolio_id': portfolio_id}),
            {"name": "Projects", "number": 1}  # number must start at 0
        )
        page_id = self.client.get(
            reverse('page_list', kwargs={'portfolio_id': portfolio_id})).json()[0]['number']

        # Create some sections
        self.client.post(
            # reverse('section_list', kwargs={
            #     'portfolio_id': portfolio_id,
            #     'page_id': page_id
            # }), # couldn't get this url to reverse properly; hardcoding
            "/api/portfolios/" + str(portfolio_id) + \
            "/pages/" + str(page_id) + "/sections",
            {"name": "Bio", "number": 0, "type": "text",
                "content": "I'm a giraffe!"},
            format='json'
        )
        # Check the pages and sections were created properly
        self.assertIsNotNone(self.client.get(
            "/api/portfolios/1/pages/1/sections").json())

    def tearDown(self):
        self.client.logout()
