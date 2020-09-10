from django.db import models
from account.models import Account


class Portfolio(models.Model):
    # Link portfolio to account
    owner = models.ForeignKey(
        Account, on_delete=models.CASCADE, related_name='portfolios')
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


class Section(models.Model):
    page = models.ForeignKey(
        Page, on_delete=models.CASCADE, related_name='sections')
    name = models.CharField(max_length=250)
    description = models.CharField(max_length=1000)

    # not a field for the same reasoning as Page
    @property
    def owner(self):
        return self.page.owner


class MediaSection(Section):
    pathToMedia = models.FilePathField()
