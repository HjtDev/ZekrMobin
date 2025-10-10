from django.urls import path
from . import views


app_name = 'media_center'

urlpatterns = [
    path('posts/post/', views.SinglePost.as_view(), name='single_post'),
    path('posts/filtered/', views.FilteredPosts.as_view(), name='filtered_posts'),
    path('top_artists/', views.TopArtists.as_view(), name='top_artists'),
    path('top_categories/', views.TopCategory.as_view(), name='top_categories'),
]
