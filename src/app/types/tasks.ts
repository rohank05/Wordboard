export interface Task {
    id?: number;
    title: string;
    status: string;
    assignee: string;
    description: string;
    dueDate:string;
}

export interface Tasks {
    id: number;
    title: string;
    status: string;
    assignee: string;
    description: string;
    dueDate: string;
}

export interface TaskState {
    tasks: Tasks[];
}


