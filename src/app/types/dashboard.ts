import { Task } from "./tasks";

export interface TableProps {
    user?: { username: string; role: string };
    data: Task[];
    handleEdit: (task: Task) => void;
    handleDelete: (task: Task) => void;
};

export interface ChartProps {
    data: Task[];
};