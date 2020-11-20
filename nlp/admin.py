from django.contrib import admin

from .models import Result


class ResultAdmin(admin.ModelAdmin):
    list_display = ('src', 'created_time')
    fields = ('src', 'res')


admin.site.register(Result, ResultAdmin)
