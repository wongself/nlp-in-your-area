from django.shortcuts import redirect, render
from django.http import JsonResponse
import hashlib
import demjson
import requests
import traceback

from .models import Result


def page_extract(request):
    context = {}
    if 'contrast' in request.session:
        context['contrast'] = request.session.get('contrast')
    if 'navbar' in request.session:
        context['navbar'] = request.session.get('navbar')
    if 'checkbox' in request.session:
        context['checkbox'] = request.session.get('checkbox')
    session_contrast(request)
    return render(request, './extract.html', context)


def page_not_found(request, exception, template_name=''):
    return redirect(page_extract)


def query_extract(request):
    if request.is_ajax() and request.method == 'POST':
        # Fetch Source
        source = request.POST.get('source', False)

        if not source:
            return JsonResponse({'jextract': '__ERROR__'})

        md5 = hashlib.md5()
        md5.update(source.encode('utf-8'))
        src_md5 = md5.hexdigest()

        if len(Result.objects.filter(src=src_md5)) > 0:
            print('Already found the same input in the database.')
            jextract = Result.objects.filter(
                src=src_md5).values().first().get('res')
            jextract = demjson.decode(jextract)
            return JsonResponse({'jextract': jextract})

        # Query
        try:
            jresponse = requests.post('http://localhost:2334/query_extarct',
                                      data={'source': source})
            jextract = jresponse.json()['jextract']
        except Exception:
            jextract = '__ERROR__'
            traceback.print_exc()

        if jextract != '__ERROR__':
            print('Add the new input to the database.')
            Result.objects.create(src=src_md5, res=jextract)

        return JsonResponse({'jextract': jextract})
    return render(request, './extract.html')


def query_contrast(request):
    if request.is_ajax() and request.method == 'POST':
        # Fetch Source
        source_contrast = request.POST.get('source[contrast]', False)
        source_navbar = request.POST.get('source[navbar]', False)
        source_checkbox = request.POST.get('source[checkbox]', False)

        if not source_contrast or not source_navbar or not source_checkbox:
            return JsonResponse({'jcontrast': '__ERROR__'})

        request.session['contrast'] = source_contrast
        request.session['navbar'] = source_navbar
        request.session['checkbox'] = source_checkbox

        return JsonResponse({'jcontrast': '__SUCCESS__'})


def session_contrast(request):
    if 'contrast' not in request.session:
        request.session['contrast'] = 'moon'
    if 'navbar' not in request.session:
        request.session['navbar'] = 'dark'
    if 'checkbox' not in request.session:
        request.session['checkbox'] = 'checked'
