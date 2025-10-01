from django.contrib.auth import authenticate, login
from rest_framework.views import APIView
from backend.mixins import ResponseBuilderMixin, GetDataMixin
from .permissions import NotAuthenticated
from .models import User
from rest_framework import status
from .serializers import UserSerializer
from django.middleware.csrf import get_token


class GetCSRFToken(APIView, ResponseBuilderMixin):
    throttle_scope = 'csrf'
    
    def get(self, request):
        return self.build_response(
            csrf_token=get_token(request)
        )


class Profile(APIView, ResponseBuilderMixin):
    throttle_scope = 'profile'
    
    def get(self, request):
        return self.build_response(
            logged_in=request.user.is_authenticated,
            user=UserSerializer(request.user).data if request.user.is_authenticated else None
        )

class Signup(APIView, ResponseBuilderMixin, GetDataMixin):
    throttle_scope = 'signup'
    permission_classes = (NotAuthenticated,)
    
    def post(self, request):
        success, result = self.get_data(request, 'username', 'password', 'password2', ('email', self.validate_email), 'name')
        if not success:
            return self.build_response(
                status.HTTP_400_BAD_REQUEST,
                message='Invalid data',
                errors=result
            )
        
        success, errors = self.validate_password(result['password'], result['password2'])
        if not success:
            return self.build_response(
                status.HTTP_406_NOT_ACCEPTABLE,
                message='Password not acceptable',
                errors=errors
            )
        
        serializer = UserSerializer(data=result)
        if serializer.is_valid():
            user = serializer.save()
            login(request, user)
            return self.build_response(
                status.HTTP_201_CREATED,
                message='User created',
                user=serializer.data
            )
        else:
            return self.build_response(
                status.HTTP_400_BAD_REQUEST,
                message='Invalid data',
                errors=serializer.errors
            )

class Login(APIView, ResponseBuilderMixin, GetDataMixin):
    throttle_scope = 'login'
    permission_classes = (NotAuthenticated,)
    
    def post(self, request):
        success, result = self.get_data(request, 'username', 'password')
        
        if not success:
            return self.build_response(
                status.HTTP_400_BAD_REQUEST,
                message='Invalid username or password.',
                errors=result
            )
        
        user = authenticate(request, **result)
        if not user:
            return self.build_response(
                status.HTTP_401_UNAUTHORIZED,
                message='Invalid username or password.'
            )
        login(request, user)
        
        return self.build_response(
            status.HTTP_200_OK,
            message='Logged in successfully',
            user=UserSerializer(user).data
        )
