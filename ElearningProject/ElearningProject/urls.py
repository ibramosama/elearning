from rest_framework import urls
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from authentication_app.views import UserRegistrationView, UserLoginView, SendOTPView, VerifyOTPView

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [
    path('admin/', admin.site.urls),
    path('send-otp/', SendOTPView.as_view(), name='send-otp'),
    path('verify-otp/', VerifyOTPView.as_view(), name='verify-otp'),
    path('register/', UserRegistrationView.as_view(), name='user-registration'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('auth/', include('drf_social_oauth2.urls', namespace='drf')),  # add this
    path('token/', TokenObtainPairView.as_view(), name='token-obtain-pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    path('course/', include('courses_app.urls')),
    path('', include('django.contrib.auth.urls')),
    

]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)

