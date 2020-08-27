from django.db import models

# TODO: Look into Django's user authentication. This will do for now

class Sign_Up(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=80)
    email = models.EmailField(max_length=250)
    password = models.CharField(max_length=30)

    def _str_(self):
        return self.first_name + " signed up!"
