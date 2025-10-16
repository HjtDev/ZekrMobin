from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Post, Tag, Category, Artist, Media, File


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
    
    
class FileSerializer(ModelSerializer):
    duration = SerializerMethodField()
    
    class Meta:
        model = File
        fields = ('id', 'name', 'quality', 'media_type', 'duration', 'file')
        
    def get_files(self, obj: File):
        request = self.context.get('request', None)
        return request.build_absolute_uri(obj.file.url) if request else obj.file.url
    
    def get_duration(self, obj: File):
        return f'{obj.duration//60}:{obj.duration%60:02d}'
    
    
class MediaSerializer(ModelSerializer):
    files = SerializerMethodField()
    
    class Meta:
        model = Media
        fields = ('id', 'name', 'artist', 'files')
        
    def get_files(self, obj: Media):
        return FileSerializer(obj.files.all(), many=True, context=self.context).data
        
class QuickPostSerializer(ModelSerializer):
    duration = SerializerMethodField()
    artist = SerializerMethodField()
    is_liked = SerializerMethodField()
    
    class Meta:
        model = Post
        fields = ('id', 'title', 'thumbnail', 'artist', 'duration', 'is_liked')
    
    def get_duration(self, obj: Post):
        duration = obj.get_media_duration()
        return f'{duration//60}:{duration%60:02d}'
    
    def get_artist(self, obj: Post):
        artist = obj.medias.first().artist
        return {
            'id': artist.id,
            'name': artist.name
        } if artist else None
    
    def get_is_liked(self, obj: Post):
        request = self.context.get('request', None)
        return obj.liked_by.filter(pk=request.user.pk).exists() if request.user.is_authenticated else False
    
    def get_thumbnail(self, obj: Post):
        request = self.context.get('request', None)
        return request.build_absolute_uri(obj.thumbnail.url) if request else obj.thumbnail.url
    

class PostSerializer(ModelSerializer):
    media = SerializerMethodField()
    duration = SerializerMethodField()
    artist = SerializerMethodField()
    is_liked = SerializerMethodField()
    tags = TagSerializer(many=True, read_only=True)
    categories = QuickCategorySerializer(many=True, read_only=True)
    
    class Meta:
        model = Post
        fields = ('id', 'title', 'thumbnail', 'artist', 'duration', 'is_liked', 'categories', 'tags', 'media', 'created_at', 'updated_at')
        
    def get_media(self, obj: Post):
        return MediaSerializer(obj.medias.all(), many=True, context=self.context).data
    
    def get_duration(self, obj: Post):
        duration = obj.get_media_duration()
        return f'{duration//60}:{duration%60:02d}'
    
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
