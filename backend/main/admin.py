from django.contrib import admin
from .models import Setting, ClubMember, ClubMessage, MainPage
from django.shortcuts import redirect


@admin.register(Setting)
class SettingAdmin(admin.ModelAdmin):
    fieldsets = (
        (
            'لوگو ها',
            {
                'fields': ('logo', 'open_logo'),
                'classes': ('collapse',),
            }
        ),
        (
            'لندینگ',
            {
                'fields': ('landing_title', 'landing_subtitle', 'landing_text', 'landing_image'),
                'classes': ('collapse',),
            }
        ),
        (
            'بخش اول فوتر',
            {
                'fields': ('footer_title1', 'footer_text1'),
                'classes': ('collapse',),
            }
        ),
        (
            'بخش دوم فوتر',
            {
                'fields': ('footer_title2', 'footer_text2', 'footer_img1', 'footer_img2', 'footer_img3'),
                'classes': ('collapse',),
            }
        ),
        (
            'خبرنامه',
            {
                'fields': ('club_enabled', 'club_welcome_email_enabled', 'club_title', 'club_text'),
                'classes': ('collapse',),
            }
        ),
        (
            'ارتباط با ما',
            {
                'fields': ('contact_us_title', 'contact_us_phone', 'contact_us_email', 'contact_us_address'),
                'classes': ('collapse',),
            }
        ),
        (
            'فضای مجازی',
            {
                'fields': ('telegram_link', 'instagram_link', 'youtube_link', 'eitaa_link', 'aparat_link'),
                'classes': ('collapse',),
            }
        ),
        (
            'حقوق سایت',
            {
                'fields': ('rights_text',),
                'classes': ('collapse',),
            }
        ),
        (
            'تبلیغات',
            {
                'fields': ('ad1_image', 'ad2_image'),
                'classes': ('collapse',),
            }
        ),
    )
    
    def has_add_permission(self, request):
        return Setting.objects.count() == 0
    
    def has_delete_permission(self, request, obj=None):
        return False
    
    def changelist_view(self, request, extra_context=None):
        qs = Setting.objects.all()
        if qs.count() == 1:
            setting = qs.first()
            return redirect(f'/admin/main/setting/{setting.pk}/change/')
        return super().changelist_view(request, extra_context)
    
    def get_model_perms(self, request):
        perms = super().get_model_perms(request)
        if Setting.objects.count() == 1:
            perms['add'] = False
        return perms

@admin.register(ClubMember)
class ClubMemberAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'name', 'email']
    list_filter = ('user',)
    raw_id_fields = ('user',)
    search_fields = ('id', 'user__name', 'name', 'email')
    ordering = ('id',)
    
def send_action(modeladmin, request, queryset):
    for message in queryset.all():
        message.send(request)
    
send_action.short_description = 'ارسال پیام'
    
@admin.register(ClubMessage)
class ClubMessageAdmin(admin.ModelAdmin):
    list_display = ('id', 'is_ready', 'send_to')
    list_filter = ('is_ready', 'send_to')
    list_editable = ('is_ready', 'send_to')
    readonly_fields = ('sent_to',)
    search_fields = ('id', 'sent_to__name', 'message')
    actions = (send_action,)
    ordering = ('id',)

@admin.register(MainPage)
class MainPageAdmin(admin.ModelAdmin):
    fieldsets = (
        (
            'بخش اول',
            {
                'fields': ('section1_title', 'section1_content'),
                'classes': ('collapse',),
            }
        ),
        (
            'بخش دوم',
            {
                'fields': ('section2_title', 'section2_content'),
                'classes': ('collapse',),
            }
        ),
        (
            'بخش سوم',
            {
                'fields': ('section3_title', 'section3_content'),
                'classes': ('collapse',),
            }
        ),
        (
            'بخش چهارم',
            {
                'fields': ('section4_title', 'section4_content'),
                'classes': ('collapse',),
            }
        ),
        (
            'بخش پنجم',
            {
                'fields': ('section5_title', 'section5_content'),
                'classes': ('collapse',),
            }
        ),
        (
            'بخش ششم',
            {
                'fields': ('section6_title', 'section6_content'),
                'classes': ('collapse',),
            }
        ),
        (
            'بخش هفتم',
            {
                'fields': ('section7_title', 'section7_content'),
                'classes': ('collapse',),
            }
        ),
    )
    
    def has_add_permission(self, request):
        return MainPage.objects.count() == 0
    
    def has_delete_permission(self, request, obj=None):
        return False
    
    def changelist_view(self, request, extra_context=None):
        qs = MainPage.objects.all()
        if qs.count() == 1:
            main_page = qs.first()
            return redirect(f'/admin/main/mainpage/{main_page.pk}/change/')
        return super().changelist_view(request, extra_context)
    
    def get_model_perms(self, request):
        perms = super().get_model_perms(request)
        if MainPage.objects.count() == 1:
            perms['add'] = False
        return perms
