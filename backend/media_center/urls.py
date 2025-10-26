from django.urls import path
from . import views


app_name = 'media_center'

urlpatterns = [
    path('posts/post/', views.SinglePost.as_view(), name='single_post'),
    path('posts/filtered/', views.FilteredPosts.as_view(), name='filtered_posts'),
    path('posts/post/comments/', views.PostComment.as_view(), name='comment'),
    path('posts/post/like/', views.PostLike.as_view(), name='like'),
    path('posts/post/download/', views.PostDownload.as_view(), name='download'),
    path('posts/post/suggestion/', views.PostSuggestion.as_view(), name='suggestion'),
    path('top_artists/', views.TopArtists.as_view(), name='top_artists'),
    path('top_categories/', views.TopCategory.as_view(), name='top_categories'),
    path('user_posts/', views.UserPosts.as_view(), name='user_posts'),
    path('filters/', views.PostListFilters.as_view(), name='filters')
]
