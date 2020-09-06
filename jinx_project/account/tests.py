from django.test import TestCase

from django.contrib.auth.models import User
from .models import Account

# Create your tests here.


class UserModelTests(TestCase):
    def test_user_creation(self):
        """Check that user is created and stored in the database."""
        user = User(username='jack', password='jack')
        user.save()
        self.assertIsNotNone(User.objects.all())
