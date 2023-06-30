import uuid
from django.db import models

# Create your models here.

class Courses(models.Model):
    id = models.UUIDField(primary_key=True,default=uuid.uuid4,null=False,unique=True,editable=False)
    title = models.CharField(max_length=80)
    duration = models.FloatField(null=True,blank=True)
    price=models.IntegerField(null=True, blank=True)
    category = models.CharField(max_length=50)
    course_image =models.ImageField(upload_to='courses/images',null=True,blank=True)
    def __str__(self):
        return self.title
class Sections(models.Model):
    id = models.UUIDField(primary_key=True,default=uuid.uuid4,null=False,editable=False)
    section = models.CharField(max_length=100)
    courses = models.ForeignKey(Courses,on_delete=models.CASCADE) 
    def __str__(self):
        return self.section
      
class Video(models.Model):
    id = models.UUIDField(primary_key=True,default=uuid.uuid4,null=False,editable=False)
    video = models.FileField(upload_to='video/videos')
    title = models.CharField(max_length=150)
    course = models.ForeignKey(Courses,on_delete=models.CASCADE,related_name='video')
    section = models.OneToOneField(Sections,on_delete=models.SET_NULL,null=True)
    def __str__(self):
        return self.title

    
