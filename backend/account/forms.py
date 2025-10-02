from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import User
from backend.mixins import GetDataMixin


class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = User
        fields = ('username', 'name', 'email', 'profile_picture', 'is_active', 'is_staff', 'is_superuser')

    def clean_username(self):
        username = self.cleaned_data.get('username')

        if self.instance.pk:
            if User.objects.filter(username=username).exclude(pk=self.instance.pk).exists():
                raise forms.ValidationError('نام کاربری قبلا استفاده شده است.')
        else:
            if User.objects.filter(username=username).exists():
                raise forms.ValidationError('نام کاربری قبلا استفاده شده است.')

        if not GetDataMixin.validate_username(username):
            raise forms.ValidationError('نام کاربری باید: با یک حرف شروع شود - بین ۳ تا ۳۰ کاراکتر باشد - شامل کاراکتر های خاص نباشد.')
        
        return username


class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = User
        fields = ('username', 'name', 'email', 'profile_picture', 'is_active', 'is_staff', 'is_superuser')
