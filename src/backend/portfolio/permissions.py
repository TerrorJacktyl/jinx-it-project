from rest_framework import permissions


class IsOwner(permissions.BasePermission):
    # only lets the owner of a model be able to view and edit the model
    # this only works on retrieve update destroy
    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user
