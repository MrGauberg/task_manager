import pytest

from django.urls import reverse
from django.contrib.auth import get_user_model

User = get_user_model()


@pytest.mark.django_db
def test_user_tasks(task, user, auth_client):
    url = reverse('tasks')
    response = auth_client.get(url)
    assert response.status_code == 200
    assert len(response.data) == 1
    assert response.data[0]['title'] == task.title

@pytest.mark.django_db
def test_user2_tasks(task2, task3, user2, auth_client2):
    url = reverse('tasks')
    response = auth_client2.get(url)
    assert response.status_code == 200
    assert len(response.data) == 2
    assert response.data[0]['title'] == task3.title
    assert response.data[1]['title'] == task2.title

@pytest.mark.django_db
def test_tasks_filters(task2, task3, user2, auth_client2):
    url = reverse('tasks')
    response = auth_client2.get(url, {'title': 'ача2'})
    assert response.status_code == 200
    assert len(response.data) == 1
    assert response.data[0]['title'] == task2.title
    
    response = auth_client2.get(url, {'status': 'Не выполнено'})
    assert response.status_code == 200
    assert len(response.data) == 1
    assert response.data[0]['title'] == task3.title

@pytest.mark.django_db
def test_create_task(auth_client):
    url = reverse('tasks')
    response = auth_client.post(url, data={'title': 'test', 'description': 'test'})
    assert response.status_code == 201
    assert response.data['title'] == 'test'
    assert response.data['description'] == 'test'


@pytest.mark.django_db
def test_user_register(auth_client): 
    url = reverse('register')
    assert not User.objects.filter(username='newusername').exists()
    response = auth_client.post(url, data={
        'username': 'newusername',
        'email': 'newuser@example.com', 
        'first_name': 'firstname',
        'last_name': 'lastname',
        'password_confirm': 'newusername1234',
        'password': 'newusername1234'
        })
    assert response.status_code == 201
    assert response.data['message'] == 'Пользователь зарегистрирован.'
    assert User.objects.filter(username='newusername').exists()