from django.db import models
from django.db.models import signals
from django.contrib.auth.models import User

from . import managers


class Portfolio(models.Model):
    # Link portfolio to user (which is linked to account)
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='portfolios')
    # Portfolio name e.g. professional, art
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Page(models.Model):
    portfolio = models.ForeignKey(
        Portfolio, on_delete=models.CASCADE, related_name='pages')
    name = models.CharField(max_length=100)
    # page number (distinct from its id) to allow reordering of pages
    number = models.IntegerField(default=0)

    # set a custom manager for page reordering support
    objects = managers.OrderManager(parent_field='portfolio')

    # don't add owner as a field of page as that goes againt relational db
    # normalisation principles
    @property
    def owner(self):
        return self.portfolio.owner

    class Meta:
        ordering = ['number']

    def __str__(self):
        return self.name


class Section(models.Model):
    page = models.ForeignKey(
        Page, on_delete=models.CASCADE, related_name='sections')
    name = models.CharField(max_length=250)
    # ordering number to order sections on a page
    number = models.IntegerField(default=0)

    objects = managers.OrderManager(parent_field='page')

    # not a field for the same reasoning as Page's owner
    @property
    def owner(self):
        return self.page.owner

    @property
    def type(self):
        mapping = {'TextSection': 'text', 'MediaSection': 'media'}
        return mapping[self.__class__.__name__]

    class Meta:
        ordering = ['number']

    def __str__(self):
        return self.name


class TextSection(Section):
    content = models.TextField()


class MediaSection(Section):
    # TODO: password protect files
    # https://docs.nginx.com/nginx/admin-guide/security-controls/configuring-subrequest-authentication/
    media = models.FileField(upload_to='uploads/%Y/%m/%d/', null=True)
