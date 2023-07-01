
# serializers.py
from rest_framework import serializers
from .models import Assignment, AssignmentSubmission, Quiz, QuizQuestion, QuizOption, QuizSubmission, Certificate
from django.utils import timezone


class AssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = '__all__'


class AssignmentSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssignmentSubmission
        fields = '__all__'

    def create(self, validated_data):
        assignment_submission = AssignmentSubmission.objects.create(**validated_data)

        if assignment_submission.is_completed:
            # Generate the certificate if the assignment is completed successfully
            certificate_data = {
                'user': validated_data['user'],
                'course': validated_data['assignment'].course,
                'issue_date': timezone.now().date(),
            }
            certificate_serializer = CertificateSerializer(data=certificate_data)
            if certificate_serializer.is_valid():
                certificate_serializer.save()

        return assignment_submission


class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = '__all__'


class QuizQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizQuestion
        fields = '__all__'


class QuizOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizOption
        fields = '__all__'


class QuizSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizSubmission
        fields = '__all__'

    def create(self, validated_data):
        quiz_submission = QuizSubmission.objects.create(**validated_data)

        if quiz_submission.is_completed:
            # Generate the certificate if the quiz is completed successfully
            certificate_data = {
                'user': validated_data['user'],
                'course': validated_data['quiz'].course,
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