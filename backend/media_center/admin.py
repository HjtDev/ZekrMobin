from django.contrib import admin, messages
from mptt.admin import DraggableMPTTAdmin
from .models import Post, Media, File, Category, Tag, Comment, Artist
from moviepy import VideoFileClip, AudioFileClip
import tempfile, os, logging


logger = logging.getLogger(__name__)


class MediaInline(admin.TabularInline):
    model = Media
    extra = 1
    autocomplete_fields = ('artist', 'files')
    show_change_link = True


@admin.register(Category)
class CategoryAdmin(DraggableMPTTAdmin):
    mptt_indent_field = "name"
    list_display = ('tree_actions', 'indented_title', 'recommended_by_site')
    list_editable = ('recommended_by_site',)
    search_fields = ('name',)
    fieldsets = (
        ('اطلاعات دسته‌بندی', {
            'fields': ('name', 'recommended_by_site', 'thumbnail')
        }),
        ('درختچه', {
            'fields': ('parent', 'get_children'),
        }),
    )
    readonly_fields = ('get_children',)
    
    def get_children(self, obj: Category):
        return ', '.join(obj.get_children().values_list('name', flat=True))
    get_children.short_description = 'دسته بندی ها فرزند'


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
    list_display = ('id', 'user', 'post', 'is_verified', 'created_at')
    list_editable = ('is_verified',)
    list_filter = ('user', 'post', 'is_verified', 'created_at')
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
    list_display = ('id', 'name', 'quality', 'media_type', 'duration')
    list_filter = ('quality', 'media_type')
    list_editable = ('duration',)
    list_per_page = 15
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
    
    actions = ['recalculate_duration']
    
    def recalculate_duration(self, request, queryset):
        success_count = 0
        error_count = 0
        
        for file_instance in queryset:
            if not file_instance.file:
                error_count += 1
                continue
            
            temp_file_path = None
            try:
                # Create temporary file
                if hasattr(file_instance.file, 'temporary_file_path'):
                    temp_file_path = file_instance.file.temporary_file_path()
                else:
                    with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(file_instance.file.name)[1]) as temp_file:
                        file_instance.file.seek(0)
                        for chunk in file_instance.file.chunks():
                            temp_file.write(chunk)
                        temp_file_path = temp_file.name
                
                # Calculate duration based on media type
                if file_instance.media_type == File.TypeChoices.VIDEO:
                    clip = VideoFileClip(temp_file_path)
                else:
                    clip = AudioFileClip(temp_file_path)
                
                new_duration = round(clip.duration)
                clip.close()
                
                # Update the instance
                file_instance.duration = new_duration
                file_instance.save(update_fields=['duration'])
                success_count += 1
            
            except Exception as e:
                logger.error(f'Could not extract duration for {file_instance.file.name}: {e}')
                error_count += 1
            
            finally:
                # Clean up temporary file
                if temp_file_path and temp_file_path != getattr(file_instance.file, 'temporary_file_path', None):
                    if os.path.exists(temp_file_path):
                        try:
                            os.unlink(temp_file_path)
                        except Exception as cleanup_error:
                            logger.warning(f"Could not delete temp file {temp_file_path}: {cleanup_error}")
        
        # Show result message
        if success_count > 0 and error_count == 0:
            self.message_user(request, f'مدت زمان {success_count} فایل با موفقیت محاسبه شد.', messages.SUCCESS)
        elif success_count > 0 and error_count > 0:
            self.message_user(request, f'مدت زمان {success_count} فایل با موفقیت محاسبه شد. {error_count} فایل با خطا مواجه شد.', messages.WARNING)
        else:
            self.message_user(request, f'محاسبه مدت زمان برای {error_count} فایل با خطا مواجه شد.', messages.ERROR)
    
    recalculate_duration.short_description = "محاسبه مجدد مدت زمان فایل‌های انتخاب شده"


@admin.register(Media)
class MediaAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'post', 'artist')
    list_filter = ('post', 'artist', 'post__publisher')
    list_per_page = 15
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
    list_display = ('id', 'title', 'publisher', 'is_story', 'is_visible', 'recommended_by_site', 'views_count', 'created_at')
    list_filter = ('publisher', 'is_visible', 'is_story', 'categories', 'tags', 'created_at', 'updated_at')
    list_editable = ('is_story', 'is_visible', 'recommended_by_site')
    list_per_page = 15
    autocomplete_fields = ('publisher', 'liked_by', 'categories', 'tags')
    search_fields = ('id', 'title', 'publisher__name')
    ordering = ('-created_at',)
    date_hierarchy = 'created_at'
    readonly_fields = ('views_count', 'download_count', 'created_at', 'updated_at')
    inlines = [MediaInline]
    
    fieldsets = (
        ('اطلاعات اصلی پست', {
            'fields': ('title', 'thumbnail', 'share_text', 'publisher', 'recommended_by_site', 'is_story', 'is_visible')
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
