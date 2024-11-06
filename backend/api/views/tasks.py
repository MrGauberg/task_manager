from asyncio import Task
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend

from django.utils import timezone

from api.pagination import PageLimitPaginator
from api.serializers.tasks import TaskSerializer
from api.filters.tasks import TaskFilter, TaskSearchFilter

from tasks.models import Task



class TaskViewSet(viewsets.ModelViewSet):
    """Представление для работы с задачами"""
    
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    filter_backends = [DjangoFilterBackend, TaskSearchFilter]
    filterset_class =TaskFilter
    pagination_class = PageLimitPaginator


    def perform_create(self, serializer):
        print(self.request.user, "self.request.user")
        if 'date' not in serializer.validated_data:
            serializer.save(owner=self.request.user, date=timezone.now().date())
        else:
            serializer.save(owner=self.request.user)


    def get_queryset(self):
        return super().get_queryset().filter(owner=self.request.user)
