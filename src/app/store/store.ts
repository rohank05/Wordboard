import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/app/features/auth/authSlice';
import taskReducer from '@/app/features/tasks/taskSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
