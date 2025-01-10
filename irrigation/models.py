from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.validators import RegexValidator

class UserProfile(AbstractUser):

    fullname = models.CharField(
        max_length=150,
        verbose_name='Full Name',
        help_text='Enter your full name'
    )
    # Phone Number Field with Validation
    phone_regex = RegexValidator(
        regex=r'^\+?1?\d{9,15}$', 
        message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed."
    )
    phone = models.CharField(
        validators=[phone_regex], 
        max_length=17, 
        verbose_name='Phone Number',
        help_text='Enter your phone number',
        null=True,  
        blank=True
    )

    
    email = models.EmailField(
        unique=True,
        verbose_name='Email Address',
        help_text='Enter your email address'
    )

    username = models.CharField(
        max_length=150,
        unique=True,
        verbose_name='Username',
        help_text='Enter your username'
    )

    password = models.CharField(
        max_length=128,
        verbose_name='Password',
        help_text='Enter your password'
    )

    # country = models.CharField(
    #     max_length=100,
    #     verbose_name='Country',
    #     help_text='Enter your country',
    #     null=True,
    #     blank=True
    # )

    # # Additional Optional Fields
    # farm_size = models.DecimalField(
    #     max_digits=10, 
    #     decimal_places=2, 
    #     null=True, 
    #     blank=True,
    #     verbose_name='Farm Size (Hectares)'
    # )

    # Timestamp Fields
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'User Profile'
        verbose_name_plural = 'User Profiles'
        ordering = ['-created_at']