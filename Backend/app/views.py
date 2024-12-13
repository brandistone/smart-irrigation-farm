from django.shortcuts import render
from app.models import Profile
from  django.contrib.auth.models import User
from app.serializers import UserSerializer, UserProfileSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated

# Create your views here.

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
class CreateUserProfile(generics.CreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [AllowAny]  
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()   
        print(serializer.errors)            
    
    
    
    