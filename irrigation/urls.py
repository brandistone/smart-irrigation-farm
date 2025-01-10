from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import  ProfileCreateView


# Create a router for ViewSet
# router = DefaultRouter()
# router.register(r'profiles', UserProfileViewSet)

urlpatterns = [
    path('profile/create/', ProfileCreateView.as_view(), name='profile-create'),
    
    # path('profile/<int:pk>/', ProfileDetailView.as_view(), name='profile-detail'),
]

