from rest_framework import permissions


class IsInstructor(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'instructor'


class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'admin'


from rest_framework import exceptions
from rest_framework.permissions import BasePermission

class IsAdminOrInstructor(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            user = request.user
            if request.method == 'POST':
                # Allow instructors to create courses
                if user.role == "admin" or user.role == "instructor":
                    return True
                else:
                    return False
            elif request.method == 'GET':
                if user.role == "admin":
                    return True
            return False
        return False



class IsReviewOwnerOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request
        if request.method in ['GET', 'HEAD', 'OPTIONS']:
            return True

        # Write permissions are only allowed to the review owner
        return obj.user == request.user

class IsAdminOrInstructorOrEnrolledStudent(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user.is_authenticated:
            if request.user.role in ['admin', 'instructor']:
                return True
            elif request.user.role == 'student':
                return obj.students.filter(id=request.user.id).exists()
        return False


class IsCourseInstructorOrAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user.is_authenticated:
            return request.user.role == 'admin' or obj.instructor == request.user
        return False


class IsCourseApproved(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            course = view.get_object()
            return course.is_approved or (request.user.role == 'student' and request.user in course.students.all())
        return False

class CanUpdateCourse(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        if request.user.role == 'admin':
            # Admin can update the 'is_approved' field
            if 'is_approved' in request.data:
                return True

        if request.user == obj.instructor:
            # Course instructor can update all details
            return True

        return False

class IsStudent(permissions.BasePermission):
    def has_permission(self, request, view):
        user = request.user
        return user.is_authenticated and user.role == 'student'

class IsInstructorWithCourse(BasePermission):
    message = 'You cannot create sections or videos without uploading a course.'

    def has_permission(self, request, view):
        user = request.user
        if user.role == 'instructor' and not user.courses.exists():
            return False
        return True

