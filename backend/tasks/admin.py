from django.contrib import admin
from .models import Task

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'status', 'date')
    list_filter = ('status', )
    search_fields = ('title', 'description')
    date_hierarchy = 'date'
    fields = ('owner', 'title', 'description', 'status')
    ordering = ['-date']

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        if request.user.is_superuser:
            return queryset
        return queryset.filter(owner=request.user)

