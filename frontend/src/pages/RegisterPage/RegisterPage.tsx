import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RegisterPage.module.css';
import { registerUser } from '../../features/auth/authApi';

export const RegisterPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const registerErrors = await registerUser(username, email, password);
            if (registerErrors) {
                const errorMap: { [key: string]: string[] } = {};
                registerErrors.forEach((error) => {
                    errorMap[error.field] = error.messages;
                });
                setErrors(errorMap);
            } else {
                setUsername('');
                setEmail('');
                setPassword('');
                setErrors({});
                navigate('/login');
            }
        } catch (err) {
            console.error('Ошибка при регистрации:', err);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Регистрация</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                
                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        placeholder="Логин"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={styles.input}
                        required
                    />
                    {errors.username && (
                        <div className={styles.error}>
                            {errors.username.map((msg, idx) => (
                                <p key={idx}>{msg}</p>
                            ))}
                        </div>
                    )}
                </div>

                <div className={styles.inputContainer}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.input}
                        required
                    />
                    {errors.email && (
                        <div className={styles.error}>
                            {errors.email.map((msg, idx) => (
                                <p key={idx}>{msg}</p>
                            ))}
                        </div>
                    )}
                </div>

                <div className={styles.inputContainer}>
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.input}
                        required
                    />
                    {errors.password && (
                        <div className={styles.error}>
                            {errors.password.map((msg, idx) => (
                                <p key={idx}>{msg}</p>
                            ))}
                        </div>
                    )}
                </div>

                <button type="submit" className={styles.submitButton}>Зарегистрироваться</button>
                <hr className={styles.line} />
                <div className={styles.footer}>
                    <p>Уже есть аккаунт? <a href="/login" className={styles.signUp}>Войти</a></p>
                </div>
            </form>
        </div>
    );
};
