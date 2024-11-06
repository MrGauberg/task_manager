export interface Task {
    id: string;
    title: string;
    description: string;
    date: string;
    status: 'Выполнено' | 'Не выполнено';
}

export interface TaskTableProps {
    tasks: Task[];
    onEdit: (task: Task) => void;
    onDelete: (id: string) => void;
    onToggleStatus: (task: Task) => void;
}
