from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User
from .forms import CustomUserCreationForm, CustomUserChangeForm
from media_center.models import Post
from django.contrib.auth.models import Group

admin.site.unregister(Group)


@admin.register(User)
class UserAdmin(UserAdmin):
    ordering = ['username']
    
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = User
    
    search_fields = [
        'username',
        'name',
        'email'
    ]
    
    list_display = [
        'id',
        'username',
        'name',
        'email',
        'is_active',
        'is_staff',
    ]

    fieldsets = (
        ('اصلی', {'fields': ('username', 'password')}),
        ('اطلاعات شخصی', {'fields': ('name', 'email', 'profile_picture')}),
        ('تاریخچه', {'fields': ('get_liked_posts', 'get_history')}),  # works now
        ('دسترسی ها', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
        ('تاریخ ها', {'fields': ('last_login', 'date_joined')}),
    )
    readonly_fields = ('get_liked_posts', 'get_history')
    
    add_fieldsets = (
        ('اصلی', {'fields': ('username', 'password1', 'password2')}),
        ('اطلاعات شخصی', {'fields': ('name', 'email', 'profile_picture')}),
        ('دسترسی ها', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
        ('تاریخ ها', {'fields': ('last_login', 'date_joined')}),
    )
    
    def get_liked_posts(self, obj: User):
        return ', '.join(obj.liked_posts.values_list('title', flat=True))
    get_liked_posts.short_description = 'پست های لایک شده'

    def get_history(self, obj: User):
        if not obj.history:
            return 'تاریخچه ای وجود ندارد'
        ids = obj.history.split(',')
        posts = Post.objects.filter(id__in=ids)
        posts_dict = {str(p.id): p.title for p in posts}
        return ', '.join(posts_dict[i] for i in ids if i in posts_dict)
    get_history.short_description = 'بیست پست اخیر'
