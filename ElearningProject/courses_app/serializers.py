from rest_framework import serializers
from .models import Category, Course, Section, Video, Review, Cart, Enrollment, Assignment, Quiz


class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ('id', 'video', 'title')


class SectionSerializer(serializers.ModelSerializer):
    videos = VideoSerializer(many=True)

    class Meta:
        model = Section
        fields = ('id', 'section', 'videos')


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
            section = Section.objects.create(course=course, **section_data)

            for video_data in videos:
                video_data['section'] = section  # Set the section for each video
                video_data['course_id'] = course.id  # Set the course ID for each video
                video = Video.objects.create(**video_data)

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

    class Meta:
        model = Course
        fields = ('id', 'title', 'duration', 'price', 'category', 'course_image', 'description', 'demo')

    def get_demo(self, obj):
        # Retrieve the demo video of the course
        try:
            demo_video = obj.videos.filter(demo=True).first()
            if demo_video:
                return VideoSerializer(demo_video).data
            else:
                return None
        except Video.DoesNotExist:
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


class AssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = ('id', 'course', 'title', 'description', 'deadline', 'max_marks')


class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = ('id', 'course', 'title', 'description', 'time_limit')


