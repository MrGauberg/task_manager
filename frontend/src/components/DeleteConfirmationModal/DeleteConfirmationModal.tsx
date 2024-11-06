import React from 'react';
import styles from './DeleteConfirmationModal.module.css';
import { DeleteConfirmationModalProps } from '../../interfaces/modalInterfaces';


export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ onConfirm, onCancel }) => {
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <p>Хотите удалить эту задачу?</p>
                <div className={styles.buttons}>
                    <button onClick={onCancel} className={styles.cancelButton}>Отмена</button>
                    <button onClick={onConfirm} className={styles.deleteButton}>Удалить</button>
                </div>
            </div>
        </div>
    );
};
