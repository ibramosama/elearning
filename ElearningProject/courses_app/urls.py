from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CoursesViewSet ,VideoViewSet,SectionViewSet,CourseWithvideoViewSet

router = DefaultRouter()
router.register('courses',CoursesViewSet )
router.register('video',VideoViewSet )
router.register('sections',SectionViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('create_courses',CourseWithvideoViewSet.as_view()),
]