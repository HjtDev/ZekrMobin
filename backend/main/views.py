from pyexpat.errors import messages

from drf_spectacular.hooks import postprocess_schema_enum_id_removal
from rest_framework.views import APIView
from backend.mixins import ResponseBuilderMixin, GetDataMixin
from rest_framework import status
from django.db.models import Q
from .models import Setting, ClubMember, MainPage
from .serializers import ClubMemberSerializer


class SettingView(APIView, ResponseBuilderMixin, GetDataMixin):
    throttle_scope = 'setting'
    
    def get(self, request):
        success, result = self.get_data(request, ('section', lambda s: all(section.strip() in ('logo', 'landing', 'footer_content', 'club', 'contact', 'social', 'rights', 'ad') for section in s.split(','))))
        
        if not success:
            return self.build_response(
                status.HTTP_400_BAD_REQUEST,
                message='Wrong section selection',
                errors=result
            )
    
        section_map = {
            'logo': ['logo', 'open_logo'],
            'landing': ['landing_title', 'landing_subtitle', 'landing_text', 'landing_image'],
            'footer_content': [
                'footer_title1', 'footer_text1',
                'footer_title2', 'footer_text2',
                'footer_img1', 'footer_img1_link',
                'footer_img2', 'footer_img2_link',
                'footer_img3', 'footer_img3_link'
            ],
            'club': ['club_enabled', 'club_welcome_email_enabled', 'club_title', 'club_text'],
            'contact': ['contact_us_title', 'contact_us_phone', 'contact_us_email', 'contact_us_address'],
            'social': ['telegram_link', 'instagram_link', 'youtube_link', 'eitaa_link', 'aparat_link'],
            'rights': ['rights_text'],
            'ad': ['ad1_image', 'ad2_image']
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
                try:
                    if value and hasattr(value, 'url'):
                        value = request.build_absolute_uri(value.url)
                except AttributeError:
                    pass
                finally:
                    if value:
                        data[field] = value
                    else:
                        continue
                
        if not data:
            return self.build_response(
                status.HTTP_404_NOT_FOUND,
                message='Currently there is no config available for this section.'
            )
            
        return self.build_response(
            message='Successful retrieval',
            config=data
        )


class Club(APIView, ResponseBuilderMixin, GetDataMixin):
    throttle_scope = 'club'
    
    def post(self, request):
        success, result = self.get_data(request, 'name', 'email')
        
        if not success:
            return self.build_response(
                status.HTTP_400_BAD_REQUEST,
                message='Wrong or invalid input',
                errors=result
            )
        
        if ClubMember.objects.filter(Q(user=request.user) | Q(email=result['email'])).exists():
            return self.build_response(
                status.HTTP_409_CONFLICT,
                message='This email is already registered',
            )
        
        serializer = ClubMemberSerializer(data=result)
        
        if serializer.is_valid():
            club_member = serializer.save()
            if request.user.is_authenticated:
                club_member.user = request.user
            club_member.save()
            return self.build_response(
                status.HTTP_201_CREATED,
                message='Club member added',
            )
        else:
            return self.build_response(
                status.HTTP_400_BAD_REQUEST,
                message='Wrong name or email',
                errors=serializer.errors
            )
        
        
class MainPageSections(APIView, ResponseBuilderMixin, GetDataMixin):
    throttle_rate = 'main-page'
    
    def get(self, request):
        success, result = self.get_data(request, ('section_id', self.is_id))
        
        if not success:
            return self.build_response(
                status.HTTP_400_BAD_REQUEST,
                message='Invalid or missing argument',
                errors=result
            )
        
        section_id = result['section_id']
        
        if not 1 <= int(section_id) <= 10:
            return self.build_response(
                status.HTTP_400_BAD_REQUEST,
                message='Invalid section id',
                errors=[
                    'section_id should be between 1 and 10'
                ]
            )
        
        main_page_data = MainPage.objects.first()
        
        if not main_page_data:
            return self.build_response(
                status.HTTP_404_NOT_FOUND,
                message='Main page data is not configured yet'
            )
        
        if hasattr(main_page_data, f'section{section_id}_title') and hasattr(main_page_data, f'section{section_id}_content'):

            title = getattr(main_page_data, f'section{section_id}_title')
            content = getattr(main_page_data, f'section{section_id}_content')
            
            if int(section_id) == 8 and main_page_data.section8_show and content:
                content = request.build_absolute_uri(content.url)
                
            if int(section_id) == 10 and content:
                content = content.values_list('id', flat=True)
                
            return self.build_response(
                status.HTTP_200_OK,
                message='Successful retrieval',
                title=title,
                content=content
            )
        
        return self.build_response(
            status.HTTP_422_UNPROCESSABLE_ENTITY,
            message='This section is not available yet'
        )
