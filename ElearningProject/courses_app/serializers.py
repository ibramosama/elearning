from django.http import StreamingHttpResponse, Http404
from wsgiref.util import FileWrapper
from rest_framework import serializers

from Assign_Quizzes.serializers import AssignmentSerializer, QuizSerializer
from .models import Category, Course, Section, Video, Review, Cart, Enrollment, Assignment, Quiz


class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ('id', 'video', 'title')

        def to_representation(self, instance):
            request = self.context.get('request')
            if request and hasattr(instance, 'video'):
                video_path = instance.video.path

                try:
                    # Open the video file using FileWrapper and stream it
                    video_file = open(video_path, 'rb')
                    file_wrapper = FileWrapper(video_file)

                    response = StreamingHttpResponse(file_wrapper, content_type='video/mp4')
                    response['Content-Length'] = video_file.size
                    response['Content-Disposition'] = f'inline; filename="{instance.title}.mp4"'
                    return response
                except FileNotFoundError:
                    # Video file not found
                    raise Http404('Video not found.')

            return super().to_representation(instance)

class SectionSerializer(serializers.ModelSerializer):
    videos = VideoSerializer(many=True)
    assignments = AssignmentSerializer(many=True, required=False)
    quizzes = QuizSerializer(many=True, required=False)

    class Meta:
        model = Section
        fields = ('id', 'section', 'videos', 'assignments', 'quizzes')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('name',)


class CourseFieldsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('id', 'title', 'duration', 'price', 'course_image')


class CourseSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    instructor = serializers.StringRelatedField(default=serializers.CurrentUserDefault())
    students = serializers.StringRelatedField(many=True, read_only=True, default=[])
    sections = SectionSerializer(many=True)

    class Meta:
        model = Course
        fields = '__all__'

    def to_representation(self, instance):
        user = self.context['request'].user

        # Exclude 'is_approved' field for non-instructors during updates
        if self.context['request'].method in ['PUT', 'GET', 'POST']:
            if not user.is_staff and user == instance.instructor:
                self.fields.pop('is_approved', None)

        return super().to_representation(instance)

    def create(self, validated_data):
        sections_data = validated_data.pop('sections')

        category_data = validated_data.pop('category')
        category = Category.objects.get_or_create(**category_data)[0]
        validated_data['category'] = category

        # Remove 'is_approved' from validated_data if the user is not an admin
        user = self.context['request'].user
        if not user.is_staff:
            validated_data.pop('is_approved', None)

        course = Course.objects.create(**validated_data)

        for section_data in sections_data:
            videos = section_data.pop('videos', [])
            assignments= section_data.pop('assignments', [])
            quizzes= section_data.pop('quizzes', [])
            section = Section.objects.create(course=course, **section_data)

            for video_data in videos:
                video_data['section'] = section  # Set the section for each video
                video_data['course_id'] = course.id  # Set the course ID for each video
                video = Video.objects.create(**video_data)
            for assignments_data in assignments:
                assignments_data['course_id'] = course.id  # Set the course ID for each video
                assignment = Assignment.objects.create(**assignments_data)
            for Quiz_data in quizzes:
                Quiz_data['course_id'] = course.id  # Set the course ID for each video
                quiz = Quiz.objects.create(**Quiz_data)

        return course

    def update(self, instance, validated_data):
        user = self.context['request'].user

        # Check if the user is the instructor of the course
        if user == instance.instructor:
            instance.title = validated_data.get('title', instance.title)
            instance.duration = validated_data.get('duration', instance.duration)
            instance.price = validated_data.get('price', instance.price)
            # Update any other fields here

            # Update the category if provided
            category_data = validated_data.get('category')
            if category_data:
                category = instance.category
                category.name = category_data.get('name', category.name)
                category.save()

            # Update the sections if provided
            sections_data = validated_data.get('sections')
            if sections_data:
                existing_section_ids = [section.id for section in instance.sections.all()]
                for section_data in sections_data:
                    section_id = section_data.get('id')
                    if section_id and section_id in existing_section_ids:
                        section = Section.objects.get(id=section_id)
                        section.section = section_data.get('section', section.section)
                        section.save()

                        videos_data = section_data.get('videos')
                        if videos_data:
                            existing_video_ids = [video.id for video in section.videos.all()]
                            for video_data in videos_data:
                                video_id = video_data.get('id')
                                if video_id and video_id in existing_video_ids:
                                    video = Video.objects.get(id=video_id)
                                    video.video = video_data.get('video', video.video)
                                    video.title = video_data.get('title', video.title)
                                    video.save()

            instance.save()

            # Retrieve the updated instance from the database
            updated_instance = Course.objects.get(pk=instance.pk)

            return updated_instance

        # Check if the user is an admin
        elif user.role == "admin":
            is_approved = validated_data.get('is_approved', instance.is_approved)  # Use instance.is_approved as default value
            if is_approved is not None:
                instance.is_approved = is_approved
                instance.save()
                return instance

        raise serializers.ValidationError("You do not have permission to update this course.")


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('id', 'course', 'user', 'rating', 'comment')


class CourseListSerializer(serializers.ModelSerializer):
    demo = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    sections = serializers.SerializerMethodField()
    category =serializers.ReadOnlyField(source='category.name')


    class Meta:
        model = Course
        fields = ('id', 'title', 'duration', 'price', 'category', 'course_image', 'description', 'demo', 'sections', 'level')

    def get_sections(self, obj):
        sections = Section.objects.filter(course=obj.id).all()
        section_data = []
        for section in sections:
            videos = section.videos.all()
            video_titles = [video.title for video in videos]
            section_data.append({
                'section': section.section,
                'videos': video_titles
            })
        return section_data

    def get_demo(self, obj):
        # Retrieve the first video of the course

        first_video = Video.objects.filter(course=obj.id).first()
        if first_video:
            request = self.context.get('request')
            video_url = first_video.video.url
            if request is not None:
                return request.build_absolute_uri(video_url)
            return video_url

        return None

    def get_description(self, obj):
        # Return the description of the course
        return obj.description




class CartSerializer(serializers.ModelSerializer):
    total_price = serializers.ReadOnlyField()

    class Meta:
        model = Cart
        fields = ('user', 'courses', 'total_price')


class EnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = ('user', 'course', 'date_enrolled')


