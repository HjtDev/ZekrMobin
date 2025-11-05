from django.apps import AppConfig


class BlogConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'blog'
    verbose_name = 'مجله'
    verbose_name_plural = 'مجله'
    
    def ready(self):
        import blog.signals
