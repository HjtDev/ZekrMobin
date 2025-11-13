from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Post, Tag, Category, Artist, Media, File, Comment
from django.utils.timezone import now


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
        
        
class QuickTreeCategorySerializer(ModelSerializer):
    children = SerializerMethodField()
    class Meta:
        model = Category
        fields = ('id', 'name', 'children')
        
    def get_children(self, obj: Category):
        children = obj.get_children()
        return QuickTreeCategorySerializer(children, many=True).data if children.exists() else []


class CategorySerializer(ModelSerializer):
    children = SerializerMethodField()
    post_count = SerializerMethodField()
    thumbnail = SerializerMethodField()
    
    class Meta:
        model = Category
        fields = ('id', 'name', 'post_count', 'thumbnail', 'recommended_by_site', 'children')
        read_only_fields = ('id',)
        
    def get_thumbnail(self, obj: Category):
        if not obj.thumbnail:
            return None
        request = self.context.get('request', None)
        return request.build_absolute_uri(obj.thumbnail.url) if request else obj.thumbnail.url
    
    def get_post_count(self, obj: Category):
        return obj.posts.count()
    
    def get_children(self, obj: Category):
        children = obj.get_children()
        return CategorySerializer(children, many=True, context=self.context).data if children.exists() else []
    
    
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
        fields = ('id', 'title', 'thumbnail', 'share_text', 'artist', 'duration', 'is_liked')
    
    def get_duration(self, obj: Post):
        duration = obj.get_media_duration()
        return f'{duration//60}:{duration%60:02d}'

    def get_artist(self, obj: Post):
        artist = obj.medias.first().artist
        return {
            'id': artist.id,
            'name': artist.name
        } if artist else {
            'id': 0,
            'name': 'ناشناس'
        }
    
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
        fields = ('id', 'title', 'thumbnail', 'share_text', 'artist', 'duration', 'is_liked', 'categories', 'tags', 'media', 'views_count', 'created_at', 'updated_at')
        
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
        } if artist else {
            'id': 0,
            'name': 'ناشناس'
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
    
    
class CommentSerializer(ModelSerializer):
    user = SerializerMethodField()
    time_since = SerializerMethodField()
    class Meta:
        model = Comment
        fields = ('id', 'content', 'user', 'time_since')
        read_only_fields = ('id',)
        
    def get_user(self, obj: Comment):
        return obj.user.name if obj.user else 'بی نام'


    def get_time_since(self, obj: Comment):
        delta = now() - obj.created_at
        seconds = delta.total_seconds()
        
        if seconds < 60:
            return f"{int(seconds)} ثانیه پیش"
        elif seconds < 3600:
            minutes = int(seconds // 60)
            return f"{minutes} دقیقه پیش"
        elif seconds < 86400:
            hours = int(seconds // 3600)
            return f"{hours} ساعت پیش"
        else:
            days = int(seconds // 86400)
            return f"{days} روز پیش"
    