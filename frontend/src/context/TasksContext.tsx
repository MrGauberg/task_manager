import React, { createContext, useContext, useState } from 'react';
import { TaskContextType, TaskProviderProps } from '../interfaces/contextInterfaces';


const TaskContext = createContext<TaskContextType | undefined>(undefined);


export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
    const [filter, setFilter] = useState<string>('Все задачи');
    const [searchQuery, setSearchQuery] = useState<string>(''); // Состояние для поискового запроса

    return (
        <TaskContext.Provider value={{ filter, searchQuery, setFilter, setSearchQuery }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTasks must be used within a TaskProvider');
    }
    return context;
};
