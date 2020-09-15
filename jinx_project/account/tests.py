from hypothesis import given, settings, strategies as st
from hypothesis.extra.django import TestCase, from_model, from_field

from rest_framework.test import APIClient, APIRequestFactory, force_authenticate

from django.contrib.auth.models import User
from .models import Account

# Create your tests here.


class AccountTest(TestCase):
    # this does not test failure cases
    # generates valid inputs to the given fields
    @given(
        first_name=from_field(User.first_name),
        last_name=from_field(User.last_name),
        email=from_field(User.email),
        username=from_field(User.username),
        password=from_field(User.password)
    )
    def test_account_creation(self, first_name, last_name, email, username, password):
        client = APIClient()
        with self.subTest(msg='register'):
            response = client.post('/auth/users', {
                'username': username,
                'password': password,
                'email': email,
            })
            self.assertEqual(response.status_code, 201)
            self.assertEqual(response.data['username'], username)
            self.assertEqual(response.data['email'], email)

        with self.subTest(msg='login'):
            response = client.post('/auth/token/login', {
                'username': username,
                'password': password,
            })
            self.assertEqual(response.status_code, 200)
            self.assertTrue('auth_token' in response.data)

            token = response.data['auth_token']
            self.assertTrue(len(token) > 0)

        with self.subTest(msg='update name'):
            client.credentials(HTTP_AUTHORIZATION='Token: ' + token)
            response = client.put('/api/accounts/me', {
                'first_name': first_name,
                'last_name': last_name,
            })
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.data['first_name'], first_name)
            self.assertEqual(response.data['last_name'], last_name)

        with self.subTest(msg='GET details'):
        response = client.get('/api/accounts/me')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['first_name'], first_name)
        self.assertEqual(response.data['last_name'], last_name)
        self.assertEqual(response.data['user']['email'], email)
        self.assertEqual(response.data['user']['username'], username)
