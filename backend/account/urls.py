from django.urls import path
from . import views
from .views import Signup

app_name = 'account'

urlpatterns = [
    path('csrf/', views.GetCSRFToken.as_view(), name='get_csrf_token'),
    path('profile/', views.Profile.as_view(), name='get_profile_info'),
    path('signup/', views.Signup.as_view(), name='signup'),
    path('login/', views.Login.as_view(), name='login'),
    path('logout/', views.Logout.as_view(), name='logout'),
]