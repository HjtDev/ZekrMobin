from django.contrib.auth import authenticate, login, logout
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from backend.mixins import ResponseBuilderMixin, GetDataMixin
from .permissions import NotAuthenticated
from .models import User
from rest_framework import status
from .serializers import UserSerializer
from django.middleware.csrf import get_token
from django.conf import settings
from logging import getLogger


logger = getLogger(__name__)


class GetCSRFToken(APIView, ResponseBuilderMixin):
    throttle_scope = 'csrf'
    
    def get(self, request):
        token = get_token(request)
        response = self.build_response()
        response.set_cookie(
            'csrftoken',
            token,
            httponly=False,
            secure=not settings.DEBUG
        )
        return response


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
        # success, result = self.get_data(request, 'username', 'password', 'password2', ('email', self.validate_email), 'name')
        success, result = self.get_data(request, 'username', 'password', 'password2', 'name')
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
        
        if User.objects.filter(username=result['username']).exists():
            return self.build_response(
                status.HTTP_409_CONFLICT,
                message='User with username already exists.',
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
    
class Logout(APIView, ResponseBuilderMixin):
    throttle_scope = 'logout'
    permission_classes = (IsAuthenticated,)
    
    def post(self, request):
        logout(request)
        return self.build_response(status.HTTP_204_NO_CONTENT)
    
class EditProfile(APIView, ResponseBuilderMixin, GetDataMixin):
    throttle_scope = 'edit_profile'
    permission_classes = (IsAuthenticated,)
    
    def patch(self, request):
        if 'password' in request.data or 'password2' in request.data:
            success, result = self.get_data(request, 'password', 'password2')
            if not success:
                return self.build_response(
                    status.HTTP_400_BAD_REQUEST,
                    message='Missing or invalid password arguments.',
                    errors=result
                )
            password, password2 = result['password'], result['password2']
            password_valid, errors = self.validate_password(password, password2)
            if not password_valid:
                return self.build_response(
                    status.HTTP_406_NOT_ACCEPTABLE,
                    message='Password not acceptable',
                    errors=errors
                )
        
        serializer = UserSerializer(instance=request.user, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return self.build_response(
                status.HTTP_200_OK,
                message='User edited',
                user=serializer.data
            )
        else:
            return self.build_response(
                status.HTTP_400_BAD_REQUEST,
                message='Invalid data',
                errors=serializer.errors
            )
