import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Main } from './pages/Main';
import { LoginPage } from './pages/LoginPage';
import { TaskProvider } from './context/TasksContext';
import { RegisterPage } from './pages/RegisterPage/RegisterPage';

const App: React.FC = () => {
    return (
        <TaskProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/main" />} />
                    <Route path="/main" element={<Main />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Routes>
            </Router>
        </TaskProvider>
    );
};

export default App;
