from rest_framework_simplejwt.tokens import RefreshToken
from random import randint
from django.contrib.sessions.backends.db import SessionStore
from django.core.mail import send_mail
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from ElearningProject import settings
from .models import User
from .serializers import UserSerializer

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email

        # Add role if the user is an admin, instructor, or student
        if user.is_staff:
            token['role'] = 'admin'
        elif user.is_instructor:
            token['role'] = 'instructor'
        elif user.is_student:
            token['role'] = 'student'

        return token


class SendOTPView(APIView):

    def post(self, request):
        data = {}
        email_subject = "Test Test"
        otp = str(randint(100000, 999999))
        email_body = f'Your verification OTP is: {otp}'

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
        data = {}
        try:
            received_otp = request.data.get('otp')
            stored_otp = request.session.get('otp')
            print('Received OTP:', received_otp)
            print('Stored OTP:', stored_otp)

            if received_otp == stored_otp:
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

    def post(self, request, *args, **kwargs):
        # Verify the OTP before proceeding with registration
        verify_otp_view = VerifyOTPView.as_view()
        verification_response = verify_otp_view(request)
        if verification_response.status_code != status.HTTP_200_OK:
            # OTP verification failed
            return verification_response

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class UserLoginView(generics.GenericAPIView):
    serializer_class = UserSerializer

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = User.objects.filter(email=email).first()

        if user is None or not user.check_password(password):
            return Response({'error': 'Invalid credentials'}, status=401)

        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })
