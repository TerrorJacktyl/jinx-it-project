from django.db import models, transaction
from django.db.models import F

# order management code adapted from
# https://www.revsys.com/tidbits/keeping-django-model-objects-ordered/

# managers handle interacting with the database


class OrderManager(models.Manager):
    parent_field = None

    def move(self, obj, new_position):

        # Queryset is a high level abstraction of a SQL statement.
        # The database does not get hit until a queryset is run so one is free
        # to modify the queryset as much as they want before that.
        qs = self.get_queryset()

        # Use the python context manager to start a database transaction.
        # If there are any errors, the changes are rolled back and not saved.
        # https://www.python.org/dev/peps/pep-0343/
        with transaction.atomic():
            start = int(new_position)
            end = obj.number
            # determines to shift a range of pages up or down
            delta = 1
            if start > end:
                delta = -1
                # keep start < end
                start, end = end, start

            filter_args = {
                self.parent_field: getattr(obj, self.parent_field),
                'number__gte': start,
                'number__lt': end,
            }
            qs.filter(
                **filter_args
            ).exclude(
                # Don't update the item being moved
                pk=obj.pk
            ).update(
                # F expression used to update multiple objects in db without using a
                # for loop in python.
                # https://docs.djangoproject.com/en/3.1/ref/models/expressions/#f-expressions
                number=F('number') + delta
            )

            # put the page in its new position
            obj.number = new_position
            obj.save()

    def create(self, **kwargs):
        instance = self.model(**kwargs)
        # see move function above
        with transaction.atomic():
            # get how many siblings a page has
            filter_args = {
                self.parent_field: getattr(instance, self.parent_field)
            }
            siblings = self.filter(
                **filter_args
            ).count()

            # where the page wants to be placed
            target = instance.number
            # put the page at the end of the list for now
            instance.number = siblings + 1
            # move the page to its target location
            self.move(instance, target)
            instance.save()

            return instance

    # TODO: move item on post/patch request


class PageManager(OrderManager):
    parent_field = 'portfolio'


class SectionManager(OrderManager):
    parent_field = 'page'
