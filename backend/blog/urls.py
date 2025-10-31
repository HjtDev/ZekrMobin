from django.urls import path
from . import views


app_name = 'blog'

urlpatterns = [
    path('editor/upload/', views.editor_upload_handler, name='editor-upload'),
    path('posts/post/', views.SingleBlogPost.as_view(), name='single-post'),
    path('posts/filtered/', views.FilteredBlogPost.as_view(), name='filtered-posts'),
    path('posts/categories/', views.CategoryList.as_view(), name='category-list'),
    path('posts/tags/', views.TagList.as_view(), name='tag-list'),
    path('posts/post/suggest/', views.BlogPostSuggestion.as_view(), name='post-suggestion'),
]
