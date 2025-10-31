from django.contrib.auth.decorators import login_required
from django.contrib.postgres.search import SearchQuery, SearchVector, SearchRank
from django.core.paginator import PageNotAnInteger, EmptyPage, Paginator
from django.db.models import QuerySet
from django.utils import timezone
from datetime import timedelta
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.http.response import JsonResponse
from django.core.files.storage import FileSystemStorage
from rest_framework.views import APIView
from backend.mixins import GetDataMixin, ResponseBuilderMixin, CachedResponseMixin
from .models import BlogPost, Category, Tag, Comment
from .serializers import BlogPostSerializer, QuickBlogPostSerializer, CategorySerializer, TagSerializer
from rest_framework import status
import os, logging


logger = logging.getLogger(__name__)


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
        

class FilteredBlogPost(APIView, GetDataMixin, ResponseBuilderMixin, CachedResponseMixin):
    throttle_scope = 'filtered-blog-post'
    
    def get_selector_items(self, validated_selector: str):  # validated_selector
        if validated_selector == 'all':
            return BlogPost.objects.filter(is_visible=True)
        elif ',' in validated_selector:
            return BlogPost.objects.filter(is_visible=True, id__in=validated_selector.split(','))
        elif validated_selector.startswith('search:'):
            query = validated_selector.split(':', 1)[1]
            query = SearchQuery(query)
            search_vector = SearchVector('title', 'category__name', 'tags__name')
            return BlogPost.objects.filter(is_visible=True).annotate(rank=SearchRank(search_vector, query)).order_by('-rank')
        else:
            logger.error(f'Invalid selector passed to get_selector_items after validation: {validated_selector}')
            raise ValueError(f'Invalid selector: {validated_selector}')
        
    def get_filtered_items(self, query_set: QuerySet, filters: str):
        qs = query_set
        for f in filters.split(';'):
            key, values = [kv.strip() for kv in f.split(':', 1)]
            values = [v.strip() for v in values.split(',')]
            
            if not key or not values:
                logger.warning(f'Empty filter was passed: {filters=} / {f=}')
                continue
                
            match key:
                case 'category':
                    qs = qs.filter(category__id__in=values)
                case 'tags':
                    qs = qs.filter(tags__id__in=values)
                case 'date':
                    date = values[0]
                    if date == 'newest':
                        qs = qs.order_by('-created_at')
                    elif date == 'oldest':
                        qs = qs.order_by('created_at')
                    elif date == 'trends':
                        trends = qs.filter(created_at__gte=timezone.now() - timedelta(days=7)).order_by('-views_count')
                        qs = trends or qs.order_by('-views_count')
                    else:
                        logger.warning(f'Invalid filter(date): {filters=} / {key}:{values}')
                        continue
        
        return qs

    def validate_section(self, section: str) -> bool:
        if not isinstance(section, str):
            logger.error(f'{section=} must be a string')
            return False
        
        if section == "all":
            return True
        
        if all(self.is_id(s) for s in section.split(",")):
            return True
        
        if self.FILTER_REGEX.match(section) and section.startswith("search:"):
            return True
        
        return False
    
    def validate_limit(self, limit: int | str) -> bool:
        # is_id checks if the value is an integer bigger than zero accepting both str and int
        return self.is_id(limit) and int(limit) < 50
    
    def get(self, request):
        success, result = self.get_data(request, ('selector', self.validate_section), ('filters', lambda f: not f or self.FILTER_REGEX.match(f)), ('limit', self.validate_limit))
        
        if not success:
            return self.build_response(
                status.HTTP_400_BAD_REQUEST,
                message='Invalid or missing parameter',
                errors=result
            )
        
        selector = result.get('selector')
        filters = result.get('filters')
        limit = int(result.get('limit'))
        page_num = request.query_params.get('page', 1)
        page_num = int(page_num) if (isinstance(page_num, str) and page_num.isdigit()) or isinstance(page_num, int) else 1
        
        self.set_cache_key(f'blog-posts:{selector}-{filters}-{limit}-{page_num}')
        
        qs, pagination = self.get_cached(BlogPost, pagination=True)
        
        try:
            if not self._restored_from_cache:
                qs = self.get_selector_items(selector)
                if filters:
                    qs = self.get_filtered_items(qs, filters)
                qs = qs.distinct()
                
                paginator = Paginator(qs, limit)
                try:
                    page = paginator.page(page_num)
                except PageNotAnInteger:
                    page = paginator.page(1)
                except EmptyPage:
                    page = paginator.page(paginator.num_pages)
                
                qs = page.object_list
                
                if not pagination:
                    pagination = {
                        'page': page.number,
                        'page_size': paginator.per_page,
                        'total_pages': paginator.num_pages,
                        'total_items': paginator.count,
                        'has_prev_page': page.has_previous(),
                        'has_next_page': page.has_next(),
                        'prev_page': page.previous_page_number() if page.has_previous() else None,
                        'next_page': page.next_page_number() if page.has_next() else None
                    }
                    
                self.store_cached(qs, pagination)
            
            if not qs:
                return self.build_response(
                    status.HTTP_404_NOT_FOUND,
                    message='Post not found'
                )
            
            serialized = QuickBlogPostSerializer(qs, context={'request': request}, many=True).data
            
            return self.build_response(
                status.HTTP_200_OK,
                message='Successful retrieval',
                posts=serialized,
                pagination=pagination,
                from_cache=self._restored_from_cache
            )
            
        except ValueError as e:
            logger.error(e)
            return self.build_response(
                status.HTTP_500_INTERNAL_SERVER_ERROR,
                message='Validation of data was not successful'
            )
        
    
class CategoryList(APIView, ResponseBuilderMixin, GetDataMixin):
    throttle_scope = 'blog-category-list'
    
    def validate_limit(self, limit: int | str) -> bool:
        if isinstance(limit, str) and limit.isdigit() and int(limit) >= 0:
            return True
        if isinstance(limit, int) and limit >= 0:
            return True
        
        return False
    
    def get(self, request):
        success, result = self.get_data(request, ('limit', self.validate_limit))
        
        if not success:
            return self.build_response(
                status.HTTP_400_BAD_REQUEST,
                message='Invalid or missing parameter',
                errors=result
            )
        
        limit = int(result['limit'])
        
        categories = Category.objects.all()
        if limit != 0:
            categories = categories[:limit]
            
        if not categories:
            return self.build_response(
                status.HTTP_404_NOT_FOUND,
                message='Category not found'
            )
        
        return self.build_response(
            status.HTTP_200_OK,
            message='Successful retrieval',
            categories=CategorySerializer(categories, many=True).data
        )


class TagList(APIView, ResponseBuilderMixin, GetDataMixin):
    throttle_scope = 'blog-tag-list'
    
    def validate_limit(self, limit: int | str) -> bool:
        if isinstance(limit, str) and limit.isdigit() and int(limit) >= 0:
            return True
        if isinstance(limit, int) and limit >= 0:
            return True
        
        return False
    
    def get(self, request):
        success, result = self.get_data(request, ('limit', self.validate_limit))
        
        if not success:
            return self.build_response(
                status.HTTP_400_BAD_REQUEST,
                message='Invalid or missing parameter',
                errors=result
            )
        
        limit = int(result['limit'])
        
        tags = Tag.objects.all()
        if limit != 0:
            tags = tags[:limit]
        
        if not tags:
            return self.build_response(
                status.HTTP_404_NOT_FOUND,
                message='Tag not found'
            )
        
        return self.build_response(
            status.HTTP_200_OK,
            message='Successful retrieval',
            tags=TagSerializer(tags, many=True).data
        )
