from django.db import models

# Create your models here.
class Profile(models.Model):
    username = models.CharField(max_length=30)
    fullname = models.CharField(max_length=30)
    password = models.CharField(max_length=30)
    phonenumber = models.CharField(max_length=10)
    country = models.CharField(max_length=10)
    email = models.EmailField(max_length=50)
    
    # fields = ['id', 'username', 'password', 'fullname', 'email', 'phonenumber','country' ]
    
    def __str__(self):
        return self.username
