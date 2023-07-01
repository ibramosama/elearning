from django.urls import path
from .views import CategoryList, CategoryDetail, CourseList, CourseDetail, SectionsList, SectionsDetail, VideoList, VideoDetail


app_name ='courses_app'

urlpatterns = [
    path('categories/', CategoryList.as_view(), name='category-list'),
    path('categories/<int:pk>/', CategoryDetail.as_view(), name='category-detail'),
    path('courses/', CourseList.as_view(), name='course-list'),
    path('courses/<int:pk>/', CourseDetail.as_view(), name='course-detail'),
    path('sections/', SectionsList.as_view(), name='section-list'),
    path('sections/<int:pk>/', SectionsDetail.as_view(), name='section-detail'),
    path('videos/', VideoList.as_view(), name='video-list'),
    path('videos/<int:pk>/', VideoDetail.as_view(), name='video-detail'),
]
