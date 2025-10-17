from rest_framework.permissions import BasePermission, SAFE_METHODS


class SafeAuthentication(BasePermission):
    def has_permission(self, request, view):
        return True if request.method in SAFE_METHODS or request.user.is_authenticated else False
