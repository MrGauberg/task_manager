import django_filters
from rest_framework import filters

from tasks.models import Task


class TaskFilter(django_filters.FilterSet):
    owner = django_filters.BaseInFilter(field_name='owner__id')
    status = django_filters.BaseInFilter(field_name='status')
    date_from = django_filters.DateFilter(field_name="date", method="filter_date_from")
    date_to = django_filters.DateFilter(field_name="date", method="filter_date_to")


    class Meta:
        model = Task
        fields = ['owner', 'status', 'date_from', 'date_to']

    def filter_date_from(self, queryset, name, value):
        return queryset.filter(date__gte=value)

    def filter_date_to(self, queryset, name, value):
        return queryset.filter(date__lte=value)


class TaskSearchFilter(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        title = request.query_params.get("title")
        if title:
            queryset = queryset.filter(title__icontains=title)
        return queryset