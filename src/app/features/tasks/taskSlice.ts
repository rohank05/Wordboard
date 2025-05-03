import { RootState } from '@/app/store/store';
import { Task, Tasks } from '@/app/types/tasks';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TaskState {
    tasks: Tasks[];
}

const initialState: TaskState = {
    tasks: [],
};

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasks: (state, action: PayloadAction<{ tasks: Tasks[], role?: string, username?: string }>) => {
            const { tasks, role, username } = action.payload;            
            if (role === 'admin') {
                state.tasks = tasks;
            } else if (role === 'user') {
                state.tasks = tasks.filter(task => task.assignee === username);
            }
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        addTask(state, action: PayloadAction<Task>) {
            const maxId = state.tasks.reduce((max: number, task: Tasks) => (task.id > max ? task.id : max), 0);
            const newId = maxId + 1;
            const newTask = {
                ...action.payload,
                id: newId,
            };
            state.tasks.push(newTask);
            localStorage.setItem('tasks', JSON.stringify(state.tasks));

        },
        editTask(state, action: PayloadAction<Task>) {
            const taskIndex = state.tasks.findIndex((task) => task.id === action.payload.id);
            if (taskIndex !== -1) {
                state.tasks[taskIndex] = {
                    ...state.tasks[taskIndex],
                    ...action.payload,
                };
                localStorage.setItem('tasks', JSON.stringify(state.tasks));
            }
        },
        deleteTask(state, action: PayloadAction<number|undefined>) {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },

    },
});

export const { setTasks, addTask, editTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
export const selectTasks = (state: RootState) => state.tasks.tasks;
