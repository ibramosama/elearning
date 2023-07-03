from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    ROLE_CHOICES = (
        ('student', 'Student'),
        ('admin', 'Admin'),
        ('instructor', 'Instructor'),
    )
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    image = models.ImageField(upload_to='user/images/')
    username = models.CharField(max_length=30, unique=True)
    email = models.EmailField()
    password = models.CharField(max_length=128)
    phone_number = models.CharField(max_length=11)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='student')

    REQUIRED_FIELDS = ['first_name', 'last_name']

    def get_full_name(self):
        return f"{self.first_name}{self.last_name}"

    def __str__(self):
        return self.username

    def save(self, *args, **kwargs):
        if self.role == 'admin':
            self.is_staff = True
            self.is_superuser = True
        super().save(*args, **kwargs)
