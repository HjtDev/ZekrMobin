from rest_framework.fields import SerializerMethodField
from rest_framework.serializers import ModelSerializer
from django.utils.timezone import now
from .models import BlogPost, Category, Tag, Comment


class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name')
        
        
class TagSerializer(ModelSerializer):
    class Meta:
        model = Tag
        fields = ('id', 'name')


class BlogPostSerializer(ModelSerializer):
    category = CategorySerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    time_since = SerializerMethodField()
    comments_count = SerializerMethodField()
    class Meta:
        model = BlogPost
        fields = (
            'id', 'user', 'category', 'tags',
            'title', 'thumbnail',
            'content', 'author_comment', 'conclusion',
            'comments_count', 'views_count',
             'time_since', 'created_at', 'updated_at'
        )
        
    def get_thumbnail(self, obj: BlogPost):
        request = self.context.get('request', None)
        return request.build_absolute_uri(obj.thumbnail.url) if request else obj.thumbnail.url
        
    def get_comments_count(self, obj: BlogPost):
        return obj.comments.count()
    
    def get_time_since(self, obj: BlogPost):
        seconds = (now() - obj.created_at).total_seconds()
        
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
        

class QuickBlogPostSerializer(BlogPostSerializer):
    time_since = SerializerMethodField()
    comments_count = SerializerMethodField()
    
    class Meta:
        model = BlogPost
        fields = (
            'id', 'title', 'thumbnail',
            'comments_count', 'time_since',
        )
        
    def get_thumbnail(self, obj: BlogPost):
        request = self.context.get('request', None)
        return request.build_absolute_uri(obj.thumbnail.url) if request else obj.thumbnail.url
        
    def get_comments_count(self, obj: BlogPost):
        return obj.comments.count()
    
    def get_time_since(self, obj: BlogPost):
        seconds = (now() - obj.created_at).total_seconds()
        
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


class CommentSerializer(ModelSerializer):
    user = SerializerMethodField()
    time_since = SerializerMethodField()
    class Meta:
        model = Comment
        fields = ('id', 'content', 'user', 'time_since')
        read_only_fields = ('id',)
    
    def get_user(self, obj: Comment):
        return obj.user.username if obj.user else 'بی نام'
    
    
    def get_time_since(self, obj: BlogPost):
        seconds = (now() - obj.created_at).total_seconds()
        
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
