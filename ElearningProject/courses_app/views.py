from django.shortcuts import render
from rest_framework import generics, parsers,viewsets
from .models import Video,Courses,Sections
from .serializers import VideoSerializer,CoursesSerializer,SectionsSerializer,CoursesWithVideoSerializer

# Create your views here.
class CoursesViewSet(viewsets.ModelViewSet):
    queryset =Courses.objects.all()
    serializer_class = CoursesSerializer
    


class VideoViewSet(viewsets.ModelViewSet):
    queryset =Video.objects.all()
    serializer_class=VideoSerializer
    parser_classes=[parsers.MultiPartParser]
    
class SectionViewSet(viewsets.ModelViewSet):
    queryset =Sections.objects.all()
    serializer_class=SectionsSerializer

class CourseWithvideoViewSet(generics.ListCreateAPIView):
    
    queryset =Courses.objects.all()
    serializer_class =CoursesWithVideoSerializer
    parser_classes=[parsers.MultiPartParser]

    
