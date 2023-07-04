from django.shortcuts import get_object_or_404
# permission.py
from rest_framework import permissions
from rest_framework.permissions import BasePermission

from courses_app.models import Course


class IsCourseInstructor(BasePermission):
    def has_permission(self, request, view):
        # Allow any authenticated user to access the view.
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        # Check if the user is the instructor of the course associated with the assignment.
        return obj.course.instructor == request.user



class IsEnrolledStudent(permissions.BasePermission):
    """
    Custom permission to allow only enrolled students of a course to view quiz questions and submit assignments.
    """

    def has_permission(self, request, view):
        # Check if the user is an enrolled student of the course
        return (
            request.user
            and request.user.is_authenticated
            and request.user.role == "student"
        )

    def has_object_permission(self, request, view, obj):
        # Check if the user is enrolled in the course related to the quiz or assignment
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.assignment.course.students.filter(id=request.user.id).exists() or obj.quiz.course.students.filter(id=request.user.id).exists()



class CanAddAssignmentGrade(BasePermission):
    def has_permission(self, request, view):
        # Only allow instructors of the course to add grades
        user = request.user
        assignment = view.get_object()  # Get the assignment object from the view
        if user.role == 'instructor' and assignment.course.instructor == user:
            return True
        return False