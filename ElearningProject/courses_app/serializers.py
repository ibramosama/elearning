from rest_framework import serializers
from .models import Category, Course, Sections, Video


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = '__all__'


class SectionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sections
        fields = '__all__'


class CourseSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    instructor = serializers.StringRelatedField()
    students = serializers.StringRelatedField(many=True)
    video = VideoSerializer(many=True)
    sections = SectionsSerializer(many=True)

    class Meta:
        model = Course
        fields = '__all__'
