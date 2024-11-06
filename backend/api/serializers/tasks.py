from rest_framework import serializers
from tasks.models import Task


class TaskSerializer(serializers.ModelSerializer):
    owner = serializers.CharField(source='owner.username', required=False)

    class Meta:
        model = Task
        fields = [
            'id',
            'title',
            'description',
            'status',
            'date',
            'owner'
        ]
