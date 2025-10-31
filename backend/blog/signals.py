from django.db.models.signals import pre_save, pre_delete
from django.dispatch import receiver
from django.core.cache import cache
from .models import BlogPost


@receiver(pre_save, sender=BlogPost)
def invalidate_blog_post_cache_on_update(sender, instance: BlogPost, **kwargs):
    if not instance.pk:
        return
    
    old_instance = BlogPost.objects.get(pk=instance.pk)
    
    # if only views_count changed, skip clearing full cache
    if old_instance.views_count != instance.views_count:
        return
    
    cache.delete_pattern('blog-posts:*-*-*-*')


@receiver(pre_delete, sender=BlogPost)
def invalidate_blog_post_cache_on_delete(sender, instance: BlogPost, **kwargs):
    cache.delete_pattern('blog-posts:*-*-*-*')
