from django.db.models.signals import pre_save, post_save, post_delete, m2m_changed, pre_delete
from django.dispatch import receiver
from django.core.cache import cache
from .models import Post, Artist, Category, File
from django.contrib.postgres.search import SearchVector
from moviepy import VideoFileClip, AudioFileClip
import tempfile
import os
import logging


logger = logging.getLogger(__name__)


@receiver([post_save, m2m_changed], sender=Post)
def update_search_vector(sender, instance: Post, **kwargs):
    Post.objects.filter(pk=instance.pk).update(
        search_vector=SearchVector('title' , weight='A')
    )


@receiver(pre_save, sender=Post)
def invalidate_post_cache_on_update(sender, instance: Post, **kwargs):
    if not instance.pk:
        return
    
    try:
        old_instance = Post.objects.get(pk=instance.pk)
    except Post.DoesNotExist:
        return
    
    # if only views_count changed, skip full invalidation
    if old_instance.views_count != instance.views_count:
        return
    
    cache.delete_pattern('posts:*-*-*-*')
    cache.delete_pattern(f'suggestion-{instance.id}')
    cache.delete_pattern(f'stories:*')


@receiver(pre_delete, sender=Post)
def invalidate_post_cache_on_save_or_delete(sender, instance: Post, **kwargs):
    cache.delete_pattern('posts:*-*-*-*')
    cache.delete_pattern(f'suggestion-{instance.id}')
    cache.delete_pattern(f'stories:*')
    
    
@receiver([post_save, post_delete], sender=Artist)
def invalidate_artist_cache(sender, instance: Artist, **kwargs):
    cache.delete_pattern('top-artists-*')
    

@receiver([post_save, post_delete], sender=Category)
def invalidate_category_cache(sender, instance: Category, **kwargs):
    cache.delete_pattern('top-category-*-*')


@receiver(pre_save, sender=File)
def calculate_file_duration(sender, instance, **kwargs):
    if not instance.file:
        return
    
    file_changed = False
    if instance.pk:
        try:
            old_instance = File.objects.get(pk=instance.pk)
            file_changed = (old_instance.file.name != instance.file.name) or instance.duration == 0
        except File.DoesNotExist:
            file_changed = True
    else:
        file_changed = True
        
    if file_changed:
        temp_file_path = None
        try:
            if hasattr(instance.file, 'temporary_file_path'):
                temp_file_path = instance.file.temporary_file_path()
            else:
                with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(instance.file.name)[1]) as temp_file:
                    instance.file.seek(0)
                    for chunk in instance.file.chunks():
                        temp_file.write(chunk)
                    temp_file_path = temp_file.name
            
            if instance.media_type == File.TypeChoices.VIDEO:
                clip = VideoFileClip(temp_file_path)
            else:
                clip = AudioFileClip(temp_file_path)
                
            instance.duration = round(clip.duration)
            clip.close()
            
        except Exception as e:
            logger.error(f'Could not extract duration for {instance.file.name}: {e}')
            instance.duration = 0
        finally:
            if temp_file_path and temp_file_path != getattr(instance.file, 'temporary_file_path', None):
                if os.path.exists(temp_file_path):
                    try:
                        os.unlink(temp_file_path)
                    except Exception as cleanup_error:
                        logger.warning(f"Could not delete temp file {temp_file_path}: {cleanup_error}")
