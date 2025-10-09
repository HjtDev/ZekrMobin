from django.contrib import admin
from .models import Post, Media, File, Category, Tag, Comment, Artist


class MediaInline(admin.TabularInline):
    model = Media
    extra = 1
    autocomplete_fields = ('artist', 'files')
    show_change_link = True


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)
    ordering = ('-id',)
    
    fieldsets = (
        ('اطلاعات دسته‌بندی', {
            'fields': ('name', 'thumbnail')
        }),
    )


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)
    ordering = ('-id',)
    
    fieldsets = (
        ('اطلاعات تگ', {
            'fields': ('name',)
        }),
    )


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'post', 'is_verified')
    list_editable = ('is_verified',)
    list_filter = ('user', 'post', 'is_verified')
    autocomplete_fields = ('user', 'post')
    search_fields = ('user__name', 'user__email', 'post__title')
    ordering = ('-id',)
    
    fieldsets = (
        ('اطلاعات نظر', {
            'fields': ('user', 'post', 'content', 'is_verified')
        }),
    )


@admin.register(Artist)
class ArtistAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)
    ordering = ('-id',)
    
    fieldsets = (
        ('اطلاعات هنرمند', {
            'fields': ('name', 'profile_picture')
        }),
    )


@admin.register(File)
class FileAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'quality', 'media_type')
    list_filter = ('quality', 'media_type')
    readonly_fields = ('duration',)
    search_fields = ('name',)
    ordering = ('-id',)
    
    fieldsets = (
        ('اطلاعات فایل', {
            'fields': ('name', 'file')
        }),
        ('مشخصات', {
            'fields': ('quality', 'media_type', 'duration'),
            'classes': ('collapse',)
        }),
    )


@admin.register(Media)
class MediaAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'post', 'artist')
    list_filter = ('post', 'artist', 'post__publisher')
    autocomplete_fields = ('post', 'artist', 'files')
    search_fields = ('name', 'post__title', 'artist__name')
    ordering = ('-id',)
    
    fieldsets = (
        ('اطلاعات رسانه', {
            'fields': ('name', 'post', 'artist')
        }),
        ('فایل‌ها', {
            'fields': ('files',),
        }),
    )


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'publisher', 'is_visible', 'recommended_by_site', 'views_count', 'updated_at', 'created_at')
    list_filter = ('publisher', 'is_visible', 'categories', 'tags', 'created_at', 'updated_at')
    list_editable = ('is_visible', 'recommended_by_site')
    autocomplete_fields = ('publisher', 'liked_by', 'categories', 'tags')
    search_fields = ('id', 'title', 'publisher__name')
    ordering = ('-created_at',)
    date_hierarchy = 'created_at'
    readonly_fields = ('views_count', 'download_count', 'created_at', 'updated_at')
    inlines = [MediaInline]
    
    fieldsets = (
        ('اطلاعات اصلی پست', {
            'fields': ('title', 'thumbnail', 'publisher', 'recommended_by_site', 'is_visible')
        }),
        ('دسته‌بندی و تگ‌ها', {
            'fields': ('categories', 'tags'),
            'classes': ('collapse',)
        }),
        ('آمار و داده‌ها', {
            'fields': ('views_count', 'download_count', 'liked_by', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
