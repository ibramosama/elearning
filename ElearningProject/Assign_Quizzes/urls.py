from django.urls import path
from . import views

app_name = 'Assign_Quizzes'


from .views import (
    AssignmentList,
    AssignmentDetail,
    AssignmentSubmissionDetail,
    QuizList,
    QuizDetail,
    CertificateView, QuizSubmissionView,
)

urlpatterns = [
    # Assignment URLs
    path('assignments/', AssignmentList.as_view(), name='assignment-list'),
    path('assignments/<int:assignment_id>/', AssignmentDetail.as_view(), name='assignment-detail'),
    path('assignments/submissions/<int:pk>/', AssignmentSubmissionDetail.as_view(), name='assignment-submission-detail'),

    # Quiz URLs
    path('quizzes/', QuizList.as_view(), name='quiz-list'),
    path('quizzes/<int:quiz_id>/', QuizDetail.as_view(), name='quiz-detail'),

    # Certificate URL
    path('certificate/', CertificateView.as_view(), name='certificate'),
    path('quiz-submission/', QuizSubmissionView.as_view(), name='quiz-submission'),

]
