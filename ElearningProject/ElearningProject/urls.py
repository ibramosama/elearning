from rest_framework import urls
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from authentication_app.views import UserRegistrationView, SendOTPView, VerifyOTPView, UserLoginAPIView

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('send-otp/', SendOTPView.as_view(), name='send-otp'),
    path('verify-otp/', VerifyOTPView.as_view(), name='verify-otp'),
    path('register/', UserRegistrationView.as_view(), name='user-registration'),
    path('login/', UserLoginAPIView.as_view(), name='login'),
    path('auth/', include('drf_social_oauth2.urls', namespace='drf')),  
    path('token/', TokenObtainPairView.as_view(), name='token-obtain-pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    path('', include('django.contrib.auth.urls')),
    path('oauth/', include('social_django.urls', namespace='social')), 

]
