from django.contrib import admin
from .models import SignUp

# Register defined models here so that they can be updated through
# the admin page

class SignUpAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'password')

admin.site.register(SignUp, SignUpAdmin)

