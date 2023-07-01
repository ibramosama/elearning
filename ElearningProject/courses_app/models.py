from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Category(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Course(models.Model):
    title = models.CharField(max_length=80)
    duration = models.FloatField(null=True, blank=True)
    price = models.IntegerField(null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    course_image = models.ImageField(upload_to='courses/images', null=True, blank=True)
    instructor = models.ForeignKey(User, on_delete=models.CASCADE)
    students = models.ManyToManyField(User, related_name='courses', blank=True)
    is_approved = models.BooleanField(default=False)  # Approval status

    def __str__(self):
        return self.title


    
class Sections(models.Model):
    section = models.CharField(max_length=100)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)

    def __str__(self):
        return self.section


class Video(models.Model):
    video = models.FileField(upload_to='video/videos')
    title = models.CharField(max_length=150)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='video')
    section = models.OneToOneField(Sections, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.title


    
