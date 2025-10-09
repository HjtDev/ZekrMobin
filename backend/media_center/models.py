from django.core.exceptions import ValidationError
from django.db import models
from django.utils.text import slugify
from django_resized import ResizedImageField
from moviepy import VideoFileClip, AudioFileClip
from account.models import User
from logging import getLogger
import mimetypes


logger = getLogger(__name__)


def dynamic_post_path(instance, filename):
    return f'Posts/post-{slugify(instance.title)}/{filename}'

def dynamic_file_path(instance, filename):
    return f'Files/file-{slugify(instance.name)}/{filename}'


class Category(models.Model):
    class Meta:
        verbose_name = 'دسته بندی'
        verbose_name_plural = 'دسته بندی ها'
    
    name = models.CharField(max_length=50, verbose_name='اسم دسته بندی')
    thumbnail = ResizedImageField(upload_to='category/thumbnails/', verbose_name='عکس کاور')
    
    def __str__(self):
        return self.name


class Comment(models.Model):
    class Meta:
        verbose_name = 'نظر'
        verbose_name_plural = 'نظرات'
    
    user = models.ForeignKey(User, related_name='comments', on_delete=models.CASCADE, verbose_name='کاربر')
    post = models.ForeignKey('media_center.Post', related_name='comments', on_delete=models.CASCADE, verbose_name='پست')
    content = models.TextField(max_length=500, verbose_name='کامنت')
    
    is_verified = models.BooleanField(default=False, verbose_name='نمایش در سایت')
    
    def __str__(self):
        return f'نظر {self.user.name} بر روی پست {self.post.title}'
    

class Tag(models.Model):
    class Meta:
        verbose_name = 'تگ'
        verbose_name_plural = 'تگ ها'
        
    name = models.CharField(max_length=35, verbose_name='اسم')
    
    def __str__(self):
        return self.name
    

class File(models.Model):
    class Meta:
        verbose_name = 'فایل'
        verbose_name_plural = 'فایل ها'
        
    class QualityChoices(models.TextChoices):
        quality_144p = ('144P', '144P')
        quality_240p = ('240P', '240P')
        quality_360p = ('360P', '360P')
        quality_480p = ('480P', '480P')
        quality_720p = ('720P', '720P')
        quality_1080p = ('1080P', '1080P')
        quality_2k = ('2K', '2K')
        quality_4k = ('4K', '4K')
        
    class TypeChoices(models.TextChoices):
        VIDEO = ('ویدئویی',  'ویدئویی')
        AUDIO = ('صوتی', 'صوتی')
        
    name = models.CharField(max_length=70, verbose_name='نام مختصر فایل', help_text='مثال: دعای جوشن کبیر 1080P')
    quality = models.CharField(max_length=5, choices=QualityChoices.choices, verbose_name='کیفیت')
    media_type = models.CharField(max_length=7, choices=TypeChoices.choices, verbose_name='نوع فایل')
    duration = models.PositiveIntegerField(default=0, verbose_name='مدت زمان رسانه', help_text='برحسب ثانیه')
    
    file = models.FileField(upload_to=dynamic_file_path, verbose_name='فایل')
    
    def __str__(self):
        return self.name
    
    def clean(self):
        super().clean()

        mime_type, _ = mimetypes.guess_type(self.file.name)
        if not mime_type:
            raise ValidationError('فرمت فایل قابل شناسایی نیست.')
        
        if self.media_type == self.TypeChoices.VIDEO and not mime_type.startswith('video'):
            raise ValidationError('فایل انتخابی باید یک فایل ویدیویی باشد.')
        elif self.media_type == self.TypeChoices.AUDIO and not mime_type.startswith('audio'):
            raise ValidationError('فایل انتخابی باید یک فایل صوتی باشد.')
        
    def get_duration(self) -> int:
        try:
            clip = VideoFileClip(self.file.path) if self.media_type == self.TypeChoices.VIDEO else AudioFileClip(self.file.path)
            return round(clip.duration, 2)
        except Exception as e:
            logger.error(f'Could not extract duration for {self.file.name}: {e}')
            return 0
        
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        duration = self.get_duration()
        if duration != self.duration:
            File.objects.filter(pk=self.pk).update(duration=duration)
    

class Artist(models.Model):
    class Meta:
        verbose_name = 'مداح/نویسنده/خواننده'
        verbose_name_plural = 'مداح/نویسنده/خواننده'
    
    name = models.CharField(max_length=50, verbose_name='اسم')
    profile_picture = ResizedImageField(upload_to='Artists/', verbose_name='غکس پروفایل')
    
    def __str__(self):
        return self.name
    
    def get_posts(self):
        return self.medias.select_related('post').all().values_list('post', flat=True)


class Media(models.Model):
    class Meta:
        verbose_name = 'رسانه'
        verbose_name_plural = 'رسانه ها'
        
    name = models.CharField(max_length=60, verbose_name='نام رسانه', help_text='دعای جوشن کبیر')
    post = models.ForeignKey('media_center.Post', related_name='medias', on_delete=models.SET_NULL, blank=True, null=True, verbose_name='پست')
    artist = models.ForeignKey(Artist, related_name='medias', on_delete=models.SET_NULL, blank=True, null=True, verbose_name='مداح/نویسنده/خواننده')
    files = models.ManyToManyField(File, related_name='medias', verbose_name='فایل ها')


class Post(models.Model):
    class Meta:
        verbose_name = 'پست'
        verbose_name_plural = 'پست ها'
        
    publisher = models.ForeignKey(User, related_name='posts', on_delete=models.SET_NULL, blank=True, null=True, verbose_name='منتشر کننده')
    
    title = models.CharField(max_length=50, verbose_name='تیتر پست')
    thumbnail = ResizedImageField(upload_to=dynamic_post_path, size=[240, 240], crop=['middle', 'center'], quality=100, verbose_name='عکس کاور', help_text='140 * 40')

    is_visible = models.BooleanField(default=True, verbose_name='نمایش در سایت')
    
    liked_by = models.ManyToManyField(User, related_name='liked_posts', blank=True, verbose_name='لایک شده توسط')
    recommended_by_site = models.BooleanField(default=False, verbose_name='پیشنهادی سایت')
    
    views_count = models.PositiveIntegerField(default=0, verbose_name='بازدید')
    download_count = models.PositiveIntegerField(default=0, verbose_name='دانلود')
    
    categories = models.ManyToManyField(Category, related_name='posts', verbose_name='دسته بندی ها')
    tags = models.ManyToManyField(Tag, related_name='posts', verbose_name='تگ ها')
    
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='تاریخ انتشار')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='آخرین تغییر')
    
    def __str__(self):
        return self.title
    
    def get_available_qualities(self):
        return list(self.medias.values_list('files__quality', flat=True))
    
    def get_media_duration(self) -> int:
        medias = self.medias.prefetch_related('files').all()
        total_duration = 0
        
        for media in medias:
            first_file = media.files.first()
            if first_file:
                total_duration += first_file.duration

        return total_duration
    
