
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
        fields = ('id', 'title', 'instructions', 'deadline_days', 'file')
class QuizOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizOption
        fields = ('option_text', 'is_correct')

class QuizQuestionSerializer(serializers.ModelSerializer):
    options = QuizOptionSerializer(many=True, source='quizoption_set', read_only=True)

    class Meta:
        model = QuizQuestion
        fields = ('question_text', 'options')

    def create(self, validated_data):
        options_data = validated_data.pop('quizoption_set')
        question = QuizQuestion.objects.create(**validated_data)
        for option_data in options_data:
            QuizOption.objects.create(question=question, **option_data)
        return question

class QuizSerializer(serializers.ModelSerializer):
    questions = QuizQuestionSerializer(many=True)

    class Meta:
        model = Quiz
        fields = ('title', 'course', 'instructions', 'start_time', 'end_time', 'deadline_days', 'section', 'questions')

    def create(self, validated_data):
        questions_data = validated_data.pop('questions')
        quiz = Quiz.objects.create(**validated_data)
        for question_data in questions_data:
            options_data = question_data.pop('options', [])  # Use empty list as default
            question = QuizQuestion.objects.create(quiz=quiz, **question_data)
            for option_data in options_data:
                QuizOption.objects.create(question=question, **option_data)
        return quiz

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

    def calculate_grade(self, quiz_submission):
        # Get the related quiz instance
        quiz = quiz_submission.quiz

        # Get the related quiz questions with their options
        quiz_questions = quiz.questions.prefetch_related('options')

        # Get the submitted answers for the quiz submission
        submission_answers = quiz_submission.submission_answers.all()

        correct_answers_count = 0

        # Loop through the quiz questions and compare the submitted answers with the correct options
        for question in quiz_questions:
            # Get the correct options for the current question
            correct_options = question.options.filter(is_correct=True).values_list('id', flat=True)

            # Get the submitted answer for the current question (if available)
            submission_answer = submission_answers.filter(question=question).first()

            # Check if the submitted answer matches the correct options
            if submission_answer and submission_answer.option.id in correct_options:
                correct_answers_count += 1

        # Calculate the grade as a percentage of correct answers
        total_questions = quiz_questions.count()
        grade = (correct_answers_count / total_questions) * 100

        return round(grade, 2)

class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = '__all__'
