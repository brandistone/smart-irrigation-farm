from rest_framework import serializers
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'

    def create(self, validated_data):
        print("Validated data:", validated_data)
        try:
            # Ensure `create_user` is properly defined in the UserProfile model or manager
            user = UserProfile.objects.create_user(**validated_data)
            return user
        except Exception as e:
            print("Error during user creation:", str(e))
            raise serializers.ValidationError({"error": "User creation failed", "details": str(e)})
    

class UserProfileSerializer1(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = [
            # 'id', 
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