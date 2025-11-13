from datetime import timedelta
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.contrib.postgres.search import SearchQuery, SearchVector, SearchRank
from django.db.models import Count, ExpressionWrapper, FloatField, F, QuerySet, Sum, When, Case
from django.utils import timezone
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from backend.mixins import ResponseBuilderMixin, GetDataMixin, CachedResponseMixin
from .models import Post, Artist, Category, Comment, Tag
from rest_framework import status
from .serializers import QuickPostSerializer, PostSerializer, ArtistSerializer, CategorySerializer, CommentSerializer, \
    QuickCategorySerializer, TagSerializer, QuickTreeCategorySerializer
from .permissions import SafeAuthentication
import logging


logger = logging.getLogger(__name__)


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
            
            post.views_count += 1
            if request.user.is_authenticated:
                request.user.add_to_history(post)
            post.save()
            
            return self.build_response(
                message='Successful retrieval',
                post=serializer(post, context={'request': request}).data
            )
            
        except Post.DoesNotExist:
            return self.build_response(
                status.HTTP_405_NOT_FOUND,
                message='Post not found'
            )


class FilteredPosts(APIView, ResponseBuilderMixin, GetDataMixin, CachedResponseMixin):
    throttle_scope = 'filtered-posts'
    
    def get_section_queryset(self, section: str) -> QuerySet[Post]:
        now = timezone.now()
        qs = Post.objects.filter(is_visible=True)
        
        match section:
            case 'recent-posts':
                qs = qs.exclude(is_story=True).order_by('-views_count')
            case 'weekly-posts':
                qs = qs.filter(updated_at__gte=now - timedelta(days=7)).exclude(is_story=True).annotate(
                    likes=Count('liked_by'),
                    order=ExpressionWrapper(
                        F('likes') * 0.4 + F('download_count') * 0.4 + F('views_count') * 0.2,
                        output_field=FloatField()
                    )
                ).order_by('-order')
            case 'new-posts':
                qs = qs.filter(created_at__gt=now - timedelta(hours=348)).exclude(is_story=True).order_by('-updated_at')
            case 'live-suggestions':
                qs = qs.filter(recommended_by_site=True).exclude(is_story=True).order_by('-updated_at')
            case 'stories':
                qs = qs.filter(is_story=True).order_by('-created_at')
            case _:
                raise ValidationError({section: 'Invalid section'})
        
        return qs
    
    def get_selected_items(self, selector: str) -> QuerySet[Post]:
        if selector == 'all':
            return Post.objects.filter(is_visible=True).exclude(is_story=True)
        
        elif selector.startswith('ids:'):
            ids = selector.split(':', 1)[1].split(',')
            if not all(self.is_id(i) for i in ids):
                raise ValidationError({selector: 'Invalid id in selector. ID must be a positive number.'})
            return Post.objects.filter(is_visible=True, id__in=ids).exclude(is_story=True)
        
        elif selector.startswith('section:'):
            section = selector.split(':', 1)[1]
            return self.get_section_queryset(section)
        
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
                    posts = posts.order_by('-created_at')
                case 'oldest':
                    posts = posts.order_by('created_at')
                case 'suggested':
                    posts = posts.filter(recommended_by_site=True).order_by('-updated_at')
                case 'search':
                    query = values[0].strip()
                    if not query:
                        pass
                    query = SearchQuery(query)
                    search_vector = SearchVector('title', 'categories__name', 'tags__name')
                    posts = posts.annotate(rank=SearchRank(search_vector, query)).filter(rank__gt=0).distinct().order_by('-rank')
                    
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
            limit = int(result.get('limit')) or 6
            page_num = int(request.query_params.get('page', 1))
            
            self.set_cache_key(f'posts:{selector}-{filters}-{limit}-{page_num}')
            
            posts, pagination = self.get_cached(Post, pagination=True)
            
            if not self._restored_from_cache:
                posts = self.get_selected_items(selector)
                if result['filters'] and not self.FILTER_REGEX.match(result['filters']):
                    return self.build_response(
                        status.HTTP_400_BAD_REQUEST,
                        message='Invalid filters'
                    )
                posts = self.apply_filters(posts, filters)
                
                paginator = Paginator(posts, limit)
                try:
                    page = paginator.page(page_num)
                except PageNotAnInteger:
                    page = paginator.page(1)
                except EmptyPage:
                    page = paginator.page(paginator.num_pages)
                
                posts = page.object_list
                
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
                
                self.store_cached(posts, pagination)
                
            if not posts:
                return self.build_response(
                    status.HTTP_404_NOT_FOUND,
                    message='Post(s) not found'
                )
            
            serialized = QuickPostSerializer(posts, context={'request': request}, many=True)
            return self.build_response(
                message='Successful retrieval',
                posts=serialized.data,
                is_cached=self._restored_from_cache,
                pagination=pagination
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
        
        artists, _ = self.get_cached(Artist)
        if not self._restored_from_cache:
            artists_ids = Post.objects.filter(is_visible=True).order_by('medias__artist', '-views_count').distinct('medias__artist').values_list('medias__artist', flat=True)
            artists = Artist.objects.filter(id__in=artists_ids)
            
            if limit > 0:
                artists = artists[:limit]
                
            self.store_cached(artists)
            
        if not artists:
            return self.build_response(
                status.HTTP_404_NOT_FOUND,
                message='Artist(s) not found'
            )
        
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
        
        categories, _ = self.get_cached(Category)
        if not self._restored_from_cache:
            qs = Category.objects.filter(parent__isnull=True).prefetch_related('posts', 'children')
            if user_rated:
                qs = qs.filter(recommended_by_site=True)
            
            qs = qs.annotate(rate=Count('posts__liked_by')).order_by('-rate').distinct()
            
            if limit > 0:
                qs = qs[:limit]
            categories = qs
            
            self.store_cached(categories)
        
        if not categories:
            return self.build_response(
                status.HTTP_404_NOT_FOUND,
                message='Category(s) not found'
            )
        
        serializer = CategorySerializer(categories, many=True, context={'request': request})
        return self.build_response(
            message='Successful retrieval',
            categories=serializer.data,
            is_cached=self._restored_from_cache
        )
    
    
class PostComment(APIView, ResponseBuilderMixin, GetDataMixin):
    throttle_scope = 'comments'
    permission_classes = (SafeAuthentication,)
    
    def get(self, request):
        success, result = self.get_data(request, ('id', self.is_id))
        
        if not success:
            return self.build_response(
                status.HTTP_400_BAD_REQUEST,
                message='Invalid or missing parameter',
                errors=result
            )
        
        try:
            post = Post.objects.filter(is_visible=True).get(id=result['id'])
            comments = post.comments.filter(is_verified=True)
            
            if not comments.exists():
                return self.build_response(
                    status.HTTP_204_NO_CONTENT
                )
        
            return self.build_response(
                message='Successful retrieval',
                comments=CommentSerializer(comments, many=True).data
            )
        
        except Post.DoesNotExist:
            return self.build_response(
                status.HTTP_404_NOT_FOUND,
                message='Post not found'
            )
    
    def post(self, request):
        success, result = self.get_data(request, ('content', lambda c: bool(c.strip())), ('id', self.is_id))
        if not success:
            return self.build_response(
                status.HTTP_400_BAD_REQUEST,
                message='Invalid or missing parameter',
                errors=result
            )
        
        if Comment.objects.filter(post__id=result['id'], user=request.user).exists():
            return self.build_response(
                status.HTTP_409_CONFLICT,
                message='You have already commented on this post'
            )
        
        try:
            post = Post.objects.filter(is_visible=True).get(id=result['id'])
            comment = Comment.objects.create(post=post, user=request.user, content=result['content'], is_verified=True)
            if comment:
                return self.build_response(
                    status.HTTP_201_CREATED,
                    message='Comment created successfully'
                )
            else:
                return self.build_response(
                    status.HTTP_400_BAD_REQUEST
                )
        except Post.DoesNotExist:
            return self.build_response(
                status.HTTP_404_NOT_FOUND,
                message='Post not found'
            )
        
        
class PostLike(APIView, ResponseBuilderMixin, GetDataMixin):
    throttle_scope = 'like'
    permission_classes = (IsAuthenticated,)
    
    def get(self, request):
        success, result = self.get_data(request, ('id', self.is_id))
        
        if not success:
            return self.build_response(
                status.HTTP_400_BAD_REQUEST,
                message='Invalid or missing parameter',
                errors=result
            )
        
        try:
            post = Post.objects.prefetch_related('liked_by').filter(is_visible=True).get(id=result['id'])
            if post.liked_by.filter(id=request.user.id).exists():
                post.liked_by.remove(request.user)
                return self.build_response(
                    status.HTTP_200_OK,
                    message='Like removed successfully',
                    is_liked=False
                )
            else:
                post.liked_by.add(request.user)
                return self.build_response(
                    status.HTTP_200_OK,
                    message='Like added successfully',
                    is_liked=True
                )
        except Post.DoesNotExist:
            return self.build_response(
                status.HTTP_404_NOT_FOUND,
                message='Post not found'
            )
        
        
class PostDownload(APIView, ResponseBuilderMixin, GetDataMixin):
    throttle_scope = 'download'

    def get(self, request):
        success, result = self.get_data(request, ('id', self.is_id))
        
        if not success:
            return self.build_response(
                status.HTTP_400_BAD_REQUEST,
                message='Invalid or missing parameter',
                errors=result
            )
        
        try:
            post = Post.objects.prefetch_related('medias__files').filter(is_visible=True).get(id=result['id'])
            post.download_count += 1
            post.save()
            links = [request.build_absolute_uri(f.file.url) for media in post.medias.all() for f in media.files.all()]
            
            return self.build_response(
                status.HTTP_200_OK,
                message='Download links are ready to use',
                links=links
            )
        except Post.DoesNotExist:
            return self.build_response(
                status.HTTP_404_NOT_FOUND,
                message='Post not found'
            )
            
            
class PostSuggestion(APIView, ResponseBuilderMixin, GetDataMixin, CachedResponseMixin):
    throttle_scope = 'suggestion'
    
    def get(self, request):
        success, result = self.get_data(request, ('id', self.is_id))
        
        if not success:
            return self.build_response(
                status.HTTP_400_BAD_REQUEST,
                message='Invalid or missing parameter',
                errors=result
            )
        
        try:
            post = Post.objects.get(id=result['id'])
            if not post.is_visible:
                raise Post.DoesNotExist
            
            self.set_cache_key(f'suggestion-{post.id}')
            suggestion, _ = self.get_cached(Post)
            if not self._restored_from_cache:
                suggestion = Post.objects.exclude(id=post.id).filter(is_visible=True, categories__id__in=list(post.categories.values_list('id', flat=True))).order_by('-updated_at')
                self.store_cached(suggestion)
            
            return self.build_response(
                status.HTTP_200_OK,
                message='Suggested posts based on category',
                posts=list(suggestion.values_list('id', flat=True)),
                is_cached=self._restored_from_cache
            )
        except Post.DoesNotExist:
            return self.build_response(
                status.HTTP_404_NOT_FOUND,
                message='Post not found'
            )
        
    
class UserPosts(APIView, ResponseBuilderMixin, GetDataMixin):
    throttle_scope = 'user-posts'
    permission_classes = (IsAuthenticated,)
    
    def get(self, request):
        success, result = self.get_data(request, ('section', lambda s: s in ('history', 'liked')))
        
        if not success:
            return self.build_response(
                status.HTTP_400_BAD_REQUEST,
                message='"section" must be "history" or "liked"',
                errors=result
            )
        
        try:
            ids = [int(i) for i in request.user.history.split(',') if i.strip()]
            posts = request.user.liked_posts.all() if result['section'] == 'liked' else\
                (Post.objects.filter(is_visible=True, id__in=ids)
                 .order_by(Case(*[When(id=id, then=pos) for pos, id in enumerate(ids)])))
        except ValueError:
            return self.build_response(
                status.HTTP_404_NOT_FOUND,
                message='There is no item in your history'
            )
        
        if not posts.exists():
            return self.build_response(
                status.HTTP_404_NOT_FOUND,
                message='Post not found'
            )
        
        return self.build_response(
            message='Successful retrieval',
            posts=QuickPostSerializer(posts, context={'request': request}, many=True).data
        )
    
    
class PostListFilters(APIView, ResponseBuilderMixin, GetDataMixin):
    throttle_scope = 'post-list-filters'
    
    def get(self, request):
        categories = Category.objects.filter(parent__isnull=True)
        tags = Tag.objects.all()
        
        return self.build_response(
            status.HTTP_200_OK,
            categories=QuickTreeCategorySerializer(categories, many=True).data,
            tags=TagSerializer(tags, many=True).data,
        )
    

class ArtistsList(APIView, ResponseBuilderMixin):
    throttle_scope = 'artists-list'
    
    def get(self, request):
        artists = Artist.objects.all().annotate(post_count=Count('medias')).order_by('-post_count')
        if not artists.exists():
            return self.build_response(
                status.HTTP_404_NOT_FOUND,
                message='Artist not found'
            )
        return self.build_response(
            status.HTTP_200_OK,
            message='Successful retrieval',
            artists=ArtistSerializer(artists, context={'request': request}, many=True).data
        )
    

class RemoveHistory(APIView, ResponseBuilderMixin):
    throttle_scope = 'remove-history'
    permission_classes = (IsAuthenticated,)
    
    def post(self, request):
        user = self.request.user
        
        if user.history:
            user.history = ''
            user.save()
            
        return self.build_response(
            status.HTTP_204_NO_CONTENT
        )
    