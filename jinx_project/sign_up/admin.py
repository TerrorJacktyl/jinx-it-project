from django.contrib import admin
from .models import Sign_Up

# Register defined models here so that they can be updated through
# the admin page

class Sign_Up_Admin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'password')

admin.site.register(Sign_Up, Sign_Up_Admin)

