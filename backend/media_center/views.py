from datetime import timedelta
from django.db.models import Count, ExpressionWrapper, FloatField, F, QuerySet, Sum
from django.utils import timezone
from rest_framework.exceptions import ValidationError
from rest_framework.views import APIView
from backend.mixins import ResponseBuilderMixin, GetDataMixin, CachedResponseMixin
from .models import Post, Artist, Category
from rest_framework import status
from .serializers import QuickPostSerializer, PostSerializer, ArtistSerializer, CategorySerializer


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


class FilteredPosts(APIView, ResponseBuilderMixin, GetDataMixin, CachedResponseMixin):
    throttle_scope = 'filtered-posts'
    
    def get_section_queryset(self, section: str) -> QuerySet[Post]:
        now = timezone.now()
        qs = Post.objects.filter(is_visible=True)
        
        match section:
            case 'recent-posts':
                qs = qs.order_by('-updated_at').order_by('-views_count')
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
            return self.get_cached(Post) or Post.objects.filter(is_visible=True)
        
        elif selector.startswith('ids:'):
            ids = selector.split(':', 1)[1].split(',')
            if not all(self.is_id(i) for i in ids):
                raise ValidationError({selector: 'Invalid id in selector. ID must be a positive number.'})
            return self.get_cached(Post) or Post.objects.filter(is_visible=True, id__in=ids)
        
        elif selector.startswith('section:'):
            section = selector.split(':', 1)[1]
            return self.get_cached(Post) or self.get_section_queryset(section)
        
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
                status.HTTP_400_BAD_REQUEST,
                message='Invalid or missing argument',
                errors=result
            )
        
        try:
            selector = result['selector']
            filters = result['filters']
            limit = int(result.get('limit') or 0)
            
            self.set_cache_key(f'posts:{selector}-{filters}-{limit}')
            
            posts = self.get_selected_items(selector)
            
            if result['filters'] and not self.FILTER_REGEX.match(result['filters']):
                return self.build_response(
                    status.HTTP_400_BAD_REQUEST,
                    message='Invalid filters'
                )
            
            posts = self.apply_filters(posts, filters)
            
            if not self._restored_from_cache:
                self.store_cached(posts)
            
            if limit > 0:
                posts = posts[:limit]
            
            if not posts:
                return self.build_response(
                    status.HTTP_404_NOT_FOUND,
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
                status.HTTP_400_BAD_REQUEST,
                message='Invalid parameters',
                errors=e.detail
            )
        

class TopArtists(APIView, ResponseBuilderMixin, GetDataMixin, CachedResponseMixin):
    throttle_rate = 'top-artists'
    
    def get(self, request):
        success, result = self.get_data(request, ('limit', lambda l: isinstance(l, str) and l.isdigit()))
        
        if not success:
            return self.build_response(
                status.HTTP_400_BAD_REQUEST,
                message='Invalid or missing parameter',
                errors=result
            )
        
        limit = int(result['limit']) or 0
        self.set_cache_key(f'top-artists-{limit}')
        
        artists = self.get_cached(Artist)
        if not artists:
            artists_ids = Post.objects.filter(is_visible=True).order_by('medias__artist', '-views_count').distinct('medias__artist').values_list('medias__artist', flat=True)
            artists = Artist.objects.filter(id__in=artists_ids)
            
        if not self._restored_from_cache:
            self.store_cached(artists)
            
        if not artists.exists():
            return self.build_response(
                status.HTTP_404_NOT_FOUND,
                message='Artist(s) not found'
            )
        
        if limit > 0:
            artists = artists[:limit]
            
        return self.build_response(
            message='Successful retrieval',
            artists=ArtistSerializer(artists, context={'request': request}, many=True).data,
            is_cached=self._restored_from_cache
        )
    

class TopCategory(APIView, ResponseBuilderMixin, GetDataMixin, CachedResponseMixin):
    throttle_rate = 'top-categories'
    
    def get(self, request):
        success, result = self.get_data(request, 'user_rated', ('limit', lambda l: isinstance(l, str) and l.isdigit()))
        if not success:
            return self.build_response(
                status.HTTP_400_BAD_REQUEST,
                message='Invalid or missing parameter',
                errors=result
            )
        
        user_rated = self.convert_data_to_bool(result['user_rated'])
        limit = int(result['limit']) or 0
        
        self.set_cache_key(f'top-category-{user_rated}-{limit}')
        
        categories = self.get_cached(Category)
        if not categories:
            if user_rated:
                categories = Category.objects.prefetch_related('posts').annotate(rate=Sum('posts__liked_by')).order_by('-rate')
            else:
                categories = Category.objects.filter(recommended_by_site=True)
                
        if not categories.exists():
            return self.build_response(
                status.HTTP_404_NOT_FOUND,
                message='Category(s) not found'
            )
            
        if not self._restored_from_cache:
            self.store_cached(categories)
            
        if limit > 0:
            categories = categories[:limit]
            
        return self.build_response(
            message='Successful retrieval',
            categories=CategorySerializer(categories, context={'request': request}, many=True).data,
            is_cached=self._restored_from_cache
        )
        