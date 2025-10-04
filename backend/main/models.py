from django.db import models
from django_resized import ResizedImageField


class Setting(models.Model):
    class Meta:
        verbose_name = 'تنظیمات'
        verbose_name_plural = 'تنظیمات'
    logo = ResizedImageField(upload_to='settings/logo/', blank=False, null=False, size=[78, 78], crop=['middle', 'center'], quality=100, force_format='PNG', verbose_name='لوگو', help_text='78 * 78')
    open_logo = ResizedImageField(upload_to='settings/logo/', blank=False, null=False, size=[126, 97], crop=['middle', 'center'], quality=100, force_format='PNG', verbose_name='لوگو فوتر', help_text='126 * 97')

    footer_title1 = models.CharField(max_length=20, verbose_name='تیتر')
    footer_text1 = models.TextField(max_length=255, verbose_name='محتوا')
    
    footer_title2 = models.CharField(max_length=20, verbose_name='تیتر')
    footer_text2 = models.TextField(max_length=100, verbose_name='محتوا')
    footer_img1 = ResizedImageField(upload_to='settings/section2_images/', blank=True, null=True, size=[140, 40], crop=['middle', 'center'], quality=100, verbose_name='عکس اول فوتر', help_text='140 * 40')
    footer_img2 = ResizedImageField(upload_to='settings/section2_images/', blank=True, null=True, size=[140, 40], crop=['middle', 'center'], quality=100, verbose_name='عکس دوم فوتر', help_text='140 * 40')
    footer_img3 = ResizedImageField(upload_to='settings/section2_images/', blank=True, null=True, size=[140, 40], crop=['middle', 'center'], quality=100, verbose_name='عکس سوم فوتر', help_text='140 * 40')
    
    club_enabled = models.BooleanField(default=True, verbose_name='فعال سازی کلاب')
    club_welcome_email_enabled = models.BooleanField(default=False, verbose_name='ارسال ایمیل خوش آمد')
    club_title = models.CharField(max_length=20, verbose_name='تیتر')
    club_text = models.TextField(max_length=100, verbose_name='محتوا')
    
    contact_us_title = models.CharField(max_length=20, verbose_name='تیتر')
    contact_us_phone = models.CharField(max_length=25, verbose_name='شماره تلفن')
    contact_us_email = models.EmailField(max_length=255, verbose_name='ایمیل')
    contact_us_address = models.CharField(max_length=60, verbose_name='آدرس')
    
    telegram_link = models.CharField(max_length=255, verbose_name='تلگرام')
    whatsapp_link = models.CharField(max_length=255, verbose_name='واتساپ')
    facebook_link = models.CharField(max_length=255, verbose_name='فیسبوک')
    linkedin_link = models.CharField(max_length=255, verbose_name='لینکدین')
    twitter_link = models.CharField(max_length=255, verbose_name='ایکس')
    
    rights_text = models.TextField(max_length=255, verbose_name='متن حقوق سایت')
    
    def __str__(self):
        return 'تنظیمات'
