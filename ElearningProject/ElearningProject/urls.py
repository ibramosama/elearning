from rest_framework import urls
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from authentication_app.views import UserRegistrationView, SendOTPView, VerifyOTPView, UserLoginAPIView, \
    UserPasswordResetConfirmView, UserPasswordResetView, UserProfileUpdateView

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('send-otp/', SendOTPView.as_view(), name='send-otp'),
    path('verify-otp/', VerifyOTPView.as_view(), name='verify-otp'),
    path('register/', UserRegistrationView.as_view(), name='user-registration'),
    path('login/', UserLoginAPIView.as_view(), name='login'),
    path('auth/', include('drf_social_oauth2.urls', namespace='drf')),  
    path('token/', TokenObtainPairView.as_view(), name='token-obtain-pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    path('course/', include('courses_app.urls')),
    path('', include('django.contrib.auth.urls')),
    path('oauth/', include('social_django.urls', namespace='social')), 
    path('auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('Assign/', include('Assign_Quizzes.urls')),

    path('password/reset/', UserPasswordResetView.as_view(), name='user-password-reset'),
    path('password/reset/confirm/', UserPasswordResetConfirmView.as_view(), name='user-password-reset-confirm'),

    # User profile update
    path('profile/update/', UserProfileUpdateView.as_view(), name='user-profile-update'),

]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)

