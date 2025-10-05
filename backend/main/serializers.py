from rest_framework.serializers import ModelSerializer
from .models import ClubMember


class ClubMemberSerializer(ModelSerializer):
    class Meta:
        model = ClubMember
        fields = ('name', 'email')
        