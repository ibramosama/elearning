from datetime import timedelta, datetime

from django.db import models
from django.contrib.auth import get_user_model
from django.http import FileResponse
from rest_framework.exceptions import PermissionDenied

User = get_user_model()


class Category(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Course(models.Model):
    LEVEL_CHOICES = (
        ('beginner', 'Beginner'),
        ('expert', 'Expert'),
        ('intermediate', 'Intermediate'),
    )
    title = models.CharField(max_length=80)
    duration = models.FloatField(null=True, blank=True)
    price = models.IntegerField(null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    course_image = models.ImageField(upload_to='courses/images')
    instructor = models.ForeignKey(User, on_delete=models.CASCADE)
    students = models.ManyToManyField(User, through='Enrollment', related_name='enrollments', default=[])
    is_approved = models.BooleanField(default=False)
    description = models.CharField(null=True, blank=True)
    level = models.CharField(max_length=20, choices=LEVEL_CHOICES)
    

    def __str__(self):
        return self.title


class Assignment(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    instructions = models.TextField()
    deadline_days = models.PositiveIntegerField()
    file = models.FileField(upload_to='assignments/', null=True, blank=True)

    def deadline(self, request):
        user = request.user
        if user.is_authenticated and user.role == "student":
            enrollment = Enrollment.objects.filter(user=user, course=self.course).first()
            if enrollment:
                deadline_date = enrollment.date_enrolled + timedelta(days=self.deadline_days)
                return deadline_date.date()
        return None

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        request = kwargs.pop('request', None)  # Get the request object if passed
        if request and request.user.is_authenticated and request.user.role == "student":
            enrollment = Enrollment.objects.filter(user=self.user, course=self.assignment.course).first()
            if enrollment:
                if not self.is_completed and datetime.now() <= self.assignment.deadline:
                    if self.grade is not None and self.grade >= 70:
                        self.is_completed = True
                        super().save(*args, **kwargs)
                    else:
                        self.is_completed = False



class Quiz(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='course_quizzes')
    title = models.CharField(max_length=255)
    instructions = models.TextField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    deadline_days = models.PositiveIntegerField()

    def deadline(self, request):
        user = request.user
        if user.is_authenticated and user.role == "student":
            enrollment = Enrollment.objects.filter(user=user, course=self.course).first()
            if enrollment:
                deadline_date = enrollment.date_enrolled + timedelta(days=self.deadline_days)
                return deadline_date.date()
        return None

    def save(self, *args, **kwargs):

        if not self.is_completed and datetime.now() <= self.quiz.deadline:
            if self.score is not None and self.score >= 70:
                self.is_completed = True
                super().save(*args, **kwargs)
            else:
                self.is_completed = False


class Enrollment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    date_enrolled = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} enrolled in {self.course.title}"


class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    courses = models.ManyToManyField(Course, related_name='carts')

    def __str__(self):
        return f"Cart for {self.user.username}"

    @property
    def total_price(self):
        return sum(course.price for course in self.courses.all())


class Section(models.Model):
    section = models.CharField(max_length=100)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='sections')

    def __str__(self):
        return self.section


class Video(models.Model):
    video = models.FileField(upload_to='video/videos')
    title = models.CharField(max_length=150)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='videos')
    section = models.ForeignKey(Section, on_delete=models.CASCADE, related_name='videos')

    def __str__(self):
        return self.title

    def stream_video(self, request):
        video_path = self.video.path
        video_file = open(video_path, 'rb')
        response = FileResponse(video_file)
        return response


class Review(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.IntegerField()
    comment = models.TextField()

    def __str__(self):
        return f"Review for {self.course.title} by {self.user.username}"
