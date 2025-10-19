from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.core.cache import cache
from .models import Post, Artist, Category


@receiver([post_save, post_delete], sender=Post)
def invalidate_post_cache(sender, instance: Post, **kwargs):
    cache.delete_pattern('posts:*-*-*')
    cache.delete_pattern(f'suggestion-{instance.id}')
    
    
@receiver([post_save, post_delete], sender=Artist)
def invalidate_artist_cache(sender, instance: Artist, **kwargs):
    cache.delete_pattern('top-artists-*')
    

@receiver([post_save, post_delete], sender=Category)
def invalidate_category_cache(sender, instance: Category, **kwargs):
    cache.delete_pattern('top-category-*-*')
