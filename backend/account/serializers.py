from rest_framework.serializers import ModelSerializer
from .models import User


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'name', 'date_joined', 'password')
        extra_kwargs = {'password': {'write_only': True}}
        
        def create(self, validated_data):
            password = validated_data.pop('password1')
            user = User(**validated_data)
            user.set_password(password)
            user.save()
            return user