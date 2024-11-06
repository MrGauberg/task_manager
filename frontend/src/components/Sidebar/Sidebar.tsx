import React from 'react';
import styles from './Sidebar.module.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import { CustomJwtPayload } from '../../interfaces/authInterfaces';


export const Sidebar = () => {
    const navigate = useNavigate();

    const getUsernameFromToken = () => {
        const accessToken = Cookies.get('access_token');
        if (accessToken) {
            try {
                const decodedToken = jwtDecode<CustomJwtPayload>(accessToken);
                console.log("Декодированный токен:", decodedToken);
                return decodedToken.username;
            } catch (error) {
                console.error("Ошибка декодирования токена:", error);
            }
        }
        return null;
    };

    const username = getUsernameFromToken();
    const handleLogout = () => {
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        Cookies.remove('user_id');
        
        navigate('/login');
    };

    return (
        <div className={styles.sidebar}>
            <div className={styles.userProfile}>
                <p className={styles.username}>{username}</p>
            </div>
            <button className={styles.logoutButton} onClick={handleLogout}>
                Выход
            </button>
        </div>
    );
};
