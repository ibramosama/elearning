
# serializers.py
from rest_framework import serializers
from .models import  AssignmentSubmission,  QuizQuestion, QuizOption, QuizSubmission, Certificate
from django.utils import timezone
from courses_app.models import Assignment, Quiz

from django.contrib.auth import get_user_model

User = get_user_model()
class AssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = '__all__'



class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = '__all__'


class QuizOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizOption
        fields = '__all__'


class QuizQuestionSerializer(serializers.ModelSerializer):
    options = QuizOptionSerializer(many=True)

    class Meta:
        model = QuizQuestion
        fields = '__all__'


class AssignmentSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssignmentSubmission
        fields = '__all__'

    def create(self, validated_data):
        assignment_submission = AssignmentSubmission.objects.create(**validated_data)

        assignment = assignment_submission.assignment
        user = assignment_submission.user

        if assignment.course.deadline < timezone.now():
            raise serializers.ValidationError("Assignment submission deadline has passed.")

        if AssignmentSubmission.objects.filter(user=user, assignment__course=assignment.course).count() == assignment.course.assignment_set.count():
            if all(submission.grade >= 70 for submission in AssignmentSubmission.objects.filter(user=user, assignment__course=assignment.course)):
                deadline = assignment.course.deadline
                if timezone.now() <= deadline:
                    certificate_data = {
                        'user': user,
                        'course': assignment.course,
                        'issue_date': timezone.now().date(),
                    }
                    certificate_serializer = CertificateSerializer(data=certificate_data)
                    if certificate_serializer.is_valid():
                        certificate_serializer.save()
        return assignment_submission


class QuizSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizSubmission
        fields = '__all__'

    def create(self, validated_data):
        quiz_submission = QuizSubmission.objects.create(**validated_data)

        quiz = quiz_submission.quiz
        user = quiz_submission.user

        # Check if all quizzes for the user have been completed before the deadline
        quizzes = Quiz.objects.filter(course=quiz.course)
        all_quizzes_completed = all(
            QuizSubmission.objects.filter(quiz=q, user=user, is_completed=True).exists()
            for q in quizzes
        )

        if all_quizzes_completed:
            # Generate the certificate if all quizzes are completed before the deadline
            deadline = quiz.course.deadline
            if timezone.now() <= deadline:
                certificate_data = {
                    'user': user,
                    'course': quiz.course,
                    'issue_date': timezone.now().date(),
                }
                certificate_serializer = CertificateSerializer(data=certificate_data)
                if certificate_serializer.is_valid():
                    certificate_serializer.save()

        return quiz_submission


class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = '__all__'
