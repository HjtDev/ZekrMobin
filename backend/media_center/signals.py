from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.core.cache import cache
from .models import Post


@receiver([post_save, post_delete], sender=Post)
def invalidate_post_cache(sender, instance: Post, **kwargs):
    cache.delete_pattern('posts:*-*')
