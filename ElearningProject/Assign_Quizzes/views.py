from io import BytesIO

from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status, generics

from courses_app.models import Course
from .models import (
    AssignmentSubmission,
    QuizQuestion,
    QuizOption,
    QuizSubmission,
    Certificate,
)
from .serializers import (
    AssignmentSerializer,
    AssignmentSubmissionSerializer,
    QuizSerializer,
    QuizQuestionSerializer,
    QuizOptionSerializer,
    QuizSubmissionSerializer,
)

from courses_app.models import Quiz, Assignment
from .permission import (
    IsInstructor,
    IsEnrolledStudent,
    CanAddAssignmentGrade,
)

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

class AssignmentSubmissionDetail(generics.RetrieveUpdateAPIView):
    queryset = AssignmentSubmission.objects.all()
    serializer_class = AssignmentSubmissionSerializer
    permission_classes = [CanAddAssignmentGrade]

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
            serializer.save(user=request.user, assignment=assignment)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, assignment_id):
        assignment = self.get_object(assignment_id)
        submission = AssignmentSubmission.objects.filter(user=request.user, assignment=assignment).first()
        if submission and submission.grade is not None and submission.grade < 70 and submission.attempts < 3:
            submission.attempts += 1
            submission.grade = None
            submission.save()
            return Response({'message': 'Assignment resubmitted successfully.'}, status=status.HTTP_200_OK)
        return Response({'message': 'Cannot resubmit the assignment.'}, status=status.HTTP_400_BAD_REQUEST)


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
            serializer.save(user=request.user, quiz=quiz)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, quiz_id):
        quiz = self.get_object(quiz_id)
        submission = QuizSubmission.objects.filter(user=request.user, quiz=quiz).first()
        if submission and submission.score is not None and submission.score < 70 and submission.attempts < 3:
            submission.attempts += 1
            submission.score = None
            submission.save()
            return Response({'message': 'Quiz resubmitted successfully.'}, status=status.HTTP_200_OK)
        return Response({'message': 'Cannot resubmit the quiz.'}, status=status.HTTP_400_BAD_REQUEST)


# Certificate view and URL

from django.http import JsonResponse, FileResponse, HttpResponse
from reportlab.pdfgen import canvas
from django.views import View

from datetime import datetime


def meets_certificate_criteria(user, course):
    # Check if the user has a passing grade (>= 70%) for all assignments and quizzes in the course
    assignments = AssignmentSubmission.objects.filter(user=user, assignment__course=course)
    quizzes = QuizSubmission.objects.filter(user=user, quiz__course=course)

    for assignment in assignments:
        if assignment.grade is None or assignment.grade < 70:
            return False

    for quiz in quizzes:
        if quiz.score is None or quiz.score < 70:
            return False

    # Check if the user has met the deadline
    if datetime.now().date() > course.deadline:
        return False

    return True


class CertificateView(View):
    def get(self, request, *args, **kwargs):
        user = request.user
        course_id = request.GET.get('course_id')

        try:
            course = Course.objects.get(id=course_id)
        except Course.DoesNotExist:
            return HttpResponse('Course not found', status=404)

        if not meets_certificate_criteria(user, course):
            return HttpResponse('Certificate cannot be generated', status=400)

        # Create a PDF file
        response = FileResponse(content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="certificate.pdf"'

        # Generate the certificate content using ReportLab
        buffer = BytesIO()
        p = canvas.Canvas(buffer)

        # Set up the certificate design
        p.setFont('Helvetica', 20)
        p.drawString(100, 750, 'Certificate of Completion')
        p.setFont('Helvetica', 14)
        p.drawString(100, 700, 'Presented to:')
        p.setFont('Helvetica-Bold', 16)
        p.drawString(100, 650, user.full_name)  # Replace with the user's full name
        p.setFont('Helvetica', 12)
        p.drawString(100, 600, 'for successfully completing the course:')
        p.setFont('Helvetica-Bold', 16)
        p.drawString(100, 550, course.name)  # Replace with the course name
        p.setFont('Helvetica', 12)
        p.drawString(100, 500, 'Date: ' + datetime.now().strftime('%B %d, %Y'))

        # Save the PDF to the buffer
        p.showPage()
        p.save()

        # Move the buffer's pointer back to the beginning
        buffer.seek(0)

        # Set the buffer as the response content
        response.write(buffer.getvalue())

        return response
