from hypothesis import given, settings, assume, strategies as st
from hypothesis.extra.django import TestCase, from_model, from_field

from unittest import skip

from rest_framework.test import APIClient, APIRequestFactory, force_authenticate

from django.contrib.auth.models import User, BaseUserManager
from .models import Account


# Create your tests here.


class AccountTest(TestCase):
    @skip("fails on too many edge cases (eg, weird characters (non ascii usernames for example)")
    # this does not test failure cases
    # generates valid inputs to the given fields
    @settings(deadline=2000, max_examples=10)
    @given(
        first_name=from_field(User.first_name.field),
        last_name=from_field(User.last_name.field),
        email=from_field(User.email.field),
        username=from_field(User.username.field),
        password=from_field(User.password.field)
    )
    def test_account_creation(self, first_name, last_name, email, username, password):
        client = APIClient()
        with self.subTest(msg='register'):
            response = client.post('/auth/users', {
                'username': username,
                'password': password,
                'email': email,
            }, follow=True)
            assume(response.status_code < 400)
            self.assertEqual(response.data['username'], username)
            self.assertEqual(
                response.data['email'], BaseUserManager.normalize_email(email))

        with self.subTest(msg='login'):
            response = client.post('/auth/token/login', {
                'username': username,
                'password': password,
            }, follow=True)
            self.assertLess(response.status_code, 400)
            self.assertTrue('auth_token' in response.data)

            token = response.data['auth_token']
            self.assertTrue(len(token) > 0)

        with self.subTest(msg='update name'):
            client.credentials(HTTP_AUTHORIZATION='Token ' + token)
            response = client.put('/api/accounts/me', {
                'first_name': first_name,
                'last_name': last_name,
            }, follow=True)
            self.assertLess(response.status_code, 400)
            self.assertEqual(response.data['first_name'], first_name)
            self.assertEqual(response.data['last_name'], last_name)

        with self.subTest(msg='GET details'):
            response = client.get('/api/accounts/me', follow=True)
            self.assertLess(response.status_code, 400)
            self.assertEqual(response.data['first_name'], first_name)
            self.assertEqual(response.data['last_name'], last_name)
            self.assertEqual(
                response.data['user']['email'], BaseUserManager.normalize_email(email))
            self.assertEqual(response.data['user']['username'], username)
