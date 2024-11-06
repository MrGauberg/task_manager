from django.urls import reverse
from rest_framework import status

import pytest
from django.contrib.auth import get_user_model

from tasks.models import Task

User = get_user_model()

@pytest.fixture
def user(db):
    return User.objects.create_user(username='testuser', password='password')

@pytest.fixture
def user2(db):
    return User.objects.create_user(username='testuser2', password='password')


@pytest.fixture(autouse=True)
def auth_client(db, client, user):
    """Возвращает клиент с авторизацией."""
    response = client.post(reverse('token_obtain_pair'), data={'username': user.username, 'password': 'password'})
    token = response.json()['access']
    client.defaults['HTTP_AUTHORIZATION'] = f'Bearer {token}'
    return client


@pytest.fixture
def auth_client2(db, client, user2):
    """Возвращает клиент с авторизацией."""
    response = client.post(reverse('token_obtain_pair'), data={'username': user2.username, 'password': 'password'})
    token = response.json()['access']
    client.defaults['HTTP_AUTHORIZATION'] = f'Bearer {token}'
    return client


@pytest.fixture
def task(db, user):
    return Task.objects.create(title='Задача1', description='Описание 1', status='Выполнено', owner=user)


@pytest.fixture
def task2(db, user2):
    return Task.objects.create(title='Задача2', description='Описание 2', status='Выполнено', owner=user2)

@pytest.fixture
def task3(db, user2):
    return Task.objects.create(title='Задача3', description='Описание 3', status='Не выполнено', owner=user2)

