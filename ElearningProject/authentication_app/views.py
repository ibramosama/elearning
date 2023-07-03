
from random import randint

from django.contrib.auth.views import PasswordResetConfirmView, PasswordResetView
from django.contrib.sessions.backends.db import SessionStore
from django.core.mail import send_mail
from rest_framework import generics, status, permissions
from rest_framework.generics import UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from ElearningProject import settings
from .models import User
from .serializers import UserSerializer, CustomTokenObtainPairSerializer
from django.urls import reverse



om_el_otp = 0

class SendOTPView(APIView):
    def post(self, request):
        global om_el_otp
        data = {}
        email_subject = "Test Test"
        otp = str(randint(100000, 999999))
        email_body = f'Your verification OTP is: {otp}'
        om_el_otp = otp
        
        try:
            send_mail(email_subject, email_body, settings.EMAIL_HOST_USER, [request.data.get('email')], fail_silently=False)
            data['message'] = 'OTP sent successfully.'
            data['otp'] = otp
            http_status = status.HTTP_200_OK

            # Store the OTP in the session
            session = SessionStore()
            session['otp'] = otp
            session.save()
        
        except Exception as e:
            print(f'exception in send_otp => {e}')
            data = {'error': 'An error occurred while sending the OTP.'}
            http_status = status.HTTP_500_INTERNAL_SERVER_ERROR

        return Response(data=data, status=http_status)



class VerifyOTPView(APIView):

    def post(self, request):
        global om_el_otp
        data = {}
        try:
            received_otp = request.data.get('otp')
            print('Received OTP:', received_otp)
            print('Stored OTP:', om_el_otp)

            if received_otp == om_el_otp:
                http_status = status.HTTP_200_OK
                data['message'] = 'OTP verified successfully.'
            else:
                http_status = status.HTTP_400_BAD_REQUEST
                data['message'] = 'OTP verification failed.'

        except Exception as e:
            print(f'exception in verify_otp => {e}')
            data = {'error': 'An error occurred while verifying the OTP.'}
            http_status = status.HTTP_500_INTERNAL_SERVER_ERROR

        return Response(data=data, status=http_status)

class UserRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]


class UserLoginAPIView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Generate the tokens
        tokens = serializer.validated_data
        refresh = str(tokens['refresh'])
        access = str(tokens['access'])

        # Return the tokens in the response
        return Response({
            'refresh': refresh,
            'access': access,
        }, status=status.HTTP_200_OK)


class UserPasswordResetView(PasswordResetView):
    def get_email_context(self, email, user, token, *args, **kwargs):
        context = super().get_email_context(email, user, token, *args, **kwargs)
        context['user'] = user
        context['reset_link'] = self.get_reset_link(user, token)
        return context

    def get_reset_link(self, user, token):
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        reset_url = reverse('user-password-reset-confirm')
        reset_link = f"{reset_url}?uid={uid}&token={token}"
        return reset_link


class UserPasswordResetConfirmView(PasswordResetConfirmView):
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        uid = self.kwargs.get('uidb64')
        token = self.kwargs.get('token')
        context['reset_link'] = self.get_reset_link(uid, token)
        return context

    def get_reset_link(self, uid, token):
        reset_url = reverse('user-password-reset-confirm')
        reset_link = f"{reset_url}?uid={uid}&token={token}"
        return reset_link


class UserProfileUpdateView(UpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def perform_update(self, serializer):
        serializer.save()

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)