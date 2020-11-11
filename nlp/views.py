from django.shortcuts import render
from django.http import JsonResponse
import requests
import traceback


def page_extract(request):
    return render(request, './extract.html', {})


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
