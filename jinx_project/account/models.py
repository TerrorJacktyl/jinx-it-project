from django.db import models
from django.contrib.auth.models import User
from django.dispatch import receiver

from djoser.signals import user_registered

from portfolio.models import Portfolio


class Account(models.Model):
    """Account is a proxy to Django's built-in User model. Account contains all the
    user data we'd like to store, rather than extending the built-in User model to contain this.
    This is the recommended method for 'modifying' the built-in User model. See:
    https://docs.djangoproject.com/en/dev/topics/auth/customizing/#extending-the-existing-user-model
    """

    # Link the account model to Django's default User model
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    # additional fields
    primary_portfolio = models.OneToOneField(
        Portfolio,
        on_delete=models.SET_NULL,
        blank=True,
        null=True
    )

    def _str_(self):
        return self.user.first_name


# autocreate account on user registration
@receiver(user_registered)
def create_account(sender, **kwargs):
    Account.objects.create(user=kwargs['user'])
