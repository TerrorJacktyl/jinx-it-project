from django.db import models
from django.contrib.auth.models import User

# TODO: Look into Django's user authentication. This will do for now


class Account(models.Model):
    """Account is a proxy to Django's built-in User model. Account contains all the
    user data we'd like to store, rather than extending the built-in User model to contain this.
    This is the recommended method for 'modifying' the built-in User model. See:
    https://docs.djangoproject.com/en/dev/topics/auth/customizing/#extending-the-existing-user-model
    """

    # Link the account model to Django's default User model
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    # Our user fields
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=80)
    email = models.EmailField(max_length=250)

    def _str_(self):
        return self.first_name
