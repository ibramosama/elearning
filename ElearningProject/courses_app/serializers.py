
from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework import parsers, status
from .models import Courses, Video ,Sections
from itertools import zip_longest
class CoursesSerializer(serializers.ModelSerializer):
    class Meta:
        model= Courses
        fields =['id','title','duration','price','category','course_image']
        
class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model= Video
        fields= ['id', 'video', 'title', 'course', 'section']

class CoursesWithVideoSerializer(serializers.ModelSerializer):
    
    video =VideoSerializer(many=True,read_only=True)
    uploaded_video =serializers.ListField(
        child=serializers.FileField(allow_empty_file=False, use_url=False),
        write_only=True
    )
    video_title=serializers.ListField(
        child=serializers.CharField(),
        write_only=True
    )
    class Meta:
        model= Courses
        fields =['id','title','duration','price','category','course_image','uploaded_video','video','video_title']
        
    def create(self, validated_data):
        print(self.context)
        print(validated_data)
        uploaded_video = validated_data.pop('uploaded_video')
        video_title=validated_data.pop('video_title')
        course = Courses.objects.create(**validated_data)
        
        for video,title in zip_longest(uploaded_video,video_title):
            print(video)
            Video.objects.create(course=course, video=video,title=title)
        return course
        
class SectionsSerializer(serializers.ModelSerializer):
    class Meta:
        model= Sections
        fields =['section','courses']
        
        