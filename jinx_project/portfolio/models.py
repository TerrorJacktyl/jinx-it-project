from django.db import models
from django.contrib.auth.models import User


class Portfolio(models.Model):
    # Link portfolio to user (which is linked to account)
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='portfolios')
    # Portfolio name e.g. professional, art
    name = models.CharField(max_length=100)


class Page(models.Model):
    portfolio = models.ForeignKey(
        Portfolio, on_delete=models.CASCADE, related_name='pages')
    name = models.CharField(max_length=100)
    # page number (distinct from its id) to allow reordering of pages
    number = models.IntegerField(default=0)

    # don't add owner as a field of page as that goes againt relational db
    # normalisation principles
    @property
    def owner(self):
        return self.portfolio.owner

    class Meta:
        ordering = ['number']


class Section(models.Model):
    page = models.ForeignKey(
        Page, on_delete=models.CASCADE, related_name='sections')
    name = models.CharField(max_length=250)
    # ordering number to order sections on a page
    number = models.IntegerField()

    # not a field for the same reasoning as Page
    @property
    def owner(self):
        return self.page.owner

    class Meta:
        ordering = ['order']


class TextSection(Section):
    content = models.TextField()


class MediaSection(Section):
    media = models.FileField()
