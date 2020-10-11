from rest_framework import permissions, exceptions

from . import views
from . import models


class IsOwner(permissions.BasePermission):
    # only lets the owner of a model be able to view and edit the model
    # this only works on retrieve update destroy
    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user

    # for list views, check permissions on the parent object
    def has_permission(self, request, view):
        view_class = view.__class__
        if view_class == views.PortfolioList:
            return True

        if view_class == views.PageList:
            try:
                portfolio = models.Portfolio.objects.get(
                    id=view.kwargs.get('portfolio_id', None)
                )
            except models.Portfolio.DoesNotExist as exc:
                raise exceptions.NotFound() from exc

            return portfolio.owner == request.user

        if view_class == views.SectionList:
            try:
                page = models.Page.objects.get(
                    id=view.kwargs.get('page_id', None)
                )
            except models.Page.DoesNotExist:
                raise exceptions.NotFound() from exc

            return page.owner == request.user

        return True


class IsNotPrivate(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return not bool(obj.private)

    # check parent object permissions
    def has_permission(self, request, view):
        view_class = view.__class__
        if view_class == views.PortfolioList:
            return True

        if view_class == views.PageList:
            try:
                portfolio = models.Portfolio.objects.get(
                    id=view.kwargs.get('portfolio_id', None)
                )
            except models.Portfolio.DoesNotExist as exc:
                raise exceptions.NotFound() from exc

            return not bool(portfolio.private)

        if view_class == views.SectionList:
            try:
                page = models.Page.objects.get(
                    id=view.kwargs.get('page_id', None)
                )
            except models.Page.DoesNotExist as exc:
                raise exceptions.NotFound() from exc

            return not bool(page.private)

        return True
