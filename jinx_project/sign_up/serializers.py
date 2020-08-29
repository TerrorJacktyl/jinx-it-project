from rest_framework import serializers
from .models import SignUp

# What is a serializer?
# They allows complex data such as querysets and moodel instances to
# be converted to native python datatypes. From there, the data can be 
# easily rendered into JSON, XML, etc. to suit our needs
class SignUpSerializer(serializers.ModelSerializer):
  class Meta:
    model = SignUp
    fields = ('first_name', 'last_name', 'email', 'password')