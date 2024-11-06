import axios from 'axios';
import { makeAuthorizedRequest } from '../features/auth/authUtils';
const BASE_URL = process.env.REACT_APP_BASE_URL;


export const getTasks = async (
    searchQuery?: string,
    filter?: string,
    page?: number,
    pageSize?: number
) => {
    const params: Record<string, string | number> = {};

    if (searchQuery) {
        params['title'] = searchQuery;
    }

    if (filter && filter !== 'Все задачи') {
        params['status'] = filter;
    }

    if (page) {
        params['page'] = page;
    }

    if (pageSize) {
        params['page_size'] = pageSize;
    }

    try {
        const response = await makeAuthorizedRequest(`${BASE_URL}api/tasks/`, 'GET', {}, params);
        return {
            tasks: response.results,
            totalPages: Math.ceil(response.count / (pageSize || 10)),
            next: response.next,
            previous: response.previous
        };
    } catch (error) {
        console.error('Ошибка при получении задач:', error);
        throw error;
    }
};


// Создание задачи
export const createTask = async (taskData: { title: string; description: string }) => {
    return await makeAuthorizedRequest(`${BASE_URL}api/tasks/`, 'POST', taskData);
};

// Обновление задачи
export const updateTask = async (taskId: string, updatedData: { id?: string, status?: string, title?: string, description?: string }) => {
    return await makeAuthorizedRequest(`${BASE_URL}api/tasks/${taskId}/`, 'PATCH', updatedData);
};

// Удаление задачи
export const deleteTask = async (taskId: string) => {
    return await makeAuthorizedRequest(`${BASE_URL}api/tasks/${taskId}/`, 'DELETE');
};
