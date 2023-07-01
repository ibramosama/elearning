from rest_framework import permissions


class IsInstructorOrAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            if request.user.role == 'instructor' or request.user.role == 'admin':
                return True
        return False


class IsInstructorOrAdminOrEnrolledStudent(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user.is_authenticated:
            if request.user.role == 'instructor' or request.user.role == 'admin':
                return True
            elif request.user.role == 'student':
                return obj.students.filter(id=request.user.id).exists()
        return False


class IsStudent(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'student'
