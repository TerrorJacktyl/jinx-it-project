from rest_framework import permissions


class AccountOwner(permissions.BasePermission):
    # users can only see their account
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user
