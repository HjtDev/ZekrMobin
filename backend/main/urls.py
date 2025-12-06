from django.urls import path
from . import views


app_name = 'main'

urlpatterns = [
    path('settings/', views.SettingView.as_view(), name='settings'),
    path('club/', views.Club.as_view(), name='club'),
    path('main_page/', views.MainPageSections.as_view(), name='main-page'),
    path('daily_hadith/', views.DailyHadith.as_view(), name='daily-hadith'),
]