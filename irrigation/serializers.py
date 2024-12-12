from rest_framework import serializers
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = [
            'id', 
            'name', 
            'email', 
            'phone', 
            'country', 
            'farm_size',
            'created_at',
            'updated_at'
        ]
    
    # Custom Validation
    def validate_email(self, value):
        # Check if email already exists
        if UserProfile.objects.filter(email=value).exists():
            raise serializers.ValidationError("A profile with this email already exists.")
        return value
    
    def validate_phone(self, value):
        # Additional phone number validation if needed
        if not value.startswith('+'):
            raise serializers.ValidationError("Phone number should start with country code (+)")
        return value