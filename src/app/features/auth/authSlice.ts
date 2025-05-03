import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type User = {
  username: string;
  role: string;
};

type AuthState = {
  user: User | null;
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
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.user = action.payload;
      // document.cookie = `user=${JSON.stringify(state.user)}; path=/; secure; samesite=strict;`;
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(action.payload));
      }
    },
    logout(state) {
      state.user = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
        localStorage.removeItem('tasks');
        window.location.href = "/";
      }
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
export const selectUser = (state: any) => state.auth.user;

