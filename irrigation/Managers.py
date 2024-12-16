from django.contrib.auth.models import BaseUserManager

class CustomUserManager(BaseUserManager):
    def create_user(self, email, fullname, password=None, **extra_fields):
        if not email:
            raise ValueError("Users must have an email address")
        
        # Normalize email
        email = self.normalize_email(email)
        
        # Create user instance
        user = self.model(email=email, fullname=fullname, **extra_fields)
        
        # Set password using Django's built-in method
        user.set_password(password)
        user.save(using=self._db)
        
        return user

    def create_superuser(self, email, fullname, password=None, **extra_fields):
        # Set default fields for superuser
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get('is_superuser') is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        # Call the create_user method to create the superuser
        return self.create_user(email, fullname, password, **extra_fields)
