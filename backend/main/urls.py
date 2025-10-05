from django.urls import path
from . import views


app_name = 'main'

urlpatterns = [
    path('settings/', views.SettingView.as_view(), name='settings'),
    path('club/', views.Club.as_view(), name='club')
]