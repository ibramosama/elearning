from django.shortcuts import get_object_or_404
from django.http import JsonResponse, Http404
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Assignment, AssignmentSubmission, Quiz, QuizQuestion, QuizOption, QuizSubmission
from .serializers import (
    AssignmentSerializer,
    AssignmentSubmissionSerializer,
    QuizSerializer,
    QuizQuestionSerializer,
    QuizOptionSerializer,
    QuizSubmissionSerializer
)
from .permission import IsInstructor, IsEnrolledStudent
from datetime import datetime


# Assignment views

class AssignmentList(APIView):
    permission_classes = [IsAuthenticated, IsInstructor]

    def get(self, request):
        assignments = Assignment.objects.filter(course__instructor=request.user)
        serializer = AssignmentSerializer(assignments, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = AssignmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AssignmentDetail(APIView):
    permission_classes = [IsAuthenticated, IsEnrolledStudent]

    def get_object(self, assignment_id):
        return get_object_or_404(Assignment, assignment_id=assignment_id)

    def get(self, request, assignment_id):
        assignment = self.get_object(assignment_id)
        serializer = AssignmentSerializer(assignment)
        return Response(serializer.data)

    def post(self, request, assignment_id):
        assignment = self.get_object(assignment_id)
        serializer = AssignmentSubmissionSerializer(data=request.data)
        if serializer.is_valid():
            user_submissions = AssignmentSubmission.objects.filter(user=request.user, assignment=assignment)
            if user_submissions.count() >= 3:
                return Response({'error': 'Maximum submission limit reached'}, status=status.HTTP_400_BAD_REQUEST)
            
            if datetime.now() > assignment.deadline:
                return Response({'error': 'Assignment submission deadline has passed'}, status=status.HTTP_400_BAD_REQUEST)
            
            serializer.save(user=request.user, assignment=assignment)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Quiz views

class QuizList(APIView):
    permission_classes = [IsAuthenticated, IsInstructor]

    def get(self, request):
        quizzes = Quiz.objects.filter(course__instructor=request.user)
        serializer = QuizSerializer(quizzes, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = QuizSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class QuizDetail(APIView):
    permission_classes = [IsAuthenticated, IsEnrolledStudent]

    def get_object(self, quiz_id):
        return get_object_or_404(Quiz, quiz_id=quiz_id)

    def get(self, request, quiz_id):
        quiz = self.get_object(quiz_id)
        serializer = QuizSerializer(quiz)
        return Response(serializer.data)

    def post(self, request, quiz_id):
        quiz = self.get_object(quiz_id)
        serializer = QuizSubmissionSerializer(data=request.data)
        if serializer.is_valid():
            user_submissions = QuizSubmission.objects.filter(user=request.user, quiz=quiz)
            if user_submissions.count() >= 3:
                return Response({'error': 'Maximum submission limit reached'}, status=status.HTTP_400_BAD_REQUEST)
            
            if datetime.now() > quiz.deadline:
                return Response({'error': 'Quiz submission deadline has passed'}, status=status.HTTP_400_BAD_REQUEST)
            
            serializer.save(user=request.user, quiz=quiz)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class QuizQuestionList(APIView):
    permission_classes = [IsAuthenticated, IsInstructor]

    def get(self, request, quiz_id):
        quiz = get_object_or_404(Quiz, quiz_id=quiz_id)
        questions = QuizQuestion.objects.filter(quiz=quiz)
        serializer = QuizQuestionSerializer(questions, many=True)
        return Response(serializer.data)

    def post(self, request, quiz_id):
        quiz = get_object_or_404(Quiz, quiz_id=quiz_id)
        serializer = QuizQuestionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(quiz=quiz)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class QuizOptionList(APIView):
    permission_classes = [IsAuthenticated, IsInstructor]

    def get(self, request, question_id):
        question = get_object_or_404(QuizQuestion, question_id=question_id)
        options = QuizOption.objects.filter(question=question)
        serializer = QuizOptionSerializer(options, many=True)
        return Response(serializer.data)

    def post(self, request, question_id):
        question = get_object_or_404(QuizQuestion, question_id=question_id)
        serializer = QuizOptionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(question=question)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
