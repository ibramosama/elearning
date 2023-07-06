# models.py
from datetime import timedelta

from django.db import models
from django.contrib.auth import get_user_model
from rest_framework.exceptions import PermissionDenied

from courses_app.models import Course, Assignment, Quiz, Enrollment

User = get_user_model()

class AssignmentSubmission(models.Model):
    submission_id = models.AutoField(primary_key=True)
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    submission_date = models.DateTimeField()
    submitted_file = models.FileField(upload_to='assignments/')
    grade = models.DecimalField(max_digits=5, decimal_places=2, null=True)
    is_completed = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if self.user.is_authenticated and self.user.role == "student":
            enrollment = Enrollment.objects.filter(user=self.user, course=self.assignment.course).first()
            if enrollment:
                # Check if the assignment is submitted before the deadline
                if not self.is_completed and self.submission_date <= self.assignment.deadline:
                    # Add logic to check if the user has received a passing grade (>= 70%)
                    if self.grade is not None and self.grade >= 70:
                        self.is_completed = True
                super().save(*args, **kwargs)
            else:
                raise PermissionDenied("User is not enrolled in the course.")
        else:
            raise PermissionDenied("User does not have the role of 'student'.")

    def __str__(self):
        return f"Submission for {self.assignment.title} by {self.user.username}"



class QuizQuestion(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='questions')
    question_text = models.TextField()

class QuizOption(models.Model):
    question = models.ForeignKey(QuizQuestion, on_delete=models.CASCADE)
    option_text = models.CharField(max_length=255)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return self.option_text


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
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    issue_date = models.DateField()

    @property
    def is_certificate_generated(self):
        return self.user.quizsubmission_set.filter(quiz__course=self.course,
                                                   is_completed=True).count() == self.course.quiz_set.count() and \
            self.user.assignmentsubmission_set.filter(assignment__course=self.course,
                                                      is_completed=True).count() == self.course.assignment_set.count() and \
            all(quiz.score >= 70 for quiz in self.user.quizsubmission_set.filter(quiz__course=self.course)) and \
            all(assignment.grade >= 70 for assignment in
                self.user.assignmentsubmission_set.filter(assignment__course=self.course))
