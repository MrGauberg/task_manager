from django.urls import path

from api.views.tasks import TaskViewSet


urlpatterns = [
    path('tasks/', TaskViewSet.as_view({'get': 'list', 'post': 'create'}), name='tasks'),
    path('tasks/<int:pk>/', TaskViewSet.as_view({'get': 'retrieve', 'patch': 'partial_update', 'delete': 'destroy'}), name='task_detail'),
]
