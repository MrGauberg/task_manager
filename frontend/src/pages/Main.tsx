import React, { useState, useEffect } from 'react';
import { TaskTable } from '../components/TaskTable/TaskTable';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { Header } from '../components/Header/Header';
import { DeleteConfirmationModal } from '../components/DeleteConfirmationModal/DeleteConfirmationModal';
import styles from './Main.module.css';
import { createTask, deleteTask, getTasks, updateTask } from '../api/tasksApi';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useTasks } from '../context/TasksContext';
import { TaskModal } from '../components/TaskModal/TaskModal';
import { Task } from '../interfaces/taskInterfaces';

const PAGE_SIZE = 10;

export const Main: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const { filter, searchQuery } = useTasks();
    const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [nextPage, setNextPage] = useState<string | null>(null);
    const [prevPage, setPrevPage] = useState<string | null>(null);
    const navigate = useNavigate();
    const isAuthenticated = Boolean(Cookies.get('access_token'));

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const { tasks, totalPages, next, previous } = await getTasks(searchQuery, filter, currentPage, PAGE_SIZE);
                setTasks(tasks);
                setTotalPages(totalPages);
                setNextPage(next);
                setPrevPage(previous);
            } catch (error) {
                console.error("Ошибка при получении задач:", error);
            }
        };

        if (isAuthenticated) {
            fetchTasks();
        }
    }, [isAuthenticated, searchQuery, filter, currentPage]);

    const handleNewTask = async (title: string, description: string) => {
        try {
            const newTask = await createTask({ title, description });
            setTasks(prev => [...prev, newTask]);
        } catch (error) {
            console.error("Ошибка при создании задачи:", error);
        }
    };

    const handleEditTaskSubmit = async (title: string, description: string) => {
        if (editingTask) {
            try {
                const updatedTask = await updateTask(editingTask.id, { title, description });
                setTasks(prev => prev.map(task => (task.id === editingTask.id ? updatedTask : task)));
                setEditingTask(null);
                setIsModalOpen(false);
            } catch (error) {
                console.error("Ошибка при обновлении задачи:", error);
            }
        }
    };

    const handleToggleTaskStatus = async (task: Task) => {
        const newStatus = task.status === 'Выполнено' ? 'Не выполнено' : 'Выполнено';
        try {
            const updatedTask = await updateTask(task.id, { id: task.id, status: newStatus });
            setTasks(prev => prev.map(t => (t.id === task.id ? updatedTask : t)));
        } catch (error) {
            console.error("Ошибка при обновлении статуса задачи:", error);
        }
    };

    const openEditTaskModal = (task: Task) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };

    const handleDeleteTask = async () => {
        if (taskToDelete) {
            try {
                await deleteTask(taskToDelete);
                setTasks(prev => prev.filter(task => task.id !== taskToDelete));
                setTaskToDelete(null);
            } catch (error) {
                console.error("Ошибка при удалении задачи:", error);
            }
        }
    };

    const openDeleteConfirmation = (id: string) => {
        setTaskToDelete(id);
    };

    const closeDeleteConfirmation = () => {
        setTaskToDelete(null);
    };

    const goToNextPage = () => {
        if (nextPage) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPrevPage = () => {
        if (prevPage) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className={styles.mainContent}>
            <Sidebar />
            <div className={styles.container}>
                <Header onNewTask={() => setIsModalOpen(true)} />
                <TaskTable
                    tasks={tasks}
                    onEdit={openEditTaskModal}
                    onDelete={openDeleteConfirmation}
                    onToggleStatus={handleToggleTaskStatus}
                />
                <div className={styles.pagination}>
                    <button onClick={goToPrevPage} disabled={!prevPage}>Назад</button>
                    <span>{currentPage} из {totalPages}</span>
                    <button onClick={goToNextPage} disabled={!nextPage}>Вперед</button>
                </div>
                {taskToDelete && (
                    <DeleteConfirmationModal
                        onConfirm={handleDeleteTask}
                        onCancel={closeDeleteConfirmation}
                    />
                )}
                {isModalOpen && (
                    <TaskModal
                        onClose={() => {
                            setIsModalOpen(false);
                            setEditingTask(null);
                        }}
                        onSubmit={editingTask ? handleEditTaskSubmit : handleNewTask}
                        initialData={editingTask ? { title: editingTask.title, description: editingTask.description } : undefined}
                    />
                )}
            </div>
        </div>

    );
};

export default Main;
