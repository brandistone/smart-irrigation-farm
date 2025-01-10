from rest_framework import serializers
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['username', 'email', 'password', 'confirm_password', 'phone', 'fullname' ]
        extra_kwargs = {
            'password': {'write_only': True},
            'confirm_password': {'write_only': True},
        }


    def create(self, validated_data):
        print("Validated data:", validated_data)
        try:
            # Ensure `create_user` is properly defined in the UserProfile model or manager
            user = UserProfile.objects.create_user(**validated_data)
            return user
        except Exception as e:
            print("Error during user creation:", str(e))
            raise serializers.ValidationError({"error": "User creation failed", "details": str(e)})

    def validate(self, data):
        # Check if the email already exists
        email = data.get('email')
        if UserProfile.objects.filter(email=email).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        
        fullname = data.get('fullname')
        if not fullname:
            raise serializers.ValidationError("Full name is required.")
        
        


        # Check if the phone number already exists
        phone = data.get('phone')
        if UserProfile.objects.filter(phone=phone).exists():
            raise serializers.ValidationError("A user with this phone number already exists.")

        # Check if the username already exists
        username = data.get('username')
        if UserProfile.objects.filter(username=username).exists():
            raise serializers.ValidationError("A user with this username already exists.")
        
        # Validate password confirmation
        password = data.get('password')
        confirm_password = data.get('confirm_password')
        if password != confirm_password:
            raise serializers.ValidationError("Passwords do not match.")
        
        return data
