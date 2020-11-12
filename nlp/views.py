from django.shortcuts import render
from django.http import JsonResponse
import requests
import traceback


def page_extract(request):
    context = {}
    if 'contrast' in request.session:
        context['contrast'] = request.session.get('contrast')
    if 'navbar' in request.session:
        context['navbar'] = request.session.get('navbar')
    session_contrast(request)
    return render(request, './extract.html', context)


def query_extract(request):
    if request.is_ajax() and request.method == 'POST':
        # Fetch Source
        source = request.POST.get('source', False)

        if not source:
            return JsonResponse({'jextract': '__ERROR__'})

        # Query
        try:
            jresponse = requests.post('http://localhost:2334/query_extarct',
                                      data={'source': source})
            jextract = jresponse.json()['jextract']
        except Exception:
            jextract = '__ERROR__'
            traceback.print_exc()

        return JsonResponse({'jextract': jextract})
    return render(request, './extract.html')


def query_contrast(request):
    if request.is_ajax() and request.method == 'POST':
        # Fetch Source
        source_dst = request.POST.get('source[dst]', False)
        source_tgt = request.POST.get('source[tgt]', False)

        if not source_dst or not source_tgt:
            return JsonResponse({'jcontrast': '__ERROR__'})

        request.session['contrast'] = source_dst
        request.session['navbar'] = source_tgt

        return JsonResponse({'jcontrast': '__SUCCESS__'})


def session_contrast(request):
    if 'contrast' not in request.session:
        request.session['contrast'] = 'moon'
    if 'navbar' not in request.session:
        request.session['navbar'] = 'dark'
