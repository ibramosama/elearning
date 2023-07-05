from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'image', 'email', 'password', 'phone_number', 'role')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            image=validated_data['image'],
            email=validated_data['email'],
            phone_number=validated_data['phone_number'],
            role=validated_data['role'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
<<<<<<< HEAD

        token['email'] = user.email
        token['role'] = user.role
        token['username'] = user.username
        token['image'] = user.image.url
=======
        
        token['email'] = user.email
        token['role'] = user.role
        token['username'] =user.username
        token['image'] =user.image.url
>>>>>>> 66723d20e03a8d5800a6bda079041d49bb956233
        return token
