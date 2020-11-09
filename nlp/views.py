from django.shortcuts import render
from django.http import JsonResponse


def page_extract(request):
    return render(request, './extract.html', {})


def query_extract(request):
    if request.is_ajax() and request.method == "POST":
        jspan = 'none'
        return JsonResponse({'jspan': jspan})
    return render(request, './extract.html')
