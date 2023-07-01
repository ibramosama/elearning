
from random import randint
from django.contrib.sessions.backends.db import SessionStore
from django.core.mail import send_mail
from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView

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


from django.http import HttpRequest

class UserRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    


from rest_framework_simplejwt.tokens import RefreshToken

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

