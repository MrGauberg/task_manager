import axios, { Method } from 'axios';
import Cookies from 'js-cookie';
import { refreshAccessToken } from './authApi';

// Универсальный запрос с авторизацией и обработкой токенов
export const makeAuthorizedRequest = async (
    url: string,
    method: Method = 'GET',
    data: any = null,
    params: Record<string, any> = {}
): Promise<any> => {
    let accessToken = Cookies.get('access_token');
    if (!accessToken) {
        throw new Error('Access токен отсутствует');
    }

    try {
        const response = await axios({
            method,
            url,
            data,
            params,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            try {
                accessToken = await refreshAccessToken();
                const retryResponse = await axios({
                    method,
                    url,
                    data,
                    params,
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                return retryResponse.data;
            } catch {
                throw new Error('Не удалось обновить токен');
            }
        } else {
            throw error;
        }
    }
};

// Функция для проверки ошибки авторизации
export const isUnauthorized = (errorMsg: string): boolean => {
    return (
        errorMsg === 'Access токен отсутствует' ||
        errorMsg === 'Не удалось обновить токен'
    );
};
