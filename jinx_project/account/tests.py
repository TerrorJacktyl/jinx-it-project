from django.test import TestCase

from django.contrib.auth.models import User
from .models import Account

# Create your tests here.


class UserModelTests(TestCase):
    def test_plain_user_creation(self):
        """Check that a (built-in Django) user is created."""
        User.objects.create(username='jack', password='jack')
        self.assertIsNotNone(User.objects.all())

    def test_full_user_creation(self):
        """Check that a (built-in Django) user is created with a corresponding account."""
        user = User.objects.create(username='jack', password='jack')
        Account.objects.create(user=user, first_name="Jack",
                               last_name="OLantern", email="jacko@lanter.ns")
        self.assertIsNotNone(User.objects.all())
