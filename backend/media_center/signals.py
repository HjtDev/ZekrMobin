from django.db.models.signals import post_save, post_delete, m2m_changed
from django.dispatch import receiver
from django.core.cache import cache
from .models import Post, Artist, Category
from django.contrib.postgres.search import SearchVector
from django.db.models import F


@receiver([post_save, m2m_changed], sender=Post)
def update_search_vector(sender, instance: Post, **kwargs):
    Post.objects.filter(pk=instance.pk).update(
        search_vector=SearchVector('title' , weight='A')
    )

@receiver([post_save, post_delete], sender=Post)
def invalidate_post_cache(sender, instance: Post, **kwargs):
    cache.delete_pattern('posts:*-*-*-*')
    cache.delete_pattern(f'suggestion-{instance.id}')
    
    
@receiver([post_save, post_delete], sender=Artist)
def invalidate_artist_cache(sender, instance: Artist, **kwargs):
    cache.delete_pattern('top-artists-*')
    

@receiver([post_save, post_delete], sender=Category)
def invalidate_category_cache(sender, instance: Category, **kwargs):
    cache.delete_pattern('top-category-*-*')
