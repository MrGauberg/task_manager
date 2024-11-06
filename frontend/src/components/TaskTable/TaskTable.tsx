import React, { useState } from 'react';
import styles from './TaskTable.module.css';
import doneIcon from '../../assets/images/doneIcon.svg';
import notDoneIcon from '../../assets/images/notDoneIcon.svg';
import delIcon from '../../assets/images/delIcon.svg';
import editIcon from '../../assets/images/editIcon.svg';
import arrowIcon from '../../assets/images/arrow.svg';
import { Task, TaskTableProps } from '../../interfaces/taskInterfaces';



export const TaskTable: React.FC<TaskTableProps> = ({ tasks, onEdit, onDelete, onToggleStatus  }) => {
    const [sortConfig, setSortConfig] = useState<{ key: keyof Task | null; direction: 'asc' | 'desc' }>({
        key: null,
        direction: 'asc',
    });

    // Функция для форматирования даты
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);

        if (isNaN(date.getTime())) {
            return dateString;
        }

        return new Intl.DateTimeFormat("ru-RU", {
            day: "numeric",
            month: "long",
            year: "numeric",
        }).format(date);
    };

    const sortedTasks = [...tasks].sort((a, b) => {
        if (sortConfig.key) {
            const { key, direction } = sortConfig;
            const order = direction === 'asc' ? 1 : -1;

            if (a[key] < b[key]) return -1 * order;
            if (a[key] > b[key]) return 1 * order;
            return 0;
        }
        return 0;
    });

    const handleSort = (key: keyof Task) => {
        setSortConfig(prevState => {
            if (prevState.key === key) {
                return {
                    key,
                    direction: prevState.direction === 'asc' ? 'desc' : 'asc',
                };
            }
            return { key, direction: 'asc' };
        });
    };

    const renderSortIcon = (key: keyof Task) => {
        if (sortConfig.key === key) {
            return (
                <img
                    src={arrowIcon}
                    alt={sortConfig.direction === 'asc' ? 'Сортировка по возрастанию' : 'Сортировка по убыванию'}
                    className={`${styles.sortIcon} ${sortConfig.direction === 'asc' ? styles.asc : styles.desc}`}
                />
            );
        }
        return null;
    };

    return (
        <table className={styles.taskTable}>
            <thead>
                <tr>
                    <th onClick={() => handleSort('title')} className={styles.sortable}>
                        Имя задачи {renderSortIcon('title')}
                    </th>
                    <th onClick={() => handleSort('description')} className={styles.sortable}>
                        Описание {renderSortIcon('description')}
                    </th>
                    <th onClick={() => handleSort('date')} className={styles.sortable}>
                        Дата создания {renderSortIcon('date')}
                    </th>
                    <th onClick={() => handleSort('status')} className={styles.sortable}>
                        Статус {renderSortIcon('status')}
                    </th>
                </tr>
            </thead>
            <tbody>
                {sortedTasks.map(task => (
                    <tr key={task.id}>
                        <td>{task.title}</td>
                        <td>{task.description || '-'}</td>
                        <td>{formatDate(task.date)}</td>
                            <td>
                                <span className={`${styles.status}`} onClick={() => onToggleStatus(task)}>
                                    {task.status === 'Выполнено' ? (
                                        <img src={doneIcon} alt="Выполнено" className={styles.icon} />
                                    ) : (
                                        <img src={notDoneIcon} alt="Не выполнено" className={styles.icon} />
                                    )}
                                </span>
                            </td>
                        <td>
                            <button className={`${styles.actionBtn}`} onClick={() => onEdit(task)}>
                                <img src={editIcon} alt="Редактировать" />
                            </button>
                        </td>
                        <td>
                            <button className={`${styles.actionBtn}`} onClick={() => onDelete(task.id)}>
                                <img src={delIcon} alt="Удалить" />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
