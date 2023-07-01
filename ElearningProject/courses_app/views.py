from rest_framework import generics, permissions
from .models import Category, Course, Sections, Video
from .serializers import CategorySerializer, CourseSerializer, SectionsSerializer, VideoSerializer
from .permissions import IsInstructorOrAdmin, IsInstructorOrAdminOrEnrolledStudent


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

    def perform_create(self, serializer):
        if self.request.user.role == 'instructor':
            serializer.save(instructor=self.request.user, is_approved=False)
        else:
            raise permissions.PermissionDenied("Only instructors can create courses.")


class CourseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsInstructorOrAdminOrEnrolledStudent]

    def get_object(self):
        obj = super().get_object()
        if not obj.is_approved:
            if self.request.user.role != 'admin':
                raise permissions.PermissionDenied("This course is not yet approved.")
        return obj

    def perform_update(self, serializer):
        is_approved = serializer.instance.is_approved
        if self.request.user.role == 'admin' and not is_approved:
            serializer.save(is_approved=True)
        else:
            serializer.save()


class SectionsList(generics.ListCreateAPIView):
    queryset = Sections.objects.all()
    serializer_class = SectionsSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class SectionsDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Sections.objects.all()
    serializer_class = SectionsSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class VideoList(generics.ListCreateAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class VideoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
