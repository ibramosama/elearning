from django.urls import path
from .views import (
    CategoryList,
    CategoryDetail,
    CourseList,
    CourseDetail,
    SectionList,
    SectionDetail,
    VideoList,
    VideoDetail, ReviewListCreateAPIView, CourseListView, EnrollView, AddToCartView, CourseviewList,
)

urlpatterns = [
    path('categories/', CategoryList.as_view(), name='category-list'),
    path('categories/<int:pk>/', CategoryDetail.as_view(), name='category-detail'),
    path('courses/', CourseList.as_view(), name='course-list'),
    path('courses-view/', CourseviewList.as_view(), name='course-list'),

    path('courses/<int:pk>/', CourseDetail.as_view(), name='course-detail'),
    path('sections/', SectionList.as_view(), name='sections-list'),
    path('sections/<int:pk>/', SectionDetail.as_view(), name='sections-detail'),
    path('videos/', VideoList.as_view(), name='video-list'),
    path('videos/<int:pk>/', VideoDetail.as_view(), name='video-detail'),
    path('reviews/', ReviewListCreateAPIView.as_view(), name='review-list-create'),
    path('course-list/', CourseListView.as_view(), name='course-list-view'),
    path('course-list/<int:pk>', CourseListView.as_view(), name='course-list-one-view'),
    
    path('enrollments/', EnrollView.as_view(), name='enrollments'),
    path('add-to-cart/', AddToCartView.as_view(), name='add-to-cart'),
]
