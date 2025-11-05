from django.db.models.signals import pre_save, post_save, post_delete, m2m_changed, pre_delete
from django.dispatch import receiver
from django.core.cache import cache
from .models import Post, Artist, Category
from django.contrib.postgres.search import SearchVector


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
