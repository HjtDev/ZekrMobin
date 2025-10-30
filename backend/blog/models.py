from django.db import models
from tinymce.models import HTMLField
from account.models import User
from django_resized import ResizedImageField
import os


class Tag(models.Model):
    class Meta:
        verbose_name = 'تگ'
        verbose_name_plural = 'تگ ها'

    name = models.CharField(max_length=60, verbose_name='تگ')
    
    def __str__(self):
        return self.name
    

class Category(models.Model):
    class Meta:
        verbose_name = 'دسته بندی'
        verbose_name_plural = 'دسته بندی ها'
        
    name = models.CharField(max_length=60, verbose_name='دسته بندی')
    
    def __str__(self):
        return self.name


def blog_post_thumbnail_path(instance, filename):
    return os.path.join(
        'Blog',
        f'{instance.title}',
        'thumbnail',
        filename
    )

class BlogPost(models.Model):
    class Meta:
        verbose_name = 'پست'
        verbose_name_plural = 'پست ها'

    user = models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name='blog_posts', verbose_name='نویسنده')
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, verbose_name='دسته بندی', blank=True, null=True, related_name='posts')
    tags = models.ManyToManyField(Tag, verbose_name='برچسب ها', related_name='posts', blank=True)
    
    title = models.CharField(max_length=255, verbose_name='تیتر')
    thumbnail = ResizedImageField(upload_to=blog_post_thumbnail_path, size=[1180, 530], crop=['middle', 'center'], quality=100, verbose_name='عکس کاور', help_text='1180 * 530')
    
    content = HTMLField(verbose_name='متن')
    author_comment = HTMLField(verbose_name='نظر نویسنده', blank=True, null=True)
    conclusion = HTMLField(verbose_name='نتیجه گیری', help_text='متن بعد از نظر نویسنده', blank=True)
    
    is_visible = models.BooleanField(default=False, verbose_name='نمایش در سایت')
    
    views_count = models.PositiveIntegerField(default=0, verbose_name='بازدید')
    
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='تاریخ انتشار')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='آخرین تغییر')
    
    def __str__(self):
        return self.title


class Comment(models.Model):
    class Meta:
        verbose_name = 'کامنت'
        verbose_name_plural = 'کامنت ها'
        
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='blog_comments', verbose_name='کاربر')
    post = models.ForeignKey(BlogPost, on_delete=models.CASCADE, related_name='comments', verbose_name='پست')
    
    content = models.TextField(max_length=320, verbose_name='متن')
    is_verified = models.BooleanField(default=False, verbose_name='نمایش در سایت')
    
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='تاریخ ایجاد')
    
    def __str__(self):
        return f'{self.user} - {self.post}'
