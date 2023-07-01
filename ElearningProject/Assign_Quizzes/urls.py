from django.urls import path
from .views import (
    AssignmentList,
    AssignmentDetail,
    QuizList,
    QuizDetail,
    QuizQuestionList,
    QuizOptionList,
)

app_name ='Assign_Quizzes'

urlpatterns = [
    path('assignments/', AssignmentList.as_view(), name='assignment-list'),
    path('assignments/<int:assignment_id>/', AssignmentDetail.as_view(), name='assignment-detail'),
    path('quizzes/', QuizList.as_view(), name='quiz-list'),
    path('quizzes/<int:quiz_id>/', QuizDetail.as_view(), name='quiz-detail'),
    path('quizzes/<int:quiz_id>/questions/', QuizQuestionList.as_view(), name='quiz-question-list'),
    path('quizzes/questions/<int:question_id>/options/', QuizOptionList.as_view(), name='quiz-option-list'),
]
