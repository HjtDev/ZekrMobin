from django.contrib import admin
from .models import BlogPost, Category, Tag, Comment


class CommentInline(admin.StackedInline):
    model = Comment
    extra = 0


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'category', 'is_visible', 'views_count', 'created_at')
    list_filter = ('is_visible', 'category', 'tags', 'created_at')
    search_fields = ('title', 'content', 'author_comment')
    ordering = ('-created_at',)
    list_editable = ('is_visible',)
    list_per_page = 15
    inlines = (CommentInline,)
    
    fieldsets = (
        ('اطلاعات اصلی', {
            'fields': (
                'user',
                'title',
                'thumbnail',
                'category',
                'tags',
                'is_visible',
            )
        }),
        ('محتوای پست', {
            'fields': (
                'content',
                'author_comment',
                'conclusion',
            )
        }),
        ('وضعیت و آمار', {
            'fields': (
                'views_count',
                'created_at',
                'updated_at',
            ),
            'classes': ('collapse',),
        }),
    )
    
    readonly_fields = ('created_at', 'updated_at', 'views_count')


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('user', 'post', 'content', 'is_verified', 'created_at')
    list_filter = ('is_verified', 'created_at', 'user', 'post')
    search_fields = ('post__title', 'content', 'user__username')
    ordering = ('-created_at',)
    list_editable = ('is_verified',)
    list_per_page = 15
    
    fieldsets = (
        ('اطلاعات کامنت', {
            'fields': (
                'user',
                'post',
                'content',
                'is_verified',
            )
        }),
        ('تاریخ', {
            'fields': ('created_at',),
            'classes': ('collapse',),
        }),
    )
    
    readonly_fields = ('created_at',)


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)
    ordering = ('id',)
    
    fieldsets = (
        ('اطلاعات تگ', {
            'fields': ('name',),
        }),
    )


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)
    ordering = ('id',)
    
    fieldsets = (
        ('اطلاعات دسته بندی', {
            'fields': ('name',),
        }),
    )
