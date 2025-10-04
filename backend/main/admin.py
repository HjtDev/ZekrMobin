from django.contrib import admin
from .models import Setting
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
                'fields': ('telegram_link', 'whatsapp_link', 'facebook_link', 'linkedin_link', 'twitter_link'),
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
