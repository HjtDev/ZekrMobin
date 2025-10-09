from datetime import timedelta
from django.conf import settings
from django.db.models import Count, ExpressionWrapper, FloatField, F, QuerySet
from django.utils import timezone
from rest_framework.exceptions import ValidationError
from rest_framework.views import APIView
from backend.mixins import ResponseBuilderMixin, GetDataMixin
from .models import Post
from rest_framework import status
from .serializers import QuickPostSerializer, PostSerializer
from django.core.cache import cache


class SinglePost(APIView, ResponseBuilderMixin, GetDataMixin):
    throttle_scope = 'single-post'
    
    def get(self, request):
        success, result = self.get_data(request, 'id')
        
        if not success:
            return self.build_response(
                status.HTTP_400_BAD_REQUEST,
                message='Invalid or missing argument: "id"',
                errors=result
            )
        
        if not self.is_id(result['id']):
            return self.build_response(
                status.HTTP_400_BAD_REQUEST,
                message='ID should be a positive number'
            )
        
        try:
            post = Post.objects.exclude(is_visible=False).get(id=result['id'])
            serializer = QuickPostSerializer if 'quick' in request.query_params and self.convert_data_to_bool(request.query_params.get('quick')) else PostSerializer
            
            return self.build_response(
                message='Successful retrieval',
                post=serializer(post, context={'request': request}).data
            )
            
        except Post.DoesNotExist:
            return self.build_response(
                status.HTTP_404_NOT_FOUND,
                message='Post not found'
            )


class FilteredPosts(APIView, ResponseBuilderMixin, GetDataMixin):
    throttle_scope = 'filtered-posts'
    _cache_key = ''
    _restored_from_cache = False
    
    def _get_cached(self):
        ids = cache.get(self._cache_key)
        if not ids or not isinstance(ids, list) or not all(self.is_id(i) for i in ids):
            return None
        else:
            self._restored_from_cache = True
            return Post.objects.filter(id__in=ids)
        
    def _store_cached(self, qs: QuerySet[Post]):
        ids = list(qs.values_list('id', flat=True))
        cache.set(self._cache_key, ids, timeout=settings.CACHE_TIMEOUT)
    
    def get_section_queryset(self, section: str) -> QuerySet[Post]:
        now = timezone.now()
        qs = Post.objects.filter(is_visible=True)
        
        match section:
            case 'recent-posts':
                qs = qs.order_by('-updated_at')
            case 'weekly-posts':
                qs = qs.filter(updated_at__gte=now - timedelta(days=7)).annotate(
                    likes=Count('liked_by'),
                    order=ExpressionWrapper(
                        F('likes') * 0.7 + F('views_count') * 0.3,
                        output_field=FloatField()
                    )
                ).order_by('-order')
            case 'new-posts':
                qs = qs.filter(created_at__gt=now - timedelta(hours=24)).order_by('-updated_at')
            case 'live-suggestions':
                qs = qs.filter(recommended_by_site=True).order_by('-updated_at')
            case _:
                raise ValidationError({section: 'Invalid section'})
        
        return qs
    
    def get_selected_items(self, selector: str) -> QuerySet[Post]:
        if selector == 'all':
            return self._get_cached() or Post.objects.filter(is_visible=True)
        
        elif selector.startswith('ids:'):
            ids = selector.split(':', 1)[1].split(',')
            if not all(self.is_id(i) for i in ids):
                raise ValidationError({selector: 'Invalid id in selector. ID must be a positive number.'})
            return self._get_cached() or Post.objects.filter(is_visible=True, id__in=ids)
        
        elif selector.startswith('section:'):
            section = selector.split(':', 1)[1]
            return self._get_cached() or self.get_section_queryset(section)
        
        raise ValidationError({selector: 'Invalid selector'})
    
    def apply_filters(self, posts: QuerySet[Post], filters: str) -> QuerySet[Post]:
        if not filters:
            return posts
        
        for f in filters.split(';'):
            if ':' not in f:
                continue
            
            key, values = f.split(':', 1)
            values = values.split(',')
            
            if key in ('category', 'tag', 'artist') and not all(self.is_id(i) for i in values):
                continue
            
            match key:
                case 'category':
                    posts = posts.filter(categories__id__in=values)
                case 'tag':
                    posts = posts.filter(tags__id__in=values)
                case 'artist':
                    posts = posts.filter(medias__artist__id__in=values)
                case 'most':
                    match values[0]:
                        case 'view':
                            posts = posts.order_by('-views_count')
                        case 'like':
                            posts = posts.annotate(like_count=Count('liked_by')).order_by('-like_count')
                        case 'download':
                            posts = posts.order_by('-download_count')
                        case 'popular':
                            posts = posts.annotate(
                                like_count=Count('liked_by'),
                                popularity=ExpressionWrapper(
                                    F('views_count') * 0.3 + F('like_count') * 0.3 + F('download_count') * 0.4,
                                    output_field=FloatField()
                                )
                            ).order_by('-popularity')
                case 'newest':
                    posts = posts.order_by('-updated_at')
                case 'oldest':
                    posts = posts.order_by('updated_at')
                case 'suggested':
                    posts = posts.filter(recommended_by_site=True).order_by('-updated_at')
        
        return posts.distinct()
    
    def get(self, request):
        success, result = self.get_data(request, 'selector', 'filters', 'limit')
        
        if not success:
            return self.build_response(
                status=status.HTTP_400_BAD_REQUEST,
                message='Invalid or missing argument',
                errors=result
            )
        
        try:
            selector = result['selector']
            filters = result['filters']
            limit = int(result.get('limit') or 0)
            
            self._cache_key = f'posts:{selector}-{filters}'
            
            posts = self.get_selected_items(selector)
            
            if result['filters'] and not self.FILTER_REGEX.match(result['filters']):
                return self.build_response(
                    status=status.HTTP_400_BAD_REQUEST,
                    message='Invalid filters'
                )
            
            posts = self.apply_filters(posts, filters)
            
            if not self._restored_from_cache:
                self._store_cached(posts)
            
            if limit > 0:
                posts = posts[:limit]
            
            if not posts.exists():
                return self.build_response(
                    status=status.HTTP_404_NOT_FOUND,
                    message='Post(s) not found'
                )
            
            serialized = QuickPostSerializer(posts, context={'request': request}, many=True)
            return self.build_response(
                message='Successful retrieval',
                posts=serialized.data,
                is_cached=self._restored_from_cache
            )
        
        except ValidationError as e:
            return self.build_response(
                status=status.HTTP_400_BAD_REQUEST,
                message='Invalid parameters',
                errors=e.detail
            )
