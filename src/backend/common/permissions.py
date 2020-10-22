from rest_framework import permissions

class IsReadOnly(permissions.BasePermission):
    def is_safe(self, method):
        return bool(
            method in permissions.SAFE_METHODS
        )

    def has_object_permission(self, request, view, obj):
        return self.is_safe(request.method)

    def has_permission(self, request, view):
        return self.is_safe(request.method)
