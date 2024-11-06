import React from 'react';
import styles from './Header.module.css';
import searchIcon from '../../assets/images/searchIcon.svg';
import { useTasks } from '../../context/TasksContext';
import { HeaderProps } from '../../interfaces/modalInterfaces';


export const Header: React.FC<HeaderProps> = ({ onNewTask }) => {
    const { filter, setFilter, setSearchQuery } = useTasks();

    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(event.target.value);
    };

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    return (
        <header className={styles.header}>
            <div className={styles.searchBar}>
                <div className={styles.searchInputContainer}>
                    <img src={searchIcon} alt="Поиск" className={styles.searchIcon} width={24} />
                    <input
                        type="text"
                        placeholder="Найти"
                        className={styles.searchInput}
                        onChange={handleSearchInputChange}
                    />
                </div>
                <select
                    value={filter}
                    onChange={handleFilterChange}
                    className={styles.searchSelect}
                >
                    <option value="Все задачи">Все задачи</option>
                    <option value="Выполнено">Выполнено</option>
                    <option value="Не выполнено">Не выполнено</option>
                </select>
            </div>
            <button className={styles.newTaskBtn} onClick={onNewTask}>
                + Новая задача
            </button>
        </header>
    );
};
