from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from .models import UserProfile
from .serializers import UserProfileSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

class ProfileCreateView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    def post(self, request, *args, **kwargs):
        print("Received data:", request.data)
        
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            try:
                serializer.save()
                print("Saved successfully")
                return Response({"message": "Success"}, status=status.HTTP_201_CREATED)
            except Exception as e:
                print("Error saving data:", str(e))
                return Response({"message": "Error saving data", "details": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        print("Validation failed:", serializer.errors)
        return Response({"message": "Failed", "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

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