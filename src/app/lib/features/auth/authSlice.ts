import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/lib/store/store';


type User = {
  username: string;
  role: string;
};

type AuthState = {
  user: User | null;
  users:User[]
};

const getInitialUser = (): User | null => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  }
  return null;
};

const initialState: AuthState = {
  user: getInitialUser(),
  users:[]
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout(state) {
      state.user = null;
        localStorage.removeItem('user');
        localStorage.removeItem('tasks');
        window.location.href = "/";
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
export const selectUser = (state: RootState) => state.auth.user;


// features/auth/authSlice.ts
// import { AuthState, User } from '@/app/types/auth';
// import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';


// const getInitialUser = (): User | null => {
//   if (typeof window !== 'undefined') {
//     const stored = localStorage.getItem('user');
//     return stored ? JSON.parse(stored) : null;
//   }
//   return null;
// };

// const initialState: AuthState = {
//   user: getInitialUser(),
//   error: null,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     loginSuccess(state, action: PayloadAction<User>) {
//       state.user = action.payload;
//       state.error = null;
//     },
//     loginFailure(state, action: PayloadAction<string>) {
//       state.user = null;
//       state.error = action.payload;
//     },
//     logout(state) {
//       state.user = null;
//       state.error = null;
//     },
//   },
// });

// export const { loginSuccess, loginFailure, logout } = authSlice.actions;
// export default authSlice.reducer;
