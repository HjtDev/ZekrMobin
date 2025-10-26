from django.contrib import messages
from django.core.exceptions import ValidationError
from django.db import models
from django_resized import ResizedImageField
from account.models import User
from logging import getLogger


logger = getLogger(__name__)


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
    
    landing_title = models.CharField(max_length=15, verbose_name='تیتر', help_text='تیتر سفید رنگ')
    landing_subtitle = models.CharField(max_length=30, verbose_name='زیرنویس', help_text='تیتر آبی رنگ')
    landing_text = models.TextField(max_length=250, verbose_name='توضیحات')
    landing_image = ResizedImageField(upload_to='settings/landing/', size=[511, 539], crop=['middle', 'center'], quality=100, force_format='PNG', verbose_name='عکس', help_text='511 * 539')
    
    ad1_image = ResizedImageField(upload_to='settings/ads/', size=[728, 90], crop=['middle', 'center'], quality=100, force_format='JPEG', blank=True, null=True, verbose_name='تبلیغ اول', help_text='728 * 90')
    ad2_image = ResizedImageField(upload_to='settings/ads/', size=[728, 90], crop=['middle', 'center'], quality=100, force_format='JPEG', blank=True, null=True, verbose_name='تبلیغ دوم', help_text='728 * 90')
    
    def __str__(self):
        return 'تنظیمات'

class ClubMessage(models.Model):
    class Meta:
        verbose_name = 'پیام های خبرنامه'
        verbose_name_plural = 'پیام های خبرنامه'
    
    class SendOptions(models.TextChoices):
        EVERYONE = ('ارسال برای همه', 'ارسال برای همه')
        MEMBERS_WHO_RECEIVED = ('ارسال برای کسانی که قبلا این پیام را گرفته اند', 'ارسال برای کسانی که قبلا این پیام را گرفته اند')
        NEW_MEMBERS = ('ارسال برای اعضای جدید', 'ارسال برای اعضای جدید')
        
    message = models.TextField(max_length=1000, verbose_name='متن پیام')
    is_ready = models.BooleanField(default=False, verbose_name='آماده ارسال')
    send_to = models.CharField(max_length=50, choices=SendOptions.choices, verbose_name='ارسال برای')
    sent_to = models.ManyToManyField('main.ClubMember', related_name='received_messages', verbose_name='ارسال شده برای')
    
    def __str__(self):
        return self.message[:20] + '...'
    
    def send(self, request):
        if not self.is_ready:
            messages.warning(request, 'این پیام آماده ارسال نیست.')
            return
        settings = Setting.objects.first()
        if not settings or not settings.club_enabled:
            messages.warning(request, 'خبرنامه از طریق تنظیمات غیرفعال شده است.')
            return
        
        if self.send_to == ClubMessage.SendOptions.EVERYONE:
            list_of_members = ClubMember.objects.all()
        elif self.send_to == ClubMessage.SendOptions.NEW_MEMBERS:
            list_of_members = ClubMember.objects.exclude(id__in=self.sent_to.values_list('id', flat=True))
        else:
            list_of_members = self.sent_to.all()
            
        for member in list_of_members:
            logger.info(f'Sent a club message to {member.name}')
            self.sent_to.add(member)
            messages.success(request, 'پیام(ها) با موفقیت ارسال شدند.')
            
    @staticmethod
    def send_to_user(request, user: User):
        logger.info(f'Send a club message to {user.name}')
        messages.success(request, 'پیام(ها) با موفقیت ارسال شدند.')
        

class ClubMember(models.Model):
    class Meta:
        verbose_name = 'خبرنامه'
        verbose_name_plural = 'خبرنامه'
        
    user = models.OneToOneField(User, related_name='club', on_delete=models.CASCADE, blank=True, null=True, verbose_name='کاربر')
    name = models.CharField(max_length=60, verbose_name='نام')
    email = models.EmailField(max_length=255, verbose_name='ایمیل', unique=True)
    
    def __str__(self):
        return self.name
    
    
    
def validate_category_sections(value):
    if value not in (MainPage.SectionChoices.TOP_ALBUM, MainPage.SectionChoices.TOP_USER_ALBUM):
        raise ValidationError('بخش پنجم و ششم باید دسته بندی های برتر یا دسته بندی های پر مخاطب باشد.')
    
def validate_artists_section(value):
    if value == MainPage.SectionChoices.TOP_ARTISTS:
        raise ValidationError('به علت محدودیت قالب فقط بخش سوم می تواند مختص به خوانندگان برتر باشد.')
    
def validate_section_three(value):
    if value != MainPage.SectionChoices.TOP_ARTISTS:
        raise ValidationError('به علت محدودیت قالب بخش سوم می تواند فقط مختص به خوانندگان برتر باشد.')
    
class MainPage(models.Model):
    class Meta:
        verbose_name = 'تنظیمات صفحه اصلی'
        verbose_name_plural = 'تنظیمات صفحه اصلی'
        
    class SectionChoices(models.TextChoices):
        RECENT_POSTS = ('recent-posts', 'پست های ترند اخیر')
        WEEKLY_POSTS = ('weekly-posts', 'برترین های هفته')
        NEW_POSTS = ('new-posts', 'پست های جدید')
        LIVE_SUGGESTIONS = ('live-suggestions', 'پیشنهادی های سایت')
        TOP_ARTISTS = ('top-artists', 'هنرمند های برتر')
        TOP_ALBUM = ('top-album', 'دسته بندی های برتر')
        TOP_USER_ALBUM = ('top-user-album', 'دسته بندی های پر مخاطب')
        
        
    section1_title = models.CharField(max_length=30, verbose_name='تیتر')
    section1_content = models.CharField(max_length=30, choices=SectionChoices.choices, validators=[validate_artists_section], verbose_name='محتوا')
    
    section2_title = models.CharField(max_length=30, verbose_name='تیتر')
    section2_content = models.CharField(max_length=30, choices=SectionChoices.choices, validators=[validate_artists_section], verbose_name='محتوا')
    
    section3_title = models.CharField(max_length=30, verbose_name='تیتر')
    section3_content = models.CharField(max_length=30, choices=SectionChoices.choices, validators=[validate_section_three], verbose_name='محتوا')
    
    section4_title = models.CharField(max_length=30, verbose_name='تیتر')
    section4_content = models.CharField(max_length=30, choices=SectionChoices.choices, validators=[validate_artists_section], verbose_name='محتوا')
    
    section5_title = models.CharField(max_length=30, verbose_name='تیتر')
    section5_content = models.CharField(max_length=30, choices=SectionChoices.choices, validators=[validate_category_sections], verbose_name='محتوا')
    
    section6_title = models.CharField(max_length=30, verbose_name='تیتر')
    section6_content = models.CharField(max_length=30, choices=SectionChoices.choices, validators=[validate_category_sections], verbose_name='محتوا')
    
    section7_title = models.CharField(max_length=30, verbose_name='تیتر')
    section7_content = models.CharField(max_length=30, choices=SectionChoices.choices, validators=[validate_artists_section], verbose_name='محتوا')
    
    def __str__(self):
        return 'تنظیمات صفحه اصلی'
