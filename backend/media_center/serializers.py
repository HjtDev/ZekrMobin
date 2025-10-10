from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Post, Tag, Category, Artist


class TagSerializer(ModelSerializer):
    class Meta:
        model = Tag
        fields = ('name', 'id')
        read_only_fields = ('id',)
        
        
class QuickCategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name')
        read_only_fields = ('id',)


class CategorySerializer(ModelSerializer):
    post_count = SerializerMethodField()
    class Meta:
        model = Category
        fields = ('id', 'name', 'post_count', 'thumbnail', 'recommended_by_site')
        read_only_fields = ('id',)
        
    def get_thumbnail(self, obj: Category):
        request = self.context.get('request', None)
        return request.build_absolute_uri(obj.thumbnail.url) if request else obj.thumbnail.url
    
    def get_post_count(self, obj: Category):
        return obj.posts.count()
        
class QuickPostSerializer(ModelSerializer):
    duration = SerializerMethodField()
    artist = SerializerMethodField()
    is_liked = SerializerMethodField()
    
    class Meta:
        model = Post
        fields = ('id', 'title', 'thumbnail', 'artist', 'duration', 'is_liked')
        
    def get_duration(self, obj: Post):
        return obj.get_media_duration()
    
    def get_artist(self, obj: Post):
        artist = obj.medias.first().artist
        return {
            'id': artist.id,
            'name': artist.name
        }
    
    def get_is_liked(self, obj: Post):
        request = self.context.get('request', None)
        return obj.liked_by.filter(pk=request.user.pk).exists() if request.user.is_authenticated else False
    
    def get_thumbnail(self, obj: Post):
        request = self.context.get('request', None)
        return request.build_absolute_uri(obj.thumbnail.url) if request else obj.thumbnail.url
    

class PostSerializer(ModelSerializer):
    duration = SerializerMethodField()
    artist = SerializerMethodField()
    is_liked = SerializerMethodField()
    tags = TagSerializer(many=True, read_only=True)
    categories = QuickCategorySerializer(many=True, read_only=True)
    
    class Meta:
        model = Post
        fields = ('id', 'title', 'thumbnail', 'artist', 'duration', 'is_liked', 'categories', 'tags', 'created_at', 'updated_at')
    
    def get_duration(self, obj: Post):
        return obj.get_media_duration()
    
    def get_artist(self, obj: Post):
        artist = obj.medias.first().artist
        return {
            'id': artist.id,
            'name': artist.name
        }
    
    def get_is_liked(self, obj: Post):
        request = self.context.get('request', None)
        return obj.liked_by.filter(pk=request.user.pk).exists() if request.user.is_authenticated else False
    
    def get_thumbnail(self, obj: Post):
        request = self.context.get('request', None)
        return request.build_absolute_uri(obj.thumbnail.url) if request else obj.thumbnail.url
    
    
class ArtistSerializer(ModelSerializer):
    class Meta:
        model = Artist
        fields = ('id', 'name', 'profile_picture')
        
    def get_profile_picture(self, obj: Artist):
        request = self.context.get('request', None)
        return request.build_absolute_uri(obj.profile_picture.url) if request else obj.profile_picture
