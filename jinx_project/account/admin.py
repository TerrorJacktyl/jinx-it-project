from django.contrib import admin
from .models import Account

# Register your models here.

# Inline descriptor for Account (our modified user model)


class AccountInLine(admin.StackedInline):
    model = Account
    can_delete = False
    verbose_name_plural = 'account'

# # Possibly helpful future code
#
# # Redefine a user admin to use Account details. Unnecessary right now, but useful if we ever
# # want to do admin from the deployed site, rather than the Django admin panel.
# # E.g. the clients want to administer the platform.
# from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
# class UserAdmin(BaseUserAdmin):
#   inlines = (AccountInLine,)

# # Re-register user admin
# admin.site.unregister(User)
# admin.site.register(User, UserAdmin)
