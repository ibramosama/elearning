# models.py
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Assignment(models.Model):
    assignment_id = models.AutoField(primary_key=True)
    course = models.ForeignKey('courses_app.Courses', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    instructions = models.TextField()
    deadline = models.DateTimeField()


class AssignmentSubmission(models.Model):
    submission_id = models.AutoField(primary_key=True)
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    submission_date = models.DateTimeField()
    submitted_file = models.FileField(upload_to='assignments/')  
    grade = models.DecimalField(max_digits=5, decimal_places=2, null=True)

    is_completed = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        # Check if the assignment is submitted before the deadline
        if not self.is_completed and self.submission_date <= self.assignment.deadline:
            # Add logic to check if the user has received a passing grade (>= 70%)
            if self.grade is not None and self.grade >= 70:
                self.is_completed = True
        super().save(*args, **kwargs)


class Quiz(models.Model):
    quiz_id = models.AutoField(primary_key=True)
    course = models.ForeignKey('courses_app.Courses', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    instructions = models.TextField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    deadline = models.DateTimeField()


class QuizQuestion(models.Model):
    question_id = models.AutoField(primary_key=True)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    question_text = models.TextField()


class QuizOption(models.Model):
    option_id = models.AutoField(primary_key=True)
    question = models.ForeignKey(QuizQuestion, on_delete=models.CASCADE)
    option_text = models.CharField(max_length=255)
    is_correct = models.BooleanField()


class QuizSubmission(models.Model):
    submission_id = models.AutoField(primary_key=True)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    submission_date = models.DateTimeField()
    score = models.DecimalField(max_digits=5, decimal_places=2, null=True)

    is_completed = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        # Check if the quiz is submitted before the deadline
        if not self.is_completed and self.submission_date <= self.quiz.deadline:
            # Add logic to check if the user has received a passing score (>= 70%)
            if self.score is not None and self.score >= 70:
                self.is_completed = True
        super().save(*args, **kwargs)

class Certificate(models.Model):
    certificate_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey('courses_app.Courses', on_delete=models.CASCADE)
    issue_date = models.DateField()
