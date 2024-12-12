from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserProfileViewSet, ProfileCreateView, ProfileDetailView

# Create a router for ViewSet
router = DefaultRouter()
router.register(r'profiles', UserProfileViewSet)

urlpatterns = [
    # ViewSet routes
    path('', include(router.urls)),
    
    # Additional specific routes
    path('profile/create/', ProfileCreateView.as_view(), name='profile-create'),
    path('profile/<int:pk>/', ProfileDetailView.as_view(), name='profile-detail'),
]