from rest_framework import serializers
from .models import User

# What is a serializer?
# They allows complex data such as querysets and moodel instances to
# be converted to native python datatypes. From there, the data can be 
# easily rendered into JSON, XML, etc. to suit our needs
class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('first_name', 'last_name', 'email', 'password')