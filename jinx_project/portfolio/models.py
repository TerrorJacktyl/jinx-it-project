from django.db import models
from django.db.models import signals
from django.contrib.auth.models import User

from datetime import datetime
from django.dispatch import receiver

from account.signals import account_created

from . import managers


@receiver(account_created)
def create_default_portfolio(sender, **kwargs):
    account = kwargs.get('account')
    portfolio = Portfolio.objects.create(
        owner=account.user,
        name='My Portfolio',
    )
    page = Page.objects.create(
        portfolio=portfolio,
        name='First Page',
        number=0,
    )
    TextSection.objects.create(
        page=page,
        name='Hello There!',
        number='0',
        content=
            'Welcome to Jinx\'s portfolio creation software! '
            'This is a default portfolio, feel free to modify or delete.'
    )
    account.primary_portfolio = portfolio
    account.save()


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
    objects = managers.PageManager()

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
    name = models.CharField(blank=True, max_length=250)
    # ordering number to order sections on a page
    number = models.IntegerField(default=0)

    objects = managers.SectionManager()

    # not a field for the same reasoning as Page's owner
    @property
    def owner(self):
        return self.page.owner

    @property
    def type(self):
        mapping = {
            'TextSection': 'text', 
            'MediaSection': 'media',
            'ImageSection': 'image',
            'ImageTextSection': 'image_text',
            }
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

class Image(models.Model):
    #   Image upload tutorial
    #   https://medium.com/@emeruchecole9/uploading-images-to-rest-api-backend-in-react-js-b931376b5833
    def image_path(self, filename):
        _now = datetime.now()
        return 'images/{user}/{year}/{month}/{day}/{file}'.format(
            user =  self.owner, 
            file =  filename,
            year =  _now.strftime('%Y'),
            month = _now.strftime('%m'),
            day =   _now.strftime('%d') )

    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='images')
    name = models.CharField(max_length = 100)
    path = models.ImageField(upload_to = image_path, null = True)


    # @property
    # def owner(self):
    #     return self.portfolio.owner

    def __str__(self):
        return self.name

class ImageTextSection(Section):
    image = models.ForeignKey(Image, null = True, on_delete=models.SET_NULL)
    content = models.TextField(blank=True)

class ImageSection(Section):
    image = models.ForeignKey(Image, null = True, on_delete=models.SET_NULL)
