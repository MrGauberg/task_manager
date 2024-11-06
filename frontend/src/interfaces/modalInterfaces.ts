export interface DeleteConfirmationModalProps {
    onConfirm: () => void;
    onCancel: () => void;
}

export interface HeaderProps {
    onNewTask: () => void;
}

export interface TaskModalProps {
    onClose: () => void;
    onSubmit: (title: string, description: string) => void;
    initialData?: { title: string; description: string };
}
