from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import generics, permissions, status, filters,viewsets
from .models import Category, Course, Section, Video, Review, Cart
from .serializers import CategorySerializer, CourseSerializer, SectionSerializer, VideoSerializer, ReviewSerializer, \
<<<<<<< HEAD
    CourseListSerializer, CartSerializer, EnrollmentSerializer, CourseFieldsSerializer, CartCourseSerializer
=======
    CourseListSerializer, CartSerializer, EnrollmentSerializer, CourseFieldsSerializer,CartCourseSerializer
>>>>>>> 6951b16d5003d2e50d1be31e6508706d5575968f
from .permissions import (
    IsInstructor,
    IsAdmin,
    IsAdminOrInstructor,
    IsAdminOrInstructorOrEnrolledStudent,
    IsCourseInstructorOrAdmin,
    IsCourseApproved, IsReviewOwnerOrReadOnly, IsStudent, IsCourseApprovedOrReadOnly, IsInstructorOrReadOnly,
    IsInstructorWithCourse,
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

        if user.role == 'instructor':
            # Instructors can view the courses they teach
            return Course.objects.filter(instructor=user)

        # For other authenticated users, return an empty queryset
        return Course.objects.none()

class CourseByCategoryList(generics.ListAPIView):
    serializer_class = CourseFieldsSerializer

    def get_queryset(self):
        category_id = self.kwargs['category_id']
        
        return Course.objects.filter(category_id=category_id)

class CourseviewList(generics.ListAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsCourseApproved]

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

        if user.role == 'instructor':
            # Instructors can view the courses they teach
            return Course.objects.filter(instructor=user)

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

class CourseListView(generics.ListAPIView,generics.RetrieveAPIView):
    
    queryset = Course.objects.filter(is_approved=True)
    serializer_class = CourseListSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ['title']
    def get_queryset(self):
        queryset = super().get_queryset()
        course_id = self.kwargs.get('pk')
        if course_id is not None:
            queryset = queryset.filter(id=course_id)
        return queryset
    


<<<<<<< HEAD
class ApprovedCourseListByInstructor(generics.ListAPIView):
    serializer_class = CourseSerializer
    permission_classes = [IsInstructorWithCourse]

    def get_queryset(self):
        instructor = self.request.user
        return Course.objects.filter(instructor=instructor, is_approved=True)
=======
# class AddToCartView(generics.CreateAPIView):
#     serializer_class = CartSerializer
#     permission_classes = [IsStudent]

#     def perform_create(self, serializer):
#         user = self.request.user
#         courses = serializer.validated_data.get('courses', [])
#         cart = Cart.objects.create(user=user)
#         cart.courses.set(courses)
>>>>>>> 6951b16d5003d2e50d1be31e6508706d5575968f

class AddToCartView(generics.CreateAPIView):
    serializer_class = CartSerializer
    permission_classes = [IsStudent]

    def perform_create(self, serializer):
        user = self.request.user
        courses = serializer.validated_data.get('courses', [])
<<<<<<< HEAD
=======

>>>>>>> 6951b16d5003d2e50d1be31e6508706d5575968f
        try:
            cart = Cart.objects.get(user=user)
            for course in courses:
                if course not in cart.courses.all():
                    cart.courses.add(course)
        except Cart.DoesNotExist:
            cart = Cart.objects.create(user=user)
            cart.courses.set(courses)
<<<<<<< HEAD
class SectionListByCourse(generics.ListAPIView):
    serializer_class = SectionSerializer
    permission_classes = [IsInstructorWithCourse]

    def get_queryset(self):
        course_id = self.kwargs['course_id']
        return Section.objects.filter(course_id=course_id)

class CourseListByInstructor(generics.ListAPIView):
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        instructor = self.request.user
        instructor_courses = Course.objects.filter(instructor=instructor)
        return instructor_courses

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        data = serializer.data
        response_data = {
            'status': status.HTTP_200_OK,
            'message': 'Courses retrieved successfully.',
            'data': data
        }
        return Response(response_data, status=status.HTTP_200_OK)

=======
# class AddToCartView(generics.CreateAPIView):
#     serializer_class = CartSerializer
#     permission_classes = [IsAuthenticated]

#     def perform_create(self, serializer):
#         user = self.request.user
#         courses = serializer.validated_data.get('courses', [])
#         cart = Cart.objects.create(user=user)
#         cart.courses.set(courses)

#     def get_queryset(self):
#         user = self.request.user
#         cart = Cart.objects.filter(user=user).first()
#         if cart:
#             return cart.courses.all()
#         else:
#             return Course.objects.none()

#     def get_serializer_context(self):
#         context = super().get_serializer_context()
#         context['cart_courses'] = self.get_queryset()
#         return context

#     def get(self, request, *args, **kwargs):
#         queryset = self.get_queryset()
#         serializer = CourseListSerializer(queryset, many=True)
#         return Response(serializer.data)
        
        
>>>>>>> 6951b16d5003d2e50d1be31e6508706d5575968f
class CartView(generics.ListAPIView,generics.RetrieveAPIView):
    serializer_class = CartCourseSerializer
    permission_classes = [IsStudent]
    def get_queryset(self):
        user = self.kwargs.get('pk')
        return Cart.objects.filter(user=user)
<<<<<<< HEAD
=======
    

>>>>>>> 6951b16d5003d2e50d1be31e6508706d5575968f
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


class VideoDetail(generics.ListAPIView,generics.RetrieveUpdateDestroyAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    permission_classes = [IsInstructorOrReadOnly]

class EnrollView(generics.CreateAPIView):
    serializer_class = EnrollmentSerializer
    permission_classes = [IsStudent]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class EnrolledCourseList(generics.ListAPIView):
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        student = self.request.user
        return Course.objects.filter(students=student)
