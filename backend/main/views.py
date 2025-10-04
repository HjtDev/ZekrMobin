from rest_framework.views import APIView
from backend.mixins import ResponseBuilderMixin, GetDataMixin
from rest_framework import status
from .models import Setting


class SettingView(APIView, ResponseBuilderMixin, GetDataMixin):
    throttle_scope = 'setting'
    
    def get(self, request):
        success, result = self.get_data(request, ('section', lambda s: all(section.strip() in ('logo', 'footer_content', 'club', 'contact', 'social', 'rights') for section in s.split(','))))
        
        if not success:
            return self.build_response(
                status.HTTP_400_BAD_REQUEST,
                message='Wrong section selection',
                errors=result
            )
    
        section_map = {
            'logo': ['logo', 'open_logo'],
            'footer_content': ['footer_title1', 'footer_text1', 'footer_title2', 'footer_text2', 'footer_img1', 'footer_img2', 'footer_img3'],
            'club': ['club_enabled', 'club_welcome_email_enabled', 'club_title', 'club_text'],
            'contact': ['contact_us_title', 'contact_us_phone', 'contact_us_email', 'contact_us_address'],
            'social': ['telegram_link', 'whatsapp_link', 'facebook_link', 'linkedin_link', 'twitter_link'],
            'rights': ['rights_text']
        }
        
        setting = Setting.objects.first()
        if not setting:
            return self.build_response(
                status.HTTP_503_SERVICE_UNAVAILABLE,
                message='Settings are not configured yet'
            )
        
        selected_sections = result['section'].strip().split(',')
        selected_fields = []
        data = dict()
        
        for section in selected_sections:
            selected_fields += section_map[section.strip()]
            
        for field in selected_fields:
            if hasattr(setting, field):
                value = getattr(setting, field)
                if hasattr(value, 'url'):
                    value = request.build_absolute_uri(value.url)
                data[field] = value
                
        if not data:
            return self.build_response(
                status.HTTP_404_NOT_FOUND,
                message='Currently there is no config available for this section.'
            )
            
        return self.build_response(
            message='Successful retrieval',
            config=data
        )
