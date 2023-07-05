from django.http import StreamingHttpResponse, Http404
from wsgiref.util import FileWrapper
from rest_framework import serializers

from Assign_Quizzes.serializers import AssignmentSerializer, QuizSerializer
from authentication_app.models import User
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
    videos = VideoSerializer(many=True, required=False)
    assignments = AssignmentSerializer(many=True, required=False)
    quizzes = QuizSerializer(many=True, required=False)

    class Meta:
        model = Section
        fields = ('id', 'section', 'videos', 'assignments', 'quizzes')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('name',)

class InstructorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username',)  # Add any other fields you want to include

class CourseFieldsSerializer(serializers.ModelSerializer):
    instructor = InstructorSerializer()
<<<<<<< HEAD
    category = serializers.ReadOnlyField(source='category.name')
    class Meta:
        model = Course
        fields = ('id', 'title', 'duration', 'price', 'course_image', 'instructor', 'level', 'category')
=======
    category =serializers.ReadOnlyField(source='category.name')
    class Meta:
        model = Course
        fields = ('id', 'title', 'duration', 'price', 'course_image','instructor','level','category')
    
>>>>>>> 66723d20e03a8d5800a6bda079041d49bb956233


class CourseSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    instructor = serializers.StringRelatedField(default=serializers.CurrentUserDefault())
    students = serializers.StringRelatedField(many=True, read_only=True, default=[])
    sections = SectionSerializer(many=True, default=[])

    class Meta:
        model = Course
        fields = '__all__'

    students = serializers.SerializerMethodField()

    def get_students(self, instance):
        enrolled_students = User.objects.filter(enrollment__course=instance)
        student_names = [student.username for student in enrolled_students]
        return student_names

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        user = self.context['request'].user

        if self.context['request'].method in ['PUT', 'GET', 'POST']:
            if not user.is_staff and user == instance.instructor:
                representation.pop('is_approved', None)

        return representation

    def create(self, validated_data):
        sections_data = validated_data.pop('sections')
        category_data = validated_data.pop('category')
        category = Category.objects.get_or_create(**category_data)[0]
        validated_data['category'] = category

        # Remove 'is_approved' from validated_data if the user is not an admin
        user = self.context['request'].user
        if not user.role == 'admin':
            validated_data.pop('is_approved', None)

        course = Course.objects.create(**validated_data)

        for section_data in sections_data:
            videos_data = section_data.pop('videos', [])
            assignments_data = section_data.pop('assignments', [])  # Get assignments data from section_data
            quizzes_data = section_data.pop('quizzes', [])  # Get quizzes data from section_data
            section = Section.objects.create(course=course, **section_data)

            for video_data in videos_data:
                video_data['section'] = section
                video_data['course_id'] = course.id
                video = Video.objects.create(**video_data)

            for assignment_data in assignments_data:
                assignment_data['section'] = section
                assignment_data['course'] = course
                assignment = Assignment.objects.create(**assignment_data)  # Save the Assignment

            for quiz_data in quizzes_data:
                quiz_data['section'] = section
                quiz_data['course'] = course
                quiz = Quiz.objects.create(**quiz_data)  # Save the Quiz

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

                        assignments_data = section_data.get('assignments')
                        if assignments_data:
                            existing_assignment_ids = [assignment.id for assignment in section.assignments.all()]
                            for assignment_data in assignments_data:
                                assignment_id = assignment_data.get('id')
                                if assignment_id and assignment_id in existing_assignment_ids:
                                    assignment = Assignment.objects.get(id=assignment_id)
                                    assignment.title = assignment_data.get('title', assignment.title)
                                    assignment.instructions = assignment_data.get('instructions',
                                                                                  assignment.instructions)
                                    assignment.deadline_days = assignment_data.get('deadline_days',
                                                                                   assignment.deadline_days)
                                    assignment.file = assignment_data.get('file', assignment.file)
                                    assignment.save()

                        quizzes_data = section_data.get('quizzes')
                        if quizzes_data:
                            existing_quiz_ids = [quiz.id for quiz in section.quizzes.all()]
                            for quiz_data in quizzes_data:
                                quiz_id = quiz_data.get('id')
                                if quiz_id and quiz_id in existing_quiz_ids:
                                    quiz = Quiz.objects.get(id=quiz_id)
                                    quiz.title = quiz_data.get('title', quiz.title)
                                    quiz.instructions = quiz_data.get('instructions', quiz.instructions)
                                    quiz.start_time = quiz_data.get('start_time', quiz.start_time)
                                    quiz.end_time = quiz_data.get('end_time', quiz.end_time)
                                    quiz.deadline_days = quiz_data.get('deadline_days', quiz.deadline_days)
                                    quiz.save()

            instance.save()

            # Retrieve the updated instance from the database
            updated_instance = Course.objects.get(pk=instance.pk)

            return updated_instance

        # Check if the user is an admin
        elif user.role == "admin":
            is_approved = validated_data.get('is_approved',
                                             instance.is_approved)  # Use instance.is_approved as default value
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
    sections=serializers.SerializerMethodField()
    category =serializers.ReadOnlyField(source='category.name')
    class Meta:
        model = Course
        fields = ('id', 'title', 'duration', 'price', 'category', 'course_image', 'description', 'demo','sections','level')
    
    # def get_category(self,obj):
    #     category = Category.objects.get(pk=obj.)
    #     return category
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


