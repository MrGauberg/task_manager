import React from 'react';
import { LoginForm } from '../features/auth/components/LoginForm';

export const LoginPage: React.FC = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f1f3f5' }}>
            <LoginForm />
        </div>
    );
};
