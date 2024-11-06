import React, { useState } from 'react';
import styles from './LoginForm.module.css';
import { getAuthTokens } from '../authApi';
import { useNavigate } from 'react-router-dom';

export const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await getAuthTokens(email, password);
            navigate('/main');
        } catch (err) {
            setError('Ошибка авторизации. Пожалуйста, проверьте данные и попробуйте снова.');
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Добро пожаловать!</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.input}
                    required
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.input}
                    required
                />
                <button type="submit" className={styles.button}>
                    Войти
                </button>
                {error && <p className={styles.error}>{error}</p>}
                <hr className={styles.line} />
                <div className={styles.footer}>
                    <p>Впервые здесь? <a href="/register">Создайте аккаунт</a></p>
                </div>
            </form>
        </div>
    );
};
