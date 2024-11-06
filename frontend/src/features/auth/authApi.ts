import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { RegisterError, UserTokenPayload } from '../../interfaces/authInterfaces';

const BASE_URL = process.env.REACT_APP_BASE_URL;


// Функция для получения токенов авторизации
export const getAuthTokens = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${BASE_URL}auth/token/`, {
            email,
            password,
        });

        const { access, refresh } = response.data;
        const decodedToken = jwtDecode<UserTokenPayload>(access);
        const { user_id } = decodedToken;

        Cookies.set('user_id', user_id.toString());
        Cookies.set('access_token', access);
        Cookies.set('refresh_token', refresh);

        return { access, refresh, user_id };
    } catch (error) {
        throw new Error('Ошибка авторизации');
    }
};

// Функция для обновления access-токена
export const refreshAccessToken = async (): Promise<string> => {
    const refreshToken = Cookies.get('refresh_token');

    if (refreshToken) {
        try {
            const response = await axios.post(`${BASE_URL}auth/token/refresh/`, {
                refresh: refreshToken,
            });
            Cookies.set('access_token', response.data.access);
            return response.data.access;
        } catch {
            throw new Error('Не удалось обновить токен');
        }
    } else {
        throw new Error('Refresh токен отсутствует');
    }
};


// Функция для регистрации пользователя
export const registerUser = async (
    username: string, 
    email: string, 
    password: string
): Promise<void | RegisterError[]> => {
    try {
        const response = await axios.post(`${BASE_URL}auth/register/`, {
            username,
            email,
            password,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Успешная регистрация
        console.log('Пользователь успешно зарегистрирован:', response.data);
    } catch (error: any) {
        if (error.response && error.response.data) {
            // Формируем массив ошибок
            const errors: RegisterError[] = Object.keys(error.response.data).map((field) => ({
                field,
                messages: error.response.data[field],
            }));
            return errors; // Возвращаем ошибки для дальнейшей обработки
        } else {
            console.error('Ошибка при попытке регистрации:', error.message);
            throw new Error('Не удалось зарегистрироваться');
        }
    }
};
