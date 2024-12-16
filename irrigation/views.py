from rest_framework import generics, status
from rest_framework.response import Response
from .models import UserProfile
from .serializers import UserProfileSerializer
from rest_framework.permissions import AllowAny

class ProfileCreateView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    def perform_create(self, serializer):
        try:
            serializer.save()
            print("Profile saved successfully")
        except Exception as e:
            print("Error saving profile:", str(e))
            raise

    def create(self, request, *args, **kwargs):
        # This method is called by DRF automatically
        serializer = self.get_serializer(data=request.data)
        
        try:
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            
            return Response({
                'message': 'Profile created successfully',
                'data': serializer.data
            }, status=status.HTTP_201_CREATED)
        
        except serializers.ValidationError as e:
            return Response({
                'message': 'Validation Error',
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
