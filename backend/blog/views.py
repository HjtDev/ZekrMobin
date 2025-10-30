from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.http.response import JsonResponse
from django.core.files.storage import FileSystemStorage
from rest_framework.views import APIView
from backend.mixins import GetDataMixin, ResponseBuilderMixin, CachedResponseMixin
from .models import BlogPost, Category, Tag, Comment
from .serializers import BlogPostSerializer, QuickBlogPostSerializer
from rest_framework import status
import os


@login_required
@csrf_exempt
def editor_upload_handler(request):
    if request.method == 'POST' and request.FILES.get('file'):
        file_obj = request.FILES['file']
        fs = FileSystemStorage(location=os.path.join(settings.MEDIA_ROOT, 'editor', 'files'))
        filename = fs.save(file_obj.name, file_obj)
        file_url = fs.url(os.path.join('editor', 'files', filename))
        return JsonResponse({'location': file_url})
    return JsonResponse({'error': 'Invalid request'}, status=400)


class SingleBlogPost(APIView, GetDataMixin, ResponseBuilderMixin, CachedResponseMixin):
    throttle_scope = 'single-blog-post'
    
    def get(self, request):
        success, result = self.get_data(request, ('id', self.is_id))
        
        if not success:
            return self.build_response(
                status.HTTP_400_BAD_REQUEST,
                message='Invalid or missing parameter',
                errors=result
            )
        
        try:
            post = BlogPost.objects.get(id=result['id'], is_visible=True)
            post.views_count += 1
            post.save()
            quick_load = self.convert_data_to_bool(request.query_params.get('quick'))
            serializer = QuickBlogPostSerializer if quick_load else BlogPostSerializer
            
            return self.build_response(
                status.HTTP_200_OK,
                message='Successful retrieval',
                post=serializer(post, context={'request': request}).data,
                quick_load=quick_load
            )
        except BlogPost.DoesNotExist:
            return self.build_response(
                status.HTTP_404_NOT_FOUND,
                message='Post does not exist.'
            )
