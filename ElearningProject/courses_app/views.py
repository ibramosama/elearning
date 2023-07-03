from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import generics, permissions, status, filters
from .models import Category, Course, Section, Video, Review, Cart
from .serializers import CategorySerializer, CourseSerializer, SectionSerializer, VideoSerializer, ReviewSerializer, \
    CourseListSerializer, CartSerializer, EnrollmentSerializer
from .permissions import (
    IsInstructor,
    IsAdmin,
    IsAdminOrInstructor,
    IsAdminOrInstructorOrEnrolledStudent,
    IsCourseInstructorOrAdmin,
    IsCourseApproved, IsReviewOwnerOrReadOnly, IsStudent,
)

User = get_user_model()

class CategoryList(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class CourseList(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAdminOrInstructor]  # Use IsAdminOrInstructor permission

    def perform_create(self, serializer):
        serializer.save(instructor=self.request.user)

    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin' or user.is_staff:
            # Admin and staff can view all courses
            return Course.objects.all()

        if user.role == 'student':
            # Students can view the courses they are enrolled in
            return Course.objects.filter(students=user)

        # For other authenticated users, return an empty queryset
        return Course.objects.none()


class CourseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsCourseInstructorOrAdmin]

    def get_object(self):
        obj = get_object_or_404(self.queryset, pk=self.kwargs['pk'])
        if not obj.is_approved:
            if self.request.user.role != 'admin':
                raise permissions.PermissionDenied("This course is not yet approved.")
        return obj

    def put(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        updated_instance = serializer.save()

        # Retrieve the updated instance from the database
        updated_instance.refresh_from_db()
        updated_serializer = self.get_serializer(updated_instance)

        return Response(updated_serializer.data, status=status.HTTP_200_OK)

class SectionList(generics.ListCreateAPIView):
    serializer_class = SectionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            # Admin can see all sections
            return Section.objects.all()

        if user.role == 'instructor':
            # Instructor can see sections of their own course
            return Section.objects.filter(course__instructor=user)

        if user.role == 'student':
            # Enrolled students can see sections of their enrolled courses
            return Section.objects.filter(course__students=user)

        # For other authenticated users, return an empty queryset
        return Section.objects.none()


class SectionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Section.objects.all()
    serializer_class = SectionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class ReviewListCreateAPIView(generics.ListCreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsReviewOwnerOrReadOnly]

class CourseListView(generics.ListAPIView):
    queryset = Course.objects.filter(is_approved=True)
    serializer_class = CourseListSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter]
    search_fields = ['title']

class AddToCartView(generics.CreateAPIView):
    serializer_class = CartSerializer
    permission_classes = [IsStudent]

    def perform_create(self, serializer):
        user = self.request.user
        courses = serializer.validated_data.get('courses', [])
        cart = Cart.objects.create(user=user)
        cart.courses.set(courses)
class VideoList(generics.ListCreateAPIView):
    serializer_class = VideoSerializer
    permission_classes = [IsAuthenticated]


    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            # Admin can see all videos
            return Video.objects.all()

        if user.role == 'instructor':
            # Instructor can see videos of their own course
            return Video.objects.filter(section__course__instructor=user)

        if user.role == 'student':
            # Enrolled students can see videos of their enrolled courses
            return Video.objects.filter(section__course__students=user)

        # For other authenticated users, return an empty queryset
        return Video.objects.none()


class VideoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    permission_classes = [IsCourseApproved]

class EnrollView(generics.CreateAPIView):
    serializer_class = EnrollmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)