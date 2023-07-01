
# permission.py
from rest_framework import permissions


class IsInstructor(permissions.BasePermission):
    """
    Custom permission to allow only instructors of a course to create quizzes and assignments.
    """

    def has_permission(self, request, view):
        # Check if the user is an instructor of the course
        return request.user and request.user.is_authenticated and request.user.is_instructor


class IsEnrolledStudent(permissions.BasePermission):
    """
    Custom permission to allow only enrolled students of a course to view quiz questions and submit assignments.
    """

    def has_permission(self, request, view):
        # Check if the user is an enrolled student of the course
        return request.user and request.user.is_authenticated and request.user.is_student

    def has_object_permission(self, request, view, obj):
        # Check if the user is the owner of the quiz or assignment (for viewing details)
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.user == request.user