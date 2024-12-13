from django.db import models
from django.core.validators import RegexValidator

class UserProfile(models.Model):
    # id = models.AutoField(primary_key=True)
    # Name Field
    username = models.CharField(
        max_length=100, 
        verbose_name='Full Name',
        help_text='Enter your full name'
    )
    
    # Email Field with Unique Constraint
    email = models.EmailField(
        unique=True, 
        verbose_name='Email Address',
        help_text='Enter a valid email address'
    )
    
    # # Phone Number Field with Validation
    # phone_regex = RegexValidator(
    #     regex=r'^\+?1?\d{9,15}$', 
    #     message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed."
    # )
    # phone = models.CharField(
    #     validators=[phone_regex], 
    #     max_length=17, 
    #     verbose_name='Phone Number',
    #     help_text='Enter your phone number',
    #     null=True,  # Make phone optional
    #     blank=True
    # )
    
    # # Country Field - Made nullable with default
    # country = models.CharField(
    #     max_length=100, 
    #     verbose_name='Country',
    #     help_text='Enter your country',
    #     null=True,  # Allow null values
    #     blank=True, # Allow blank in forms
    #     default='Unknown'  # Provide a default value
    # )
    
    # # Additional Optional Fields
    # farm_size = models.DecimalField(
    #     max_digits=10, 
    #     decimal_places=2, 
    #     null=True, 
    #     blank=True,
    #     verbose_name='Farm Size (Hectares)'
    # )
    
    # # Timestamp Fields
    # created_at = models.DateTimeField(auto_now_add=True)
    # updated_at = models.DateTimeField(auto_now=True)
    
    # # Metadata and String Representation
    # class Meta:
    #     verbose_name = 'User Profile'
    #     verbose_name_plural = 'User Profiles'
    #     ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.name} - {self.email}"