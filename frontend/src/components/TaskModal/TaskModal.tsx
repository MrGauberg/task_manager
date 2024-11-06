import React, { useState, useEffect } from 'react';
import styles from './TaskModal.module.css';
import closeIcon from '../../assets/images/closeIcon.svg';
import { TaskModalProps } from '../../interfaces/modalInterfaces';


export const TaskModal: React.FC<TaskModalProps> = ({ onClose, onSubmit, initialData }) => {
    const [title, setTitle] = useState(initialData?.title || '');
    const [description, setDescription] = useState(initialData?.description || '');

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setDescription(initialData.description);
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(title, description);
        onClose();
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.modalContent}>
                    <div className={styles.modalHeader}>
                        <h2 className={styles.modalTitle}>{initialData ? 'Редактировать задачу' : 'Новая задача'}</h2>
                        <button className={styles.closeButton} onClick={onClose}>
                            <img src={closeIcon} alt="Закрыть" />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Имя задачи"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={styles.input}
                            required
                        />
                        <textarea
                            placeholder="Описание"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className={styles.textarea}
                            required
                        ></textarea>
                        <button type="submit" className={styles.submitButton}>
                            {initialData ? 'Сохранить изменения' : 'Создать'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
