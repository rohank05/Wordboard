import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/app/lib/features/auth/authSlice';
import taskReducer from '@/app/lib/features/tasks/taskSlice'
import loaderReducer from '@/app/lib/features/loader/loaderSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
    loader: loaderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
