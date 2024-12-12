from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from .models import UserProfile
from .serializers import UserProfileSerializer

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

class ProfileCreateView(generics.CreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    def create(self, request, *args, **kwargs):
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

class ProfileDetailView(generics.RetrieveAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer