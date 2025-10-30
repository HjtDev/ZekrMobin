from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.http.response import JsonResponse
from django.core.files.storage import FileSystemStorage
import os


@login_required
@csrf_exempt
def editor_upload_handler(request):
    if request.method == 'POST' and request.FILES.get('file'):
        file_obj = request.FILES['file']
        fs = FileSystemStorage(location=os.path.join(settings.MEDIA_ROOT, 'editor', 'files'))
        filename = fs.save(file_obj.name, file_obj)
        file_url = fs.url(os.path.join('editor', 'files', filename))
        return JsonResponse({'location': file_url})
    return JsonResponse({'error': 'Invalid request'}, status=400)
