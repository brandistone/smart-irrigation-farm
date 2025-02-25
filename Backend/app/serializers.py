from django.contrib.auth.models import User
from rest_framework import serializers
from app.models import Profile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user        
        
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'username', 'password', 'fullname', 'email', 'phonenumber','country' ]
        extra_kwargs = {'email': {'write_only': True}}

"""
    fullname: '',
        username: '', #already from user
        password: '', #already from user
        confirm_password: '', # Not necessary
        phonenumber: '', 
        email: '',
        county: '',
"""
